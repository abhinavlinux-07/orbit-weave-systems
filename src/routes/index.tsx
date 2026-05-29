import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import tandonLogo from "@/assets/tandon-logo.png";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import {
  ArrowRight, Phone, Mail, MapPin, Globe,
  Cpu, ShieldCheck, Network, Video, Wrench, Headphones,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { EcosystemOrb } from "@/components/EcosystemOrb";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tandon — Smart Infrastructure for Modern Businesses" },
      { name: "description", content: "Integrated Telecom, IT, Security & Audio-Video infrastructure since 1987. Designed. Integrated. Secured." },
      { property: "og:title", content: "Tandon — Smart Infrastructure for Modern Businesses" },
      { property: "og:description", content: "Integrated Telecom, IT, Security & Audio-Video infrastructure since 1987." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700;800&family=Manrope:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  component: Index,
});

const clients = [
  "Tata", "NTPC", "Haldiram's", "Birla", "BSNL", "Reliance",
  "ONGC", "Mahindra", "L&T", "SBI", "HDFC", "Indian Oil",
  "Coal India", "Adani", "Vedanta", "JSW",
];

const stats = [
  { value: "35+", label: "Years of trust" },
  { value: "10,000+", label: "Clients served" },
  { value: "1,00,000+", label: "Installations" },
  { value: "10 Lakh+", label: "Products delivered" },
];

const services = [
  { icon: Phone, title: "Telecom & EPABX", body: "IP telephony, voice infrastructure, unified communication." },
  { icon: ShieldCheck, title: "Security & Surveillance", body: "CCTV, access control, intrusion & perimeter protection." },
  { icon: Network, title: "IT & Networking", body: "Structured cabling, data centers, enterprise networking." },
  { icon: Video, title: "Audio Video Systems", body: "Conference rooms, auditoriums, digital signage." },
  { icon: Wrench, title: "Turnkey Execution", body: "End-to-end design, build & integration delivery." },
  { icon: Headphones, title: "Consultancy & AMC", body: "Advisory, maintenance and managed services." },
];

