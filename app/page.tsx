'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import {
    Cpu,
    Sparkles,
    Brain,
    Code,
    Star,
    Palette,
    Flame,
    ChevronRight,
    Globe,
    Compass,
    Zap,
    Moon,
    ShieldCheck,
    Users,
    Trophy,
    ArrowRight,
    Lock,
    CheckCircle2,
    Gem,
    Infinity as InfinityIcon,
    Wind,
    Atom,
    Eye,
    Activity,
    Layers,
    BookOpen,
    Mic,
    Video,
    MapPin,
    Twitter,
    Instagram,
    Linkedin
} from 'lucide-react';

// --- Constants & Data ---
const GEMS = [
    { id: 1, icon: <Code size={20} />, label: "Dev", x: "12%", y: "15%", speed: 0.05 },
    { id: 2, icon: <Brain size={20} />, label: "Logic", x: "85%", y: "12%", speed: 0.03 },
    { id: 3, icon: <Star size={20} />, label: "Astro", x: "8%", y: "80%", speed: 0.04 },
    { id: 4, icon: <Palette size={20} />, label: "Art", x: "90%", y: "75%", speed: 0.06 },
    { id: 5, icon: <InfinityIcon size={20} />, label: "Flow", x: "50%", y: "8%", speed: 0.02 },
];

const CURRICULUM = {
    genius: [
        { title: "Advanced Programming", level: "Expert", duration: "12 Weeks", desc: "Master coding from basics to building real-world applications." },
        { title: "Strategic Chess Training", level: "Pro", duration: "8 Weeks", desc: "Learn winning strategies from professional chess coaches." },
        { title: "System Design", level: "Advanced", duration: "16 Weeks", desc: "Build scalable software systems used by millions." }
    ],
    life: [
        { title: "Astrology & Self-Discovery", level: "Beginner", duration: "6 Weeks", desc: "Understand your birth chart and life path through ancient wisdom." },
        { title: "Yoga & Meditation", level: "All Levels", duration: "Ongoing", desc: "Transform your mind and body with expert-guided practices." },
        { title: "Culinary Arts", level: "Creative", duration: "4 Weeks", desc: "Cook like a chef with techniques from around the world." }
    ]
};

const FEATURES = [
    { icon: <Layers size={24} />, title: "Interactive Whiteboard", desc: "Collaborate in real-time with your mentor on a shared canvas." },
    { icon: <Brain size={24} />, title: "Smart Notes", desc: "AI automatically creates summaries and action items from each session." },
    { icon: <Video size={24} />, title: "Session Recordings", desc: "Rewatch any lesson with HD recordings and searchable transcripts." },
    { icon: <Mic size={24} />, title: "Focus Music", desc: "Built-in ambient sounds to help you concentrate during learning." }
];

const MENTORS = [
    { name: "Dr. Aris Thorne", role: "Quantum Physics", hub: "Genius Hub", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200" },
    { name: "Elena Veda", role: "Astrology & Flow", hub: "Life Hub", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200" },
    { name: "Marcus Chen", role: "Grandmaster Chess", hub: "Genius Hub", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200" },
    { name: "Sola Rin", role: "Culinary Artist", hub: "Life Hub", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200" },
];

// --- Sub-Components ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onComplete, 2200);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        >
            <div className="relative">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 border-t-2 border-white/20 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] tracking-[0.5em] text-white font-black italic">THETHESIS</span>
                </div>
            </div>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-xs uppercase tracking-widest text-white/40 font-medium"
            >
                Loading...
            </motion.div>
        </motion.div>
    );
};

const SectionHeader = ({ subtitle, title, align = "left" }: { subtitle: string, title: string, align?: "left" | "center" }) => (
    <div className={`mb-24 ${align === "center" ? "text-center" : "text-left"}`}>
        <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-black mb-6 block"
        >
            {subtitle}
        </motion.span>
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.8]"
        >
            {title}
        </motion.h2>
    </div>
);

