/** Renders a JSON-LD script tag. Server component — no client JS shipped. */
export function JsonLd({ data }: { data: Record<string, unknown> | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      // Structured data is generated server-side from validated content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
