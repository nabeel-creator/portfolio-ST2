"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
const SKILLS = ["Django", "React", "Framer Motion", "HTML", "CSS", "JavaScript", "WordPress", "Full-Stack"];
const TAGS = ["Full-Stack", "UI/UX", "Django Dev", "Freelancer", "React"];
const WORK = [
  {
    num: "01",
    title: "HydroInsight",
    cat: "Full-Stack Web App",
    desc: "A comprehensive blog platform for Water Resource Management and Sustainable Solutions by Engr. Haseeb Ahsan. Features a high-traffic production setup and an advanced admin panel for full control over performance and bloggers.",
    color: "bg-[#3B1F0F]"
  },
  {
    num: "02",
    title: "Forge & Flourish",
    cat: "Life Dashboard",
    desc: "(In Development) A custom life dashboard tracking time, habits, and coding/fitness goals. Includes modules for daily planning, focus sessions, task management, and distraction awareness to support consistent growth.",
    color: "bg-[#C9A882]"
  },
  {
    num: "03",
    title: "N-Car Rent",
    cat: "Booking Platform",
    desc: "A web-based platform allowing users to search, book, and manage vehicle rentals from various providers, complete with a review system for a convenient and efficient transportation solution.",
    color: "bg-[#E8DDD0]"
  },
];
const CERTS = [
  { org: "AWS", title: "Solutions Architecture Job Simulation" },
  { org: "JPMorganChase", title: "Software Engineering Job Simulation" },
];
const EDU = [
  { school: "The Superior University", degree: "BS Computer Software Engineering", period: "2024 - 2028" },
  { school: "Punjab Group of Colleges", degree: "Pre-Engineering", period: "2022 - 2024" },
];
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
function HorizontalSkillStrip() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-18%"]);
  const xReverse = useTransform(scrollYProgress, [0, 1], ["-8%", "18%"]);
  const row1 = ["Django", "React", "Framer Motion", "Full-Stack", "HTML / CSS"];
  const row2 = ["JavaScript", "WordPress", "UI/UX Design", "REST APIs", "Responsive Design"];
  return (
    <div ref={ref} className="py-16 overflow-hidden border-y border-[#3B1F0F]/10">
      <motion.div style={{ x }} className="flex gap-4 mb-4 whitespace-nowrap">
        {[...row1, ...row1].map((skill, i) => (
          <motion.div
            key={i}
            whileHover={{ backgroundColor: "#3B1F0F", color: "#F5EFE4", scale: 1.04 }}
            transition={{ duration: 0.22 }}
            className="flex-shrink-0 px-7 py-4 rounded-2xl border border-[#3B1F0F]/18 bg-[#EDE6D8]/50 cursor-default"
          >
            <span className="text-base font-bold tracking-[-0.01em] text-[#1C140E]">{skill}</span>
          </motion.div>
        ))}
      </motion.div>
      <motion.div style={{ x: xReverse }} className="flex gap-4 whitespace-nowrap">
        {[...row2, ...row2].map((skill, i) => (
          <motion.div
            key={i}
            whileHover={{ backgroundColor: "#F4B400", color: "#1C140E", scale: 1.04 }}
            transition={{ duration: 0.22 }}
            className="flex-shrink-0 px-7 py-4 rounded-2xl border border-[#3B1F0F]/18 bg-[#F5EFE4] cursor-default"
          >
            <span className="text-base font-bold tracking-[-0.01em] text-[#1C140E]">{skill}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
function ParallaxCards() {
  const CARDS = [
    {
      type: "cert",
      org: "AWS",
      title: "Solutions Architecture Job Simulation",
      year: "2024",
      bg: "bg-[#3B1F0F]",
      text: "text-[#F5EFE4]",
      muted: "text-[#F5EFE4]/45",
      accent: "#F4B400",
      yOffset: 0,
    },
    {
      type: "cert",
      org: "JPMorganChase",
      title: "Software Engineering Job Simulation",
      year: "2024",
      bg: "bg-[#F4B400]",
      text: "text-[#1C140E]",
      muted: "text-[#1C140E]/50",
      accent: "#3B1F0F",
      yOffset: 0,
    },
    {
      type: "edu",
      org: "The Superior University",
      title: "BS Computer Software Engineering",
      year: "2024 - 2028",
      bg: "bg-[#EDE6D8]",
      text: "text-[#1C140E]",
      muted: "text-[#3B1F0F]/45",
      accent: "#3B1F0F",
      yOffset: 0,
    },
    {
      type: "edu",
      org: "Punjab Group of Colleges",
      title: "Pre-Engineering",
      year: "2022 - 2024",
      bg: "bg-[#1C140E]",
      text: "text-[#F5EFE4]",
      muted: "text-[#F5EFE4]/40",
      accent: "#C9A882",
      yOffset: 0,
    },
  ];
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  return (
    <div
      ref={containerRef}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {CARDS.map((card, i) => (
        <ParallaxCard key={i} card={card} index={i} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}
function ParallaxCard({ card, index, scrollYProgress }) {
  const speeds = [0, -40, -20, -60];
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [speeds[index] + 60, speeds[index] - 60]
  );
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.75, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.025, zIndex: 10 }}
    >
      <div className={`${card.bg} rounded-2xl p-7 min-h-[200px] flex flex-col justify-between relative overflow-hidden group cursor-default`}>
        <span
          style={{ fontFamily: "'DM Mono', monospace" }}
          className={`absolute -bottom-4 -right-2 text-[7rem] font-black leading-none select-none pointer-events-none ${card.muted} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex justify-between items-start">
          <div>
            <span
              style={{ fontFamily: "'DM Mono', monospace" }}
              className={`text-[0.6rem] tracking-[0.18em] uppercase font-semibold ${card.muted}`}
            >
              {card.type === "cert" ? "Certification" : "Education"}
            </span>
            <p className={`text-[0.72rem] font-bold tracking-[0.1em] uppercase mt-0.5 ${card.text}`}>
              {card.org}
            </p>
          </div>
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
            className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
            style={{ backgroundColor: card.accent }}
          />
        </div>
        <div>
          <p className={`text-xl font-extrabold leading-snug tracking-[-0.02em] mb-3 max-w-[24ch] ${card.text}`}>
            {card.title}
          </p>
          <div className="flex items-center gap-2">
            <span
              className="text-[0.6rem] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border"
              style={{ borderColor: card.accent + "55", color: card.accent }}
            >
              {card.year}
            </span>
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              whileHover={{ opacity: 1, x: 0 }}
              className={`text-sm ${card.muted}`}
            >
              ↗
            </motion.span>
          </div>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out rounded-b-2xl"
          style={{ backgroundColor: card.accent }}
        />
      </div>
    </motion.div>
  );
}
function Marquee({ text }) {
  const repeated = Array(8).fill(text).join(" . ");
  return (
    <div className="overflow-hidden border-y border-[#3B1F0F]/20 py-3 my-20">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1].map((i) => (
          <span key={i} className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-[#3B1F0F]/40 pr-8">
            {repeated}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
function Crosshair({ size = 32, color = "#3B1F0F" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <line x1="16" y1="0" x2="16" y2="32" stroke={color} strokeWidth="0.8" strokeOpacity="0.45" />
      <line x1="0" y1="16" x2="32" y2="16" stroke={color} strokeWidth="0.8" strokeOpacity="0.45" />
      <circle cx="16" cy="16" r="4" stroke={color} strokeWidth="0.8" strokeOpacity="0.45" fill="none" />
    </svg>
  );
}
export default function NabeelPortfolio() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const [hovered, setHovered] = useState(null);
  return (
    <div
      ref={containerRef}
      style={{ fontFamily: "'Syne', 'Helvetica Neue', Arial, sans-serif" }}
      className="min-h-screen bg-[#F5EFE4] text-[#1C140E] overflow-x-hidden"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: #3B1F0F; color: #F5EFE4; }
      `}</style>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex justify-between items-center px-2 md:px-8 py-2 sticky top-0 z-50 bg-[#F5EFE4]/90 backdrop-blur-sm border-b border-[#3B1F0F]/10"
      >
        <span className="">
          <img src="/logo.png" alt="Logo" className="w-14 h-14" />
        </span>
        <div className="hidden md:flex items-center gap-2">
          {["Work", "About", "Skills", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-4 py-2 rounded-full text-[0.62rem] font-semibold tracking-[0.15em] uppercase text-[#1C140E]/60 hover:text-[#F5EFE4] hover:bg-[#3B1F0F] transition-all duration-500 ease-out"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="mailto:mun73350@gmail.com"
          className="text-[0.62rem] font-bold tracking-[0.12em] uppercase bg-[#3B1F0F] text-[#F5EFE4] px-4 py-2 rounded-full hover:bg-[#5C2F14] transition-colors duration-200"
        >
          Hire Me
        </a>
      </motion.nav>
      <section id="about" className="relative px-6 md:px-12 pt-14 pb-4 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-end gap-8 lg:gap-12">
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-2 mb-7"
            >
              {["Full-Stack", "UI/UX", "Django Dev", "Freelancer", "React"].map((t) => (
                <span
                  key={t}
                  className="text-[0.6rem] font-semibold tracking-[0.14em] uppercase border border-[#3B1F0F]/25 rounded-full px-3 py-1 text-[#3B1F0F]/60"
                >
                  {t}
                </span>
              ))}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="font-extrabold leading-[0.88] tracking-[-0.04em] mb-8 "
              style={{ fontSize: "clamp(3rem, 7.9vw, 8rem)" }}
            >
              Nabeel
              <br />
              <span className="text-[#3B1F0F] z-10">Mubashar</span>
              <span className="text-[#3B1F0F]/25">.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm text-[#1C140E]/50 max-w-[38ch] leading-[1.78] font-light"
            >
              Passionate web developer from Pakistan building responsive,
              full-stack applications using React, Django, and WordPress.
              Available for freelance projects.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex-shrink-0 w-full lg:w-[340px] xl:w-[390px]"
          >
            <div className="absolute -top-3 -right-3 z-20 w-9 h-9 rounded-full bg-[#1C140E] flex items-center justify-center shadow-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5EFE4" strokeWidth="1.6">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
              </svg>
            </div>
            <div
              className="relative w-full aspect-[3/4] bg-[#F4B400] overflow-hidden"
              style={{ borderRadius: "2rem 2rem 2rem 0" }}
            >
              <div className="absolute top-5 left-5 z-10 pointer-events-none select-none">
                <svg width="120" height="44" viewBox="0 0 120 44" fill="none">
                  <path
                    d="M8 32 Q18 8 28 20 Q34 28 40 16 Q48 4 56 22 Q62 34 72 18 Q80 6 88 24 Q94 36 104 20 Q110 12 116 24"
                    stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.7"
                  />
                  <path
                    d="M12 38 Q30 30 50 36 Q70 40 90 34 Q104 30 112 36"
                    stroke="white" strokeWidth="1" strokeLinecap="round" fill="none" strokeOpacity="0.4"
                  />
                </svg>
              </div>
              <img
                src="/myimg2.png"
                alt="Nabeel Mubashar"
                className="absolute bottom-10 w-full h-90 object-cover object-bottom"
              />
              <div className="absolute inset-0 flex items-center justify-center text-[#F4B400]/0">
              </div>
              <div
                className="absolute bottom-0 left-0 w-[90px] h-[90px] bg-[#F5EFE4] z-10"
                style={{ borderTopRightRadius: "1.5rem" }}
              />
              <div className="absolute bottom-3 left-3 z-20 flex flex-col items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#C9A882] border-2 border-[#F5EFE4] overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[#C9A882] to-[#8B5E3C]" />
                </div>
                <div className="w-9 h-9 rounded-full bg-[#3B1F0F] border-2 border-[#F5EFE4] overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[#3B1F0F] to-[#1C140E]" />
                </div>
                <motion.a
                  href="mailto:mun73350@gmail.com"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-[#1C140E] flex items-center justify-center shadow-md"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5EFE4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </motion.a>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-4 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B1F0F] inline-block" />
              <span
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="text-[0.6rem] tracking-widest uppercase text-[#3B1F0F]/50"
              >
                Lahore, Pakistan
              </span>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute top-12 right-14 opacity-20 hidden xl:block">
          <Crosshair size={48} />
        </div>
      </section>
      <Marquee text="Full-Stack Development" />
      <section id="work" className="px-6 md:px-12 pb-4">
        <FadeUp>
          <div className="flex items-start gap-10 mb-10">
            <span
              style={{ fontFamily: "'DM Mono', monospace" }}
              className="text-[0.62rem] tracking-widest uppercase text-[#3B1F0F]/40 mt-2"
            >
              01
            </span>
            <h2
              className="font-extrabold leading-[0.9] tracking-[-0.03em] lowercase"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)" }}
            >
              selected
              <br />
              work
            </h2>
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {WORK.map((item, i) => (
            <FadeUp key={item.num} delay={i * 0.08} className="h-full">
              <motion.div
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                className={`${item.color} rounded-[2rem] p-6 lg:p-8 min-h-[440px] flex flex-col justify-between cursor-pointer group relative overflow-hidden h-full`}
                whileHover={{ scale: 0.98, y: -8 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-white opacity-[0.03] group-hover:scale-[1.5] transition-transform duration-700 ease-out pointer-events-none" />
                <div className="flex justify-between items-start relative z-10 w-full top-0">
                  <span
                    style={{ fontFamily: "'DM Mono', monospace" }}
                    className={`text-[0.62rem] font-bold tracking-widest ${item.color === "bg-[#3B1F0F]" ? "text-[#F5EFE4]/50" : "text-[#3B1F0F]/50"}`}
                  >
                    {item.num}
                  </span>
                  <motion.div
                    animate={{ rotate: hovered === i ? 90 : 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <Crosshair size={26} color={item.color === "bg-[#3B1F0F]" ? "#F5EFE4" : "#3B1F0F"} />
                  </motion.div>
                </div>
                <div className="relative z-10 mt-12 flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[0.55rem] font-extrabold tracking-[0.15em] uppercase border rounded-full px-3 py-1.5 ${item.color === "bg-[#3B1F0F]"
                        ? "border-[#F5EFE4]/20 text-[#F5EFE4]/80 bg-[#F5EFE4]/5"
                        : "border-[#3B1F0F]/20 text-[#3B1F0F]/80 bg-[#3B1F0F]/5"
                        } backdrop-blur-md`}
                    >
                      {item.cat}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3
                      className={`text-[1.6rem] md:text-[1.4rem] lg:text-[1.6rem] font-extrabold tracking-tight leading-[1.1] ${item.color === "bg-[#3B1F0F]" ? "text-[#F5EFE4]" : "text-[#1C140E]"}`}
                    >
                      {item.title}
                    </h3>
                    <div className="h-[1px] w-12 bg-current opacity-20 my-1 group-hover:w-full transition-all duration-700 ease-in-out" style={{ color: item.color === "bg-[#3B1F0F]" ? "#F5EFE4" : "#1C140E" }} />
                    <div className="overflow-hidden transition-all duration-500 ease-out opacity-85 md:opacity-50 md:group-hover:opacity-100 md:translate-y-3 md:group-hover:translate-y-0">
                      <p className={`text-[0.8rem] sm:text-[0.85rem] font-medium leading-[1.65] shadow-sm ${item.color === "bg-[#3B1F0F]" ? "text-[#F5EFE4]/90" : "text-[#1C140E]/80"}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>
      <Marquee text="React . Django . WordPress" />
<section id="skills" className="overflow-hidden">
  <HorizontalSkillStrip />
  <div className="px-6 md:px-12 pt-24 pb-4">
    <FadeUp>
      <div className="flex items-end justify-between mb-14">
        <div className="flex items-start gap-8">
          <span
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="text-[0.62rem] tracking-widest uppercase text-[#3B1F0F]/40 mt-2"
          >
            02
          </span>
          <h2
            className="font-extrabold leading-[0.88] tracking-[-0.035em] lowercase"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)" }}
          >
            credentials
            <br />
            <span className="text-[#3B1F0F]">that count.</span>
          </h2>
        </div>
        <span
          style={{ fontFamily: "'DM Mono', monospace" }}
          className="hidden md:block text-[0.6rem] tracking-widest uppercase text-[#3B1F0F]/30 mb-2"
        >
          scroll to explore
        </span>
      </div>
    </FadeUp>
    <ParallaxCards />
  </div>
</section>
      <Marquee text="Available for Freelance Projects" />
      <section id="contact" className="px-6 md:px-12 py-20">
        <FadeUp>
          <h2
            className="font-extrabold leading-[0.88] tracking-[-0.04em] lowercase mb-12"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
          >
            let's
            <br />
            build
            <br />
            <span className="text-[#3B1F0F]">something.</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mb-12">
            {[
              { label: "Email", value: "mun73350@gmail.com", href: "mailto:mun73350@gmail.com" },
              { label: "Phone", value: "03134922658", href: "tel:03134922658" },
              { label: "LinkedIn", value: "nabeel-mubashar", href: "https://www.linkedin.com/in/nabeel-mubashar-2b3197299" },
              { label: "Portfolio", value: "nabeelmubashar.info", href: "https://nabeelmubashar.info" },
              { label: "Location", value: "Sharaqpur Sharif, Sheikhupura", href: null },
            ].map((c, i) => (
              <div key={i} className="border border-[#3B1F0F]/15 rounded-2xl p-5 bg-[#EDE6D8]/40">
                <p
                  style={{ fontFamily: "'DM Mono', monospace" }}
                  className="text-[0.6rem] tracking-widest uppercase text-[#3B1F0F]/40 mb-1"
                >
                  {c.label}
                </p>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="text-sm font-bold text-[#1C140E] hover:text-[#3B1F0F] transition-colors"
                  >
                    {c.value}
                  </a>
                ) : (
                  <p className="text-sm font-bold text-[#1C140E]">{c.value}</p>
                )}
              </div>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={0.15}>
          <motion.a
            href="mailto:mun73350@gmail.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-[#3B1F0F] text-[#F5EFE4] text-[0.72rem] font-bold tracking-[0.14em] uppercase px-8 py-4 rounded-full hover:bg-[#5C2F14] transition-colors duration-200"
          >
            Start a Project
          </motion.a>
        </FadeUp>
      </section>
      <footer className="px-6 md:px-12 py-6 border-t border-[#3B1F0F]/12 flex flex-col md:flex-row justify-between items-center gap-3">
        <span
          style={{ fontFamily: "'DM Mono', monospace" }}
          className="text-[0.6rem] tracking-widest uppercase text-[#1C140E]/35"
        >
          2024 Nabeel Mubashar
        </span>
        <div className="flex gap-6">
          {["LinkedIn", "Portfolio", "Email"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-[0.6rem] tracking-widest uppercase text-[#1C140E]/35 hover:text-[#1C140E] transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}