'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import { contactFormSchema, type ContactFormValues } from '@/data/schema';
import { portfolio } from '@/data';
import { isEmailJsConfigured, siteConfig } from '@/lib/site';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', subject: '', message: '', company: '', honeypot: '' },
  });

  async function onSubmit(values: ContactFormValues) {
    // Honeypot: silently accept and drop bot submissions.
    if (values.honeypot) {
      reset();
      return;
    }

    setSubmitting(true);
    try {
      if (isEmailJsConfigured) {
        const emailjs = (await import('@emailjs/browser')).default;
        await emailjs.send(
          siteConfig.emailjs.serviceId,
          siteConfig.emailjs.templateId,
          {
            from_name: values.name,
            from_email: values.email,
            company: values.company ?? '',
            subject: values.subject,
            message: values.message,
            to_name: portfolio.profile.firstName,
          },
          { publicKey: siteConfig.emailjs.publicKey },
        );
        toast.success("Message sent — I'll reply within a day.");
        reset();
        return;
      }

      // No EmailJS credentials configured: log server-side and hand off to mail client.
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const payload = (await response.json()) as { mailto?: string; error?: string };

      if (!response.ok) throw new Error(payload.error ?? 'Request failed');

      if (payload.mailto) {
        window.location.href = payload.mailto;
        toast.info('Opening your email client with the message pre-filled.');
      } else {
        toast.success('Message received.');
      }
      reset();
    } catch {
      toast.error('Something went wrong. Email me directly instead.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot — hidden from humans, irresistible to bots. */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="honeypot">Leave this empty</label>
        <input id="honeypot" tabIndex={-1} autoComplete="off" {...register('honeypot')} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Ada Lovelace"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
          {errors.name ? (
            <p id="name-error" role="alert" className="text-xs text-rose">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          {errors.email ? (
            <p id="email-error" role="alert" className="text-xs text-rose">
              {errors.email.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company">Company / Team</Label>
          <Input
            id="company"
            autoComplete="organization"
            placeholder="Optional"
            {...register('company')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject *</Label>
          <Input
            id="subject"
            placeholder="AI/ML Engineer role"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            {...register('subject')}
          />
          {errors.subject ? (
            <p id="subject-error" role="alert" className="text-xs text-rose">
              {errors.subject.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          rows={7}
          placeholder="What are you building, and where could I help?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
        />
        {errors.message ? (
          <p id="message-error" role="alert" className="text-xs text-rose">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send message <Send className="size-4" />
            </>
          )}
        </Button>
        <p className="text-xs text-subtle">{portfolio.contact.responseTime}</p>
      </div>
    </form>
  );
}