const OrbitNav = () => {
    return (
        <div className="relative flex items-center justify-center w-48 h-48 z-50">
            <motion.div
                className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.05)] overflow-hidden group"
                whileHover={{ scale: 1.1 }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] md:text-xs font-black tracking-[0.3em] text-white z-10 italic">THETHESIS</span>
            </motion.div>

            {[0, 120, 240].map((angle, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "linear" }}
                    style={{ width: '100%', height: '100%' }}
                >
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/40"
                        style={{ transform: `rotate(-${angle}deg)` }}
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

const GatewayCard = ({ title, subtitle, icon: Icon, features, themeColor, onHover, isActive, href }: any) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - rect.left) / rect.width) - 0.5);
        y.set(((e.clientY - rect.top) / rect.height) - 0.5);
    };

    const CardContent = (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => { x.set(0); y.set(0); onHover(false); }}
            className={`relative w-full max-w-[400px] h-[540px] group transition-all duration-700 ${isActive ? 'scale-105' : 'scale-95 opacity-50 grayscale sm:grayscale-0'}`}
        >
            <div className={`absolute -inset-4 rounded-[3rem] bg-gradient-to-br ${themeColor} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700`} />

            <div className="relative h-full w-full bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 flex flex-col justify-between overflow-hidden">
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="z-10"
                >
                    <div className="flex items-center gap-6 mb-12">
                        <div className={`p-5 rounded-2xl bg-gradient-to-br ${themeColor} text-white shadow-2xl`}>
                            <Icon size={36} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-white tracking-tighter leading-none mb-2">{title}</h3>
                            <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">{subtitle}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {features.map((f: string, i: number) => (
                            <div key={i} className="flex items-center gap-4 text-white/40 text-sm group-hover:text-white/80 transition-colors">
                                <div className="w-1.5 h-[1px] bg-white/20" />
                                {f}
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="relative z-10 flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/30 group-hover:text-white transition-colors">Enter</span>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <ArrowRight size={18} />
                    </div>
                </div>

                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>
        </motion.div>
    );

    if (href) {
        return <Link href={href} className="contents">{CardContent}</Link>;
    }
    return CardContent;
};

