// Resume data for Yoganand S — extracted from PDF
// Used across all jazz lounge sections

export const resumeData = {
  name: "Yoganand S",
  phone: "+91 7676243109",
  email: "yoganand169@gmail.com",
  github: "https://github.com/Yoganand212",
  githubHandle: "Yoganand212",

  education: [
    {
      school: "Amrita Vishwa Vidyapeetham",
      location: "Coimbatore",
      degree: "B.Tech in Computer Science and Engineering",
      cgpa: "7.28",
      period: "2023 – 2027",
    },
  ],

  experience: [
    {
      company: "Bharat Heavy Electricals Limited (BHEL)",
      location: "Bengaluru",
      role: "Project Intern",
      period: "May 2026 – Jun 2026",
      certificate: "/certificates/BHEL-Internship.pdf",
      // Jazz club metaphor
      jazzTitle: "The Main Set",
      setTime: "Set I · 9:30 PM",
      highlights: [
        "Developed a full-stack AI-powered Invoice OCR system using Next.js, FastAPI, EasyOCR, and PostgreSQL",
        "Designed OCR pipelines with image preprocessing and built a dashboard for invoice management",
      ],
    },
    {
      company: "Infosys Springboard",
      location: "Remote",
      role: "Project Intern",
      period: "Oct 2025 – Dec 2025",
      certificate: "/certificates/Infosys-Internship.pdf",
      jazzTitle: "The Opening Act",
      setTime: "Set II · 10:15 PM",
      highlights: [
        "Developed automated PCB defect detection using deep learning and computer vision",
        "Achieved 97% classification accuracy using EfficientNet-B4 with real-time Streamlit interface",
      ],
    },
    {
      company: "Loginware Softtec Pvt. Ltd.",
      location: "Bengaluru",
      role: "Intern",
      period: "May 2025 – Jun 2025",
      certificate: "/certificates/Loginware_Internship.pdf",
      jazzTitle: "The First Gig",
      setTime: "Set III · 11:00 PM",
      highlights: [
        "Worked with Raspberry Pi, embedded systems, PCB assembly, and sensor interfacing",
        "Hardware testing, circuit debugging for IoT applications",
      ],
    },
  ],

  projects: [
    {
      name: "Circuit Guard",
      tech: ["PyTorch", "OpenCV", "Streamlit", "EfficientNet-B4"],
      // Jazz club metaphor
      performanceTitle: "Automated Defect Detection",
      description:
        "A PCB defect detection system that sees what the human eye misses.",
      highlights: [
        "Trained EfficientNet-B4 achieving >97% classification accuracy",
        "Built full-stack web app with real-time defect visualization",
        "OpenCV-based image subtraction for precise defect localization",
      ],
      github: "https://github.com/Yoganand212/PCB-Defect-Detection-and-Classifincation-",
      demo: null,
    },
    {
      name: "Invoice OCR & Data Extraction",
      tech: ["Next.js", "FastAPI", "EasyOCR", "PostgreSQL"],
      performanceTitle: "Invoice OCR Pipeline",
      description:
        "An AI system that turns paper invoices into structured digital data.",
      highlights: [
        "Automated invoice digitization with structured data extraction",
        "FastAPI OCR pipeline with image preprocessing",
        "Interactive Next.js dashboard with PostgreSQL integration",
      ],
      github: "https://github.com/Yoganand212/Invoice-OCR-Generator",
      demo: null,
    },
    {
      name: "Surgical Instrument Recognition",
      tech: ["YOLOv12", "Python", "Computer Vision"],
      performanceTitle: "Surgical Instrument Tracking",
      description:
        "Real-time surgical instrument recognition for the operating theatre.",
      highlights: [
        "Created 1.5K+ image dataset with 23+ instrument classes",
        "YOLOv12 model achieving 83% accuracy",
        "Research paper accepted at FACEIT 2026, NIT Warangal",
      ],
      github: "https://github.com/Yoganand212",
      demo: null,
    },
  ],

  // Skills mapped to jazz instruments
  skills: [
    {
      instrument: "Piano",
      instrumentEmoji: "🎹",
      category: "Frontend",
      items: ["React.js", "Next.js", "HTML/CSS", "JavaScript", "Tailwind"],
      description: "The keys that shape every interface.",
    },
    {
      instrument: "Saxophone",
      instrumentEmoji: "🎷",
      category: "Machine Learning",
      items: ["PyTorch", "TensorFlow", "OpenCV", "YOLOv12", "EfficientNet"],
      description: "The soulful core of intelligent systems.",
    },
    {
      instrument: "Trumpet",
      instrumentEmoji: "🎺",
      category: "Languages",
      items: ["Python", "C++/C", "Java", "Julia", "SQL"],
      description: "Every note precisely placed.",
    },
    {
      instrument: "Double Bass",
      instrumentEmoji: "🎻",
      category: "Backend",
      items: ["Node.js", "FastAPI", "PostgreSQL", "REST APIs"],
      description: "The deep rhythm underneath it all.",
    },
    {
      instrument: "Drums",
      instrumentEmoji: "🥁",
      category: "DevOps & Tools",
      items: ["Linux", "Docker", "Git", "AWS", "Azure"],
      description: "Keeping everything in time.",
    },
  ],

  certifications: [
    {
      name: "AWS Cloud Engineer",
      description:
        "Proficient in AWS architecture, networking, security, and cloud infrastructure.",
    },
    {
      name: "Cisco Networking — KGTTI",
      description:
        "Skilled in Cisco networking fundamentals, routing protocols, and security.",
    },
  ],

  achievements: [
    {
      title: "Research Paper — FACEIT 2026",
      description:
        "Co-authored paper on surgical instrument recognition, accepted at the International Conference on Frontiers in Advanced Computing and Emerging Intelligent Technologies, NIT Warangal.",
      icon: "📄",
    },
    {
      title: "97% Accuracy — Circuit Guard",
      description:
        "Achieved >97% classification accuracy on PCB defect detection using EfficientNet-B4.",
      icon: "🎯",
    },
    {
      title: "BHEL Project Completion",
      description:
        "Successfully delivered an end-to-end AI-powered Invoice OCR system during the BHEL internship.",
      icon: "🏗️",
    },
  ],
} as const;

export type ResumeData = typeof resumeData;
