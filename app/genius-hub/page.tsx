'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import {
    Calculator,
    Atom,
    FlaskConical,
    BookType,
    Lightbulb,
    ArrowRight,
    CheckCircle2,
    GraduationCap,
    Award,
    Target,
    Users
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

// --- Main Page Component ---

export default function GeniusHub() {
    const { scrollYProgress } = useScroll();
    const yTransform = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const progressWidth = useTransform(springScroll, [0, 1], ["0%", "100%"]);

    const subjects = [
        {
            title: "Advanced Mathematics",
            desc: "From algebraic foundations to advanced calculus and competitive mathematics.",
            icon: Calculator,
            color: "blue"
        },
        {
            title: "Physics",
            desc: "Master classical mechanics, electromagnetism, and modern physics concepts.",
            icon: Atom,
            color: "indigo"
        },
        {
            title: "Chemistry",
            desc: "Deep dive into organic, inorganic, and physical chemistry principles.",
            icon: FlaskConical,
            color: "emerald"
        },
        {
            title: "English Language & Literature",
            desc: "Enhance critical reading, expressive writing, and communication skills.",
            icon: BookType,
            color: "orange"
        },
        {
            title: "On-Demand Subjects",
            desc: "Customized curriculum tailored to your specific academic requirements and goals.",
            icon: Lightbulb,
            color: "purple"
        }
    ];

    const methodology = [
        {
            step: "01",
            title: "Diagnostic Assessment",
            desc: "We begin by analyzing the student's current proficiency, learning style, and academic goals to establish a clear baseline."
        },
        {
            step: "02",
            title: "Curriculum Customization",
            desc: "A personalized syllabus is crafted, ensuring all blind spots are addressed while accelerating strengths."
        },
        {
            step: "03",
            title: "1-on-1 Expert Mentorship",
            desc: "Engage in highly interactive, focused sessions with elite educators dedicated solely to the student's progress."
        },
        {
            step: "04",
            title: "Continuous Evaluation",
            desc: "Regular mock tests, conceptual reviews, and progress tracking ensure the student is always moving toward excellence."
        }
    ];

    return (
        <main className="min-h-screen bg-white text-black selection:bg-[#5ad641] selection:text-black font-sans">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-2 bg-black origin-left z-50 border-b-2 border-white"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Top Navigation Spacer (Assuming global nav is fixed) */}
            <div className="h-24 w-full" />

            {/* HERO SECTION */}
            <section className="relative pt-20 pb-32 overflow-hidden bg-white">
                {/* Clean Geometric Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Minimal Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-100" />
                </div>

                <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                    <div className="flex flex-col lg:flex-row items-center gap-16">

                        {/* Hero Content */}
                        <div className="flex-1 text-center lg:text-left hover-trigger">
                            <FadeIn>
                                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border-[3px] border-black mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                                    <span className="w-3 h-3 rounded-full bg-[#5ad641] border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] animate-pulse" />
                                    <span className="text-sm font-black uppercase tracking-widest text-black">Premium Academic Mentorship</span>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.1}>
                                <h1 className="text-6xl md:text-[6.5rem] font-black text-black tracking-tighter leading-[0.95] mb-8 uppercase brutal-title brutal-highlight">
                                    <span className="block mb-2">Master Core</span>
                                    <span className="block text-[#5ad641]" style={{ WebkitTextStroke: '3px black' }}>Academics.</span>
                                </h1>
                            </FadeIn>

                            <FadeIn delay={0.2}>
                                <p className="text-xl md:text-2xl text-black font-bold border-l-[6px] border-[#5ad641] pl-6 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0 py-2">
                                    Accelerate learning with world-class, customized one-on-one education. We provide elite instruction in Mathematics, Sciences, English, and bespoke subjects designed entirely around the student's ambition.
                                </p>
                            </FadeIn>

                            <FadeIn delay={0.3}>
                                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                                    <Link href="/" data-hover-text="Ready?" className="brutal-btn py-4 px-8 w-full sm:w-auto text-center flex items-center justify-center gap-2 text-lg">
                                        Book Consultation
                                        <ArrowRight size={20} className="relative z-20" />
                                    </Link>
                                    <Link href="#subjects" data-hover-text="See More" className="brutal-btn-secondary py-4 px-8 w-full sm:w-auto text-center flex items-center justify-center text-lg">
                                        Explore Subjects
                                    </Link>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.4} className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-black font-bold">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={24} className="text-[#5ad641] bg-black rounded-full" />
                                    <span className="text-sm font-black uppercase tracking-wider">Verified Educators</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={24} className="text-[#5ad641] bg-black rounded-full" />
                                    <span className="text-sm font-black uppercase tracking-wider">100% Customized</span>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Hero Visual */}
                        <div className="flex-1 w-full max-w-lg lg:max-w-none relative mt-10 lg:mt-0 p-4">
                            <FadeIn delay={0.3} direction="left" className="h-full">
                                <div className="brutal-card p-8 h-full flex flex-col justify-between">
                                    <div className="flex items-center justify-between mb-8 relative z-10 border-b-[4px] border-black pb-6">
                                        <h3 className="text-2xl font-black uppercase tracking-wider text-black">Student Dashboard Matrix</h3>
                                        <div className="w-14 h-14 border-[3px] border-black shadow-[4px_4px_0_0_#000] bg-[#5ad641] flex items-center justify-center transition-transform hover:rotate-90 duration-300">
                                            <Target size={28} className="text-black" />
                                        </div>
                                    </div>

                                    <div className="space-y-4 relative z-10">
                                        {[
                                            { subject: "Advanced Calculus", progress: 85, color: "bg-[#5ad641]" },
                                            { subject: "Organic Chemistry", progress: 65, color: "bg-black" },
                                            { subject: "English Literature", progress: 92, color: "bg-[#5ad641]" }
                                        ].map((stat, i) => (
                                            <div key={i} className="px-5 py-4 bg-white border-[3px] border-black mb-5 shadow-[5px_5px_0_0_#000] hover:-translate-y-1 transition-transform select-none">
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-base font-black uppercase text-black tracking-wide">{stat.subject}</span>
                                                    <span className="text-sm font-black text-black border-[3px] border-black px-3 py-1 bg-[#5ad641]">{stat.progress}%</span>
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

                                    <div className="mt-6 pt-6 border-t-[4px] border-black flex items-center justify-between relative z-10">
                                        <div className="flex -space-x-4">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-14 h-14 border-[3px] border-black bg-white flex items-center justify-center overflow-hidden hover:z-20 hover:-translate-y-2 transition-transform shadow-[4px_4px_0_0_#000]">
                                                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=e2e8f0`} alt="avatar" className="w-full h-full object-cover grayscale border-2 border-white" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-black font-black uppercase tracking-widest mb-2 px-3 py-1 bg-[#5ad641] border-[2px] border-black shadow-[2px_2px_0_0_#000] inline-block">Mentors</p>
                                            <p className="text-base font-black text-black uppercase">World-Class Faculty</p>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                    </div>
                </div>
            </section>

            {/* SUBJECTS SECTION */}
            <section id="subjects" className="py-24 bg-white border-y-8 border-black relative">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:32px_32px] opacity-50" />
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <FadeIn>
                            <h2 className="text-5xl md:text-6xl font-black text-black mb-6 tracking-tighter uppercase brutal-title">Academic Disciplines.</h2>
                            <p className="text-lg md:text-xl text-black font-bold p-4 bg-[#5ad641] border-4 border-black brutal-card transform-none hover:transform-none">Comprehensive, rigorous, and completely personalized. We cover the entire spectrum of fundamental and advanced global curricula.</p>
                        </FadeIn>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {subjects.map((sub, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className="group h-full brutal-card p-8 flex flex-col cursor-pointer bg-white">
                                    <div className="w-16 h-16 border-4 border-black bg-white flex items-center justify-center mb-6 transition-transform duration-300 group-hover:bg-[#5ad641] group-hover:scale-110 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <sub.icon size={32} strokeWidth={2.5} className="text-black" />
                                    </div>
                                    <h3 className="text-2xl font-black uppercase text-black mb-3">{sub.title}</h3>
                                    <p className="text-black font-medium leading-relaxed text-base flex-1">{sub.desc}</p>

                                    <div className="mt-8 pt-6 border-t-4 border-black flex items-center text-sm font-black uppercase text-black group-hover:text-[#5ad641] transition-colors">
                                        View Syllabus <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* METHODOLOGY SECTION */}
            <section className="py-24 bg-white relative overflow-hidden border-b-8 border-black">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">

                        <div className="flex-1">
                            <FadeIn>
                                <h2 className="text-4xl md:text-6xl font-black text-black mb-6 tracking-tighter uppercase brutal-title">The BGV <br /><span className="text-black bg-[#5ad641] px-2 italic">Methodology.</span></h2>
                                <p className="text-lg md:text-xl text-black font-semibold mb-10 leading-relaxed max-w-xl border-l-8 border-black pl-6 bg-gray-50 py-4">
                                    We do not believe in a one-size-fits-all approach. Every student has a unique mental architecture. Our four-step methodology ensures knowledge is completely internalized.
                                </p>
                            </FadeIn>

                            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.45rem] before:-translate-x-px md:before:ml-[1.45rem] before:h-full before:w-1 before:bg-black">
                                {methodology.map((item, i) => (
                                    <FadeIn key={i} delay={i * 0.1} direction="left" className="relative flex items-start gap-8">
                                        <div className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center shrink-0 z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#5ad641] transition-colors">
                                            <span className="text-sm font-black text-black">{item.step}</span>
                                        </div>
                                        <div className="pt-1 brutal-card p-6 w-full -mt-2">
                                            <h4 className="text-xl font-black uppercase text-black mb-2">{item.title}</h4>
                                            <p className="text-black font-medium text-base leading-relaxed">{item.desc}</p>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 w-full">
                            <FadeIn direction="right">
                                <div className="relative aspect-square md:aspect-[4/3] bg-white border-8 border-black flex items-center justify-center p-8 text-center group brutal-card">
                                    <img
                                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                                        alt="Students learning"
                                        className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/50" />

                                    <div className="relative z-10 max-w-sm bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(90,214,65,1)]">
                                        <GraduationCap size={48} className="text-black mx-auto mb-6" />
                                        <h3 className="text-2xl font-black text-black mb-4 uppercase">"Education is not the learning of facts, but the training of the mind to think."</h3>
                                        <p className="text-black font-black uppercase tracking-widest text-sm bg-[#5ad641] inline-block px-2 py-1 border-2 border-black">— Albert Einstein</p>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-32 bg-black text-[#5ad641] relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50" />

                <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                    <FadeIn>
                        <h2 className="text-5xl md:text-[6rem] font-black tracking-tighter mb-8 uppercase glitch" style={{ WebkitTextStroke: '2px #5ad641', color: 'black' }}>Ready to excel?</h2>
                        <p className="text-xl md:text-2xl text-white font-bold mb-12 max-w-2xl mx-auto uppercase tracking-wider">
                            Join elite students worldwide who are accelerating their academic journeys through our specialized mentorship.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/" data-hover-text="Let's Go!" className="brutal-btn bg-white text-black border-4 py-6 px-12 transition-all text-xl w-full sm:w-auto flex items-center justify-center gap-4">
                                Book Your First Demo
                                <ArrowRight size={28} className="relative z-20" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

        </main>
    );
}
