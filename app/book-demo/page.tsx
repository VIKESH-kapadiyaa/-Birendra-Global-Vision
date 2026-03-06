'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ChevronRight, Zap, Target, BookOpen, Clock, Globe, Heart } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

type BookingPhase = 'form' | 'payment' | 'success';

export default function BookDemoPage() {
    const [phase, setPhase] = useState<BookingPhase>('form');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        country: 'India',
        role: 'Student',
        subject: '',
        topics: '',
        preferredTime: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const price = formData.country === 'India' ? '₹49' : '£1';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setPhase('payment');

        const isLoaded = await loadRazorpay();
        if (!isLoaded) {
            window.location.href = 'https://rzp.io/rzp/jbjzVAjW';
            return;
        }

        const numericPrice = parseInt(price.replace(/[^0-9]/g, ''), 10);
        const currency = formData.country === 'India' ? 'INR' : 'GBP';

        try {
            const res = await fetch('/api/razorpay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: numericPrice, currency })
            });

            if (!res.ok) {
                window.location.href = 'https://rzp.io/rzp/jbjzVAjW';
                return;
            }

            const order = await res.json();

            if (order.error) {
                window.location.href = 'https://rzp.io/rzp/jbjzVAjW';
                return;
            }

            const options = {
                key: 'rzp_live_SNuYyvjWoaQDcz',
                amount: order.amount,
                currency: order.currency,
                name: 'Birendra Global Vision',
                description: `Demo Booking for ${formData.subject}`,
                order_id: order.id,
                handler: async function (response: any) {
                    try {
                        await supabase.from('bookings').insert([{
                            type: 'genius_hub',
                            service_name: 'Demo Booked',
                            customer_name: formData.name,
                            email: formData.email,
                            whatsapp: formData.whatsapp,
                            country: formData.country,
                            role: formData.role,
                            subject: formData.subject,
                            topics: formData.topics,
                            date: formData.preferredTime,
                            amount_paid: numericPrice,
                            payment_id: response.razorpay_payment_id || 'link_fallback'
                        }]);

                        await fetch('/api/send-email', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                to: formData.email,
                                subject: 'Demo Confirmation - BGV Genius Hub',
                                type: 'demo',
                                data: {
                                    name: formData.name,
                                    subject: formData.subject,
                                    date: formData.preferredTime
                                }
                            })
                        });
                    } catch (err) {
                        console.error("Payment Success Error:", err);
                    }
                    setPhase('success');
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.whatsapp
                },
                theme: {
                    color: '#000000'
                }
            };
            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', function () {
                setPhase('form');
            });
            rzp.open();
        } catch (err) {
            console.error(err);
            window.location.href = 'https://rzp.io/rzp/jbjzVAjW';
        }
    };

    return (
        <main className="min-h-screen bg-[#e5e7eb] font-sans selection:bg-[#ff90e8] selection:text-black py-16 px-4 md:px-8 relative overflow-hidden flex flex-col items-center justify-center">
            {/* AGGRESSIVE BACKGROUND */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(#000_3px,transparent_3px)] [background-size:32px_32px]" />
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#ff90e8] blur-[120px] rounded-full opacity-30 pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#4353ff] blur-[120px] rounded-full opacity-30 pointer-events-none" />

            {/* Floating Decorative Elements */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-[15%] right-[10%] opacity-20 hidden lg:block pointer-events-none">
                <StarIcon size={120} strokeWidth={1} />
            </motion.div>
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-[20%] left-[5%] opacity-20 hidden lg:block pointer-events-none">
                <Target size={150} strokeWidth={1} />
            </motion.div>

            <div className="w-full max-w-6xl relative z-10 z-[100]">
                {/* Back button */}
                <Link href="/genius-hub" className="inline-flex items-center gap-3 px-6 py-3 bg-black text-white border-[4px] border-black shadow-[6px_6px_0_0_#ff90e8] font-black uppercase tracking-widest text-sm mb-12 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#ff90e8] hover:bg-white hover:text-black transition-all relative z-50 pointer-events-auto group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Genius Hub
                </Link>

                <AnimatePresence mode="wait">
                    {/* --- PHASE 1: BOOKING FORM --- */}
                    {phase === 'form' && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -50 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-white border-[8px] border-black shadow-[24px_24px_0_0_#000] overflow-hidden flex flex-col lg:flex-row relative z-50 pointer-events-auto w-full"
                        >
                            {/* Left Panel: Info */}
                            <div className="w-full lg:w-5/12 bg-[#ffc900] p-10 md:p-16 border-b-[8px] lg:border-b-0 lg:border-r-[8px] border-black flex flex-col justify-between relative overflow-hidden">
                                {/* Left Panel Texture */}
                                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.05)_25%,rgba(0,0,0,0.05)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.05)_75%,rgba(0,0,0,0.05)_100%)] bg-[length:20px_20px] pointer-events-none" />

                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white border-[6px] border-black rounded-full mix-blend-overlay opacity-50" />

                                <div className="relative z-10 mb-16">
                                    <div className="inline-block px-4 py-2 bg-black border-2 border-black text-white font-black text-xs uppercase tracking-widest mb-6 shadow-[4px_4px_0_0_#ff90e8] -rotate-2">
                                        Limited Slots available
                                    </div>
                                    <h1 className="text-7xl lg:text-[6rem] font-black uppercase text-black leading-[0.85] tracking-tighter mb-8 shadow-text" style={{ WebkitTextStroke: '2px black' }}>
                                        Book<br />A Demo
                                    </h1>
                                    <p className="text-xl md:text-2xl font-black border-l-[8px] border-black pl-6 py-2 text-black bg-white/70 backdrop-blur-sm mb-12 shadow-[8px_8px_0_0_#000] leading-snug">
                                        Secure your 1-on-1 expert mentor session today and accelerate your learning.
                                    </p>
                                </div>

                                <div className="relative z-10">
                                    {/* Tape Accent */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/40 backdrop-blur-sm border-2 border-dashed border-black/30 rotate-3 z-20" />

                                    <div className="bg-black text-white p-8 border-[6px] border-black shadow-[12px_12px_0_0_#4353ff] rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
                                        <p className="text-sm uppercase font-black tracking-widest text-white/50 mb-2 border-b-2 border-white/20 pb-2">First Demo Pricing</p>
                                        <div className="flex items-baseline gap-2 mb-6 text-[#5ad641] mt-4">
                                            <span className="text-6xl md:text-7xl font-black">{price}</span>
                                        </div>
                                        <ul className="space-y-4 text-base font-bold opacity-90">
                                            <li className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-[#ff90e8] text-black flex items-center justify-center shrink-0"><CheckCircle2 size={16} /></span> Selected Expert Mentor</li>
                                            <li className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-[#ff90e8] text-black flex items-center justify-center shrink-0"><CheckCircle2 size={16} /></span> Custom Study Plan</li>
                                            <li className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-[#ff90e8] text-black flex items-center justify-center shrink-0"><CheckCircle2 size={16} /></span> Concept Deep Dive</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel: Form */}
                            <div className="w-full lg:w-7/12 p-10 md:p-16 bg-white flex flex-col justify-center">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Name */}
                                        <div className="space-y-3 group">
                                            <label className="text-sm font-black uppercase tracking-widest text-black flex items-center gap-2">
                                                <div className="w-2 h-2 bg-black group-focus-within:bg-[#ff90e8] transition-colors" /> Full Name
                                            </label>
                                            <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-gray-50 border-[4px] border-black p-4 text-black text-lg font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[6px_6px_0_0_#ff90e8] transition-all" placeholder="John Doe" />
                                        </div>
                                        {/* Email */}
                                        <div className="space-y-3 group">
                                            <label className="text-sm font-black uppercase tracking-widest text-black flex items-center gap-2">
                                                <div className="w-2 h-2 bg-black group-focus-within:bg-[#ff90e8] transition-colors" /> Email Address
                                            </label>
                                            <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-gray-50 border-[4px] border-black p-4 text-black text-lg font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[6px_6px_0_0_#ff90e8] transition-all" placeholder="john@example.com" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Country */}
                                        <div className="space-y-3 group">
                                            <label className="text-sm font-black uppercase tracking-widest text-black flex items-center gap-2">
                                                <div className="w-2 h-2 bg-black group-focus-within:bg-[#4353ff] transition-colors" /> Location
                                            </label>
                                            <div className="relative">
                                                <select required name="country" value={formData.country} onChange={handleInputChange} className="w-full bg-gray-50 border-[4px] border-black p-4 text-black text-lg font-bold appearance-none focus:outline-none focus:bg-white focus:shadow-[6px_6px_0_0_#4353ff] transition-all cursor-pointer">
                                                    <option value="India">India</option>
                                                    <option value="United Kingdom">United Kingdom (UK)</option>
                                                    <option value="United States">United States</option>
                                                    <option value="Canada">Canada</option>
                                                    <option value="UAE">UAE</option>
                                                    <option value="Australia">Australia</option>
                                                    <option value="Other">Other International</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none bg-black text-white p-1 border-2 border-black">
                                                    <ChevronDownIcon size={20} />
                                                </div>
                                            </div>
                                        </div>
                                        {/* WhatsApp */}
                                        <div className="space-y-3 group">
                                            <label className="text-sm font-black uppercase tracking-widest text-black flex items-center gap-2">
                                                <div className="w-2 h-2 bg-black group-focus-within:bg-[#ff90e8] transition-colors" /> WhatsApp Number
                                            </label>
                                            <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} className="w-full bg-gray-50 border-[4px] border-black p-4 text-black text-lg font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[6px_6px_0_0_#ff90e8] transition-all" placeholder="+91 99999 99999" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Mode */}
                                        <div className="space-y-3 group">
                                            <label className="text-sm font-black uppercase tracking-widest text-black flex items-center gap-2">
                                                <div className="w-2 h-2 bg-black group-focus-within:bg-[#ffc900] transition-colors" /> You Are A
                                            </label>
                                            <div className="relative">
                                                <select required name="role" value={formData.role} onChange={handleInputChange} className="w-full bg-gray-50 border-[4px] border-black p-4 text-black text-lg font-bold appearance-none focus:outline-none focus:bg-white focus:shadow-[6px_6px_0_0_#ffc900] transition-all cursor-pointer">
                                                    <option value="Student">Student</option>
                                                    <option value="Professional">Professional</option>
                                                    <option value="Parent">Parent (booking for child)</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none bg-black text-white p-1 border-2 border-black">
                                                    <ChevronDownIcon size={20} />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Subject */}
                                        <div className="space-y-3 group">
                                            <label className="text-sm font-black uppercase tracking-widest text-black flex items-center gap-2">
                                                <div className="w-2 h-2 bg-black group-focus-within:bg-[#ff90e8] transition-colors" /> Subject of Interest
                                            </label>
                                            <input required type="text" name="subject" value={formData.subject} onChange={handleInputChange} className="w-full bg-gray-50 border-[4px] border-black p-4 text-black text-lg font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[6px_6px_0_0_#ff90e8] transition-all" placeholder="e.g. Advanced Calculus" />
                                        </div>
                                    </div>

                                    {/* Topics */}
                                    <div className="space-y-3 group">
                                        <label className="text-sm font-black uppercase tracking-widest text-black flex items-center gap-2">
                                            <div className="w-2 h-2 bg-black group-focus-within:bg-[#4353ff] transition-colors" /> What specific topics to cover?
                                        </label>
                                        <textarea required name="topics" value={formData.topics} onChange={handleInputChange} rows={3} className="w-full bg-gray-50 border-[4px] border-black p-4 text-black text-lg font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[6px_6px_0_0_#4353ff] transition-all resize-none" placeholder="Let your mentor know what you struggle with or want to explore..." />
                                    </div>

                                    {/* Time */}
                                    <div className="space-y-3 group">
                                        <label className="text-sm font-black uppercase tracking-widest text-black flex items-center gap-2">
                                            <div className="w-2 h-2 bg-black group-focus-within:bg-[#5ad641] transition-colors" /> Preferred Date & Time
                                        </label>
                                        <input required type="datetime-local" name="preferredTime" value={formData.preferredTime} onChange={handleInputChange} className="w-full bg-gray-50 border-[4px] border-black p-4 text-black text-lg font-bold focus:outline-none focus:bg-white focus:shadow-[6px_6px_0_0_#5ad641] transition-all" />
                                    </div>

                                    <button type="submit" className="w-full brutal-btn bg-[#ff6b00] border-[6px] border-black text-black font-black uppercase tracking-tighter py-6 mt-8 flex items-center justify-center gap-4 text-2xl hover:bg-black hover:text-white hover:-translate-y-2 cursor-pointer shadow-[10px_10px_0_0_#000] hover:shadow-[16px_16px_0_0_#ff90e8] transition-all">
                                        Proceed to Secure Payment <ChevronRight size={32} />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {/* --- PHASE 2: PAYMENT PROCESSING --- */}
                    {phase === 'payment' && (
                        <motion.div
                            key="payment"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5, type: 'spring' }}
                            className="bg-black border-[12px] border-white shadow-[24px_24px_0_0_#ffc900] p-16 md:p-24 text-center text-white max-w-2xl mx-auto relative z-50 flex flex-col items-center justify-center"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ ease: "linear", duration: 1.5, repeat: Infinity }}
                                className="w-32 h-32 border-[8px] border-transparent border-t-[#ff90e8] border-r-[#5ad641] border-b-[#ffc900] border-l-[#4353ff] rounded-full shadow-[0_0_60px_rgba(255,255,255,0.3)] mb-10"
                            />
                            <h2 className="text-6xl font-black uppercase tracking-tight mb-4" style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>Processing</h2>
                            <h3 className="text-4xl font-black uppercase text-[#ffc900] mb-8">Secure Payment</h3>
                            <p className="text-xl font-bold font-mono opacity-60 uppercase tracking-widest bg-white/10 px-6 py-2 border-2 border-white/20">Do not refresh</p>
                        </motion.div>
                    )}

                    {/* --- PHASE 3: SUCCESS --- */}
                    {phase === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 100, rotateX: 45 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ type: 'spring', damping: 15, stiffness: 100 }}
                            className="bg-[#5ad641] border-[10px] border-black shadow-[24px_24px_0_0_#000] p-12 md:p-20 text-center max-w-3xl mx-auto relative z-50 pointer-events-auto transform-gpu"
                        >
                            <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#ffc900] border-[6px] border-black rotate-12 flex items-center justify-center shadow-[10px_10px_0_0_#000] hover:rotate-[360deg] transition-transform duration-1000">
                                <StarIcon size={64} className="text-black fill-black" />
                            </div>

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', delay: 0.3 }}
                                className="w-40 h-40 bg-white border-[8px] border-black rounded-full mx-auto flex items-center justify-center shadow-[12px_12px_0_0_#000] mb-10 relative"
                            >
                                <CheckCircle2 size={80} className="text-black" />
                                {/* Burst lines */}
                                <div className="absolute -inset-8 border-[4px] border-black rounded-full border-dashed animate-spin-slow opacity-20 pointer-events-none" />
                            </motion.div>

                            <h2 className="text-6xl md:text-7xl font-black uppercase text-black mb-8 tracking-tighter leading-[0.9]" style={{ WebkitTextStroke: '2px black' }}>
                                Demo Booked<br className="hidden md:block" /> Beautifully!
                            </h2>

                            <div className="bg-white border-[6px] border-black p-8 md:p-10 mb-12 text-left shadow-[8px_8px_0_0_#000] transform -rotate-1">
                                <p className="text-black font-black text-2xl mb-8 leading-tight">
                                    Hey <span className="bg-[#ffc900] px-2 border-b-4 border-black inline-block -rotate-1">{formData.name}</span>! We are so thrilled to welcome you.
                                    Your expert mentor for <span className="text-white bg-[#4353ff] uppercase px-3 py-1 border-[3px] border-black shadow-[4px_4px_0_0_#000] inline-block mt-2 rotate-1">{formData.subject}</span> awaits! Get ready for an incredible learning experience!
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-start gap-4 p-4 border-[4px] border-black bg-gray-50">
                                        <div className="w-12 h-12 border-[3px] border-black bg-[#ff90e8] flex items-center justify-center shrink-0 shadow-[4px_4px_0_0_#000] -rotate-3"><Clock size={24} className="text-black" /></div>
                                        <div>
                                            <p className="text-xs uppercase font-black tracking-widest text-[#666] mb-1">Scheduled Time</p>
                                            <p className="font-bold text-lg text-black">{new Date(formData.preferredTime).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 border-[4px] border-black bg-gray-50">
                                        <div className="w-12 h-12 border-[3px] border-black bg-[#ffc900] flex items-center justify-center shrink-0 shadow-[4px_4px_0_0_#000] rotate-3"><Zap size={24} className="text-black" /></div>
                                        <div>
                                            <p className="text-xs uppercase font-black tracking-widest text-[#666] mb-1">Contact Details</p>
                                            <p className="font-bold text-lg text-black">{formData.whatsapp}</p>
                                            <p className="font-bold text-sm text-black opacity-70 truncate max-w-[150px]">{formData.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link href="/genius-hub" className="brutal-btn w-full bg-black text-white py-6 px-12 flex justify-center items-center gap-4 text-2xl uppercase tracking-tighter hover:bg-[#ffc900] hover:text-black hover:border-black shadow-[12px_12px_0_0_#ff90e8] transition-all group">
                                Return to Dashboard <Target size={28} className="group-hover:rotate-180 transition-transform duration-500" />
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}

function ChevronDownIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
}

function StarIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
}
