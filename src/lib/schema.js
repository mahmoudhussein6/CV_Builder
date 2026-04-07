import { z } from 'zod';

export const cvSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(1, 'Name is required'),
    jobTitle: z.string().min(1, 'Job title is required'),
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    phone: z.string().min(1, 'Phone is required'),
    location: z.string().min(1, 'Location is required'),
    linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
    github: z.string().url('Invalid URL').optional().or(z.literal('')),
    portfolio: z.string().url('Invalid URL').optional().or(z.literal('')),
  }),
  summary: z.string().min(1, 'Summary is required'),
  education: z.array(z.object({
    degree: z.string().min(1, 'Degree is required'),
    institution: z.string().min(1, 'Institution is required'),
    location: z.string().min(1, 'Location is required'),
    date: z.string().min(1, 'Date is required'),
    gpa: z.string().optional(),
    details: z.string().optional(),
  })),
  internships: z.array(z.object({
    role: z.string().min(1, 'Role is required'),
    company: z.string().min(1, 'Company is required'),
    date: z.string().min(1, 'Date is required'),
    points: z.array(z.string()).min(1, 'At least one point is required'),
  })),
  experience: z.array(z.object({
    role: z.string().min(1, 'Role is required'),
    company: z.string().min(1, 'Company is required'),
    location: z.string().min(1, 'Location is required'),
    date: z.string().min(1, 'Date is required'),
    projects: z.array(z.object({
      name: z.string().min(1, 'Project name is required'),
      type: z.string().optional(),
      links: z.object({
        github: z.string().optional(),
        video: z.string().optional(),
        live: z.string().optional(),
      }),
      description: z.string().min(1, 'Description is required'),
    })),
  })),
  projects: z.array(z.object({
    name: z.string().min(1, 'Project name is required'),
    date: z.string().min(1, 'Date is required'),
    description: z.string().min(1, 'Description is required'),
    links: z.object({
      github: z.string().optional(),
      video: z.string().optional(),
      live: z.string().optional(),
    }),
  })),
  skills: z.object({
    technical: z.array(z.object({
      category: z.string().min(1, 'Category is required'),
      items: z.string().min(1, 'Items are required'),
    })),
    soft: z.array(z.string()).min(1, 'At least one soft skill is required'),
    soft_text: z.string().optional(),
    languages: z.array(z.object({
      name: z.string().min(1, 'Language name is required'),
      level: z.string().min(1, 'Level is required'),
    })),
  }),
  certifications: z.array(z.object({
    name: z.string().min(1, 'Certification name is required'),
    issuer: z.string().optional(),
    year: z.string().optional(),
  })),
  settings: z.object({
    template: z.enum(['classic', 'modern', 'minimal', 'professional']).default('classic'),
    accentColor: z.string().default('#2563eb'),
    spacing: z.number().min(0).max(10).default(5),
    fontSize: z.number().min(8).max(14).default(11),
    sectionOrder: z.array(z.string()).default([
      'summary', 'education', 'internships', 'experience', 'projects', 'skills', 'certifications'
    ]),
  }),
});

