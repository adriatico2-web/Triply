'use client';
import { useEffect, useState } from 'react';

export default function StaysPage(){
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');

  useEffect(()=>{
    fetch('/api/listings').then(r=>r.json()).then(setItems);
  },[]);

  const filtered = items.filter(x => x.title.toLowerCase().includes(q.toLowerCase()) || (x.address||'').toLowerCase().includes(q.toLowerCase()));

  return (
    <main className="space-y-4">
      <div className="card">
        <label className="label">Cerca</label>
        <input className="input w-full" placeholder="Città, titolo, indirizzo" value={q} onChange={e=>setQ(e.target.value)} />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {filtered.map(l => (
          <div key={l.id} className="card">
            <div className="text-sm text-gray-500">ID {l.id.slice(0,6)}…</div>
            <div className="font-semibold">{l.title}</div>
            <div className="text-sm">{l.address}</div>
            <div className="mt-2 text-lg font-bold">€{l.basePrice} <span className="text-sm font-normal text-gray-600">/ notte</span></div>
            <button className="btn btn-primary mt-2" onClick={async ()=>{
              const body = { listingId: l.id, checkin: new Date().toISOString(), checkout: new Date(Date.now()+3*86400000).toISOString(), total: l.basePrice*3 };
              const r = await fetch('/api/bookings', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
              const data = await r.json();
              alert('Booking creato (mock). ' + (data.clientSecret ? 'PaymentIntent creato.' : 'Stripe non configurato.'));
            }}>Prenota</button>
          </div>
        ))}
      </div>
    </main>
  )
}