function Index() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    const id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.4 });

  return (
    <div ref={containerRef} id="top" className="relative">
      <Nav />
      <EcosystemOrb progress={smooth} />

      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <BackgroundGrid />
        <div className="relative z-30 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-32 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em]"
              style={{ borderColor: "color-mix(in oklch, var(--brand-accent) 40%, transparent)", color: "var(--brand)" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--brand-accent)" }} />
              Since 1987 · Nagpur, India
            </div>
            <h1 className="text-balance text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              Automation <br />
              <span className="text-gradient-brand">tailored for</span> <br />
              every space.
            </h1>
            <p className="mt-7 max-w-md text-lg text-muted-foreground">
              Integrated Telecom, IT &amp; Security infrastructure — engineered as one intelligent ecosystem for modern enterprises.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#infra" className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
                style={{ background: "linear-gradient(135deg, var(--brand-deep), var(--brand-accent))" }}>
                Explore Infrastructure
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
                style={{ borderColor: "color-mix(in oklch, var(--brand) 30%, transparent)" }}>
                View Solutions
              </a>
            </div>
          </motion.div>
          <div aria-hidden />
        </div>
        <ScrollHint />
      </section>

      {/* 2 — Invisible Infrastructure */}
      <Section
        id="infra"
        dark
        eyebrow="The invisible layer"
        title={<>What powers modern business <span className="text-gradient-brand">is often invisible.</span></>}
        copy="Behind every conversation, transaction and decision is a quiet network of cables, signals and systems. We design that layer — and make it disappear."
      />

      {/* 3 — Telecom */}
      <Section
        id="telecom"
        side="right"
        eyebrow="Telecom"
        title={<>Communication is the <span className="text-gradient-brand">backbone</span> of every organization.</>}
        copy="From IP-EPABX to unified communications — voice infrastructure that scales from a single branch to nationwide operations."
      >
        <FeatureBullets items={["IP-PBX & SIP trunking", "Unified messaging", "Contact center solutions"]} />
      </Section>

      {/* 4 — Security */}
      <Section
        id="security"
        dark
        eyebrow="Security & Surveillance"
        title={<>Protection designed into <span className="text-gradient-brand">every layer.</span></>}
        copy="IP CCTV, intelligent video analytics, access control and perimeter security — integrated into a single command view."
      >
        <FeatureBullets items={["AI-powered video analytics", "Access & intrusion control", "Centralized command"]} />
      </Section>

      {/* 5 — IT Infrastructure */}
      <Section
        id="it"
        side="right"
        eyebrow="IT Infrastructure"
        title={<>Scalable infrastructure for <span className="text-gradient-brand">uninterrupted business.</span></>}
        copy="Structured cabling, enterprise networking, server rooms and data center design — engineered for uptime and growth."
      >
        <FeatureBullets items={["Cat6A / fiber cabling", "Enterprise switching & WiFi", "Server & data center build-out"]} />
      </Section>

      {/* 6 — Audio Video */}
      <Section
        id="av"
        dark
        eyebrow="Audio Video"
        title={<>Spaces that <span className="text-gradient-brand">listen, speak, and connect.</span></>}
        copy="Conference rooms, auditoriums, training centers and digital signage — designed for clarity and collaboration."
      >
        <FeatureBullets items={["Hybrid conference rooms", "Auditorium AV", "Digital signage networks"]} />
      </Section>

      {/* 7 — Turnkey */}
      <section className="relative flex min-h-screen items-center overflow-hidden py-24">
        <div className="relative z-30 mx-auto w-full max-w-7xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.9 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em]"
              style={{ borderColor: "color-mix(in oklch, var(--brand-accent) 40%, transparent)", color: "var(--brand-accent)" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--brand-accent)" }} />
              Turnkey Execution
            </div>
            <h2 className="mx-auto max-w-4xl text-balance text-5xl font-bold leading-[1.02] md:text-7xl">
              One partner. <span className="text-gradient-brand">Complete infrastructure.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Every system — telecom, security, IT, AV — reconnects into one intelligent network. Designed, integrated and secured by Tandon.
            </p>

            <div id="services" className="mt-16 grid grid-cols-1 gap-4 text-left md:grid-cols-3">
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="glass rounded-2xl p-6"
                >
                  <s.icon className="h-6 w-6" style={{ color: "var(--brand-accent)" }} />
                  <div className="mt-4 font-display text-lg font-semibold">{s.title}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8 — Clients orbital marquee */}
      <section className="section-dark relative overflow-hidden py-32">
        <div className="relative z-30 mx-auto max-w-7xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em]"
            style={{ borderColor: "color-mix(in oklch, var(--brand-accent) 40%, transparent)", color: "var(--brand-accent)" }}>
            Trusted by India's giants
          </div>
          <h2 className="text-balance text-4xl font-bold md:text-6xl">
            Building infrastructure for <span className="text-gradient-brand">10,000+ organizations.</span>
          </h2>
        </div>

        <div className="relative z-30 mt-20 space-y-8">
          <Marquee items={clients} />
          <Marquee items={[...clients].reverse()} reverse />
        </div>
      </section>

      {/* 9 — Stats */}
      <section className="relative py-32">
        <div className="relative z-30 mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <Counter key={s.label} value={s.value} label={s.label} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* 10 — Final CTA */}
      <section className="section-dark relative flex min-h-screen items-center justify-center overflow-hidden py-32">
        <div className="relative z-30 mx-auto max-w-4xl px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-balance text-5xl font-bold leading-[1.02] md:text-8xl"
          >
            Designed. <br />
            Integrated. <br />
            <span className="text-gradient-brand">Secured.</span>
          </motion.h2>
          <p className="mx-auto mt-8 max-w-xl text-lg opacity-80">
            Smart infrastructure for modern businesses. Let's design yours.
          </p>
          <a
            href="#contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-medium text-white transition-transform hover:scale-105"
            style={{ background: "linear-gradient(135deg, var(--brand-deep), var(--brand-accent))" }}
          >
            Start your project <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="relative border-t section-dark py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full text-base font-bold text-white"
                style={{ background: "linear-gradient(135deg, var(--brand-deep), var(--brand-accent))" }}>T</span>
              <span className="font-display text-xl font-semibold">Tandon</span>
            </div>
            <p className="mt-4 max-w-md text-sm opacity-70">
              Integrated Telecom, IT &amp; Security infrastructure since 1987. Headquartered in Nagpur, serving enterprises across India.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-widest opacity-60">Contact</div>
            <ul className="mt-4 space-y-3 text-sm opacity-80">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 588885866</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@tandons.in</li>
              <li className="flex items-center gap-2"><Globe className="h-4 w-4" /> www.tandons.in</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Ramnagar, Nagpur</li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-widest opacity-60">Solutions</div>
            <ul className="mt-4 space-y-2 text-sm opacity-80">
              <li>Telecom &amp; EPABX</li>
              <li>Security &amp; CCTV</li>
              <li>IT &amp; Networking</li>
              <li>Audio Video</li>
              <li>Turnkey Projects</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-7xl px-6 text-xs opacity-50">
          © {new Date().getFullYear()} Tandon. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function BackgroundGrid() {
  return (
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in oklch, var(--brand) 25%, transparent) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(circle at center, black 30%, transparent 75%)",
        }}
      />
    </div>
  );
}

function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
      className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
    >
      <div className="flex flex-col items-center gap-2">
        Scroll
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="h-8 w-px"
          style={{ background: "linear-gradient(180deg, var(--brand-accent), transparent)" }}
        />
      </div>
    </motion.div>
  );
}

function FeatureBullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3 text-sm opacity-85">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full" style={{ background: "var(--brand-accent)" }} />
          {t}
        </li>
      ))}
    </ul>
  );
}

function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div className={`marquee flex w-max gap-12 whitespace-nowrap font-display text-2xl md:text-4xl ${reverse ? "[animation-direction:reverse]" : ""}`}>
        {doubled.map((c, i) => (
          <span key={i} className="flex items-center gap-12 opacity-70">
            <span>{c}</span>
            <span style={{ color: "var(--brand-accent)" }}>◯</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Counter({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="text-center"
    >
      <div className="font-display text-5xl font-bold text-gradient-brand md:text-7xl">{value}</div>
      <div className="mt-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    </motion.div>
  );
}
