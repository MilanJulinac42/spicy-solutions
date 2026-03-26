export interface Stat {
  key: string;
}

export interface Capability {
  key: string;
  icon: "rocket" | "shield" | "zap" | "users" | "globe" | "brain";
}

export interface SkillCategory {
  key: string;
  skills: string[];
}

export interface TeamMember {
  id: string;
  photo: string;
  skillCategories: SkillCategory[];
  stats: Stat[];
  capabilities: Capability[];
  github?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "member1",
    photo: "/team/milan.jpg",
    github: "https://github.com/MilanJulinac42",
    linkedin: "https://www.linkedin.com/in/milanjulinac/",
    instagram: "https://www.instagram.com/milanjulinac/",
    facebook: "https://www.facebook.com/milan.julinac.9",
    stats: [
      { key: "years" },
      { key: "projects" },
    ],
    capabilities: [
      { key: "webapps", icon: "rocket" },
      { key: "ecommerce", icon: "globe" },
      { key: "ai", icon: "brain" },
      { key: "leadership", icon: "users" },
      { key: "performance", icon: "zap" },
      { key: "reliability", icon: "shield" },
    ],
    skillCategories: [
      {
        key: "frontend",
        skills: ["React", "Next.js", "SvelteKit", "TypeScript", "Tailwind CSS"],
      },
      {
        key: "backend",
        skills: ["Node.js", "Nest.js", "Express", "GraphQL", "REST"],
      },
      {
        key: "cloud",
        skills: ["GCP", "AWS", "Docker", "CI/CD", "GitHub Actions"],
      },
      {
        key: "database",
        skills: ["PostgreSQL", "MongoDB"],
      },
    ],
  },
  {
    id: "member2",
    photo: "/team/dragan.jpg",
    stats: [],
    capabilities: [],
    skillCategories: [],
  },
];
