import { z } from 'zod';

/* -------------------------------------------------------------------------- *
 *  Zod schemas — the contract every piece of portfolio content obeys.
 *  Content is validated at module load, so a malformed JSON edit fails the
 *  build instead of silently rendering an empty section in production.
 * -------------------------------------------------------------------------- */

export const availabilitySchema = z.object({
  status: z.enum(['available', 'open', 'unavailable']),
  label: z.string(),
  detail: z.string(),
});

export const profileSchema = z.object({
  name: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  initials: z.string(),
  title: z.string(),
  titles: z.array(z.string()).min(1),
  typingPhrases: z.array(z.string()).min(1),
  tagline: z.string(),
  headline: z.string(),
  headlineAccent: z.string(),
  summary: z.string(),
  longSummary: z.string(),
  avatar: z.string().min(1),
  avatarLocal: z.string(),
  location: z.string(),
  timezone: z.string(),
  email: z.string().email(),
  phone: z.string(),
  availability: availabilitySchema,
  resumePath: z.string(),
  pronouns: z.string(),
  languages: z.array(z.string()),
});

export const statSchema = z.object({
  label: z.string(),
  value: z.number(),
  suffix: z.string(),
  icon: z.string(),
});

export const socialSchema = z.object({
  name: z.string(),
  url: z.string(),
  icon: z.string(),
  handle: z.string(),
  primary: z.boolean(),
});

export const navItemSchema = z.object({ label: z.string(), href: z.string() });

export const experienceSchema = z.object({
  id: z.string(),
  role: z.string(),
  company: z.string(),
  companyUrl: z.string().url().nullable(),
  logoText: z.string(),
  location: z.string(),
  type: z.string(),
  start: z.string(),
  end: z.string().nullable(),
  current: z.boolean(),
  summary: z.string(),
  highlights: z.array(z.string()).min(1),
  stack: z.array(z.string()),
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string(),
  degree: z.string(),
  field: z.string(),
  location: z.string(),
  start: z.string(),
  end: z.string(),
  score: z.string().nullable(),
  scoreLabel: z.string().nullable(),
  logoText: z.string(),
  highlights: z.array(z.string()),
});

export const skillSchema = z.object({ name: z.string(), level: z.number().min(0).max(100) });

export const skillGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  description: z.string(),
  skills: z.array(skillSchema).min(1),
});

export const aiStackSchema = z.object({
  name: z.string(),
  category: z.string(),
  description: z.string(),
});

export const techStackSchema = z.object({ name: z.string(), icon: z.string() });

export const achievementSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  metric: z.string(),
  href: z.string().url().nullable(),
  year: z.string(),
});

export const certificationSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  platform: z.string(),
  year: z.string(),
  url: z.string().url(),
  skills: z.array(z.string()),
});

export const interestSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
});

export const timelineSchema = z.object({
  year: z.string(),
  title: z.string(),
  description: z.string(),
  type: z.enum(['education', 'work', 'milestone']),
});

export const portfolioSchema = z.object({
  profile: profileSchema,
  stats: z.array(statSchema),
  social: z.array(socialSchema),
  navigation: z.array(navItemSchema),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skillGroups: z.array(skillGroupSchema),
  aiStack: z.array(aiStackSchema),
  techStack: z.array(techStackSchema),
  achievements: z.array(achievementSchema),
  certifications: z.array(certificationSchema),
  interests: z.array(interestSchema),
  timeline: z.array(timelineSchema),
  contact: z.object({
    heading: z.string(),
    subheading: z.string(),
    responseTime: z.string(),
    topics: z.array(z.string()),
  }),
  seo: z.object({
    siteName: z.string(),
    defaultTitle: z.string(),
    titleTemplate: z.string(),
    description: z.string(),
    keywords: z.array(z.string()),
    locale: z.string(),
    twitterHandle: z.string(),
  }),
});

export const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  tagline: z.string(),
  category: z.string(),
  featured: z.boolean(),
  year: z.string(),
  status: z.enum(['active', 'archived', 'wip']),
  repo: z.string(),
  github: z.string().url(),
  demo: z.string().url().nullable(),
  stars: z.number(),
  accent: z.string(),
  description: z.string(),
  problem: z.string(),
  approach: z.string(),
  features: z.array(z.string()).min(1),
  architecture: z.array(z.object({ layer: z.string(), detail: z.string() })),
  stack: z.array(z.string()).min(1),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })),
});

export const projectsSchema = z.object({ projects: z.array(projectSchema).min(1) });

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Please enter at least 2 characters.').max(80),
  email: z.string().email('Please enter a valid email address.'),
  subject: z.string().min(3, 'Please add a short subject.').max(120),
  message: z.string().min(20, 'Tell me a little more — at least 20 characters.').max(4000),
  company: z.string().max(120).optional(),
  honeypot: z.string().max(0, 'Bot detected.').optional(),
});

export type Profile = z.infer<typeof profileSchema>;
export type Stat = z.infer<typeof statSchema>;
export type Social = z.infer<typeof socialSchema>;
export type NavItem = z.infer<typeof navItemSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type AiStackItem = z.infer<typeof aiStackSchema>;
export type TechStackItem = z.infer<typeof techStackSchema>;
export type Achievement = z.infer<typeof achievementSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Interest = z.infer<typeof interestSchema>;
export type TimelineEntry = z.infer<typeof timelineSchema>;
export type Portfolio = z.infer<typeof portfolioSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;
