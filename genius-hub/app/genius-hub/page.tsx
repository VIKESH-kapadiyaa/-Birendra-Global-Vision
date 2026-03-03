'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
    Code,
    ChevronRight,
    Target,
    Cpu,
    Menu,
    X,
    Star,
    Zap,
    CheckCircle2,
    ArrowRight,
    Plus,
    Minus,
    Sparkles,
    Globe,
    ShieldCheck,
    MousePointer2
} from 'lucide-react';
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useInView,
    useMotionValue,
    useMotionTemplate
} from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utils ---
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- Advanced Animation Components ---

// 1. Magnetic Button Effect
const MagneticButton = ({ children, className, ...props }: any) => {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.2); // Magnetic strength
        y.set(middleY * 0.2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const springConfig = { type: "spring", stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            whileTap={{ scale: 0.9 }}
            className={cn("relative z-10", className)}
            {...props}
        >
            {children}
        </motion.button>
    );
};

// 2. 3D Tilt Card Effect
const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(((clientX - left) / width - 0.5) * 20); // Tilt range X
        y.set(((clientY - top) / height - 0.5) * -20); // Tilt range Y
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{ rotateX: mouseY, rotateY: mouseX, transformStyle: "preserve-3d" }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className={cn("perspective-1000", className)}
        >
            {children}
        </motion.div>
    );
};

