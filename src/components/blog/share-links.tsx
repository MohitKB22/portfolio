'use client';

import { Link2 } from 'lucide-react';
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { toast } from 'sonner';

export function ShareLinks({ title, url }: { title: string; url: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      name: 'Share on X',
      href: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: FaXTwitter,
    },
    {
      name: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: FaLinkedin,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied');
    } catch {
      toast.error('Could not access the clipboard');
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-subtle">Share</span>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={link.name}
          className="grid size-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-brand/45 hover:text-ink"
        >
          <link.icon className="size-3.5" aria-hidden />
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className="grid size-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-brand/45 hover:text-ink"
      >
        <Link2 className="size-3.5" aria-hidden />
      </button>
    </div>
  );
}