// --- Main App ---

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hoveredHub, setHoveredHub] = useState<string | null>(null);
    const { scrollYProgress } = useScroll();

    const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 40,
                y: (e.clientY / window.innerHeight - 0.5) * 40,
            });
        };
        window.addEventListener('mousemove', handleGlobalMouseMove);
        return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
    }, []);

    return (
        <div className="relative min-h-[400vh] w-full bg-[#030303] overflow-x-hidden font-sans selection:bg-white/20 text-white">

            <AnimatePresence>
                {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>

            {/* DUAL-REALITY BACKGROUND ENGINE */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-0 transition-colors duration-1000"
                animate={{
                    background: hoveredHub === 'genius'
                        ? 'radial-gradient(circle at 25% 40%, #2a0a0a 0%, #030303 100%)'
                        : hoveredHub === 'life'
                            ? 'radial-gradient(circle at 75% 40%, #0a102a 0%, #030303 100%)'
                            : 'radial-gradient(circle at 50% 50%, #0a0a0a 0%, #030303 100%)'
                }}
            />

            <motion.div
                className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
                animate={{
                    opacity: hoveredHub ? 0.08 : 0.03,
                    stroke: hoveredHub === 'genius' ? '#ff3333' : hoveredHub === 'life' ? '#3388ff' : '#ffffff'
                }}
                style={{
                    backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />

            {GEMS.map((gem) => (
                <motion.div
                    key={gem.id}
                    className="fixed pointer-events-none opacity-20 text-white z-0"
                    style={{ left: gem.x, top: gem.y }}
                    animate={{
                        x: mousePos.x * gem.speed * 20,
                        y: mousePos.y * gem.speed * 20,
                        rotate: [0, 10, -10, 0],
                        scale: hoveredHub ? 1.2 : 1
                    }}
                    transition={{
                        rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                        x: { type: "spring", stiffness: 30 },
                        y: { type: "spring", stiffness: 30 }
                    }}
                >
                    <div className="flex flex-col items-center gap-1">
                        {gem.icon}
                        <span className="text-[7px] uppercase tracking-[0.4em] font-black opacity-30">{gem.label}</span>
                    </div>
                </motion.div>
            ))}

            {/* HERO / GATEWAY SECTION */}
            <motion.section
                style={{ scale: heroScale, opacity: heroOpacity }}
                className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-24 px-6 overflow-hidden"
            >
                <div className="text-center mb-20 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-6 mb-12"
                    >
                        <div className={`h-[1px] w-12 transition-colors duration-700 ${hoveredHub === 'genius' ? 'bg-red-500' : 'bg-white/10'}`} />
                        <span className="text-xs uppercase tracking-widest text-white/40 font-bold">THETHESIS</span>
                        <div className={`h-[1px] w-12 transition-colors duration-700 ${hoveredHub === 'life' ? 'bg-blue-500' : 'bg-white/10'}`} />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-8xl font-black tracking-tight leading-none mb-8 select-none"
                    >
                        {hoveredHub === 'genius' ? 'Learn.' : hoveredHub === 'life' ? 'Grow.' : 'Master.'} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">Transform.</span>
                    </motion.h1>

                    <motion.p className="text-white/40 max-w-lg mx-auto text-base md:text-lg font-medium leading-relaxed">
                        Expert 1-on-1 mentorship for technical skills and personal growth. <br /> Choose your path below.
                    </motion.p>
                </div>

                <div className="relative flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-40 w-full pb-32">
                    <GatewayCard
                        title="Genius Hub"
                        subtitle="Technical Skills"
                        icon={Cpu}
                        isActive={hoveredHub === 'genius' || !hoveredHub}
                        themeColor="from-red-600 to-orange-500"
                        onHover={(h: boolean) => setHoveredHub(h ? 'genius' : null)}
                        features={["Programming & Development", "Chess & Strategy", "Math & Science", "System Design"]}
                        href="/genius-hub"
                    />

                    <div className="hidden lg:block">
                        <OrbitNav />
                    </div>

                    <GatewayCard
                        title="Life Hub"
                        subtitle="Personal Growth"
                        icon={Moon}
                        isActive={hoveredHub === 'life' || !hoveredHub}
                        themeColor="from-blue-600 to-indigo-500"
                        onHover={(h: boolean) => setHoveredHub(h ? 'life' : null)}
                        features={["Astrology & Charts", "Yoga & Wellness", "Cooking & Nutrition", "Art & Creativity"]}
                    />
                </div>
            </motion.section>

            {/* PLATFORM ECOSYSTEM: TECH STACK */}
            <section className="relative z-10 py-48 px-6 bg-[#050505] border-y border-white/5">
                <div className="container mx-auto">
                    <SectionHeader subtitle="Platform Features" title="Everything You Need to Learn." />
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {FEATURES.map((feat, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-md group hover:bg-white/[0.05] transition-all"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 mb-8 group-hover:text-white transition-colors">
                                    {feat.icon}
                                </div>
                                <h4 className="text-xl font-bold mb-4 tracking-tight">{feat.title}</h4>
                                <p className="text-white/40 text-sm leading-relaxed">{feat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CURRICULUM EXPLORATION */}
            <section className="relative z-10 py-48 px-6">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 gap-24">
                        {/* Genius Track */}
                        <div>
                            <SectionHeader subtitle="Technical" title="Genius Hub Courses" />
                            <div className="space-y-6">
                                {CURRICULUM.genius.map((item, i) => (
                                    <div key={i} className="p-8 rounded-3xl bg-red-500/5 border border-red-500/10 group hover:bg-red-500/10 transition-all cursor-pointer">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-500 text-[8px] font-black uppercase tracking-widest">{item.level}</span>
                                            <span className="text-[8px] text-white/20 uppercase tracking-widest">{item.duration}</span>
                                        </div>
                                        <h5 className="text-xl font-bold mb-3">{item.title}</h5>
                                        <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Life Track */}
                        <div>
                            <SectionHeader subtitle="Personal Growth" title="Life Hub Courses" />
                            <div className="space-y-6">
                                {CURRICULUM.life.map((item, i) => (
                                    <div key={i} className="p-8 rounded-3xl bg-blue-500/5 border border-blue-500/10 group hover:bg-blue-500/10 transition-all cursor-pointer">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 text-[8px] font-black uppercase tracking-widest">{item.level}</span>
                                            <span className="text-[8px] text-white/20 uppercase tracking-widest">{item.duration}</span>
                                        </div>
                                        <h5 className="text-xl font-bold mb-3">{item.title}</h5>
                                        <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MENTORS / EXPERTS SECTION */}
            <section className="relative z-10 py-48 px-6 bg-white/[0.01] border-y border-white/5">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
                        <div className="max-w-3xl">
                            <span className="text-xs uppercase tracking-widest text-white/30 font-bold mb-6 block">Our Mentors</span>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                                Learn From <span className="text-white/30">The Best</span><br />In Every Field.
                            </h2>
                        </div>
                        <p className="text-white/40 text-sm max-w-xs leading-relaxed border-l border-white/10 pl-8">
                            Every mentor is carefully vetted and has proven expertise in their area.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {MENTORS.map((mentor, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative rounded-[3rem] overflow-hidden bg-white/5 border border-white/5 p-8 hover:bg-white/10 transition-all duration-500"
                            >
                                <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-8">
                                    <img src={mentor.img} alt={mentor.name} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                                    <div className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-xl border border-white/10 ${mentor.hub === 'Genius Hub' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                        {mentor.hub === 'Genius Hub' ? <Zap size={16} /> : <Sparkles size={16} />}
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold tracking-tight mb-2">{mentor.name}</h4>
                                <p className="text-xs uppercase tracking-wider text-white/30 font-medium">{mentor.role}</p>
                                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs uppercase tracking-wider font-bold">View Profile</span>
                                    <ChevronRight size={14} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* GLOBAL RESIDENCY / RETREATS */}
            <section className="relative z-10 py-48 px-6 bg-[#080808]">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-24">
                        <div className="flex-1">
                            <SectionHeader subtitle="In-Person Events" title="Retreats & Workshops" />
                            <p className="text-white/40 text-base mb-12 leading-relaxed">
                                Join exclusive in-person retreats in beautiful locations worldwide. Connect with mentors and fellow learners face-to-face.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { location: "Kyoto, Japan", focus: "Mindfulness & Design", date: "April 2026" },
                                    { location: "Zermatt, Switzerland", focus: "Strategy Summit", date: "October 2026" }
                                ].map((retreat, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center group cursor-pointer hover:bg-white/10 transition-all">
                                        <div className="flex items-center gap-4">
                                            <MapPin size={18} className="text-white/20" />
                                            <div>
                                                <h6 className="font-bold text-sm">{retreat.location}</h6>
                                                <p className="text-xs text-white/40">{retreat.focus}</p>
                                            </div>
                                        </div>
                                        <span className="text-xs text-white/30 font-medium">{retreat.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 w-full aspect-video rounded-[3rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center grayscale opacity-20 group-hover:scale-105 transition-transform duration-1000" />
                            <div className="z-10 text-center">
                                <span className="text-xs uppercase tracking-widest text-white/40 block mb-4">Request Access</span>
                                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">
                                    <Lock size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CONVERGENCE FOOTER */}
            <footer className="relative z-10 pt-32 pb-12 px-6 bg-black border-t border-white/5">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-12 gap-16 mb-24">

                        {/* Brand Column */}
                        <div className="lg:col-span-5 space-y-8">
                            <h2 className="text-5xl font-black tracking-tight text-white">THETHESIS</h2>
                            <p className="text-white/40 text-sm leading-relaxed max-w-md">
                                Expert mentorship platform for technical skills and personal growth. <br />
                                Global Headquarters · Est. 2024
                            </p>
                            <div className="flex gap-6">
                                {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.1, color: "#fff" }}
                                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 cursor-pointer transition-colors hover:bg-white/10"
                                    >
                                        <Icon size={16} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Columns */}
                        <div className="lg:col-span-3 grid grid-cols-2 gap-8">
                            <div>
                                <h6 className="text-[10px] uppercase tracking-[0.5em] text-white font-black mb-6 italic">Genius</h6>
                                <ul className="space-y-3 text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
                                    {['Quantum Logic', 'Neural Dev', 'Chess Arch', 'Systems'].map(item => (
                                        <li key={item} className="hover:text-red-500 cursor-pointer transition-colors">{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h6 className="text-[10px] uppercase tracking-[0.5em] text-white font-black mb-6 italic">Life</h6>
                                <ul className="space-y-3 text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
                                    {['Vedic Sync', 'Somatic Flow', 'Artisanry', 'Retreats'].map(item => (
                                        <li key={item} className="hover:text-blue-500 cursor-pointer transition-colors">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
                        <div className="flex gap-8 text-[8px] uppercase tracking-[0.3em] text-white/20 font-black">
                            <span className="hover:text-white cursor-pointer transition-colors">Privacy Protocol</span>
                            <span className="hover:text-white cursor-pointer transition-colors">Terms of Engagement</span>
                        </div>
                        <div className="text-[8px] uppercase tracking-[0.4em] text-white/10 font-black">
                            THETHESIS ORGANIZATION © 2026
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
