import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Menu, X, Moon, Sun, Download, ArrowRight, Mail, Phone, MapPin,
  Facebook, Linkedin, MessageCircle, Send, Sparkles, Rocket, Target,
  Palette, Layout, Search, Megaphone, PenTool, Users, TrendingUp,
  Award, CheckCircle2, Star, ExternalLink, Briefcase, GraduationCap,
  Globe, Code2, Figma as FigmaIcon, Instagram, ArrowUpRight,
  BookOpen, Smartphone, Lightbulb, Heart, Quote,
  Images, Expand, ChevronLeft, ChevronRight, ImagePlus,
} from "lucide-react";
import michaelAsset from "@/assets/michael.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: michaelAsset.url },
      { name: "twitter:image", content: michaelAsset.url },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Michael Mandongwe",
          jobTitle: "Digital Marketing Specialist, Graphic Designer & Website Designer",
          address: { "@type": "PostalAddress", addressLocality: "Harare", addressCountry: "Zimbabwe" },
          email: "mandongwemichael@gmail.com",
          image: michaelAsset.url,
        }),
      },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "client-work", label: "Client Work" },
  { id: "academic", label: "Case Study" },
  { id: "education", label: "Education" },
  { id: "teaching", label: "Teaching" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

/* ---------- Reveal on scroll ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Animated counter ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const dur = 1600;
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.floor(to * (0.2 + 0.8 * (1 - Math.pow(1 - p, 3)))));
          if (p < 1) requestAnimationFrame(step);
          else setN(to);
        };
        requestAnimationFrame(step);
        io.disconnect();
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ---------- Navigation ---------- */
function Nav({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6">
        <div className={`glass flex items-center justify-between rounded-full px-3 py-2.5 sm:px-4 ${scrolled ? "shadow-[var(--shadow-soft)]" : ""}`}>
          <a href="#home" className="flex shrink-0 items-center gap-2 font-display font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-full text-white" style={{ background: "var(--gradient-primary)" }}>MM</span>
            <span className="hidden 2xl:inline text-foreground">Michael Mandongwe</span>
          </a>
          <nav className="hidden xl:flex min-w-0 items-center gap-0 overflow-x-auto no-scrollbar">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`}
                className="shrink-0 rounded-full px-2 py-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <button onClick={() => setDark(!dark)}
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background/60 hover:bg-muted transition"
              aria-label="Toggle theme">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="#contact" className="hidden md:inline-flex btn-primary !py-2 !px-4 text-sm">Let's talk<ArrowRight size={14} /></a>
            <button className="xl:hidden grid h-9 w-9 place-items-center rounded-full border border-border" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {open && (
          <div className="xl:hidden glass mt-2 rounded-2xl p-3">
            <div className="grid gap-1">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-muted">{n.label}</a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------- Section shell ---------- */
function Section({ id, eyebrow, title, subtitle, children }: { id: string; eyebrow?: string; title: ReactNode; subtitle?: string; children: ReactNode }) {
  return (
    <section id={id} className="relative py-20 sm:py-28">
      <div className="container-x">
        <div className="mb-12 max-w-2xl reveal">
          {eyebrow && (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--brand-gold)" }} /> {eyebrow}
            </div>
          )}
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h2>
          {subtitle && <p className="mt-4 text-base sm:text-lg text-muted-foreground">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const roles = [
    "Digital Marketing Specialist", "Graphic Designer", "Website Designer",
    "Brand Identity Designer", "SEO Specialist", "Social Media Strategist", "Content Creator",
  ];
  return (
    <section id="home" className="bg-hero relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-40" style={{ background: "var(--gradient-primary)" }} />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-30" style={{ background: "var(--gradient-gold)" }} />
      <div className="container-x relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div className="reveal">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium backdrop-blur">
              <Sparkles size={14} className="text-[color:var(--brand-gold)]" />
              Available for freelance & full-time roles · Harare, Zimbabwe
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Helping Businesses Grow Through{" "}
              <span className="text-gradient">Digital Marketing, Design & High-Converting Websites</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I help businesses build powerful brands and achieve measurable growth through strategic digital marketing, professional graphic design, branding, website development, SEO, paid advertising, social media management, and creative content that delivers real business results.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#portfolio" className="btn-primary">View My Portfolio <ArrowRight size={16} /></a>
              <a href="/cv.pdf" download="Michael-Mandongwe-CV.pdf" className="btn-gold"><Download size={16} /> Download My CV</a>
              <a href="#contact" className="btn-ghost">Contact Me</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {roles.map((r) => (
                <span key={r} className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur">
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className="reveal relative">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] opacity-30 blur-2xl" style={{ background: "var(--gradient-primary)" }} />
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-2xl float-slow" style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-elegant)" }} />
              <div className="absolute -left-6 bottom-16 h-16 w-16 rounded-full float-slow" style={{ background: "var(--gradient-primary)", animationDelay: "-2s" }} />
              <div className="relative h-full overflow-hidden rounded-[2rem] border border-border" style={{ boxShadow: "var(--shadow-glow)" }}>
                <img src={michaelAsset.url} alt="Michael Mandongwe portrait" className="h-full w-full object-cover" loading="eager" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: "var(--gradient-primary)" }}>
                      <Rocket size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Michael Mandongwe</div>
                      <div className="text-xs text-muted-foreground">Digital · Design · Web</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:mt-20 sm:grid-cols-4">
          {[
            { n: 40, s: "+", l: "Projects Delivered" },
            { n: 25, s: "+", l: "Happy Clients" },
            { n: 300, s: "%", l: "Audience Growth" },
            { n: 4, s: "+", l: "Years Experience" },
          ].map((s) => (
            <div key={s.l} className="reveal card-elevated p-5 text-center">
              <div className="text-3xl font-bold sm:text-4xl text-gradient">
                <Counter to={s.n} suffix={s.s} />
              </div>
              <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Half-portrait banner (between Hero and About) ---------- */
function HalfBanner() {
  return (
    <section aria-hidden="true" className="relative">
      <div className="container-x">
        <div className="reveal relative -mt-6 mb-6 overflow-hidden rounded-3xl border border-border" style={{ boxShadow: "var(--shadow-elegant)" }}>
          <div className="relative h-[220px] sm:h-[280px] md:h-[340px]">
            <img
              src={michaelAsset.url}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
              loading="lazy"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, color-mix(in oklab, var(--brand-royal) 85%, transparent) 0%, color-mix(in oklab, var(--brand-royal) 30%, transparent) 45%, transparent 70%)" }} />
            <div className="absolute inset-0 flex items-center">
              <div className="px-6 sm:px-10 md:px-14 max-w-xl text-white">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
                  <Sparkles size={12} className="text-[color:var(--brand-gold)]" /> Michael Mandongwe
                </div>
                <h3 className="font-display text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                  Design. Marketing. <span style={{ color: "var(--brand-gold)" }}>Growth.</span>
                </h3>
                <p className="mt-2 max-w-md text-sm text-white/85 sm:text-base">
                  Turning ambitious brands into unforgettable experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  const highlights = [
    { icon: <Megaphone size={20} />, t: "Digital Marketing", d: "Strategy, SEO, paid ads, social media." },
    { icon: <Palette size={20} />, t: "Graphic Design", d: "Brand identities, print, social creatives." },
    { icon: <Layout size={20} />, t: "Web & UI/UX Design", d: "Fast, responsive, conversion-focused sites & app interfaces." },
    { icon: <PenTool size={20} />, t: "Branding & Content", d: "Distinctive identities and content that stops the scroll." },
    { icon: <GraduationCap size={20} />, t: "Teaching & Mentoring", d: "Scratch coding volunteer & teacher-in-training." },
    { icon: <TrendingUp size={20} />, t: "Growth", d: "Analytics-led campaigns and lead-gen funnels." },
  ];
  return (
    <Section id="about" eyebrow="About Me" title={<>Creative strategist blending <span className="text-gradient">marketing, design & code</span></>}>
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="reveal grid gap-4">
          {highlights.map((h) => (
            <div key={h.t} className="card-elevated flex items-start gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white" style={{ background: "var(--gradient-primary)" }}>{h.icon}</span>
              <div>
                <div className="font-semibold">{h.t}</div>
                <div className="text-sm text-muted-foreground">{h.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="reveal space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>
            Hello, I'm <strong className="text-foreground">Michael Mandongwe</strong>, a passionate Digital Marketing Specialist, Graphic Designer, Website Designer, and UI/UX Designer dedicated to helping businesses and communities grow through creativity, strategy, and technology.
          </p>
          <p>
            My experience spans <strong className="text-foreground">digital marketing, graphic design, website design, UI/UX design, branding, content creation, and teaching & mentoring</strong>. Through my training at Uncommon.org and hands-on client work, I have developed impactful marketing campaigns, engaging visual identities, modern websites, and mobile app interfaces that strengthen brands and drive measurable business growth.
          </p>
          <p>
            Beyond client work, I volunteer as a Scratch Coding Facilitator for young learners and I'm currently part of the Uncommon.org Teacher Training Program — sharpening my leadership, mentoring, and classroom facilitation skills.
          </p>
          <p className="text-foreground font-medium">
            I believe great marketing is built on creativity, data, and meaningful customer experiences.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {["Strategic thinker", "Data-driven", "Detail obsessed", "Client-first"].map((t) => (
              <div key={t} className="flex items-center gap-2 text-foreground">
                <CheckCircle2 size={18} className="text-[color:var(--brand-gold)]" /> <span className="text-sm font-medium">{t}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="#contact" className="btn-primary">Work with me <ArrowRight size={16} /></a>
            <a href="/cv.pdf" download="Michael-Mandongwe-CV.pdf" className="btn-ghost"><Download size={16} /> Download CV</a>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Skills ---------- */
function Skills() {
  const groups = [
    {
      title: "Digital Marketing", icon: <Megaphone size={20} />,
      items: ["Digital Marketing Strategy","Social Media Marketing","Content Marketing","SEO","Google Ads","Meta Ads","Email Marketing","Lead Generation","Google Analytics","Marketing Analytics","Campaign Management"],
    },
    {
      title: "Graphic Design", icon: <Palette size={20} />,
      items: ["Brand Identity Design","Logo Design","Flyer Design","Poster Design","Social Media Graphics","Business Cards","Company Profiles","Brochures","Banner Design","Presentation Design","Canva","Adobe Photoshop","Figma"],
    },
    {
      title: "Website Design & Development", icon: <Code2 size={20} />,
      items: ["Responsive Website Design","Landing Page Design","WordPress","Lovable AI","HTML","CSS"],
    },
    {
      title: "UI/UX Design", icon: <FigmaIcon size={20} />,
      items: ["Mobile App Design","Wireframing","User Interface Design","User Experience Design","Prototyping","Figma","Canva"],
    },
    {
      title: "Teaching & Leadership", icon: <GraduationCap size={20} />,
      items: ["Scratch Programming","Mentoring","Classroom Facilitation","Leadership","Communication","Curriculum Design"],
    },
  ];
  return (
    <Section id="skills" eyebrow="Skills" title={<>A full-stack creative <span className="text-gradient">toolkit</span></>} subtitle="Everything I bring to your brand — from strategy and copy to pixels and code.">
      <div className="grid gap-6 lg:grid-cols-3">
        {groups.map((g) => (
          <div key={g.title} className="reveal card-elevated p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl text-white" style={{ background: "var(--gradient-primary)" }}>{g.icon}</span>
              <h3 className="text-lg font-semibold">{g.title}</h3>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span key={s} className="rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium hover:border-[color:var(--brand-gold)] hover:text-foreground transition-colors">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Services ---------- */
function Services() {
  const services = [
    { icon: <Megaphone size={22} />, t: "Digital Marketing", d: "Full-funnel strategy that turns audiences into loyal customers." },
    { icon: <Palette size={22} />, t: "Graphic Design", d: "Bold, on-brand visuals for every touchpoint of your business." },
    { icon: <Layout size={22} />, t: "Website Design", d: "Fast, responsive, conversion-focused websites and landing pages." },
    { icon: <Sparkles size={22} />, t: "Branding & Visual Identity", d: "Logos, systems and guidelines that make you unforgettable." },
    { icon: <PenTool size={22} />, t: "Logo Design", d: "Distinctive, timeless marks crafted from research and strategy." },
    { icon: <Users size={22} />, t: "Social Media Management", d: "Content, community and growth for Facebook, Instagram & LinkedIn." },
    { icon: <PenTool size={22} />, t: "Content Creation", d: "Copy, graphics and video that stop the scroll and drive action." },
    { icon: <Target size={22} />, t: "Facebook & Instagram Ads", d: "Precisely-targeted Meta campaigns optimized for ROAS." },
    { icon: <Rocket size={22} />, t: "Google Ads Management", d: "Search, Display & YouTube campaigns that convert intent to sales." },
    { icon: <Search size={22} />, t: "SEO Optimization", d: "Technical, on-page and content SEO to earn compounding traffic." },
    { icon: <Mail size={22} />, t: "Email Marketing", d: "Automations and campaigns that nurture leads into revenue." },
    { icon: <TrendingUp size={22} />, t: "Marketing Strategy", d: "Positioning, funnels and KPIs mapped to your business goals." },
    { icon: <Target size={22} />, t: "Lead Generation", d: "Multi-channel systems that fill your pipeline with quality leads." },
    { icon: <FigmaIcon size={22} />, t: "UI/UX Design", d: "Elegant, usable interfaces designed around real user behavior." },
  ];
  return (
    <Section id="services" eyebrow="Services" title={<>What I can <span className="text-gradient">build for you</span></>} subtitle="Pick a single service or a full growth engine — everything is delivered with strategy, taste and speed.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <div key={s.t} className="reveal card-elevated group relative overflow-hidden p-6" style={{ transitionDelay: `${(i % 6) * 40}ms` }}>
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-30" style={{ background: "var(--gradient-primary)" }} />
            <div className="flex items-start justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl text-white" style={{ background: "var(--gradient-primary)" }}>{s.icon}</span>
              <ArrowUpRight size={18} className="text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[color:var(--brand-gold)]" />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{s.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Portfolio ---------- */
type Project = {
  title: string; tag: string; blurb: string;
  responsibilities: string[]; tools?: string[]; achievements?: string[];
  gradient: string; icon: ReactNode; image?: string;
};

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="reveal card-elevated group overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden">
        {p.image ? (
          <>
            <img src={p.image} alt={`${p.title} — client work`} loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0" style={{ background: p.gradient }} />
            <div className="absolute inset-0 opacity-30 mix-blend-overlay"
              style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,.5), transparent 40%), radial-gradient(circle at 80% 60%, rgba(0,0,0,.35), transparent 45%)" }} />
            <div className="absolute inset-0 grid place-items-center">
              <div className="glass grid h-20 w-20 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:scale-110" style={{ background: "rgba(255,255,255,.15)" }}>
                {p.icon}
              </div>
            </div>
          </>
        )}
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur">{p.tag}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold">{p.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
        {p.achievements && (
          <ul className="mt-4 space-y-1.5">
            {p.achievements.map((a) => (
              <li key={a} className="flex items-start gap-2 text-sm">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[color:var(--brand-gold)]" /> <span>{a}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {p.responsibilities.map((r) => (
            <span key={r} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">{r}</span>
          ))}
        </div>
        {p.tools && (
          <div className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Tools:</span> {p.tools.join(" · ")}
          </div>
        )}
      </div>
    </article>
  );
}

function Portfolio_Section() {
  const projects: Project[] = [
    {
      title: "Baby Hub", tag: "Retail · Campaign Design",
      blurb: "Designed a Black Friday campaign for a baby clothing and essentials brand — promotional flyers, social creatives and product-led ads built around a limited-offers sale.",
      responsibilities: ["Graphic Design", "Campaign Design", "Social Media Creatives", "Promotional Flyers", "Product Showcase Design"],
      achievements: ["Black Friday creative suite", "Flyers in two brand colourways", "Up to 50% off offer messaging"],
      gradient: "linear-gradient(135deg,#0B2559 0%,#8E1B63 55%,#E4007C 130%)",
      icon: <Heart size={30} />,
      image: imagesFor("baby-hub")[0]?.url,
    },
    {
      title: "Springridge Learning Academy", tag: "Education · Campaign Design",
      blurb: "Designed the school's admissions and scholarship campaign — enrolment posters, a fees-and-subjects prospectus, 2027 scholarship flyers, a 3D flyer mockup and the academy crest.",
      responsibilities: ["Graphic Design", "Campaign Design", "Brand Identity", "Print & Social Creatives", "Marketing Collateral"],
      achievements: ["2027 scholarship applications campaign", "Form 1 enrolment posters & prospectus sheet", "Custom school crest & brand identity"],
      gradient: "linear-gradient(135deg,#0B3D91 0%,#166534 55%,#F59E0B 130%)",
      icon: <GraduationCap size={30} />,
      image: imagesFor("springeridge-academy")[0]?.url,
    },
    {
      title: "Makumbe Avril Holdings", tag: "Website · Branding",
      blurb: "Designed and developed a modern corporate website with premium UX, responsive design, professional branding, service pages and contact forms.",
      responsibilities: ["Website Design", "UI/UX Design", "Branding", "Graphic Design", "Responsive Development"],
      tools: ["Lovable AI", "Figma", "HTML", "CSS"],
      gradient: "linear-gradient(135deg,#0B3D91 0%,#1e5cd6 60%,#F59E0B 130%)",
      icon: <Globe size={30} />,
      image: imagesFor("makumbe-avril-holdings")[0]?.url,
    },
    {
      title: "Dynamic Sales Solutions", tag: "Digital Marketing",
      blurb: "Led digital marketing to grow the company's online presence across LinkedIn and Facebook with strategic content and campaigns.",
      responsibilities: ["Social Media", "Content Calendars", "Graphic Design", "Campaign Management"],
      achievements: ["Grew LinkedIn from ~60 to 300+ followers", "Facebook page grew past 1,000 followers", "Designed promotional flyers & branded assets"],
      gradient: "linear-gradient(135deg,#111827 0%,#0B3D91 100%)",
      icon: <TrendingUp size={30} />,
      image: imagesFor("dynamic-sales-solutions")[0]?.url,
    },
    {
      title: "Clothsations", tag: "Ads · Design",
      blurb: "Digital Marketer & Sales Representative running Meta ads, lead generation and creative for a lifestyle brand.",
      responsibilities: ["Facebook Advertising", "Lead Generation", "Graphic Design", "Content Creation", "Social Media", "Customer Engagement"],
      achievements: ["Promotional flyers & product ads", "Social creatives & campaigns", "Lead-gen funnels"],
      gradient: "linear-gradient(135deg,#F59E0B 0%,#f97316 60%,#0B3D91 130%)",
      icon: <Megaphone size={30} />,
      image: imagesFor("clothsations")[0]?.url,
    },
    {
      title: "Sneakers Vault ZW", tag: "Brand Build",
      blurb: "Built a digital brand from the ground up — from logo concepts to launch campaigns and social content strategy.",
      responsibilities: ["Brand Strategy", "Graphic Design", "Social Media Marketing", "Content Planning", "Digital Branding"],
      achievements: ["Logo concepts & brand system", "Product campaigns", "Content calendar"],
      gradient: "linear-gradient(135deg,#0B3D91 0%,#111827 100%)",
      icon: <Sparkles size={30} />,
    },
  ];

  const gallery = [
    { t: "Logo Designs", i: <PenTool size={22} />, g: "linear-gradient(135deg,#0B3D91,#1e5cd6)" },
    { t: "Brand Identity", i: <Sparkles size={22} />, g: "linear-gradient(135deg,#F59E0B,#f97316)" },
    { t: "Social Media Graphics", i: <Instagram size={22} />, g: "linear-gradient(135deg,#111827,#0B3D91)" },
    { t: "Marketing Flyers", i: <Megaphone size={22} />, g: "linear-gradient(135deg,#1e5cd6,#F59E0B)" },
    { t: "Posters", i: <Layout size={22} />, g: "linear-gradient(135deg,#0B3D91,#F59E0B)" },
    { t: "Business Cards", i: <Briefcase size={22} />, g: "linear-gradient(135deg,#111827,#334155)" },
    { t: "Company Profiles", i: <Award size={22} />, g: "linear-gradient(135deg,#0B3D91,#111827)" },
    { t: "Menu Designs", i: <PenTool size={22} />, g: "linear-gradient(135deg,#f97316,#F59E0B)" },
    { t: "Promotional Banners", i: <Rocket size={22} />, g: "linear-gradient(135deg,#1e5cd6,#0B3D91)" },
    { t: "Website UI Mockups", i: <Layout size={22} />, g: "linear-gradient(135deg,#0B3D91,#1e5cd6)" },
    { t: "Digital Advertisements", i: <Target size={22} />, g: "linear-gradient(135deg,#F59E0B,#0B3D91)" },
    { t: "Creative Campaigns", i: <Palette size={22} />, g: "linear-gradient(135deg,#111827,#F59E0B)" },
  ];

  return (
    <Section id="portfolio" eyebrow="Featured Work" title={<>Selected <span className="text-gradient">projects & campaigns</span></>} subtitle="A snapshot of work across websites, brand identities and growth campaigns.">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => <ProjectCard key={p.title} p={p} />)}
      </div>

      <div className="mt-20 reveal">
        <h3 className="text-2xl font-bold sm:text-3xl">Graphic Design <span className="text-gradient">Gallery</span></h3>
        <p className="mt-2 max-w-2xl text-muted-foreground">A curated peek at the categories of design work I deliver for clients.</p>
      </div>
      <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {gallery.map((g) => (
          <div key={g.t} className="reveal group relative aspect-square overflow-hidden rounded-2xl border border-border" style={{ boxShadow: "var(--shadow-soft)" }}>
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" style={{ background: g.g }} />
            <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,.4), transparent 40%)" }} />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <div className="glass mb-2 inline-grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: "rgba(255,255,255,.18)" }}>{g.i}</div>
              <div className="text-sm font-semibold">{g.t}</div>
            </div>
            <div className="absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
              <ExternalLink className="text-white" />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Client Work: photos auto-load from src/assets/work/<company>/ ---------- */
const workPointers = import.meta.glob("../assets/work/*/*.asset.json", { eager: true, import: "default" }) as Record<string, { url: string }>;
const workFiles = import.meta.glob("../assets/work/*/*.{jpg,jpeg,png,webp,gif,avif}", { eager: true, import: "default" }) as Record<string, string>;

type WorkImage = { url: string; caption: string; name: string };

const captionFromPath = (path: string) => {
  const file = path.split("/").pop() || "";
  const base = file.replace(/\.asset\.json$/i, "").replace(/\.[a-z0-9]+$/i, "");
  const words = base.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : "Client work";
};

const imagesFor = (slug: string): WorkImage[] => {
  const mark = `/work/${slug}/`;
  const out: WorkImage[] = [];
  for (const [path, mod] of Object.entries(workPointers)) {
    if (path.includes(mark) && mod && typeof mod.url === "string") {
      out.push({ url: mod.url, caption: captionFromPath(path), name: path.split("/").pop() || "" });
    }
  }
  for (const [path, url] of Object.entries(workFiles)) {
    if (path.includes(mark) && typeof url === "string") {
      out.push({ url, caption: captionFromPath(path), name: path.split("/").pop() || "" });
    }
  }
  return out.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
};

const CLIENT_WORK = [
  {
    slug: "baby-hub",
    name: "Baby Hub",
    role: "Graphic Designer & Digital Marketer",
    tag: "Retail · Seasonal Campaign",
    blurb: "Designed the store's Black Friday campaign for a baby clothing and essentials brand — promotional flyers in two brand colourways, social media creatives and product-led ads built around a limited-offers sale of up to 50% off.",
    achievements: ["Black Friday campaign creative suite", "Promotional flyers in two brand colourways", "Social ad creatives & product showcases", "Offer-led messaging: up to 50% off"],
    gradient: "linear-gradient(135deg,#0B2559 0%,#8E1B63 55%,#E4007C 130%)",
    icon: <Heart size={26} />,
  },
  {
    slug: "springeridge-academy",
    name: "Springridge Learning Academy",
    role: "Graphic Designer & Digital Marketer",
    tag: "Education · Admissions Campaign",
    blurb: "Designed the school's full admissions and scholarship campaign — enrolment posters, a fees-and-subjects prospectus sheet, 2027 scholarship flyers, a 3D printed-flyer mockup and the academy crest, all built to drive Form 1 and Lower 6 applications.",
    achievements: ["2027 scholarship & admissions campaign", "Form 1 enrolment posters & prospectus sheet", "School crest & brand identity", "Print-ready flyers and 3D mockups"],
    gradient: "linear-gradient(135deg,#0B3D91 0%,#166534 55%,#F59E0B 130%)",
    icon: <GraduationCap size={26} />,
  },
  {
    slug: "dynamic-sales-solutions",
    name: "Dynamic Sales Solutions",
    role: "Digital Marketing Specialist",
    tag: "Digital Marketing · Social Growth",
    blurb: "Owned the company's digital presence end to end — campaign strategy, content calendars, community management and the design of every promotional asset that went out.",
    achievements: ["LinkedIn grew from ~60 to 300+ followers", "Facebook page passed 1,000 followers", "Promotional flyers & branded asset systems"],
    gradient: "linear-gradient(135deg,#111827 0%,#0B3D91 100%)",
    icon: <TrendingUp size={26} />,
    facebookUrl: "https://www.facebook.com/profile.php?id=61577108122071",
  },
  {
    slug: "clothsations",
    name: "Clothsations",
    role: "Digital Marketer & Sales Representative",
    tag: "Meta Ads · Creative · Lead Gen",
    blurb: "Ran paid advertising and creative for a lifestyle brand — product ads, lead-generation funnels and a steady stream of social content built to sell.",
    achievements: ["Meta ad campaigns & product creatives", "Lead-gen funnels and offer design", "Daily social content & customer engagement"],
    gradient: "linear-gradient(135deg,#F59E0B 0%,#f97316 60%,#0B3D91 130%)",
    icon: <Megaphone size={26} />,
    facebookUrl: "https://www.facebook.com/Clothsations",
  },
  {
    slug: "makumbe-avril-holdings",
    name: "Makumbe Avril Holdings",
    role: "Website Design · Branding",
    tag: "Website · Brand Identity",
    blurb: "Designed and built a modern corporate website with premium UX, responsive layouts, service pages, contact forms and the supporting brand identity.",
    achievements: ["Responsive corporate website", "Service & contact page design", "Brand identity and supporting graphics"],
    gradient: "linear-gradient(135deg,#0B3D91 0%,#1e5cd6 60%,#F59E0B 130%)",
    icon: <Globe size={26} />,
  },
];

/* ---------- Full-size image viewer ---------- */
function Lightbox({ items, index, setIndex, onClose }: {
  items: WorkImage[]; index: number; setIndex: (i: number) => void; onClose: () => void;
}) {
  const item = items[index];
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") setIndex((index + 1) % items.length);
      else if (e.key === "ArrowLeft") setIndex((index - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, items.length, onClose, setIndex]);

  if (!item) return null;
  const nav = "grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/25";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose} role="dialog" aria-modal="true" aria-label={item.caption}>
      <button className={`${nav} absolute right-4 top-4`} onClick={onClose} aria-label="Close viewer"><X size={20} /></button>
      {items.length > 1 && (
        <>
          <button className={`${nav} absolute left-3 top-1/2 -translate-y-1/2 sm:left-6`} aria-label="Previous image"
            onClick={(e) => { e.stopPropagation(); setIndex((index - 1 + items.length) % items.length); }}>
            <ChevronLeft size={22} />
          </button>
          <button className={`${nav} absolute right-3 top-1/2 -translate-y-1/2 sm:right-6`} aria-label="Next image"
            onClick={(e) => { e.stopPropagation(); setIndex((index + 1) % items.length); }}>
            <ChevronRight size={22} />
          </button>
        </>
      )}
      <figure className="max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-white/5"
        onClick={(e) => e.stopPropagation()}>
        <img src={item.url} alt={item.caption} className="mx-auto max-h-[76vh] w-full object-contain" />
        <figcaption className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-3 text-sm text-white/85">
          <span className="truncate">{item.caption}</span>
          <span className="shrink-0 tabular-nums text-white/60">{index + 1} / {items.length}</span>
        </figcaption>
      </figure>
    </div>
  );
}

/* ---------- Client Work section ---------- */
function ClientWork() {
  const [open, setOpen] = useState<{ slug: string; index: number } | null>(null);
  const companies = CLIENT_WORK.map((c) => ({ ...c, images: imagesFor(c.slug) }));
  const active = open ? companies.find((c) => c.slug === open.slug) : null;

  return (
    <Section id="client-work" eyebrow="Client Work"
      title={<>Real work for <span className="text-gradient">real brands</span></>}
      subtitle="Every piece below was designed, written or shipped for a company I worked with. Click any image to view it full size.">
      {companies.map((c) => (
        <div key={c.slug} className="reveal card-elevated mt-8 overflow-hidden first:mt-0">
          <div className="relative overflow-hidden p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-0 opacity-[0.13]" style={{ background: c.gradient }} />
            <div className="relative flex flex-wrap items-start gap-5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white" style={{ background: "var(--gradient-primary)" }}>{c.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold sm:text-2xl">{c.name}</h3>
                  <span className="rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{c.tag}</span>
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-gold)]">{c.role}</div>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">{c.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.achievements.map((a) => (
                    <span key={a} className="inline-flex items-center gap-1.5 rounded-full bg-muted/70 px-3 py-1.5 text-xs font-medium">
                      <CheckCircle2 size={13} className="text-[color:var(--brand-gold)]" /> {a}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {"facebookUrl" in c && c.facebookUrl && (
                  <a href={c.facebookUrl} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-xs font-semibold transition hover:border-[color:var(--brand-royal)] hover:text-[color:var(--brand-royal)]">
                    <Facebook size={13} /> Facebook Page <ExternalLink size={12} />
                  </a>
                )}
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Images size={14} /> {c.images.length} {c.images.length === 1 ? "piece" : "pieces"}
                </div>
              </div>
            </div>
          </div>

          {c.images.length > 0 ? (
            <div className="grid gap-3 border-t border-border p-4 sm:grid-cols-3 sm:p-5 lg:grid-cols-4">
              {c.images.map((img, i) => (
                <button key={img.url} type="button" onClick={() => setOpen({ slug: c.slug, index: i })}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--brand-royal)]/25">
                  <img src={img.url} alt={`${c.name} — ${img.caption}`} loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 transition group-hover:opacity-100" />
                  <span className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-semibold text-white">{img.caption}</span>
                    <Expand size={14} className="shrink-0 text-white/85" />
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="border-t border-border p-4 sm:p-5">
              <div className="grid place-items-center gap-2 rounded-xl border border-dashed border-border bg-muted/40 px-6 py-12 text-center">
                <ImagePlus size={22} className="text-[color:var(--brand-gold)]" />
                <div className="text-sm font-semibold">Photos coming soon</div>
                <p className="max-w-md text-xs text-muted-foreground">
                  Upload the {c.name} artwork and it drops into this gallery automatically.
                </p>
              </div>
            </div>
          )}
        </div>
      ))}

      {active && open && (
        <Lightbox items={active.images} index={open.index}
          setIndex={(i) => setOpen({ slug: active.slug, index: i })}
          onClose={() => setOpen(null)} />
      )}
    </Section>
  );
}

/* ---------- Featured Academic Project: NMB Mobile Banking App ---------- */
function AcademicProject() {
  const screens = [
    { label: "Sign In", g: "linear-gradient(160deg,#0B3D91,#1e5cd6)", icon: <Smartphone size={26} /> },
    { label: "Dashboard", g: "linear-gradient(160deg,#111827,#0B3D91)", icon: <Layout size={26} /> },
    { label: "Transfer", g: "linear-gradient(160deg,#1e5cd6,#F59E0B)", icon: <ArrowUpRight size={26} /> },
  ];
  return (
    <Section
      id="academic"
      eyebrow="Featured Academic Project"
      title={<>NMB Mobile Banking App <span className="text-gradient">UI/UX Design</span></>}
      subtitle="As part of my Graphic Design training at Uncommon.org, I designed a modern mobile banking application interface for NMB Bank — from wireframes to polished, high-fidelity screens."
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        {/* Mockup cluster */}
        <div className="reveal relative">
          <div className="absolute -inset-6 rounded-[2rem] opacity-25 blur-3xl" style={{ background: "var(--gradient-primary)" }} />
          <div className="relative grid grid-cols-3 gap-4 sm:gap-6">
            {screens.map((s, i) => (
              <div
                key={s.label}
                className="group relative aspect-[9/19] overflow-hidden rounded-[2rem] border-[6px] border-foreground/90 bg-black shadow-[var(--shadow-elegant)] transition-transform duration-500 hover:-translate-y-2"
                style={{ transform: `translateY(${i === 1 ? "-14px" : "14px"})` }}
              >
                <div className="absolute inset-0" style={{ background: s.g }} />
                <div className="absolute left-1/2 top-2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/60" />
                <div className="absolute inset-x-3 top-8 rounded-xl bg-white/15 p-2 backdrop-blur">
                  <div className="h-2 w-10 rounded-full bg-white/70" />
                  <div className="mt-1.5 h-1.5 w-16 rounded-full bg-white/40" />
                </div>
                <div className="absolute inset-x-3 top-24 grid gap-2">
                  <div className="h-14 rounded-xl bg-white/15 backdrop-blur" />
                  <div className="h-10 rounded-xl bg-white/10 backdrop-blur" />
                  <div className="h-10 rounded-xl bg-white/10 backdrop-blur" />
                </div>
                <div className="absolute inset-x-3 bottom-4 flex items-center gap-2 rounded-xl bg-white/15 p-2 backdrop-blur">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/25 text-white">{s.icon}</span>
                  <div className="flex-1">
                    <div className="h-1.5 w-14 rounded-full bg-white/70" />
                    <div className="mt-1 h-1.5 w-10 rounded-full bg-white/40" />
                  </div>
                </div>
                <div className="absolute left-3 top-3 rounded-full bg-black/30 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-white/90 backdrop-blur">
                  NMB
                </div>
                <div className="absolute inset-x-0 bottom-[-2px] flex items-center justify-center pb-1">
                  <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-foreground">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Case study body */}
        <div className="reveal space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium">
            <FigmaIcon size={14} className="text-[color:var(--brand-royal)]" />
            Uncommon.org · Graphic Design Training
          </div>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            A complete UI/UX exploration for a mobile banking product — covering onboarding, account dashboards, transfers, bill payments and transaction history. Designed for clarity, trust and effortless day-to-day banking.
          </p>
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-gold)]">Scope of work</div>
            <div className="flex flex-wrap gap-2">
              {["User Interface Design","User Experience Design","Mobile App Layout","Wireframing","Visual Design","Prototyping","Design System"].map((r) => (
                <span key={r} className="rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium">{r}</span>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: <Target size={18} />, t: "Clarity-first UX", d: "Simple flows that reduce friction for daily banking tasks." },
              { icon: <Palette size={18} />, t: "Trusted visual system", d: "Confident colour, typography and iconography." },
              { icon: <Smartphone size={18} />, t: "Mobile-native", d: "Thumb-friendly layouts and native gesture patterns." },
              { icon: <Lightbulb size={18} />, t: "Modern & bold", d: "Fresh interface that stands apart from legacy banking apps." },
            ].map((f) => (
              <div key={f.t} className="card-elevated flex items-start gap-3 p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-white" style={{ background: "var(--gradient-primary)" }}>{f.icon}</span>
                <div>
                  <div className="text-sm font-semibold">{f.t}</div>
                  <div className="text-xs text-muted-foreground">{f.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Tools:</span> Figma · Canva
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Education & Learning Journey ---------- */
function Education() {
  const items = [
    { t: "Digital Marketing Graduate", d: "Completed the Uncommon.org Digital Marketing program — strategy, SEO, paid media, analytics and campaign management.", icon: <Megaphone size={18} />, tag: "Graduate" },
    { t: "Graphic Design Training", d: "Hands-on training in brand identity, layout, typography and mobile app UI/UX using Figma and Canva.", icon: <Palette size={18} />, tag: "Completed" },
    { t: "Web Development Training", d: "Built responsive websites and landing pages with HTML, CSS and modern tooling — from wireframe to launch.", icon: <Code2 size={18} />, tag: "Completed" },
    { t: "Teacher Training Program", d: "Currently developing teaching, mentoring, leadership and classroom facilitation skills at Uncommon.org.", icon: <GraduationCap size={18} />, tag: "In Progress" },
  ];
  return (
    <Section
      id="education"
      eyebrow="Education & Learning Journey"
      title={<>My path at <span className="text-gradient">Uncommon.org</span></>}
      subtitle="A learning journey that has equipped me with practical skills in digital marketing, graphic design, website development, and leadership."
    >
      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-border md:left-1/2" />
        <div className="space-y-10">
          {items.map((it, i) => (
            <div key={it.t} className={`reveal relative grid gap-6 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:col-start-2" : ""}`}>
              <div className={`pl-12 md:pl-0 ${i % 2 ? "md:pr-12 md:text-right" : "md:pr-12"}`}>
                <div className="card-elevated p-6">
                  <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-gold)] ${i % 2 ? "md:justify-end" : ""}`}>
                    <BookOpen size={14} /> Uncommon.org · {it.tag}
                  </div>
                  <h3 className="mt-2 flex items-center gap-2 text-lg font-semibold md:inline-flex">
                    <span className="grid h-8 w-8 place-items-center rounded-lg text-white" style={{ background: "var(--gradient-primary)" }}>{it.icon}</span>
                    {it.t}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
                </div>
              </div>
              <div className="absolute left-4 top-6 grid h-4 w-4 -translate-x-1/2 place-items-center md:left-1/2">
                <span className="h-4 w-4 rounded-full ring-4 ring-background" style={{ background: "var(--gradient-gold)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Teaching & Community Impact ---------- */
function Teaching() {
  return (
    <Section
      id="teaching"
      eyebrow="Teaching & Community Impact"
      title={<>Empowering the <span className="text-gradient">next generation</span></>}
      subtitle="Beyond client work, I invest my time in mentoring young learners and developing my own teaching craft."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Scratch Coding Volunteer */}
        <article className="reveal card-elevated relative overflow-hidden p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-25 blur-3xl" style={{ background: "var(--gradient-primary)" }} />
          <div className="flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white" style={{ background: "var(--gradient-primary)" }}>
              <Code2 size={26} />
            </span>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-gold)]">Volunteer</div>
              <h3 className="mt-1 text-xl font-bold">Scratch Coding Facilitator</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                I volunteer as a Scratch Coding Facilitator, helping young learners understand the basics of programming through fun and interactive coding activities.
              </p>
            </div>
          </div>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {[
              "Teaching Scratch Programming",
              "Mentoring Students",
              "Creating Interactive Lessons",
              "Encouraging Creativity Through Tech",
            ].map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[color:var(--brand-gold)]" /> <span>{r}</span>
              </li>
            ))}
          </ul>
        </article>

        {/* Teacher Training */}
        <article className="reveal card-elevated relative overflow-hidden p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-25 blur-3xl" style={{ background: "var(--gradient-gold)" }} />
          <div className="flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white" style={{ background: "var(--gradient-gold)" }}>
              <GraduationCap size={26} />
            </span>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-gold)]">Currently Enrolled</div>
              <h3 className="mt-1 text-xl font-bold">Teacher Training Program</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                I'm currently participating in the Uncommon.org Teacher Training Program, developing my teaching, leadership, mentoring, and classroom facilitation skills.
              </p>
            </div>
          </div>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {[
              "Teaching & Facilitation",
              "Leadership Development",
              "Mentoring & Coaching",
              "Curriculum & Lesson Design",
            ].map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[color:var(--brand-gold)]" /> <span>{r}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      {/* Professional statement */}
      <div className="reveal mt-12 relative overflow-hidden rounded-3xl border border-border p-8 sm:p-12" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}>
        <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-gold)" }} />
        <Quote className="text-white/70" size={40} />
        <p className="mt-4 max-w-4xl text-lg font-medium leading-relaxed text-white sm:text-2xl">
          "I believe that great digital experiences are created through the perfect combination of strategy, creativity, technology, and continuous learning. My goal is to help businesses and communities grow by delivering impactful marketing, beautiful designs, innovative websites, and meaningful digital solutions."
        </p>
        <div className="mt-6 flex items-center gap-3 text-white/90">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white/15 font-bold backdrop-blur">MM</span>
          <div>
            <div className="text-sm font-semibold">Michael Mandongwe</div>
            <div className="text-xs text-white/70">Digital Marketing · Design · Web · Teaching</div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Experience ---------- */
function Experience() {
  const items = [
    {
      role: "Graphic Designer & Digital Marketer", org: "Baby Hub",
      d: "Designed the store's Black Friday campaign for a baby clothing and essentials brand — promotional flyers, social media creatives and product-led ads built around a limited-offers sale.",
    },
    {
      role: "Graphic Designer & Digital Marketer", org: "Springridge Learning Academy",
      d: "Designing the school's admissions and scholarship campaign — enrolment posters, prospectus sheets, promotional flyers and the academy crest, supporting enrolment growth for Warren Park D, Harare.",
    },
    {
      role: "Digital Marketing Specialist", org: "Dynamic Sales Solutions",
      d: "Managed digital campaigns, social media platforms, branding, and online growth strategies across LinkedIn and Facebook.",
    },
    {
      role: "Digital Marketer & Sales Representative", org: "Clothsations",
      d: "Ran digital marketing campaigns, customer engagement, Meta advertising, and promotional design.",
    },
    {
      role: "Freelance Digital Marketing, Graphic Design & Website Design", org: "Independent",
      d: "Helping businesses build strong brands through strategic marketing, creative design, and professional websites.",
    },
  ];
  return (
    <Section id="experience" eyebrow="Experience" title={<>A journey of <span className="text-gradient">real client impact</span></>}>
      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-border md:left-1/2" />
        <div className="space-y-10">
          {items.map((it, i) => (
            <div key={it.org} className={`reveal relative grid gap-6 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:col-start-2" : ""}`}>
              <div className={`pl-12 md:pl-0 ${i % 2 ? "md:pr-12 md:text-right" : "md:pr-12"}`}>
                <div className="card-elevated p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-gold)]">
                    <Briefcase size={14} /> {it.org}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">{it.role}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
                </div>
              </div>
              <div className="absolute left-4 top-6 grid h-4 w-4 -translate-x-1/2 place-items-center md:left-1/2">
                <span className="h-4 w-4 rounded-full ring-4 ring-background" style={{ background: "var(--gradient-primary)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Certifications ---------- */
function Certifications() {
  const items = [
    { t: "Digital Marketing", o: "Uncommon.org", i: <Megaphone size={20} />, file: "/certificates/digital-marketing.pdf" },
    { t: "Web Development Certificate", o: "Certified Training", i: <Code2 size={20} />, file: "/certificates/web-development.pdf" },
    { t: "Graphic Design Training", o: "Crash Course", i: <Palette size={20} />, file: "/certificates/graphic-design.pdf" },
    { t: "Google Analytics", o: "Google", i: <TrendingUp size={20} />, file: "/certificates/google-analytics.pdf" },
    { t: "Meta Digital Marketing", o: "Meta", i: <Target size={20} />, file: "/certificates/meta-digital-marketing.pdf" },
  ];
  return (
    <Section id="certifications" eyebrow="Certifications" title={<>Trained & <span className="text-gradient">certified</span></>} subtitle="Click any certificate to view or download.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <div key={c.t} className="reveal card-elevated flex items-start gap-4 p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white" style={{ background: "var(--gradient-primary)" }}>{c.i}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-gold)]">
                <GraduationCap size={14} /> Certificate
              </div>
              <h3 className="mt-1 text-base font-semibold">{c.t}</h3>
              <p className="text-sm text-muted-foreground">{c.o}</p>
              <a href={c.file} download target="_blank" rel="noreferrer"
                 className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--brand-royal)] hover:underline">
                <Download size={13} /> View / Download
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
        <Award size={16} className="text-[color:var(--brand-gold)]" />
        Have a look at my full CV for the complete list.
        <a href="/cv.pdf" download="Michael-Mandongwe-CV.pdf" className="btn-primary !py-2 !px-4 text-sm"><Download size={14} /> Download CV</a>
      </div>
    </Section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const items = [
    { n: "Tendai M.", r: "Founder, Startup Studio", q: "Michael combined sharp strategy with beautiful design. Our leads doubled within two months of relaunching with him.", init: "TM" },
    { n: "Rutendo S.", r: "Marketing Manager", q: "The most professional creative I've worked with — deadlines met, communication clear, and the work always on-brand.", init: "RS" },
    { n: "Kudzai C.", r: "Owner, Retail Brand", q: "From logo to Meta ads, Michael delivered an identity that finally feels premium. Our engagement is up across the board.", init: "KC" },
    { n: "Farai N.", r: "Operations Lead", q: "He rebuilt our website in Lovable AI and it converts far better than the previous one. Fast, polished, and mobile-first.", init: "FN" },
  ];
  return (
    <Section id="testimonials" eyebrow="Testimonials" title={<>Clients I've had the honor of <span className="text-gradient">working with</span></>}>
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((t) => (
          <blockquote key={t.n} className="reveal card-elevated relative p-6">
            <div className="mb-3 flex gap-0.5 text-[color:var(--brand-gold)]">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="text-base leading-relaxed">"{t.q}"</p>
            <footer className="mt-5 flex items-center gap-3 border-t border-border pt-4">
              <span className="grid h-11 w-11 place-items-center rounded-full text-white font-semibold" style={{ background: "var(--gradient-primary)" }}>{t.init}</span>
              <div>
                <div className="text-sm font-semibold">{t.n}</div>
                <div className="text-xs text-muted-foreground">{t.r}</div>
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = encodeURIComponent(String(data.get("name") || ""));
    const message = encodeURIComponent(String(data.get("message") || ""));
    const email = encodeURIComponent(String(data.get("email") || ""));
    window.location.href = `mailto:mandongwemichael@gmail.com?subject=New enquiry from ${name}&body=${message}%0A%0AFrom: ${name} (${email})`;
    setSent(true);
  };
  return (
    <Section id="contact" eyebrow="Contact" title={<>Let's build something <span className="text-gradient">remarkable</span></>} subtitle="Have a project or a role in mind? I usually reply within a few hours.">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <form onSubmit={onSubmit} className="reveal card-elevated grid gap-4 p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="name" label="Name" placeholder="Your full name" required />
            <Field name="email" label="Email" type="email" placeholder="you@company.com" required />
            <Field name="phone" label="Phone" placeholder="e.g. +263 77 555 0100" />
            <Field name="company" label="Company" placeholder="Company / Brand" />
          </div>
          <label className="grid gap-2">
            <span className="text-sm font-medium">Message</span>
            <textarea name="message" required rows={5} placeholder="Tell me about your project, goals and timeline…"
              className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-[color:var(--brand-royal)] focus:ring-4 focus:ring-[color:var(--brand-royal)]/15" />
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="btn-primary"><Send size={16} /> Send message</button>
            <a href="https://wa.me/263775696593" target="_blank" rel="noreferrer" className="btn-gold"><MessageCircle size={16} /> WhatsApp</a>
            {sent && <span className="text-sm text-muted-foreground">Opening your email client…</span>}
          </div>
        </form>

        <div className="reveal grid gap-4">
          {[
            { i: <Mail size={18} />, l: "Email", v: "mandongwemichael@gmail.com", h: "mailto:mandongwemichael@gmail.com" },
            { i: <Phone size={18} />, l: "Phone", v: "0775 696 593 · 0718 387 826", h: "tel:+263775696593" },
            { i: <MessageCircle size={18} />, l: "WhatsApp", v: "0775 696 593 · 0718 387 826", h: "https://wa.me/263775696593" },
            { i: <MapPin size={18} />, l: "Location", v: "Harare, Zimbabwe" },
          ].map((c) => (
            <a key={c.l} href={c.h || "#"} className="card-elevated flex items-center gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white" style={{ background: "var(--gradient-primary)" }}>{c.i}</span>
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.l}</div>
                <div className="truncate text-sm font-medium">{c.v}</div>
              </div>
            </a>
          ))}
          <div className="card-elevated p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Social</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { i: <Linkedin size={18} />, h: "https://www.linkedin.com/in/michael-mandongwe-872b8a347" },
                { i: <Facebook size={18} />, h: "https://facebook.com" },
                { i: <MessageCircle size={18} />, h: "https://wa.me/263775696593" },
                { i: <Mail size={18} />, h: "mailto:mandongwemichael@gmail.com" },
              ].map((s, idx) => (
                <a key={idx} href={s.h} target="_blank" rel="noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-full border border-border transition hover:-translate-y-1 hover:text-white"
                  style={{ transitionProperty: "transform, background, color" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gradient-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                >
                  {s.i}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Field({ name, label, type = "text", placeholder, required }: { name: string; label: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium">{label}{required && <span className="text-[color:var(--brand-gold)]"> *</span>}</span>
      <input name={name} type={type} required={required} placeholder={placeholder}
        className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-[color:var(--brand-royal)] focus:ring-4 focus:ring-[color:var(--brand-royal)]/15" />
    </label>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="relative mt-10 border-t border-border bg-[color:var(--surface)]">
      <div className="container-x py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full text-white font-bold" style={{ background: "var(--gradient-primary)" }}>MM</span>
              <div>
                <div className="font-display text-lg font-bold">Michael Mandongwe</div>
                <div className="text-xs text-muted-foreground">Digital Marketing · Graphic Design · Website Design</div>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Helping ambitious brands grow with strategy, design and technology — from Harare to the world.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold">Explore</div>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              {NAV.slice(0, 5).map((n) => <li key={n.id}><a href={`#${n.id}`} className="hover:text-foreground">{n.label}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold">More</div>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              {NAV.slice(5).map((n) => <li key={n.id}><a href={`#${n.id}`} className="hover:text-foreground">{n.label}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Michael Mandongwe. All rights reserved.</div>
          <div className="flex items-center gap-3">
            <a href="https://www.linkedin.com/in/michael-mandongwe-872b8a347" target="_blank" rel="noreferrer" className="hover:text-foreground"><Linkedin size={16} /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-foreground"><Facebook size={16} /></a>
            <a href="mailto:mandongwemichael@gmail.com" className="hover:text-foreground"><Mail size={16} /></a>
            <a href="https://wa.me/263775696593" target="_blank" rel="noreferrer" className="hover:text-foreground"><MessageCircle size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
function Portfolio() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  useReveal();

  return (
    <div className="min-h-screen bg-background text-foreground bg-aurora">
      <div className="aurora-layer" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
      <Nav dark={dark} setDark={setDark} />
      <main className="relative">
        <Hero />
        <HalfBanner />
        <About />
        <Skills />
        <Services />
        <Portfolio_Section />
        <ClientWork />
        <AcademicProject />
        <Education />
        <Teaching />
        <Experience />
        <Certifications />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
