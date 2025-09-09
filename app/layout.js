import "./globals.css";

export const metadata = { title: "Triply Starter", description: "Soggiorni + Host + API" };

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <div className="container">
          <header className="flex items-center justify-between mb-6 text-white">
            <h1 className="text-2xl font-extrabold">Triply</h1>
            <nav className="flex gap-3">
              <a className="underline" href="/">Home</a>
              <a className="underline" href="/stays">Soggiorni</a>
              <a className="underline" href="/host">Ospita</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
