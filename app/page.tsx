import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Building, ShieldCheck, Target, Zap, Eye, LayoutDashboard, Filter, CheckCircle, Flame } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#CC97FF]/30 font-sans overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-[0.2em] text-white">REFYNE</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#sobre" className="hover:text-white transition-colors">Visão Geral</a>
            <a href="#pilares" className="hover:text-white transition-colors">Pilares</a>
            <a href="#funcionalidades" className="hover:text-white transition-colors">Plataforma</a>
          </div>
          <Link
            href="/auth"
            className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-medium transition-all"
          >
            Acessar Plataforma
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 min-h-screen flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
          <Image
            src="/hero_bg.png"
            alt="Refyne Abstract Background"
            fill
            priority
            className="object-cover opacity-100 mix-blend-screen -right-[20%] z-0"
          />
        </div>

        {/* Ambient Lights */}
        <div className="absolute top-1/4 left-0 w-[40%] h-[40%] rounded-full bg-[#CC97FF]/10 blur-[150px] mix-blend-screen pointer-events-none z-0" />
        <div className="absolute bottom-0 right-1/4 w-[40%] h-[40%] rounded-full bg-[#9C48EA]/20 blur-[150px] mix-blend-screen pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wide text-[#CC97FF] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Star className="h-3.5 w-3.5 fill-[#CC97FF]" />
              <span>MATCHMAKING INTELIGENTE</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 fill-mode-both">
              Onde a cultura <br className="hidden md:block" />
              encontra a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CC97FF] to-[#9C48EA]">performance.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
              Uma plataforma que vai muito além do currículo técnico. A REFYNE garante o alinhamento de brilho nos olhos e o perfil "hands-on" exigido pelas startups que mais crescem.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
              <Link
                href="/auth"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-br from-[#CC97FF] to-[#9C48EA] text-white font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-[0_0_30px_rgba(204,151,255,0.3)]"
              >
                Criar uma conta
                <ArrowRight className="h-4 w-4 text-white" />
              </Link>
              <a
                href="#sobre"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-all text-center"
              >
                Descobrir como funciona
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: PROBLEMA X SOLUÇÃO */}
      <section id="sobre" className="py-24 relative z-10 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-white/5 text-zinc-400 text-xs font-bold uppercase tracking-wider rounded-full mb-6 border border-white/10">
                A Revolução do Recrutamento
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">O recrutamento tradicional falha com startups.</h2>
              <p className="text-zinc-400 leading-relaxed text-lg mb-6">
                Candidatos brilhantes de grandes corporações nem sempre se adaptam à cultura ágil e caótica do early stage. Enquanto isso, fundadores e startups perdem tempo precioso filtrando currículos, em vez de focar no que importa: <strong className="text-white">soft skills, adaptabilidade e brilho nos olhos</strong>.
              </p>
            </div>

            <div className="p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-[#CC97FF]/20 relative overflow-hidden backdrop-blur-sm shadow-[0_0_40px_rgba(204,151,255,0.05)]">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#CC97FF]/10 blur-3xl rounded-full" />
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="h-12 w-12 rounded-full bg-[#CC97FF]/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-[#CC97FF]" />
                </div>
                <h3 className="text-2xl font-bold text-white">A Solução Refyne</h3>
              </div>
              <p className="text-zinc-300 leading-relaxed relative z-10 text-lg">
                Focamos em alinhar a missão e cultura da startup com o perfil comportamental do profissional. Garantimos conexões de longo prazo, menor turnover e um time focado em crescer um negócio do zero.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: PILARES ESTRATÉGICOS */}
      <section id="pilares" className="py-24 relative z-10 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Pilares Estratégicos</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              A base da nossa metodologia desenhada para conectar as oportunidades mais promissoras aos talentos mais vorazes do mercado.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-[#CC97FF]/20 transition-all group">
              <div className="h-12 w-12 rounded-2xl bg-[#CC97FF]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Flame className="h-6 w-6 text-[#CC97FF]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Match de Cultura</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Nosso algoritmo avalia intrinsecamente se o candidato reflete o perfil "mão na massa" (hands-on), vital para escalar e resolver problemas rápidos.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-[#9C48EA]/20 transition-all group">
              <div className="h-12 w-12 rounded-2xl bg-[#9C48EA]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6 text-[#9C48EA]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Transparência Total</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                As propostas são claras desde o início, cobrindo modelos de atração arrojados, formato de trabalho presencial, híbrido, pacote de Equity ou Stock Options.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-[#CC97FF]/20 transition-all group">
              <div className="h-12 w-12 rounded-2xl bg-[#CC97FF]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-[#CC97FF]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Agilidade no Processo</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Ambiente de ponta pensado exclusivamente para que os fundadores – frequentemente os maiores recrutadores da empresa – tomem decisões em tempo recorde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FUNCIONALIDADES E MVP */}
      <section id="funcionalidades" className="py-24 relative z-10 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experiência da Plataforma</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Funcionalidades construídas no foco da experiência direta entre Startups de Alto Crescimento e Talentos de Elite.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="p-6 rounded-3xl border border-white/5 bg-gradient-to-br from-[#141414] to-black hover:border-[#CC97FF]/20 transition-all">
              <Building className="h-8 w-8 text-[#9C48EA] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Perfil da Startup</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                A vitrine oficial da startup. O espaço definitivo de "pitch" para vender seu negócio, seu propósito e sua cultura aos candidatos.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-white/5 bg-gradient-to-br from-[#141414] to-black hover:border-[#CC97FF]/20 transition-all">
              <Filter className="h-8 w-8 text-[#CC97FF] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Smart Filtering</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Navegação cirúrgica através de filtros complexos por estágio da startup (Seed, Series A, B, etc.) e o modelo específico de contratação desejado.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-white/5 bg-gradient-to-br from-[#141414] to-black hover:border-[#CC97FF]/20 transition-all">
              <LayoutDashboard className="h-8 w-8 text-[#9C48EA] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Dashboard Simples</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                O candidato conta com um ambiente transparente para visualização em tempo real de seu status individual em cada processo seletivo aplicável.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-[#CC97FF]/20 bg-gradient-to-br from-[#141414] to-black hover:border-[#CC97FF]/40 transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#CC97FF]/10 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-500" />
              <CheckCircle className="h-8 w-8 text-[#CC97FF] mb-4 relative z-10" />
              <h3 className="text-lg font-bold text-white mb-2 relative z-10">Curadoria Refyne</h3>
              <p className="text-zinc-400 text-sm leading-relaxed relative z-10">
                Destaque com os melhores "Top Picks" do mercado, com validações suportadas através de sistemas exclusivos de Badges de competência.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 relative z-10 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#9C48EA]/5 opacity-50" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Pronto para redefinir o mercado de talentos?</h2>
          <p className="text-zinc-400 text-lg mb-10">
            Dê o primeiro passo para uma jornada conectada pelos propósitos certos.
          </p>
          <Link
            href="/auth"
            className="inline-flex px-10 py-5 w-full sm:w-auto mx-auto rounded-full bg-white text-black font-bold uppercase tracking-widest text-sm hover:scale-105 hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] justify-center"
          >
            Acessar Plataforma Refyne
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white font-black tracking-[0.2em] text-lg">
            REFYNE
          </div>
          <p className="text-zinc-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Refyne Inc. Todos os direitos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}
