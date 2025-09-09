export default function Page(){
  return (
    <main className="grid md:grid-cols-3 gap-4">
      <div className="card"><h2 className="font-semibold mb-2">Benvenuto</h2><p>Prototype Next.js con API e DB locale (SQLite via Prisma).</p></div>
      <div className="card"><h2 className="font-semibold mb-2">Soggiorni</h2><p>Vai su <a className="underline" href="/stays">/stays</a> per vedere gli annunci.</p></div>
      <div className="card"><h2 className="font-semibold mb-2">Ospita</h2><p>Vai su <a className="underline" href="/host">/host</a> per creare una bozza di annuncio.</p></div>
    </main>
  );
}