export const initialData = {
  personalInfo: {
    fullName: 'Mahmoud Hussein Kamal',
    jobTitle: 'Front-end Developer | React | Angular | JavaScript | UI/UX',
    email: 'kottpkamal@gmail.com',
    phone: '+20 128 884 5234',
    location: 'Cairo, Egypt',
    linkedin: 'https://www.linkedin.com/in/mahmoud-hussein-0bb055242',
    github: 'https://github.com/mahmoudhussein6',
    portfolio: 'https://my-portifolio-ylf4.vercel.app/',
  },
  summary: 'Frontend Developer with hands-on experience building scalable, responsive web and mobile applications using React, Angular, and modern JavaScript frameworks. Skilled in API integration, state management, and cross-platform development with React Native. Strong UI/UX background with experience in agile team environments. Passionate about delivering high-performance, user-centric digital solutions.',
  education: [
    {
      degree: 'Bachelor of Computer and Information',
      institution: 'Faculty of Computer and Artificial Intelligence, Beni-Suef University',
      location: 'Beni-Suef, Egypt',
      date: 'Jul 2023',
      gpa: '3.6 (Excellent)',
      details: 'Graduation Project: Excellent (A+)',
    }
  ],
  internships: [
    {
      role: 'Frontend Developer & Cross Platform Mobile Development Intern',
      company: 'ITI',
      date: 'Feb 2025 – July 2025',
      points: [
        'Completed intensive training in HTML, CSS, JavaScript, Typescript, and modern frameworks like React.js and Angular.',
        'Learned Cross Platform Mobile Development using Flutter and React Native.',
        'Built real-world projects simulating industry practices, applying API integration, Firebase, and state management.',
        'Participated in team-based development following agile methodologies and Git version control.',
        'Improved UI/UX design principles, component reusability, and performance optimization.',
      ]
    }
  ],
  experience: [
    {
      role: 'Freelance Frontend Developer',
      company: 'Self-employed',
      location: 'Cairo, Egypt',
      date: 'Nov 2022 – Present',
      projects: [
        {
          name: 'Note Application (React)',
          type: 'Real-time CRUD app with API integration',
          links: { github: '#', video: '#' },
          description: 'Built secure authentication systems with JWT, React Router, and Firebase.',
        },
        {
          name: 'MovieEg Website',
          type: 'Corporate website with animations and responsive design',
          links: { live: '#' },
          description: 'Tech-seeds learning Platform: Learning platform with modern UI and multi-page navigation.',
        }
      ]
    },
    {
      role: 'Freelance UI/UX Developer',
      company: 'Self-employed',
      location: 'Cairo, Egypt',
      date: 'Feb 2023 – Present',
      projects: [
        {
          name: 'FeL7za',
          type: 'Mobile Application',
          links: { github: '#', video: '#' },
          description: 'Built secure authentication systems with JWT, React Router, and Firebase.',
        },
        {
          name: 'Medicine Website',
          type: 'Website',
          links: { live: '#' },
          description: 'Tech-seeds learning Platform: Learning platform with modern UI and multi-page navigation.',
        }
      ]
    }
  ],
  projects: [
    {
      name: 'Handmade E-Commerce Website',
      date: 'June 2025 – July 2025',
      description: 'Full-stack platform connecting customers and vendors for handcrafted products. Features include real-time admin control and vendor management.',
      links: { video: 'https://www.linkedin.com/posts/mahmoud-hussein-0bb055242_graduationproject-reactjs-firebase-activity-7355932378105602048-Ocqk?utm_source=share&utm_medium=member_desktop&rcm=ACoAADwp108BQ3qGUZG-G2cUIIkoBXGE6x2CfFc', 
        github:"https://github.com/Mahmoudhussein6/HandMade_Website_GraduationProject"
      },
    },
    {
      name: 'Smart Assistant Glasses (SAG)',
      date: 'Graduation Project (Sep 2022 – May 2023)',
      description: 'A smart glasses system that assists visually impaired individuals by providing real-time audio feedback about their surroundings using AI and computer visionAccessibility-focused system with website & dashboard for product orders and analytics. Built with Angular, TS, and Bootstrap.',
      links: { video: 'https://www.linkedin.com/posts/mahmoud-hussein-0bb055242_sag-smartassistantglasses-aiforaccessibility-activity-7085287650022035457-ZIgo?utm_source=share&utm_medium=member_desktop&rcm=ACoAADwp108BQ3qGUZG-G2cUIIkoBXGE6x2CfFc', 
        github:"https://github.com/Mahmoudhussein6/SmartAssistantGlassesCode"
      },
    },
    {
      name: 'Fresh Cart',
      date: '(May 2022)',
      description: 'E-commerce website using React, TailwindCSS, and JWT Auth with protected routes. Integrated React Query for caching and Context API for state management',
      links: { video: 'https://www.linkedin.com/posts/mahmoud-hussein-0bb055242_graduationproject-reactjs-firebase-activity-7355932378105602048-Ocqk?utm_source=share&utm_medium=member_desktop&rcm=ACoAADwp108BQ3qGUZG-G2cUIIkoBXGE6x2CfFc', 
        github:"https://github.com/Mahmoudhussein6/FreshCart"
      },
    },
    {
      name: 'Vanilla JS E-Commerce Application',
      date: 'April 2025',
      description: 'Built with HTML, CSS, and JavaScript featuring separate Admin/User roles, API integration, and persistent cart via local Storage.',
      links: { video: 'https://www.linkedin.com/posts/mahmoud-hussein-0bb055242_javascript-ecommerce-webdevelopment-activity-7328769466958266368-kM1z?utm_source=share&utm_medium=member_desktop&rcm=ACoAADwp108BQ3qGUZG-G2cUIIkoBXGE6x2CfFc', 
        github:"https://github.com/Mahmoudhussein6/E-commerce_Appliction"
      },
    },
    {
      name: 'The Movie Application',
      date: 'May 2025',
      description: 'Angular 17-based web app integrating TMDb API for real-time movie data, user authentication, and personalized browsing',
      links: { video: 'https://www.linkedin.com/posts/mahmoud-hussein-0bb055242_angular-iti-authentication-activity-7327341383776661505-cugd?utm_source=share&utm_medium=member_desktop&rcm=ACoAADwp108BQ3qGUZG-G2cUIIkoBXGE6x2CfFc', 
        github:"https://github.com/Mahmoudhussein6/Movie_Application"
      },
    },
     {
      name: 'Personal Website',
      date: 'July 2024',
      description: 'Responsive portfolio showcasing projects & skills with smooth navigation and interactive UI.',
      links: { video: 'https://www.linkedin.com/posts/mahmoud-hussein-0bb055242_my-portfolio-website-using-html-css-activity-7296826500958314497-cUqf?utm_source=share&utm_medium=member_desktop&rcm=ACoAADwp108BQ3qGUZG-G2cUIIkoBXGE6x2CfFc', 
        github:"https://github.com/Mahmoudhussein6/My_Portifolio"
      },
    }
  ],
  skills: {
    technical: [
      { category: 'Languages & Web', items: 'HTML5, CSS3, JavaScript, Typescript, OOP, jQuery, SCSS, Dart.' },
      { category: 'Frameworks & Libraries', items: 'React, Angular, Next.js, Redux Toolkit, Context API, React Query.' },
      { category: 'Mobile & Cross-Platform', items: 'Flutter, React Native.' },
      { category: 'Backend & APIs', items: 'Firebase, FastAPI, Flask, Django, RESTful APIs.' },
      { category: 'Other Tools', items: 'Git/Github, JWT Auth, TailwindCSS, Bootstrap, Stripe Integration' },
      { category: 'UI UX Tools', items: 'Figma, Adobe XD' },
    ],
    soft_skills: [
      'Effective collaboration and communication with cross-functional teams.',
      'Proven ability to resolve complex challenges efficiently.',
      'High emotional intelligence for team dynamics',
      'Strong leadership skills, with experience mentoring teams to achieve project goals.',
    ],
    languages: [
      { name: 'Arabic', level: 'Native' },
      { name: 'English', level: 'Conversational' },
    ],
  },
  certifications: [
    { name: 'React – The Complete Guide (Udemy, 2025)' },
    { name: 'Database Management (Maharatech)' },
    { name: 'HackerRank Certifications: JavaScript, React, SQL' },
    { name: 'Frontend Developer (Route)' },
  ],
  settings: {
    template: 'classic',
    accentColor: '#2563eb',
    spacing: 5,
    fontSize: 11,
    sectionOrder: ['summary', 'education', 'internships', 'experience', 'projects', 'skills', 'certifications'],
  },
};
