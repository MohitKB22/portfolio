import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/data/schema';
import { portfolio } from '@/data';

/**
 * Fallback contact endpoint used when EmailJS credentials are not configured.
 * It validates the payload server-side and returns a pre-filled `mailto:` URL,
 * so the form never silently drops a message. No data is persisted.
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed.', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { name, email, subject, message, company, honeypot } = parsed.data;

  // Accept-and-drop for bot submissions.
  if (honeypot) return NextResponse.json({ ok: true });

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    '',
    message,
  ].filter(Boolean);

  const mailto = `mailto:${portfolio.profile.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(lines.join('\n'))}`;

  return NextResponse.json({ ok: true, mailto });
}

export function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
