import React from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, ArrowRight, ArrowLeft, Globe, Link as LinkedIn, Palette, ListOrdered, ChevronUp, ChevronDown } from 'lucide-react';
import { cvSchema } from '../lib/schema';
import { cn } from '../lib/utils';
import { Input, TextArea, Button } from './FormFields';

const CVForm = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = React.useState('personal');

  const {
    register,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cvSchema),
    defaultValues: data,
    mode: 'onChange',
  });

  // Sync with external data changes (like Reset) manually to avoid loops
  React.useEffect(() => {
    reset(data);
  }, [data, reset]);

  const watchedData = useWatch({ control });

  // Sync internal form changes back to parent with a stability check
  React.useEffect(() => {
    if (watchedData && Object.keys(watchedData).length > 0) {
      const currentJSON = JSON.stringify(data);
      const nextJSON = JSON.stringify(watchedData);
      
      if (currentJSON !== nextJSON) {
        const timeout = setTimeout(() => {
          onChange(watchedData);
        }, 50); // Small buffer to ensure state is settled
        return () => clearTimeout(timeout);
      }
    }
  }, [watchedData, onChange, data]);

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: "education"
  });

  const { fields: internshipFields, append: appendInternship, remove: removeInternship } = useFieldArray({
    control,
    name: "internships"
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: "experience"
  });

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: "projects"
  });

  const { fields: techSkillFields, append: appendTechSkill, remove: removeTechSkill } = useFieldArray({
    control,
    name: "skills.technical"
  });

  const { fields: certFields, append: appendCert, remove: removeCert } = useFieldArray({
    control,
    name: "certifications"
  });

  const { fields: langFields, append: appendLang, remove: removeLang } = useFieldArray({
    control,
    name: "skills.languages"
  });

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'summary', label: 'Summary' },
    { id: 'education', label: 'Education' },
    { id: 'internships', label: 'Internships' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'layout', label: 'Layout & Design' },
  ];

  const moveSection = (index, direction) => {
    const newOrder = [...watchedData.settings.sectionOrder];
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < newOrder.length) {
      const temp = newOrder[index];
      newOrder[index] = newOrder[newIndex];
      newOrder[newIndex] = temp;
      setValue('settings.sectionOrder', newOrder);
    }
  };

  const nextTab = () => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1].id);
  };

  const prevTab = () => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1].id);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="flex border-b border-slate-100 bg-white overflow-x-auto no-scrollbar scroll-smooth touch-pan-x">
        <div className="flex w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 px-4 py-4 text-[10px] uppercase tracking-[0.15em] font-black whitespace-nowrap border-b-2 transition-all duration-200",
              activeTab === tab.id 
                ? "border-blue-600 text-blue-600 bg-white shadow-[0_4px_12px_-4px_rgba(37,99,235,0.1)]" 
                : "border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            )}
          >
            {tab.label}
          </button>
        ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-10 scroll-smooth bg-slate-50/50">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 min-h-full">
        
        {activeTab === 'layout' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Template Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Palette size={20} className="text-blue-600" /> Template Style
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'classic', name: 'Classic Single', desc: 'Standard top-down layout' },
                  { id: 'modern', name: 'Modern Split', desc: 'Two-column sidebar layout' },
                  { id: 'minimal', name: 'Minimalist', desc: 'Clean, spacious design' },
                  { id: 'professional', name: 'Professional ATS', desc: 'Traditional resume structure' }
                ].map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => setValue('settings.template', tmpl.id)}
                    className={cn(
                      "p-4 border-2 rounded-xl text-left transition-all",
                      watchedData.settings?.template === tmpl.id
                        ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-100"
                        : "border-gray-100 hover:border-gray-300"
                    )}
                  >
                    <p className="font-bold text-sm text-slate-800">{tmpl.name}</p>
                    <p className="text-[10px] text-gray-500 mt-1">{tmpl.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Palette size={20} className="text-blue-600" /> Accent Color
              </h2>
              <div className="flex flex-wrap gap-3">
                {['#2563eb', '#1e293b', '#dc2626', '#16a34a', '#7c3aed', '#db2777'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setValue('settings.accentColor', color)}
                    className={cn(
                      "w-10 h-10 rounded-full border-4 transition-transform hover:scale-110",
                      watchedData.settings?.accentColor === color ? "border-white ring-2 ring-blue-400" : "border-transparent"
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <input 
                  type="color" 
                  value={watchedData.settings?.accentColor} 
                  onChange={(e) => setValue('settings.accentColor', e.target.value)}
                  className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-gray-100"
                />
              </div>
            </div>


            {/* Section Reordering */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <ListOrdered size={20} className="text-blue-600" /> Section Order
              </h2>
              <p className="text-xs text-gray-500 mb-4">Rearrange sections to better fit your career story.</p>
              <div className="space-y-2">
                {watchedData.settings?.sectionOrder?.map((section, index) => (
                  <div key={section} className="flex items-center justify-between p-3 bg-slate-50 border border-gray-100 rounded-lg group hover:bg-white hover:shadow-sm transition-all">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      {section.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <div className="flex gap-1">
                      <button 
                        type="button" 
                        disabled={index === 0}
                        onClick={() => moveSection(index, -1)}
                        className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30"
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button 
                        type="button" 
                        disabled={index === watchedData.settings.sectionOrder.length - 1}
                        onClick={() => moveSection(index, 1)}
                        className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-30"
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'personal' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-xl font-bold text-slate-800">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input label="Full Name" {...register("personalInfo.fullName")} error={errors.personalInfo?.fullName} />
              <Input label="Job Title" {...register("personalInfo.jobTitle")} error={errors.personalInfo?.jobTitle} />
              <Input label="Email" {...register("personalInfo.email")} error={errors.personalInfo?.email} />
              <Input label="Phone" {...register("personalInfo.phone")} error={errors.personalInfo?.phone} />
              <Input label="Location" {...register("personalInfo.location")} error={errors.personalInfo?.location} />
              <Input label="LinkedIn URL" {...register("personalInfo.linkedin")} error={errors.personalInfo?.linkedin} />
              <Input label="GitHub URL" {...register("personalInfo.github")} error={errors.personalInfo?.github} />
              <Input label="Portfolio URL" {...register("personalInfo.portfolio")} error={errors.personalInfo?.portfolio} />
            </div>
          </div>
        )}

        {activeTab === 'summary' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-xl font-bold text-slate-800">Professional Summary</h2>
            <TextArea 
              label="Professional Bio" 
              placeholder="Highlight your key achievements and expertise..." 
              className="min-h-[250px] leading-relaxed"
              {...register("summary")} 
              error={errors.summary} 
            />
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Education</h2>
              <Button type="button" variant="outline" size="sm" onClick={() => appendEducation({ degree: '', institution: '', location: '', date: '' })}>
                <Plus size={14} className="mr-1" /> Add Record
              </Button>
            </div>
            <div className="space-y-4">
              {educationFields.map((field, index) => (
                <div key={field.id} className="p-5 border border-gray-100 rounded-xl bg-slate-50/50 relative group hover:border-blue-100 transition-colors">
                  <button type="button" onClick={() => removeEducation(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label="Degree / Major" {...register(`education.${index}.degree`)} />
                    <Input label="Institution" {...register(`education.${index}.institution`)} />
                    <Input label="Location" {...register(`education.${index}.location`)} />
                    <Input label="Date (e.g. Jul 2023)" {...register(`education.${index}.date`)} />
                    <Input label="GPA" {...register(`education.${index}.gpa`)} />
                    <Input label="Details" {...register(`education.${index}.details`)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'internships' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Internship Experience</h2>
              <Button type="button" variant="outline" size="sm" onClick={() => appendInternship({ role: '', company: '', date: '', points: [''] })}>
                <Plus size={14} className="mr-1" /> Add Internship
              </Button>
            </div>
            <div className="space-y-4">
              {internshipFields.map((field, index) => (
                <div key={field.id} className="p-5 border border-gray-100 rounded-xl bg-slate-50/50 relative group">
                  <button type="button" onClick={() => removeInternship(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                    <Input label="Role" {...register(`internships.${index}.role`)} />
                    <Input label="Company" {...register(`internships.${index}.company`)} />
                    <Input label="Date" {...register(`internships.${index}.date`)} className="md:col-span-2" />
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Key Responsibilities & Learning</p>
                    <div className="space-y-2">
                      {watchedData.internships?.[index]?.points?.map((_, pIndex) => (
                        <div key={pIndex} className="flex gap-2">
                          <Input 
                            placeholder="e.g. Developed features using React..." 
                            className="flex-1"
                            {...register(`internships.${index}.points.${pIndex}`)} 
                          />
                          <button 
                            type="button" 
                            className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                            onClick={() => {
                              const newInterns = [...watchedData.internships];
                              newInterns[index].points.splice(pIndex, 1);
                              setValue(`internships.${index}.points`, newInterns[index].points);
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        className="w-full border border-dashed border-gray-200 text-gray-400 hover:border-blue-200 hover:text-blue-500"
                        onClick={() => {
                          const newInterns = [...watchedData.internships];
                          newInterns[index].points = [...(newInterns[index].points || []), ''];
                          setValue(`internships.${index}.points`, newInterns[index].points);
                        }}
                      >
                        <Plus size={12} className="mr-2" /> Add Key Point
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Work Experience</h2>
              <Button type="button" variant="outline" size="sm" onClick={() => appendExperience({ role: '', company: '', location: '', date: '', projects: [] })}>
                <Plus size={14} className="mr-1" /> Add Experience
              </Button>
            </div>
            <div className="space-y-6">
              {experienceFields.map((field, index) => (
                <div key={field.id} className="p-6 border border-gray-100 rounded-xl bg-slate-50/50 relative active:bg-white transition-colors">
                  <button type="button" onClick={() => removeExperience(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <Input label="Role" {...register(`experience.${index}.role`)} />
                    <Input label="Company" {...register(`experience.${index}.company`)} />
                    <Input label="Location" {...register(`experience.${index}.location`)} />
                    <Input label="Date Range" {...register(`experience.${index}.date`)} />
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Job Projects & Accomplishments</p>
                    <div className="space-y-3">
                      {watchedData.experience?.[index]?.projects?.map((_, pIndex) => (
                        <div key={pIndex} className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm relative group/item">
                          <button 
                            type="button" 
                            className="absolute top-2 right-2 opacity-0 group-hover/item:opacity-100 text-red-300 hover:text-red-500 transition-opacity"
                            onClick={() => {
                              const newExp = [...watchedData.experience];
                              newExp[index].projects.splice(pIndex, 1);
                              setValue(`experience.${index}.projects`, newExp[index].projects);
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                          <div className="grid gap-3">
                            <Input placeholder="Project Name" {...register(`experience.${index}.projects.${pIndex}.name`)} />
                            <Input placeholder="Project Type / Tech Stack" {...register(`experience.${index}.projects.${pIndex}.type`)} />
                            <TextArea placeholder="Description of what you did..." {...register(`experience.${index}.projects.${pIndex}.description`)} />
                          </div>
                        </div>
                      ))}
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        className="w-full border-2 border-dashed border-gray-200 text-gray-400 hover:border-blue-200 hover:text-blue-500 py-6"
                        onClick={() => {
                          const newExp = [...watchedData.experience];
                          newExp[index].projects = [...(newExp[index].projects || []), { name: '', type: '', description: '', links: {} }];
                          setValue(`experience.${index}.projects`, newExp[index].projects);
                        }}
                      >
                        <Plus size={14} className="mr-2" /> Add Key Project
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Independent Projects</h2>
              <Button type="button" variant="outline" size="sm" onClick={() => appendProject({ name: '', date: '', description: '', links: {} })}>
                <Plus size={14} className="mr-1" /> Add Project
              </Button>
            </div>
            <div className="space-y-4">
              {projectFields.map((field, index) => (
                <div key={field.id} className="p-5 border border-gray-100 rounded-xl bg-slate-50/50 relative">
                  <button type="button" onClick={() => removeProject(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label="Name" {...register(`projects.${index}.name`)} />
                    <Input label="Date" {...register(`projects.${index}.date`)} />
                    <Input label="GitHub Link" {...register(`projects.${index}.links.github`)} />
                    <Input label="Video Demo Link" {...register(`projects.${index}.links.video`)} />
                    <TextArea label="Description" {...register(`projects.${index}.description`)} className="md:col-span-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-10">
            {/* Technical Skills */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-slate-800">Technical Skills</h2>
                  <p className="text-xs text-gray-400">Add categories like Languages, Frameworks, Tools, etc.</p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={() => appendTechSkill({ category: '', items: '' })}>
                  <Plus size={14} className="mr-1" /> Add Category
                </Button>
              </div>
              <div className="space-y-4">
                {techSkillFields.map((field, index) => (
                  <div key={field.id} className="flex gap-4 items-start p-4 bg-slate-50/50 rounded-xl border border-gray-100 group hover:border-blue-100 transition-colors">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input placeholder="Category (e.g. Languages)" {...register(`skills.technical.${index}.category`)} />
                      <Input className="md:col-span-2" placeholder="Skills (comma separated)" {...register(`skills.technical.${index}.items`)} />
                    </div>
                    <button type="button" onClick={() => removeTechSkill(index)} className="mt-2 text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-slate-800">Soft Skills</h2>
                <p className="text-xs text-gray-400">Highlight your core interpersonal strengths.</p>
              </div>
              <TextArea 
                placeholder="Communication, Teamwork, Leadership (comma separated)..." 
                className="min-h-[100px]"
                {...register("skills.soft_text")}
                onChange={(e) => {
                  const values = e.target.value.split(',').map(s => s.trim()).filter(s => s !== '');
                  setValue("skills.soft", values);
                  setValue("skills.soft_text", e.target.value);
                }}
              />
            </div>

            {/* Languages */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-slate-800">Languages</h2>
                  <p className="text-xs text-gray-400">Add languages you speak and your proficiency level.</p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={() => appendLang({ name: '', level: '' })}>
                  <Plus size={14} className="mr-1" /> Add Language
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {langFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3 items-center p-4 bg-slate-50/50 rounded-xl border border-gray-100 group hover:border-blue-100 transition-colors">
                    <Input placeholder="Language" {...register(`skills.languages.${index}.name`)} className="flex-1" />
                    <Input placeholder="Level (e.g. Fluent)" {...register(`skills.languages.${index}.level`)} className="flex-1" />
                    <button type="button" onClick={() => removeLang(index)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Certifications</h2>
              <Button type="button" variant="outline" size="sm" onClick={() => appendCert({ name: '', issuer: '', year: '' })}>
                <Plus size={14} className="mr-1" /> Add Certificate
              </Button>
            </div>
            <div className="space-y-3">
              {certFields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-start p-4 bg-slate-50/50 rounded-xl border border-gray-100">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Certificate Name" {...register(`certifications.${index}.name`)} />
                    <Input placeholder="Issuer" {...register(`certifications.${index}.issuer`)} />
                  </div>
                  <button type="button" onClick={() => removeCert(index)} className="mt-2 text-gray-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-100 flex justify-between bg-white items-center">
        <p className="text-[10px] text-gray-400 font-medium hidden sm:block">Changes saved to local storage</p>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none" onClick={prevTab} disabled={activeTab === tabs[0].id}>
            <ArrowLeft size={16} className="mr-2" /> Back
          </Button>
          <Button variant="primary" className="flex-1 sm:flex-none" onClick={nextTab} disabled={activeTab === tabs[tabs.length - 1].id}>
            Continue <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CVForm;