// 3. Text Reveal Animation
const StaggeredText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
    const words = text.split(" ");
    return (
        <motion.div className={cn("inline-block overflow-hidden", className)}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: delay + i * 0.05, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="inline-block mr-[0.25em]"
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

// 4. Parallax Background Object
const FloatingOrb = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
    <motion.div
        animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
        }}
        transition={{
            duration: 5,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
        className={cn("absolute rounded-full blur-3xl opacity-30 mix-blend-multiply pointer-events-none", className)}
    />
);

const FadeIn = ({ children, delay = 0, className, direction = "up" }: { children: React.ReactNode; delay?: number; className?: string, direction?: "up" | "left" | "right" | "down" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
            x: direction === "left" ? 40 : direction === "right" ? -40 : 0
        },
        visible: { opacity: 1, y: 0, x: 0 }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <motion.span
        whileHover={{ scale: 1.05 }}
        className={cn("inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-50/80 backdrop-blur-md border border-slate-200 text-slate-500 text-[11px] font-bold tracking-widest uppercase shadow-sm cursor-default select-none", className)}
    >
        {children}
    </motion.span>
);

// --- Visuals ---
const AbstractVisual = ({ type }: { type: string }) => {
    if (type === 'coding') {
        return (
            <div className="relative w-full h-40 flex items-center justify-center">
                <FloatingOrb className="w-32 h-32 bg-blue-600/10" delay={0} />
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 2, transition: { duration: 0.2 } }}
                    drag dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
                    className="relative w-40 h-28 bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-2xl p-4 flex flex-col gap-3 overflow-hidden cursor-grab active:cursor-grabbing"
                >
                    <div className="flex gap-1.5">
                        {[1, 2, 3].map(i => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.1 }}
                                className={cn("w-2.5 h-2.5 rounded-full", i === 1 ? "bg-red-400" : i === 2 ? "bg-yellow-400" : "bg-green-400")}
                            />
                        ))}
                    </div>
                    <div className="space-y-2">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1 }} className="h-2 bg-slate-100 rounded-full" />
                        <div className="flex gap-2">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 grid place-items-center">
                                <Code size={14} className="text-blue-500" />
                            </motion.div>
                            <div className="flex-1 h-8 rounded-lg bg-slate-50/50 flex items-center px-2">
                                <motion.div
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-1 h-4 bg-blue-400 rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }
    if (type === 'math') {
        return (
            <div className="relative w-full h-40 flex items-center justify-center">
                <motion.svg
                    viewBox="0 0 200 200"
                    className="w-32 h-32"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <circle cx="100" cy="100" r="70" fill="none" stroke="#2563eb" strokeWidth="0.5" strokeDasharray="4 4" className="opacity-20" />
                    <motion.path
                        d="M60 100 L140 100 M100 60 L100 140" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <motion.rect
                        x="75" y="75" width="50" height="50" rx="12" fill="white" stroke="#2563eb" strokeWidth="2"
                        className="shadow-lg"
                        animate={{ rotate: -360, borderRadius: ["10px", "50%", "10px"] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.svg>
            </div>
        );
    }
    if (type === 'chess') {
        return (
            <div className="relative w-full h-40 flex items-center justify-center">
                <motion.div
                    whileHover={{ y: -15, rotate: 5 }}
                    className="flex items-end gap-2 drop-shadow-2xl cursor-pointer"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                        className="w-8 h-12 bg-slate-200 rounded-t-lg"
                    />
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                        className="w-10 h-20 bg-blue-600 rounded-t-xl"
                    />
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
                        className="w-8 h-12 bg-slate-200 rounded-t-lg"
                    />
                </motion.div>
            </div>
        );
    }
    return null;
};

// --- Page ---
export default function App() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);
    const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-blue-600 selection:text-white font-['Inter',sans-serif] overflow-x-hidden">

            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <FloatingOrb className="top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/40" delay={0} />
                <FloatingOrb className="bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/40" delay={2} />
                <FloatingOrb className="top-[40%] left-[20%] w-[20%] h-[20%] bg-purple-200/30" delay={1} />
            </div>

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                style={{ backgroundColor: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)" }}
                className="fixed top-0 w-full z-[100] border-b border-white/50"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.6 }}
                            className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20"
                        >
                            <Cpu className="text-white" size={20} />
                        </motion.div>
                        <span className="text-lg font-black tracking-tighter text-slate-900">GENIUS<span className="text-blue-600">HUB</span></span>
                    </div>

                    <div className="hidden md:flex items-center gap-12">
                        {['Subjects', 'Tutors', 'Pricing', 'FAQ'].map((item, i) => (
                            <motion.a
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm font-bold tracking-wide text-slate-500 hover:text-blue-600 transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                            </motion.a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <MagneticButton className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">Sign In</MagneticButton>
                        <MagneticButton className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/25">Book a Free Trial</MagneticButton>
                    </div>

                    <button className="md:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 px-6 overflow-hidden min-h-screen flex items-center">
                <motion.div style={{ y: y1 }} className="absolute right-0 top-20 w-[500px] h-[500px] bg-gradient-to-b from-blue-100/20 to-transparent rounded-full blur-3xl -z-10" />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center relative z-10 w-full">
                    <motion.div style={{ opacity: opacityHero }} className="lg:col-span-7 text-center lg:text-left space-y-12">
                        <FadeIn delay={0.1} className="space-y-6">
                            <Badge className="bg-blue-50 border-blue-100 text-blue-600 shadow-blue-100">
                                <Sparkles size={12} className="text-blue-500 animate-spin-slow" /> Ranked #1 for 1:1 Tutoring
                            </Badge>
                            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                                <StaggeredText text="Master Any Skill" delay={0.2} /> <br />
                                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 animate-gradient-x pb-2">
                                    <StaggeredText text="with Expert Clarity." delay={0.6} />
                                </span>
                            </h1>
                        </FadeIn>

                        <FadeIn delay={0.8}>
                            <p className="text-xl md:text-2xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                Hyper-personalized 1:1 online tutoring for high achievers.
                                Our vetted experts translate complexity into simple, actionable mastery.
                            </p>
                        </FadeIn>

                        <FadeIn delay={1} className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
                            <MagneticButton className="bg-slate-900 text-white text-lg px-10 py-5 rounded-full shadow-2xl flex items-center gap-3 hover:shadow-slate-500/50">
                                Book a Free Trial
                                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </MagneticButton>
                            <div className="flex items-center gap-3 px-2 text-sm text-slate-400 font-bold uppercase tracking-widest">
                                <Globe size={18} className="text-blue-500 animate-pulse" /> 24/7 Global Access
                            </div>
                        </FadeIn>

                        <FadeIn delay={1.2} className="pt-12 flex flex-wrap items-center justify-center lg:justify-start gap-12 opacity-30 font-black tracking-tighter text-2xl grayscale mix-blend-multiply">
                            {['STANFORD', 'OXFORD', 'MIT', 'HARVARD'].map((uni, i) => (
                                <motion.span
                                    key={uni}
                                    whileHover={{ scale: 1.2, opacity: 1, filter: "grayscale(0%)", color: "#2563eb" }}
                                    className="cursor-pointer transition-all duration-300"
                                >
                                    {uni}
                                </motion.span>
                            ))}
                        </FadeIn>
                    </motion.div>

                    <motion.div
                        style={{ y: y2 }}
                        initial={{ opacity: 0, x: 100, rotateY: 90 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ type: "spring", stiffness: 50, delay: 0.5 }}
                        className="lg:col-span-5 relative hidden lg:block perspective-1000"
                    >
                        <TiltCard className="relative z-10 p-8 rounded-[3.5rem] bg-white/60 backdrop-blur-3xl border border-white/60 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)]">
                            <div className="grid grid-cols-2 gap-5">
                                <motion.div whileHover={{ scale: 0.98 }} className="bg-white p-6 rounded-[2.5rem] border border-white shadow-xl flex flex-col justify-between aspect-square relative overflow-hidden group cursor-pointer">
                                    <Badge className="w-fit relative z-10">Math</Badge>
                                    <AbstractVisual type="math" />
                                    <div className="text-xs font-bold text-slate-400 relative z-10 group-hover:text-blue-600 transition-colors">Dr. Aris Thorne</div>
                                </motion.div>
                                <motion.div whileHover={{ scale: 0.98 }} className="bg-slate-900 p-6 rounded-[2.5rem] shadow-2xl flex flex-col justify-between aspect-square text-white relative overflow-hidden cursor-pointer">
                                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-4 right-4 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></motion.div>
                                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                                        <Zap size={24} className="text-blue-400" />
                                    </div>
                                    <div className="space-y-1 relative">
                                        <div className="text-[10px] font-bold uppercase opacity-50 tracking-wider">Live Pulse</div>
                                        <div className="text-2xl font-bold">Coding Lab</div>
                                    </div>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.02 }} className="col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-[3rem] text-white flex items-center justify-between group overflow-hidden relative shadow-lg shadow-blue-600/30 cursor-pointer">
                                    <motion.div
                                        className="absolute inset-0 bg-white/20"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "100%" }}
                                        transition={{ duration: 0.5 }}
                                    />
                                    <div className="relative z-10">
                                        <div className="text-[10px] font-bold uppercase opacity-70 mb-2 tracking-widest">Upcoming Masterclass</div>
                                        <div className="text-xl font-bold">Chess Tactics w/ Magnus</div>
                                    </div>
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-all">
                                        <ArrowRight size={20} />
                                    </div>
                                </motion.div>
                            </div>
                        </TiltCard>
                    </motion.div>
                </div>
            </section>

            {/* Subjects Bento Grid */}
            <section id="subjects" className="py-32 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
                        <div className="space-y-6">
                            <Badge className="text-blue-600 bg-blue-50 border-blue-100">Core Subjects</Badge>
                            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">
                                <StaggeredText text="Engineered for" /> <br />
                                <span className="text-slate-400"><StaggeredText text="Achievement." /></span>
                            </h2>
                        </div>
                        <p className="text-slate-500 max-w-md text-xl font-medium leading-relaxed">
                            A modular approach to learning that adapts to your pace, goal, and unique cognitive profile.
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FadeIn delay={0.2} className="md:col-span-2">
                            <TiltCard className="h-full p-12 rounded-[3.5rem] bg-[#F7F8FA] border border-white shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-blue-200/50 transition-colors"></div>
                                <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                                    <div className="space-y-8 flex-1">
                                        <motion.div whileHover={{ rotate: 90 }} className="w-16 h-16 bg-blue-600 text-white rounded-3xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                                            <Code size={32} />
                                        </motion.div>
                                        <div className="space-y-4">
                                            <h3 className="text-4xl font-black text-slate-900">Advanced Coding Labs</h3>
                                            <p className="text-slate-500 text-lg leading-relaxed">From Python to Solidity, get hands-on experience with live code-sharing and real-time debugging from senior engineers.</p>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <AbstractVisual type="coding" />
                                    </div>
                                </div>
                            </TiltCard>
                        </FadeIn>

                        <FadeIn delay={0.3} className="h-full">
                            <TiltCard className="h-full p-10 rounded-[3.5rem] bg-white border border-slate-100 shadow-xl flex flex-col justify-between text-center relative overflow-hidden">
                                <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                                    <Target size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">Strategic Chess</h3>
                                    <p className="text-slate-500 text-sm">Grandmaster techniques & endgame theory.</p>
                                </div>
                                <AbstractVisual type="chess" />
                            </TiltCard>
                        </FadeIn>

                        <FadeIn delay={0.4} className="h-full">
                            <TiltCard className="h-full p-10 rounded-[3.5rem] bg-white border border-slate-100 shadow-xl flex flex-col justify-between text-center">
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                                    <Cpu size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">Quantum Math</h3>
                                    <p className="text-slate-500 text-sm">Advanced calculus & visual linear algebra.</p>
                                </div>
                                <AbstractVisual type="math" />
                            </TiltCard>
                        </FadeIn>

                        <FadeIn delay={0.5} className="md:col-span-2">
                            <div className="h-full p-12 rounded-[3.5rem] bg-slate-900 text-white flex flex-col md:flex-row items-center gap-16 group overflow-hidden relative shadow-2xl">
                                <motion.div animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-900"></motion.div>

                                <div className="space-y-8 flex-1 relative z-10">
                                    <Badge className="bg-blue-500/10 border-blue-500/20 text-blue-300">Vetted Top 1%</Badge>
                                    <h3 className="text-4xl font-black">Elite Expert Roster</h3>
                                    <p className="text-slate-400 text-lg leading-relaxed">Every tutor goes through a rigorous 5-stage technical and pedagogical vetting process. Only the top 1% join our platform.</p>
                                    <MagneticButton className="bg-white text-slate-900 hover:bg-slate-200 px-8 py-3 rounded-xl font-bold">Explore All Experts</MagneticButton>
                                </div>
                                <div className="flex -space-x-4 opacity-50 flex-1 justify-center relative z-10">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ x: 20, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            whileHover={{ y: -10, zIndex: 10, scale: 1.1 }}
                                            className="w-20 h-20 rounded-full border-4 border-slate-900 bg-slate-800 shadow-xl cursor-pointer"
                                        ></motion.div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-32 px-6">
                <div className="max-w-7xl mx-auto text-center mb-24 space-y-6">
                    <FadeIn>
                        <Badge>Transparent Pricing</Badge>
                        <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">Invest in your <br /> <span className="text-blue-600">Growth.</span></h2>
                    </FadeIn>
                </div>
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
                    {[
                        { title: "Standard", price: "45", features: ["Verified Expert Tutors", "Interactive Whiteboard", "Session Recordings"] },
                        { title: "Premium", price: "75", features: ["Top 5% Subject Experts", "Personalized Study Plans", "AI-Powered Notes"], popular: true },
                        { title: "Elite", price: "120", features: ["Industry Leading Mentors", "24/7 Slack Access", "Interview Prep"] }
                    ].map((tier, i) => (
                        <FadeIn delay={i * 0.1} key={i}>
                            <TiltCard className={`h-full p-10 rounded-[3rem] border ${tier.popular ? 'border-blue-500 shadow-2xl ring-4 ring-blue-50 bg-blue-50/10' : 'border-slate-100 bg-white'} flex flex-col space-y-8 relative`}>
                                {tier.popular && <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-bl-3xl rounded-tr-[2.5rem] shadow-lg">Popular</motion.div>}
                                <div>
                                    <h4 className="text-xl font-bold text-slate-500 mb-2">{tier.title}</h4>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-black text-slate-900">${tier.price}</span>
                                        <span className="text-slate-400 font-bold">/hr</span>
                                    </div>
                                </div>
                                <ul className="space-y-5 flex-1">
                                    {tier.features.map((f, j) => (
                                        <motion.li
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + j * 0.1 }}
                                            key={f}
                                            className="flex items-center gap-3 text-sm font-medium text-slate-600"
                                        >
                                            <CheckCircle2 size={18} className="text-blue-500 shrink-0" /> {f}
                                        </motion.li>
                                    ))}
                                </ul>
                                <MagneticButton className={cn("w-full rounded-2xl py-4 font-bold transition-colors", tier.popular ? "bg-blue-600 text-white" : "bg-transparent border border-slate-200 hover:bg-slate-50")}>Get Started</MagneticButton>
                            </TiltCard>
                        </FadeIn>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-32 px-6 bg-[#F8FAFC]">
                <div className="max-w-3xl mx-auto">
                    {/* Same FAQ content but wrapped in FadeIn */}
                    <FadeIn>
                        <div className="text-center mb-20 space-y-6">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Common Questions.</h2>
                        </div>
                    </FadeIn>
                    {/* FAQ Items implementation... */}
                    <div className="bg-white p-2 md:p-8 rounded-[3.5rem] border border-slate-100 shadow-xl">
                        {[
                            { q: "How are tutors vetted?", a: "We use a rigorous 5-step process: identity verification, academic background check, technical assessment, pedagogical trial, and ongoing quality monitoring." },
                            { q: "Can I book for a specific project?", a: "Absolutely. Many students book mentors specifically for a 2-week coding sprint or to prep for an upcoming math competition." },
                            { q: "Is the first trial session truly free?", a: "Yes. We believe in our experts so much that your first 45-minute consultation is on us, no credit card required." }
                        ].map((item, i) => (
                            <FadeIn delay={i * 0.1} key={i} className="group border-b border-slate-50 last:border-0">
                                <details className="group p-6 cursor-pointer">
                                    <summary className="flex items-center justify-between font-bold text-lg text-slate-900 marker:content-none hover:text-blue-600 transition-colors">
                                        {item.q}
                                        <span className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 group-open:bg-blue-600 group-open:text-white group-open:rotate-180 transition-all">
                                            <Plus size={16} className="group-open:hidden" />
                                            <Minus size={16} className="hidden group-open:block" />
                                        </span>
                                    </summary>
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        whileInView={{ opacity: 1, height: "auto" }}
                                        className="mt-4 text-slate-500 leading-relaxed pr-10 pl-2"
                                    >
                                        {item.a}
                                    </motion.p>
                                </details>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-6">
                <FadeIn className="max-w-6xl mx-auto">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative p-12 md:p-24 rounded-[4.5rem] bg-slate-900 text-center overflow-hidden shadow-2xl group cursor-pointer"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.4),transparent_60%)]"
                        />
                        <div className="relative z-10 space-y-12">
                            <h2 className="text-5xl md:text-8xl font-black text-white leading-[1] tracking-tighter">
                                Ready to reach <br /> your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 italic">full potential?</span>
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <MagneticButton className="px-12 py-6 rounded-full text-xl font-bold bg-white text-slate-900 hover:bg-slate-200 shadow-xl shadow-white/10">Book a Free Trial</MagneticButton>
                            </div>
                        </div>
                    </motion.div>
                </FadeIn>
            </section>

            {/* Footer */}
            <footer className="py-24 px-6 border-t border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                    <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 cursor-pointer">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Cpu className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">GENIUS<span className="text-blue-600">HUB</span></span>
                    </motion.div>
                    <div className="flex gap-10 text-xs font-bold uppercase tracking-widest text-slate-400 content-center">
                        {['Privacy', 'Terms', 'Contact'].map(link => (
                            <a key={link} href="#" className="hover:text-blue-600 transition-colors hover:underline underline-offset-4">{link}</a>
                        ))}
                    </div>
                    <div className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                        © 2026 GeniusHub
                    </div>
                </div>
            </footer>
        </div>
    );
}
