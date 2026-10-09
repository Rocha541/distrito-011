import { siteConfig } from './config/site'
import type { ReactNode } from 'react'

function Link({ href, children }: { href: string; children: ReactNode }) {
  return <a className="rounded-full bg-brand px-5 py-3 font-semibold text-white hover:bg-ink" href={href} target="_blank" rel="noreferrer">{children}</a>
}

export default function App() {
  return <div className="min-h-screen bg-paper text-ink">
    <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6"><strong>Distrito 011</strong><Link href={siteConfig.bookingUrl}>Agendar corte</Link></header>
    <main>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-2"><div><p className="font-semibold text-brand">BARBEARIA • SÃO PAULO</p><h1 className="mt-4 text-5xl font-black sm:text-7xl">Seu estilo.<br />Seu distrito.</h1><p className="mt-6 max-w-lg text-lg">Cortes precisos, atendimento de verdade e um espaço feito para você sair melhor do que entrou.</p><div className="mt-8 flex flex-wrap gap-4"><Link href={siteConfig.bookingUrl}>Agendar corte</Link><Link href={siteConfig.whatsappUrl}>Falar no WhatsApp</Link></div></div><div className="min-h-80 rounded-3xl bg-ink p-8 text-3xl font-bold text-paper">O seu próximo corte começa aqui.</div></section>
      <section className="bg-ink py-16 text-paper"><div className="mx-auto max-w-6xl px-5"><p className="font-semibold text-green-300">SERVIÇOS</p><h2 className="mt-2 text-4xl font-black">Escolha o seu.</h2><div className="mt-8 grid gap-4 sm:grid-cols-3">{['Corte clássico','Barba','Corte + barba'].map((x) => <article className="rounded-2xl border border-white/20 p-6" key={x}><h3 className="text-xl font-bold">{x}</h3><p className="mt-2 text-white/70">Atendimento com hora marcada.</p></article>)}</div></div></section>
      <section className="mx-auto max-w-6xl px-5 py-16"><p className="font-semibold text-brand">O TIME</p><h2 className="mt-2 text-4xl font-black">Quem cuida do seu estilo.</h2><div className="mt-8 grid gap-4 sm:grid-cols-3">{['André','Caio','Murilo'].map((x) => <article className="rounded-2xl bg-white p-6 shadow-sm" key={x}><div className="h-48 rounded-xl bg-stone-200" /><h3 className="mt-4 text-xl font-bold">{x}</h3><p>Barbeiro</p></article>)}</div></section>
    </main>
    <footer className="bg-brand px-5 py-12 text-paper"><div className="mx-auto flex max-w-6xl items-center justify-between gap-6"><div><strong className="text-2xl">Distrito 011</strong><p>Pronto para mudar o visual?</p></div><Link href={siteConfig.whatsappUrl}>WhatsApp</Link></div></footer>
  </div>
}
