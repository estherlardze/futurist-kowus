const stats = [
  { label: "Years of Advocacy", value: "30+" },
  { label: "Books Published", value: "3" },
  { label: "Publications & Articles", value: "30+" },
  { label: "Awards & Recognitions", value: "5+" },
];

export function Impact() {
  return (
    <section className="bg-navy-900 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-500">Impact in Numbers</p>
          <h2 className="font-serif text-4xl font-bold text-white">Decades of Purposeful Work</h2>
        </div>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <div className="font-serif text-5xl font-bold text-gold-500 md:text-7xl">{s.value}</div>
              <div className="text-sm font-semibold uppercase tracking-widest text-white/60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
