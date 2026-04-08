import React from 'react';
import { Mail, Phone, MapPin, Link as LinkedIn, Video, Play, ExternalLink, Award, GraduationCap, Briefcase, Code, User, Languages, Globe, GitBranch as Github } from 'lucide-react';
import { cn } from '../lib/utils';

const CVPreview = React.forwardRef(({ data }, ref) => {
  const { personalInfo, summary, education, internships, experience, projects, skills, certifications, settings } = data;
  
  const accentColor = settings?.accentColor || '#2563eb';
  const template = settings?.template || 'classic';
  const sectionOrder = settings?.sectionOrder || ['summary', 'education', 'internships', 'experience', 'projects', 'skills', 'certifications'];

  const SectionIcon = ({ type, color }) => {
    const iconSize = 16;
    switch (type) {
      case 'summary': return <User size={iconSize} style={{ color }} />;
      case 'education': return <GraduationCap size={iconSize} style={{ color }} />;
      case 'experience': return <Briefcase size={iconSize} style={{ color }} />;
      case 'internships': return <Briefcase size={iconSize} style={{ color }} />;
      case 'projects': return <Code size={iconSize} style={{ color }} />;
      case 'skills': return <Award size={iconSize} style={{ color }} />;
      case 'certifications': return <Award size={iconSize} style={{ color }} />;
      default: return null;
    }
  };

  const renderSection = (type) => {
    const isProfessional = template === 'professional';
    
    switch (type) {
      case 'summary':
        return summary && (
          <section key="summary" className={isProfessional ? "mb-4" : "mb-5"}>
            <h2 className={cn(
              "text-[13px] font-black uppercase mb-4 flex items-center gap-3",
              isProfessional ? "border-b-2 border-slate-200 pb-1 mb-5 tracking-[0.05em]" : "tracking-[0.1em]"
            )} style={{ color: isProfessional ? '#000' : accentColor }}>
              {!isProfessional && (
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 shadow-sm" style={{ color: accentColor }}>
                  <SectionIcon type="summary" color={accentColor} />
                </span>
              )} 
              <span className="flex-1 pb-1 border-b-2 border-slate-100">PROFESSIONAL SUMMARY</span>
            </h2>
            <p className={cn("text-justify leading-relaxed text-slate-800", isProfessional ? "text-[11.5px]" : "text-[10px]")}>{summary}</p>
          </section>
        );
      
      case 'education':
        return education.length > 0 && (
          <section key="education" className={isProfessional ? "mb-4" : "mb-5"}>
            <h2 className={cn(
              "text-[12px] font-black uppercase mb-4 flex items-center gap-3",
              isProfessional ? "border-b-2 border-slate-200 pb-1 mb-5 tracking-[0.05em]" : "tracking-[0.1em]"
            )} style={{ color: isProfessional ? '#000' : accentColor }}>
              {!isProfessional && (
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 shadow-sm" style={{ color: accentColor }}>
                  <SectionIcon type="education" color={accentColor} />
                </span>
              )} 
              <span className="flex-1 pb-1 border-b-2 border-slate-100">EDUCATION</span>
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className={cn("flex justify-between items-baseline font-bold", isProfessional ? "text-[11px]" : "text-[10px]")}>
                  <span className="text-slate-900">{edu.degree}</span>
                  <span className={cn("text-gray-500", isProfessional ? "font-normal" : "")}>{edu.date}</span>
                </div>
                <div className={cn("text-gray-700", isProfessional ? "text-[11px]" : "text-[10px]")}>{edu.institution}, {edu.location}</div>
                {edu.gpa && <p className={cn("text-gray-700 mt-0.5", isProfessional ? "text-[11px]" : "text-[10px]")}>GPA: {edu.gpa}</p>}
                {edu.details && <p className={cn("text-gray-700 mt-0.5 leading-tight", isProfessional ? "text-[11px]" : "text-[10px]")}>{edu.details}</p>}
              </div>
            ))}
          </section>
        );

      case 'internships':
        return internships.length > 0 && (
          <section key="internships" className={isProfessional ? "mb-4" : "mb-5"}>
            <h2 className={cn(
              "text-[12px] font-black uppercase mb-4 flex items-center gap-3",
              isProfessional ? "border-b-2 border-slate-200 pb-1 mb-5 tracking-[0.05em]" : "tracking-[0.1em]"
            )} style={{ color: isProfessional ? '#000' : accentColor }}>
              {!isProfessional && (
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 shadow-sm" style={{ color: accentColor }}>
                  <SectionIcon type="internships" color={accentColor} />
                </span>
              )} 
              <span className="flex-1 pb-1 border-b-2 border-slate-100">INTERNSHIP EXPERIENCE</span>
            </h2>
            {internships.map((intern, index) => (
              <div key={index} className="mb-3">
                <div className={cn("flex justify-between items-baseline font-bold", isProfessional ? "text-[11px]" : "text-[10px]")}>
                  <span className="text-slate-900">{intern.role} – {intern.company}</span>
                  <span className={cn("text-gray-500", isProfessional ? "font-normal" : "italic")}>{intern.date}</span>
                </div>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-1">
                  {intern.points?.map((point, pIndex) => (
                    <li key={pIndex} className={cn("text-gray-700 leading-relaxed pl-1", isProfessional ? "text-[11px]" : "text-[10px]")}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        );

      case 'experience':
        return experience.length > 0 && (
          <section key="experience" className={isProfessional ? "mb-4" : "mb-5"}>
            <h2 className={cn(
              "text-[12px] font-black uppercase mb-4 flex items-center gap-3",
              isProfessional ? "border-b-2 border-slate-200 pb-1 mb-5 tracking-[0.05em]" : "tracking-[0.1em]"
            )} style={{ color: isProfessional ? '#000' : accentColor }}>
              {!isProfessional && (
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 shadow-sm" style={{ color: accentColor }}>
                  <SectionIcon type="experience" color={accentColor} />
                </span>
              )} 
              <span className="flex-1 pb-1 border-b-2 border-slate-100">WORK EXPERIENCE</span>
            </h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className={cn("flex justify-between items-baseline font-bold", isProfessional ? "text-[11px]" : "text-[10px]")}>
                  <span className="text-slate-900 uppercase tracking-tight">{exp.role}</span>
                  <span className={cn("text-gray-500", isProfessional ? "font-normal" : "italic")}>{exp.date}</span>
                </div>
                <div className={cn("text-gray-700 mb-2", isProfessional ? "text-[11px]" : "text-[10px]")}>{exp.company} | {exp.location}</div>
                <div className="space-y-3">
                  {exp.projects?.map((proj, pIndex) => (
                    <div key={pIndex} className={cn(
                      "ml-1 py-0.5",
                      !isProfessional && "border-l-2 pl-3"
                    )} style={{ borderColor: `${accentColor}20` }}>
                      <div className={cn("flex gap-2 items-center font-bold", isProfessional ? "text-[11px]" : "text-[10px]")}>
                        <span className="text-slate-800">• {proj.name}</span>
                        {proj.type && <span className="text-gray-500 font-normal">({proj.type})</span>}
                      </div>
                      <p className={cn("text-gray-700 mt-1 leading-relaxed ml-3", isProfessional ? "text-[11px]" : "text-[10px]")}>{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        );

      case 'projects':
        return projects.length > 0 && (
          <section key="projects" className={isProfessional ? "mb-4" : "mb-5"}>
            <h2 className={cn(
              "text-[12px] font-black uppercase mb-4 flex items-center gap-3",
              isProfessional ? "border-b-2 border-slate-200 pb-1 mb-5 tracking-[0.05em]" : "tracking-[0.1em]"
            )} style={{ color: isProfessional ? '#000' : accentColor }}>
              {!isProfessional && (
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 shadow-sm" style={{ color: accentColor }}>
                  <SectionIcon type="projects" color={accentColor} />
                </span>
              )} 
              <span className="flex-1 pb-1 border-b-2 border-slate-100">PROJECTS</span>
            </h2>
            {projects.map((proj, index) => (
              <div key={index} className="mb-3">
                <div className={cn("flex justify-between items-baseline font-bold", isProfessional ? "text-[11px]" : "text-[10px]")}>
                  <span className="text-slate-900">{proj.name}</span>
                  <span className={cn("text-gray-500", isProfessional ? "font-normal" : "italic")}>{proj.date}</span>
                </div>
                <p className={cn("text-gray-700 mt-1 leading-relaxed", isProfessional ? "text-[11px]" : "text-[10px]")}>{proj.description}</p>
                {proj.links && (
                  <div className="flex gap-4 mt-2">
                    {proj.links.github && (
                      <a href={proj.links.github} target="_blank" rel="noopener noreferrer" 
                        className="px-2 py-0.5 text-[9px] font-bold transition-all hover:bg-white hover:shadow-sm"
                        style={{ color: accentColor }}
                      >
                        GitHub Repo
                      </a>
                    )}
                    {proj.links.video && (
                      <a href={proj.links.video} target="_blank" rel="noopener noreferrer" 
                        className="px-2 py-0.5  text-[9px] font-bold transition-all hover:bg-white hover:shadow-sm"
                        style={{ color: accentColor }}
                      >
                        Video Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </section>
        );

      case 'skills':
        return (
          <section key="skills" className={isProfessional ? "mb-4" : "mb-5"}>
            <h2 className={cn(
              "text-[12px] font-black uppercase mb-4 flex items-center gap-3",
              isProfessional ? "border-b-2 border-slate-200 pb-1 mb-5 tracking-[0.05em]" : "tracking-[0.1em]"
            )} style={{ color: isProfessional ? '#000' : accentColor }}>
              {!isProfessional && (
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 shadow-sm" style={{ color: accentColor }}>
                  <SectionIcon type="skills" color={accentColor} />
                </span>
              )} 
              <span className="flex-1 pb-1 border-b-2 border-slate-100">SKILLS</span>
            </h2>
            <div className="space-y-1.5">
              {skills.technical.map((skill, index) => (
                <div key={index} className={cn(isProfessional ? "text-[11px]" : "text-[10px]")}>
                  <span className="font-bold text-slate-900">{skill.category}:</span>
                  <span className="text-gray-700 ml-1">{skill.items}</span>
                </div>
              ))}
              
              {(skills.soft_skills?.length > 0 || skills.soft?.length > 0) && (
                <div className={cn(isProfessional ? "text-[11px]" : "text-[10px]")}>
                  <span className="font-bold text-slate-900">Soft Skills:</span>
                  <span className="text-gray-700 ml-1">{(skills.soft_skills || skills.soft)?.join(', ')}</span>
                </div>
              )}

              {skills.languages.length > 0 && (
                <div className={cn(
                  isProfessional ? "text-[11px]" : "text-[10px]",
                  "flex gap-4 mt-2",
                  isProfessional ? "" : "p-2 bg-gray-50 rounded-lg"
                )}>
                   <div className="flex items-center gap-1.5 font-bold text-slate-900">
                     {!isProfessional && <Languages size={12} />} Languages:
                   </div>
                   {skills.languages.map((lang, index) => (
                     <div key={index} className="text-gray-700">
                        {lang.name} <span className="text-gray-500 capitalize">({lang.level})</span>
                     </div>
                   ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'certifications':
        return certifications.length > 0 && (
          <section key="certifications" className={isProfessional ? "mb-4" : "mb-5"}>
            <h2 className={cn(
              "text-[12px] font-black uppercase mb-4 flex items-center gap-3",
              isProfessional ? "border-b-2 border-slate-200 pb-1 mb-5 tracking-[0.05em]" : "tracking-[0.1em]"
            )} style={{ color: isProfessional ? '#000' : accentColor }}>
              {!isProfessional && (
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 shadow-sm" style={{ color: accentColor }}>
                  <SectionIcon type="certifications" color={accentColor} />
                </span>
              )} 
              <span className="flex-1 pb-1 border-b-2 border-slate-100">CERTIFICATIONS</span>
            </h2>
            <div className="grid grid-cols-1 gap-1">
              {certifications.map((cert, index) => (
                <div key={index} className={cn("text-gray-700 flex justify-between", isProfessional ? "text-[11px]" : "text-[10px]")}>
                  <span className="font-medium text-slate-900">• {cert.name}</span>
                  {cert.issuer && <span className="text-gray-500 italic">({cert.issuer})</span>}
                </div>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  const Header = () => {
    if (template === 'professional') {
      return (
        <header className="mb-6 text-center space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{personalInfo.fullName}</h1>
          <p className="text-sm font-semibold text-slate-700">{personalInfo.jobTitle}</p>
          
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] mt-2 text-gray-600">
            {personalInfo.email && <span className="hover:underline cursor-pointer">{personalInfo.email}</span>}
            {(personalInfo.email && personalInfo.phone) && <span className="text-gray-300">|</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {(personalInfo.phone && personalInfo.location) && <span className="text-gray-300">|</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>

          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] mt-1 text-blue-700">
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
            )}
            {(personalInfo.linkedin && personalInfo.github) && <span className="text-gray-300">|</span>}
            {personalInfo.github && (
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
            )}
            {(personalInfo.github && personalInfo.portfolio) && <span className="text-gray-300">|</span>}
            {personalInfo.portfolio && (
              <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className="hover:underline">Portfolio</a>
            )}
          </div>
        </header>
      );
    }

    return (
      <header className={cn(
        "mb-8",
        template === 'classic' ? "text-center" : "text-left border-l-4 pl-6",
        template === 'minimal' && "border-l-0 pl-0 border-b pb-6"
      )} style={{ borderColor: (template !== 'classic' || template === 'minimal') ? accentColor : 'transparent' }}>
        <h1 className={cn(
          "font-black uppercase leading-none",
          template === 'minimal' ? "text-4xl tracking-tight" : "text-3xl tracking-tighter text-slate-900"
        )}>{personalInfo.fullName}</h1>
        <p className="text-sm font-bold mt-2 uppercase tracking-widest" style={{ color: accentColor }}>{personalInfo.jobTitle}</p>
        
        <div className={cn(
          "flex flex-wrap gap-x-6 gap-y-2 text-[10px] mt-4 text-gray-500 font-medium",
          template === 'classic' ? "justify-center" : "justify-start"
        )}>
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:underline transition-all">
              <Mail size={12} style={{ color: accentColor }} /> {personalInfo.email}
            </a>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone size={12} style={{ color: accentColor }} /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={12} style={{ color: accentColor }} /> {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline transition-all">
              <LinkedIn size={12} style={{ color: accentColor }} /> LinkedIn
            </a>
          )}
          {personalInfo.github && (
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline transition-all">
              <Github size={12} style={{ color: accentColor }} /> GitHub
            </a>
          )}
          {personalInfo.portfolio && (
            <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline transition-all">
              <Globe size={12} style={{ color: accentColor }} /> Portfolio
            </a>
          )}
        </div>
      </header>
    );
  };

  return (
    <div 
      ref={ref} 
      className={cn(
        "bg-white text-black p-12 font-sans selection:bg-blue-100 min-h-[1123px] w-[794px] mx-auto shadow-2xl printable-cv transition-all",
        template === 'classic' ? "font-serif" : "font-sans"
      )}
      style={{ fontSize: `${settings?.fontSize || 12.5}px` }}
    >
      <Header />

      {template === 'modern' ? (
        <div className="grid grid-cols-[240px_1fr] gap-10">
          {/* Left Column (Sidebar) */}
          <div className="space-y-4">
             {sectionOrder.filter(s => ['skills', 'education', 'certifications'].includes(s)).map(type => (
               <div key={type} className="p-4 bg-gray-50 rounded-xl mb-4">
                 {renderSection(type)}
               </div>
             ))}
          </div>
          {/* Right Column (Main) */}
          <div className="space-y-4">
             {sectionOrder.filter(s => !['skills', 'education', 'certifications'].includes(s)).map(type => (
               <div key={type} className="mb-6">
                 {renderSection(type)}
               </div>
             ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {sectionOrder.map(type => (
            <div key={type} className="mb-6">
              {renderSection(type)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

CVPreview.displayName = 'CVPreview';

export default React.memo(CVPreview);
