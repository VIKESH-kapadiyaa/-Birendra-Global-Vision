'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence, useMotionValue } from 'framer-motion';
import SharedFooter from '../components/SharedFooter';
import {
    Calculator,
    Atom,
    FlaskConical,
    BookType,
    Lightbulb,
    ArrowRight,
    CheckCircle2,
    GraduationCap,
    Target,
    Star,
    TrendingUp,
    ChevronDown,
    Zap,
    Sparkles,
    Globe,
    MessageCircle
} from 'lucide-react';
import Link from 'next/link';

// --- Shared Animation Components ---

const FadeIn = ({ children, delay = 0, direction = "up", className = "" }: { children: React.ReactNode, delay?: number, direction?: "up" | "left" | "right" | "down", className?: string }) => {
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

// --- 3D Parallax Wrapper Component ---
const ParallaxCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`perspective-1000 ${className}`}
        >
            <div style={{ transform: "translateZ(30px)" }} className="h-full w-full">
                {children}
            </div>
        </motion.div>
    );
};


// --- Main Page Component ---

export default function GeniusHub() {
    const { scrollYProgress } = useScroll();
    const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Kinetic typography transforms mapped to scrolling
    const kineticTextY = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const kineticTextX = useTransform(scrollYProgress, [0, 1], [0, 200]);

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const subjects = [
        {
            title: "Advanced Mathematics",
            desc: "From algebraic foundations to advanced calculus and competitive mathematics.",
            icon: Calculator,
            color: "#4353ff", // Electric Blue
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Physics",
            desc: "Master classical mechanics, electromagnetism, and modern physics concepts.",
            icon: Atom,
            color: "#ff90e8", // Hot Pink
            image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Chemistry",
            desc: "Deep dive into organic, inorganic, and physical chemistry principles.",
            icon: FlaskConical,
            color: "#ffc900", // Bright Yellow
            image: "https://images.unsplash.com/photo-1603126854598-f4c50c59cc41?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "English Language & Lit",
            desc: "Enhance critical reading, expressive writing, and communication skills.",
            icon: BookType,
            color: "#ff6b00", // Vivid Orange
            image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "On-Demand Subjects",
            desc: "Customized curriculum tailored to your specific academic requirements and goals.",
            icon: Lightbulb,
            color: "#b185fa", // Purple
            image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop"
        }
    ];

    const methodology = [
        {
            step: "01",
            title: "Diagnostic Assessment",
            desc: "We begin by analyzing the student's current proficiency, learning style, and academic goals to establish a clear baseline.",
            color: "#ffc900"
        },
        {
            step: "02",
            title: "Curriculum Customization",
            desc: "A personalized syllabus is crafted, ensuring all blind spots are addressed while accelerating strengths.",
            color: "#ff90e8"
        },
        {
            step: "03",
            title: "1-on-1 Expert Mentorship",
            desc: "Engage in highly interactive, focused sessions with elite educators dedicated solely to the student's progress.",
            color: "#4353ff"
        },
        {
            step: "04",
            title: "Continuous Evaluation",
            desc: "Regular mock tests, conceptual reviews, and progress tracking ensure the student is always moving toward excellence.",
            color: "#5ad641"
        }
    ];

    const faculty = [
        {
            name: "Amaria Srivastava",
            role: "Senior English Mentor",
            image: "/maam.jpeg",
            color: "#ff90e8", // Hot Pink
            experience: "20+ Years",
            qualifications: "M.A. English Literature • Cambridge Assessment",
            intro: "Hi, I am a committed English teacher with over 20 years of experience at leading academic institutions, teaching students from diverse social and cultural backgrounds from various countries like USA, UK, New Zealand, and Australia.",
            subjects: ["English"],
            grades: ["Pre-Primary", "1st to 5th", "6th to 8th", "9th & 10th", "11th & 12th", "College Level"],
            boards: ["CBSE", "IB", "ICSE", "IGCSE", "USA Curriculum", "Canada Curriculum", "UK Curriculum"],
            skills: [
                "Creative Writing",
                "Essay Writing",
                "Grammar & Vocabulary Enhancement",
                "Literature Analysis",
                "Personalized Learning Approach"
            ]
        }
    ];

    const faqs = [
        {
            q: "How are the educators selected?",
            a: "We have a rigorous 5-step vetting process. Only top-tier faculty with proven academic excellence and teaching pedagogy are onboarded."
        },
        {
            q: "Is the curriculum flexible?",
            a: "Absolutely. We don't believe in rigid structures. The syllabus is designed entirely around the student's specific requirements, current level, and future goals."
        },
        {
            q: "How is progress tracked & measured?",
            a: "Through our bespoke Student Dashboard Matrix. It offers real-time insights, regular mock assessment results, and continuous feedback loops."
        }
    ];

    return (
        <main className="min-h-screen bg-white text-black selection:bg-[#ff90e8] selection:text-black font-sans pb-0">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-3 bg-[#ff90e8] origin-left z-50 border-b-4 border-black"
                style={{ scaleX: springScroll }}
            />

            {/* Top Navigation Spacer (Assuming global nav is fixed) */}
            <div className="h-24 w-full" />

            {/* HERO SECTION */}
            <section className="relative pt-20 pb-32 overflow-hidden bg-white perspective-1000">
                {/* Floating Decorative Elements */}
                <div className="absolute top-20 right-10 w-24 h-24 bg-[#ffc900] border-[4px] border-black rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-pulse hidden lg:block" />
                <div className="absolute bottom-20 left-10 w-16 h-16 bg-[#b185fa] border-[4px] border-black rotate-45 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-spin-slow hidden lg:block" />
                <div className="absolute top-1/2 right-[10%] w-0 h-0 border-l-[30px] border-l-transparent border-t-[45px] border-t-black border-r-[30px] border-r-transparent -rotate-12 hidden lg:block" />
                <div className="absolute top-[52%] right-[10.5%] w-0 h-0 border-l-[20px] border-l-transparent border-t-[30px] border-t-[#ff6b00] border-r-[20px] border-r-transparent -rotate-12 hidden lg:block z-0" />

                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-100" />
                </div>

                <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                    <div className="flex flex-col lg:flex-row items-center gap-16">

                        {/* Hero Content */}
                        <div className="flex-1 text-center lg:text-left hover-trigger relative z-10">
                            <FadeIn>
                                <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#ffc900] border-[3px] border-black mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                                    <Zap className="text-black" size={16} fill="black" />
                                    <span className="text-sm font-black uppercase tracking-widest text-black">Elite Academic Mentorship</span>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.1}>
                                <h1 className="text-6xl md:text-[6.5rem] font-black text-black tracking-tighter leading-[0.95] mb-8 uppercase brutal-title brutal-highlight">
                                    <span className="block mb-2">Master Core</span>
                                    <span className="block text-[#ff90e8]" style={{ WebkitTextStroke: '2px black' }}>Academics.</span>
                                </h1>
                            </FadeIn>

                            <FadeIn delay={0.2}>
                                <p className="text-xl md:text-2xl text-black font-bold border-l-[6px] border-[#4353ff] pl-6 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0 py-2 bg-white/80 backdrop-blur-sm">
                                    Accelerate learning with world-class, customized one-on-one education in Mathematics, Sciences, English, and bespoke subjects.
                                </p>
                            </FadeIn>

                            <FadeIn delay={0.3}>
                                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                                    <Link href="/book-demo" data-hover-text="Ready?" className="brutal-btn py-4 px-8 w-full sm:w-auto text-center flex items-center justify-center gap-2 text-lg hover:shadow-[8px_8px_0_0_#ff90e8] hover:border-[#ff90e8]">
                                        Book A Demo
                                        <ArrowRight size={20} className="relative z-20" />
                                    </Link>
                                    <Link href="#subjects" data-hover-text="Explore" className="brutal-btn-secondary py-4 px-8 w-full sm:w-auto text-center flex items-center justify-center text-lg shadow-[4px_4px_0_0_#000]">
                                        Explore Subjects
                                    </Link>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.4} className="mt-12 flex flex-wrap justify-center lg:justify-start gap-6 text-black font-bold">
                                <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2 shadow-[3px_3px_0_0_#000]">
                                    <CheckCircle2 size={20} className="text-[#5ad641]" />
                                    <span className="text-sm font-black uppercase tracking-wider text-black">Verified Educators</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2 shadow-[3px_3px_0_0_#000]">
                                    <CheckCircle2 size={20} className="text-[#5ad641]" />
                                    <span className="text-sm font-black uppercase tracking-wider text-black">100% Customized</span>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Hero Visual Matrix Dashboard with 3D Parallax */}
                        <div className="flex-1 w-full max-w-lg lg:max-w-none relative mt-10 lg:mt-0 p-4 z-10 cursor-crosshair">
                            <FadeIn delay={0.3} direction="left" className="h-full">
                                <ParallaxCard className="h-full">
                                    <div className="brutal-card p-8 h-full flex flex-col justify-between bg-white relative">
                                        {/* Accent Tape element */}
                                        <div className="absolute -top-4 -right-4 w-16 h-8 bg-[#ffc900] border-2 border-black shadow-[4px_4px_0_0_#000] rotate-45 hidden md:block" style={{ transform: 'translateZ(20px)' }} />

                                        <div className="flex items-center justify-between mb-8 relative z-10 border-b-[4px] border-black pb-6">
                                            <h3 className="text-2xl font-black uppercase tracking-wider text-black">Dashboard Matrix</h3>
                                            <div className="w-14 h-14 border-[3px] border-black shadow-[4px_4px_0_0_#000] bg-[#4353ff] flex items-center justify-center transition-transform duration-300">
                                                <Target size={28} className="text-white animate-spin-slow" />
                                            </div>
                                        </div>

                                        <div className="space-y-4 relative z-10">
                                            {[
                                                { subject: "Adv Calculus", progress: 85, color: "bg-[#5ad641]" },
                                                { subject: "Org Chemistry", progress: 65, color: "bg-[#ff90e8]" },
                                                { subject: "Literature", progress: 92, color: "bg-[#ffc900]" }
                                            ].map((stat, i) => (
                                                <div key={i} className="px-5 py-4 bg-white border-[3px] border-black mb-5 shadow-[5px_5px_0_0_#000] transition-transform select-none">
                                                    <div className="flex justify-between items-center mb-4">
                                                        <span className="text-base font-black uppercase text-black tracking-wide">{stat.subject}</span>
                                                        <span className={`text-sm font-black text-black border-[3px] border-black px-3 py-1 ${stat.color}`}>
                                                            {stat.progress}%
                                                        </span>
                                                    </div>
                                                    <div className="w-full h-4 bg-white border-[3px] border-black overflow-hidden relative">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${stat.progress}%` }}
                                                            transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                                                            className={`h-full ${stat.color} border-r-[3px] border-black`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-6 pt-6 border-t-[4px] border-black flex items-center justify-between relative z-10" style={{ transform: 'translateZ(10px)' }}>
                                            <div className="flex -space-x-4">
                                                {[
                                                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
                                                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
                                                    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop"
                                                ].map((src, i) => (
                                                    <div key={i} className="w-14 h-14 border-[3px] border-black bg-white flex items-center justify-center overflow-hidden hover:z-20 hover:-translate-y-2 transition-transform shadow-[4px_4px_0_0_#000]">
                                                        <img src={src} alt="avatar" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all border-2 border-white" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-black font-black uppercase tracking-widest mb-2 px-3 py-1 bg-[#ff6b00] border-[2px] border-black shadow-[2px_2px_0_0_#000] inline-block">Mentors</p>
                                                <p className="text-base font-black text-black uppercase">Elite Faculty</p>
                                            </div>
                                        </div>
                                    </div>
                                </ParallaxCard>
                            </FadeIn>
                        </div>

                    </div>
                </div>
            </section>

            {/* MARQUEE TICKER */}
            <section className="bg-black py-4 border-y-8 border-black overflow-hidden relative flex z-20 shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 bg-[#ffc900] origin-left" />
                <motion.div
                    animate={{ x: [0, -1035] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
                    className="whitespace-nowrap flex relative z-10"
                >
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="text-2xl md:text-3xl font-black uppercase text-black inline-flex items-center gap-8 mx-8">
                            <span>MATHEMATICS</span> <Star size={24} fill="currentcolor" />
                            <span>PHYSICS</span> <Star size={24} fill="currentcolor" />
                            <span>CHEMISTRY</span> <Star size={24} fill="currentcolor" />
                            <span>LITERATURE</span> <Star size={24} fill="currentcolor" />
                            <span className="text-white border-black border-[3px] bg-black px-2 py-0">ON-DEMAND</span> <Star size={24} fill="currentcolor" />
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* BY THE NUMBERS (STATS) */}
            <section className="py-20 bg-white border-b-8 border-black relative overflow-hidden">
                <div className="absolute inset-0 bg-[#e5e7eb] opacity-30 [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { stat: "500+", text: "Students Worldwide", bg: "#b185fa", icon: Zap },
                            { stat: "98%", text: "Score Improvement", bg: "#5ad641", icon: TrendingUp },
                            { stat: "40+", text: "Elite Expert Tutors", bg: "#ff90e8", icon: Target }
                        ].map((item, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <ParallaxCard>
                                    <div className="brutal-card p-10 bg-white text-center flex flex-col items-center justify-center transform transition-all group hover:bg-black hover:text-white relative z-10">
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/5 mix-blend-multiply" />
                                        <div className="inline-block p-4 border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6 group-hover:rotate-6 transition-transform group-hover:border-white group-hover:shadow-[6px_6px_0px_0px_#fff]" style={{ backgroundColor: item.bg }}>
                                            <item.icon size={48} className="text-black" />
                                        </div>
                                        <h2 className="text-6xl font-black tracking-tighter mb-4 text-black group-hover:text-white" style={{ WebkitTextStroke: '1px black', color: item.bg }}>{item.stat}</h2>
                                        <p className="text-xl font-bold uppercase tracking-widest text-black group-hover:text-white">{item.text}</p>
                                    </div>
                                </ParallaxCard>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* SUBJECTS SECTION */}
            <section id="subjects" className="py-24 bg-white border-b-8 border-black relative overflow-hidden">
                {/* Kinetic Scrolling Background Text */}
                <motion.div
                    style={{ y: kineticTextY, x: kineticTextX }}
                    className="absolute right-[-10%] top-[20%] text-black opacity-[0.03] pointer-events-none select-none z-0"
                >
                    <h1 className="text-[14rem] md:text-[20rem] font-black uppercase leading-[0.8] break-all whitespace-nowrap" style={{ WebkitTextStroke: '4px black', color: 'transparent' }}>
                        LEARN<br />ANY<br />THING
                    </h1>
                </motion.div>

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <FadeIn>
                            <h2 className="text-5xl md:text-[5rem] font-black text-black mb-6 tracking-tighter uppercase brutal-title">Academic <br />Disciplines.</h2>
                            <p className="text-lg md:text-xl text-black font-bold p-4 bg-[#ffc900] border-4 border-black shadow-[8px_8px_0_0_#000] inline-block mt-4">
                                Comprehensive, rigorous, and completely personalized.
                            </p>
                        </FadeIn>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {subjects.map((sub, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <ParallaxCard className="h-full">
                                    <div className="group h-full brutal-card flex flex-col cursor-pointer bg-white transition-all overflow-hidden relative">
                                        {/* Accent corner */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-black opacity-5 rounded-bl-[100px] z-0 transition-transform duration-500 group-hover:scale-[2]" />

                                        {/* Image Header */}
                                        <div className="h-48 border-b-[4px] border-black overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                                            <img src={sub.image} alt={sub.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute inset-0 opacity-20" style={{ backgroundColor: sub.color, mixBlendMode: 'multiply' }} />
                                            <div className="absolute top-4 left-4 w-12 h-12 border-[3px] border-black bg-white flex items-center justify-center shadow-[4px_4px_0_0_#000]" style={{ backgroundColor: sub.color }}>
                                                <sub.icon size={24} strokeWidth={2.5} className="text-black" />
                                            </div>
                                        </div>

                                        <div className="p-8 pb-4 flex-1 relative z-10" style={{ transform: 'translateZ(20px)' }}>
                                            <h3 className="text-2xl font-black uppercase text-black mb-3 group-hover:text-[#4353ff] transition-colors">{sub.title}</h3>
                                            <p className="text-black font-semibold leading-relaxed text-base">{sub.desc}</p>
                                        </div>
                                        <div className="p-8 pt-4 relative z-10 mt-auto">
                                            <div className="pt-6 border-t-[4px] border-black flex items-center text-sm font-black uppercase text-black group-hover:text-[#4353ff] transition-colors">
                                                View Syllabus <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
                                            </div>
                                        </div>
                                        {/* Accent bottom line */}
                                        <div className="h-6 w-full border-t-[4px] border-black transition-all duration-300 group-hover:h-8" style={{ backgroundColor: sub.color }} />
                                    </div>
                                </ParallaxCard>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* METHODOLOGY SECTION */}
            <section className="py-24 bg-[#fff] relative overflow-hidden border-b-8 border-black">
                <div className="absolute top-1/2 left-0 w-full h-8 bg-[#ff6b00] -rotate-3 z-0 border-y-[4px] border-black opacity-30" />
                <div className="absolute top-1/4 left-0 w-full h-8 bg-[#4353ff] rotate-3 z-0 border-y-[4px] border-black opacity-30" />

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">

                        <div className="flex-1 bg-white p-8 md:p-12 border-[6px] border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] z-10 relative">
                            {/* Tape accent */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-48 h-8 bg-white/50 backdrop-blur-sm border-2 border-dashed border-black/50 rotate-1 shadow-sm" />

                            <FadeIn>
                                <h2 className="text-5xl md:text-6xl font-black text-black mb-6 tracking-tighter uppercase brutal-title">The BGV <br /><span className="text-black px-4 py-1 italic bg-[#ff90e8] border-2 border-black rotate-2 inline-block shadow-[4px_4px_0_0_#000] mt-2">Methodology.</span></h2>
                                <p className="text-lg md:text-xl text-black font-bold mb-10 leading-relaxed max-w-xl border-l-[8px] border-black pl-6 py-2 bg-gray-50/50">
                                    Every student has a unique mental architecture. Our four-step methodology ensures knowledge is completely internalized.
                                </p>
                            </FadeIn>

                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.45rem] before:-translate-x-px before:h-full before:w-[6px] before:bg-black">
                                {methodology.map((item, i) => (
                                    <FadeIn key={i} delay={i * 0.1} direction="left" className="relative flex items-start gap-6">
                                        <div className="w-12 h-12 border-[4px] border-black flex items-center justify-center shrink-0 z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:rotate-12" style={{ backgroundColor: item.color }}>
                                            <span className="text-sm font-black text-black">{item.step}</span>
                                        </div>
                                        <div className="pt-1 w-full bg-white border-[4px] border-black p-4 md:p-6 shadow-[6px_6px_0_0_#000] hover:translate-x-1 transition-transform cursor-crosshair">
                                            <h4 className="text-lg md:text-xl font-black uppercase text-black mb-2">{item.title}</h4>
                                            <p className="text-black font-bold text-sm md:text-base leading-relaxed opacity-90">{item.desc}</p>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 w-full z-10">
                            <FadeIn direction="right">
                                <ParallaxCard>
                                    <div className="relative aspect-square md:aspect-[4/3] bg-[#ffc900] border-8 border-black flex items-center justify-center p-4 md:p-8 text-center shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] group">
                                        <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#5ad641] border-[4px] border-black rounded-full z-20 shadow-[6px_6px_0_0_#000] flex items-center justify-center animate-pulse" style={{ transform: 'translateZ(30px)' }}>
                                            <Star size={24} className="text-black fill-black" />
                                        </div>

                                        <div className="w-full h-full relative overflow-hidden border-[4px] border-black bg-white">
                                            <img
                                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                                                alt="Students learning"
                                                className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                                            />
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700" />
                                        </div>

                                        <div className="absolute -bottom-8 -right-8 z-20 max-w-[280px] bg-white border-[4px] border-black p-6 shadow-[8px_8px_0px_0px_#4353ff] hidden md:block rotate-3 group-hover:rotate-0 transition-transform" style={{ transform: 'translateZ(40px)' }}>
                                            <GraduationCap size={44} className="text-black mb-3" />
                                            <h3 className="text-2xl font-black text-black mb-2 uppercase italic leading-tight">"Training the mind to think."</h3>
                                        </div>
                                    </div>
                                </ParallaxCard>
                            </FadeIn>
                        </div>

                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-24 bg-white border-b-8 border-black relative">
                <div className="absolute inset-0 bg-[#e5e7eb]/20" />
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <FadeIn>
                        <h2 className="text-center text-4xl md:text-[4rem] font-black uppercase text-black mb-20 underline decoration-[10px] decoration-[#ffc900] underline-offset-[16px] leading-tight text-stroke-sm">Student Success</h2>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                        {/* Testimonial 1 */}
                        <FadeIn delay={0.1} direction="left">
                            <ParallaxCard>
                                <div className="relative bg-[#ff90e8] p-10 border-[6px] border-black shadow-[16px_16px_0_0_#000] rotate-2 hover:rotate-0 transition-transform duration-300">
                                    <div className="absolute -top-6 left-8 w-24 h-12 bg-black/10 rotate-[-4deg] border-2 border-black/20" />
                                    <MessageCircle size={48} className="mb-6 text-black fill-white border-2 border-transparent" />
                                    <p className="text-xl md:text-2xl font-black italic mb-8 leading-relaxed">"The mathematics mentorship completely transformed my approach to advanced calculus. Highly recommended!"</p>
                                    <div className="border-t-[4px] border-black pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <span className="font-black uppercase tracking-wider text-xl">— Sarah Jenkins</span>
                                        <span className="text-sm font-black uppercase bg-white border-[3px] border-black px-4 py-2 shadow-[2px_2px_0_0_#000]">Grade 12</span>
                                    </div>
                                </div>
                            </ParallaxCard>
                        </FadeIn>

                        {/* Testimonial 2 */}
                        <FadeIn delay={0.2} direction="right">
                            <ParallaxCard>
                                <div className="relative bg-[#b185fa] p-10 border-[6px] border-black shadow-[16px_16px_0_0_#000] -rotate-2 hover:rotate-0 transition-transform duration-300 mt-8 md:mt-0">
                                    <div className="absolute -bottom-6 right-8 w-24 h-12 bg-black/10 rotate-[4deg] border-2 border-black/20" />
                                    <MessageCircle size={48} className="mb-6 text-black fill-white border-2 border-transparent" />
                                    <p className="text-xl md:text-2xl font-black italic mb-8 leading-relaxed">"My physics tutor was exceptional. I went from struggling with mechanics to topping my class in just two months."</p>
                                    <div className="border-t-[4px] border-black pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <span className="font-black uppercase tracking-wider text-xl">— Michael T.</span>
                                        <span className="text-sm font-black uppercase bg-white border-[3px] border-black px-4 py-2 shadow-[2px_2px_0_0_#000]">Uni Year 1</span>
                                    </div>
                                </div>
                            </ParallaxCard>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* FACULTY SECTION */}
            <section className="py-24 bg-[#ffc900] border-b-8 border-black relative overflow-hidden">
                <div className="absolute inset-0 bg-[#000] opacity-5 [background-image:radial-gradient(#000_2px,transparent_2px)] [background-size:32px_32px]" />
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <FadeIn>
                        <h2 className="text-center text-5xl md:text-[5rem] font-black uppercase text-black mb-16 tracking-tighter">Global <span className="text-white px-4 bg-black border-[4px] border-black shadow-[8px_8px_0_0_#4353ff] rotate-2 inline-block">Educators</span></h2>
                    </FadeIn>

                    <div className="space-y-16">
                        {faculty.map((member, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className="brutal-card bg-white border-[6px] border-black shadow-[16px_16px_0_0_#000] p-0 flex flex-col lg:flex-row overflow-hidden group">
                                    {/* Left Column: Photo & Quick Stats */}
                                    <div className="w-full lg:w-2/5 p-8 md:p-12 border-b-[6px] lg:border-b-0 lg:border-r-[6px] border-black relative" style={{ backgroundColor: member.color }}>
                                        <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />

                                        <div className="relative z-10">
                                            <div className="w-full aspect-[3/4] border-[6px] border-black shadow-[12px_12px_0_0_#000] overflow-hidden mb-8 bg-black group-hover:-translate-y-2 transition-transform duration-500">
                                                <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-105 group-hover:scale-100 object-top" />
                                            </div>

                                            <div className="space-y-4">
                                                <div className="bg-white border-[4px] border-black p-4 shadow-[6px_6px_0_0_#000] transform -rotate-2">
                                                    <span className="block text-xs font-black uppercase tracking-widest text-[#666] mb-1">Total Experience</span>
                                                    <span className="block text-xl font-black text-black">{member.experience}</span>
                                                </div>
                                                <div className="bg-[#4353ff] border-[4px] border-black p-4 shadow-[6px_6px_0_0_#000] transform rotate-1 flex flex-col">
                                                    <span className="block text-xs font-black uppercase tracking-widest text-white mb-1">Qualifications</span>
                                                    <span className="block text-sm font-bold text-white">{member.qualifications}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Details */}
                                    <div className="w-full lg:w-3/5 p-8 md:p-12 bg-white relative">
                                        <div className="mb-10 border-b-[4px] border-black pb-8">
                                            <h3 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter mb-2 break-words" style={{ color: member.color, WebkitTextStroke: '1px black' }}>{member.name}</h3>
                                            <p className="text-xl font-black uppercase tracking-widest text-black/40">{member.role}</p>
                                        </div>

                                        <p className="text-lg md:text-xl text-black font-bold leading-relaxed mb-10 pl-6 border-l-[6px] border-black bg-gray-50 py-4 pr-4" style={{ borderLeftColor: member.color }}>
                                            "{member.intro}"
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Skills */}
                                            <div>
                                                <h4 className="text-sm font-black uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                                                    <Star size={16} fill="black" /> Core Skills
                                                </h4>
                                                <ul className="space-y-3">
                                                    {member.skills.map((skill, idx) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            <CheckCircle2 size={20} className="text-[#5ad641] shrink-0 mt-0.5" />
                                                            <span className="text-sm font-black uppercase text-black flex-1">{skill}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="space-y-8">
                                                {/* Boards */}
                                                <div>
                                                    <h4 className="text-sm font-black uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                                                        <Globe size={16} color="black" /> Curriculums
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {member.boards.map((board, idx) => (
                                                            <span key={idx} className="text-xs font-black uppercase text-white bg-black px-3 py-1 border-2 border-transparent hover:border-[#ffc900] hover:text-[#ffc900] transition-colors">{board}</span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Grades */}
                                                <div>
                                                    <h4 className="text-sm font-black uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                                                        <Target size={16} fill="black" /> Grades Taught
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {member.grades.map((grade, idx) => (
                                                            <span key={idx} className="text-xs font-bold uppercase text-black bg-white border-2 border-black px-3 py-1 shadow-[2px_2px_0_0_#000]">{grade}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-24 bg-[#e5e7eb] relative border-b-8 border-black overflow-hidden">
                <div className="container mx-auto px-6 max-w-4xl">
                    <FadeIn>
                        <h2 className="text-5xl md:text-7xl font-black uppercase text-black mb-16 text-center shadow-text" style={{ WebkitTextStroke: '2px black', color: 'transparent' }}>Any Questions?</h2>
                    </FadeIn>

                    <div className="space-y-6">
                        <motion.div
                            style={{ rotate: kineticTextX }}
                            className="absolute -left-10 top-1/2 w-20 h-20 bg-black rotate-45 hidden lg:block"
                        />
                        <motion.div
                            style={{ y: kineticTextY }}
                            className="absolute -right-10 bottom-1/4 w-32 h-32 border-8 border-black rounded-full hidden lg:block"
                        />

                        {faqs.map((faq, index) => (
                            <FadeIn key={index} delay={index * 0.1}>
                                <div className="border-[4px] border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-white overflow-hidden group">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full text-left p-6 md:p-8 font-black uppercase text-xl md:text-2xl flex justify-between items-center outline-none bg-white hover:bg-[#ffc900] transition-colors gap-8"
                                    >
                                        <span className="leading-tight">{faq.q}</span>
                                        <div className="bg-black text-white p-2 border-2 border-transparent group-hover:border-black shrink-0">
                                            <ChevronDown
                                                size={32}
                                                className={`transform transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                                            />
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="border-t-[4px] border-black bg-[#ff90e8]"
                                            >
                                                <p className="p-6 md:p-8 text-black font-bold text-lg md:text-xl leading-relaxed">{faq.a}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-32 bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" alt="Campus bg" className="w-full h-full object-cover opacity-40 grayscale" />
                    <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 z-0" />

                <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                    <FadeIn>
                        <div className="inline-block mb-10 bg-[#5ad641] p-6 border-[4px] border-white rotate-[10deg] shadow-[8px_8px_0_0_#4353ff] hover:rotate-0 transition-transform cursor-pointer">
                            <Sparkles size={64} className="text-black fill-black" />
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 uppercase glitch" style={{ WebkitTextStroke: '3px #ffc900', color: 'black' }}>Ready to excel?</h2>
                        <p className="text-xl md:text-2xl text-white font-bold mb-16 max-w-2xl mx-auto uppercase tracking-wider bg-black/80 p-6 border-4 border-[#ff90e8]">
                            Join elite students worldwide who are accelerating their academic journeys through our specialized mentorship.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                            <Link href="/book-demo" data-hover-text="Let's Go!" className="brutal-btn bg-white text-black border-4 border-black py-6 px-16 transition-all text-xl w-full sm:w-auto flex items-center justify-center gap-4 hover:shadow-[12px_12px_0_0_#ff90e8]">
                                Book Your Demo
                                <ArrowRight size={32} className="relative z-20" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <SharedFooter theme="brutalist" />

        </main>
    );
}
