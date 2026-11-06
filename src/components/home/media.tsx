const items = ["CNN", "BBC", "Wacam", "International Transport Workers' Federation", "Ghana TUC", "PURC"];

export function Media() {
  return (
    <section className="overflow-hidden bg-gold-100 py-5">
      <div className="flex w-max animate-marquee items-center">
        {[...items, ...items].map((name, i) => (
          <div
            key={i}
            className="flex items-center whitespace-nowrap font-serif text-4xl font-bold tracking-tight text-navy-900 opacity-60 grayscale transition-all duration-700 hover:opacity-100 hover:grayscale-0"
          >
            <span>{name}</span>
            <span aria-hidden className="mx-12 h-3 w-3 shrink-0 rounded-full bg-current" />
          </div>
        ))}
      </div>
    </section>
  );
}
