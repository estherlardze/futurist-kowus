export function SectionHeading({
  eyebrow,
  title,
  highlight,
  text,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  highlight: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-16 space-y-4 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
          <div className="h-2 w-2 rounded-full bg-gold-500" />
          <span className="text-sm font-bold uppercase tracking-widest text-navy-900">{eyebrow}</span>
        </div>
      )}
      <h2 className="font-serif text-4xl text-navy-900 md:text-5xl">
        {title} <span className="text-gold-600">{highlight}</span>
      </h2>
      {text && <p className={`text-ink-muted ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{text}</p>}
    </div>
  );
}
