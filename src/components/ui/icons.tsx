import {
  Braces,
  BrainCircuit,
  CalendarDays,
  Cloud,
  Code2,
  Database,
  Flag,
  FolderGit2,
  Gauge,
  Github,
  Layers,
  Mail,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Trophy,
  TrendingUp,
  Users,
  Workflow,
  GitBranch,
  type LucideIcon,
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import {
  SiDocker,
  SiFastapi,
  SiGit,
  SiLangchain,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiRedis,
  SiStreamlit,
  SiTensorflow,
  SiHuggingface,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

/**
 * Explicit icon maps. Content JSON references icons by name; resolving them
 * through a static map keeps the bundle tree-shakeable (no dynamic imports).
 */
export const lucideIcons: Record<string, LucideIcon> = {
  Braces,
  BrainCircuit,
  CalendarDays,
  Cloud,
  Code2,
  Database,
  Flag,
  FolderGit2,
  Gauge,
  Github,
  GitBranch,
  Layers,
  Mail,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Trophy,
  TrendingUp,
  Users,
  Workflow,
};

export const brandIcons: Record<string, IconType> = {
  SiDocker,
  SiFastapi,
  SiGit,
  SiLangchain,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiRedis,
  SiStreamlit,
  SiTensorflow,
  SiHuggingface,
};

export const socialIcons: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  leetcode: SiLeetcode,
  twitter: FaXTwitter,
};

export function LucideByName({
  name,
  className,
  fallback = Sparkles,
}: {
  name: string;
  className?: string;
  fallback?: LucideIcon;
}) {
  const Icon = lucideIcons[name] ?? fallback;
  return <Icon className={className} aria-hidden />;
}

export function BrandByName({ name, className }: { name: string; className?: string }) {
  const Icon = brandIcons[name] ?? SiPython;
  return <Icon className={className} aria-hidden />;
}

export function SocialByName({ name, className }: { name: string; className?: string }) {
  const Icon = socialIcons[name] ?? FaGithub;
  return <Icon className={className} aria-hidden />;
}

export { Mail };
