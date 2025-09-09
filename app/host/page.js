'use client';
import { useState } from 'react';

export default function HostPage(){
  const [form, setForm] = useState({ title:'', description:'', address:'', basePrice:100, minStay:2, beds:2 });
  const [saving, setSaving] = useState(false);
  const [created, setCreated] = useState(null);

  const valid = form.title && form.address && form.basePrice >= 20;

  async function submit(){
    setSaving(true);
    try{
      const res = await fetch('/api/listings', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
      const data = await res.json();
      setCreated(data);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="grid md:grid-cols-2 gap-4">
      <div className="card space-y-2">
        <h2 className="font-semibold">Crea annuncio (bozza)</h2>
        <div>
          <label className="label">Titolo</label>
          <input className="input w-full" value={form.title} onChange={e=>setForm(f=>({...f, title:e.target.value}))} placeholder="Bilocale vista mare — Ceriale" />
        </div>
        <div>
          <label className="label">Descrizione</label>
          <textarea className="input w-full" rows={4} value={form.description} onChange={e=>setForm(f=>({...f, description:e.target.value}))} />
        </div>
        <div>
          <label className="label">Indirizzo</label>
          <input className="input w-full" value={form.address} onChange={e=>setForm(f=>({...f, address:e.target.value}))} placeholder="Via, città" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div><label className="label">Prezzo/notte (€)</label><input type="number" className="input w-full" value={form.basePrice} onChange={e=>setForm(f=>({...f, basePrice:+e.target.value||0}))} /></div>
          <div><label className="label">Min. notti</label><input type="number" className="input w-full" value={form.minStay} onChange={e=>setForm(f=>({...f, minStay:+e.target.value||1}))} /></div>
          <div><label className="label">Posti letto</label><input type="number" className="input w-full" value={form.beds} onChange={e=>setForm(f=>({...f, beds:+e.target.value||1}))} /></div>
        </div>
        <button disabled={!valid||saving} onClick={submit} className="btn btn-primary">{saving?'Salvo…':'Salva bozza'}</button>
      </div>

      <div className="card">
        <h2 className="font-semibold mb-2">Anteprima</h2>
        <div className="font-semibold">{form.title || 'Titolo annuncio'}</div>
        <div className="text-sm text-gray-600">{form.address || 'Indirizzo'}</div>
        <div className="mt-2 text-lg font-bold">€{form.basePrice} <span className="text-sm font-normal text-gray-600">/ notte</span></div>
        {created && <div className="mt-4 p-3 rounded-xl bg-green-50 text-green-800 border border-green-200">Creato ✅ ID: {created.id}</div>}
      </div>
    </main>
  );
}
