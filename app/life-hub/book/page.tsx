'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, User, Mail, Phone, MapPin, Calendar, MessageSquare, ChevronDown } from 'lucide-react';
import Link from 'next/link';

// ─────────────────────────────────────────────────────────────────────────────
// FONT
// ─────────────────────────────────────────────────────────────────────────────
const FONT = "'Playfair Display', 'Georgia', serif";

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE CATALOGUE (for the dropdown + price look-up)
// ─────────────────────────────────────────────────────────────────────────────
const SERVICES = [
    { id: 'life-coaching', label: 'Life Coaching', subtitle: 'Advising, Mentoring & Counseling', duration: '60 min', priceIndia: '₹1,500', priceIntl: '£15' },
    { id: 'crystal-scrying', label: 'Crystal Ball Scrying', subtitle: 'Divination & Intuitive Insight', duration: '25 min', priceIndia: '₹500', priceIntl: '£20' },
    { id: 'aura-cleansing', label: 'Aura Cleansing', subtitle: 'Energy Clearing & Field Renewal', duration: '45 min', priceIndia: '₹800', priceIntl: '£10' },
    { id: 'subconscious-work', label: 'Subconscious Work', subtitle: 'Rewire Deep-Rooted Patterns', duration: '50 min', priceIndia: '₹1,200', priceIntl: '£12' },
    { id: 'sound-healing', label: 'Mantra & Sound Healing', subtitle: 'Vibrational Frequency Work', duration: '40 min', priceIndia: '₹700', priceIntl: '£8' },
];

const COUNTRIES = [
    'India', 'United Kingdom', 'United States', 'Canada', 'Australia',
    'New Zealand', 'Singapore', 'UAE', 'Other',
];

// ─────────────────────────────────────────────────────────────────────────────
// SMALL HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const FieldLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-[10px] uppercase tracking-[0.22em] font-semibold text-[#7A6E3A] mb-2">
        {children}
    </label>
);

const InputBase = "w-full border border-[#C8B96E]/60 bg-[#F5F1E8] px-5 py-3.5 text-[#2C2916] font-medium text-sm focus:outline-none focus:border-[#7A6E3A] transition-colors placeholder:text-[#A09070]";

// ─────────────────────────────────────────────────────────────────────────────
// INNER BOOKING FORM (uses useSearchParams — must be wrapped in Suspense)
// ─────────────────────────────────────────────────────────────────────────────
function BookingForm() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const serviceParam = searchParams.get('service') ?? '';
    const matchedService = SERVICES.find(s => s.id === serviceParam) ?? SERVICES[0];

    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedService, setSelectedService] = useState(matchedService);
    const [isIndia, setIsIndia] = useState(true);

    const [form, setForm] = useState({
        name: '',
        email: '',
        whatsapp: '',
        country: 'India',
        date: '',
        time: '',
        notes: '',
        type: 'student' as 'student' | 'professional',
    });

    // Re-sync if URL param changes
    useEffect(() => {
        const s = SERVICES.find(s => s.id === serviceParam);
        if (s) setSelectedService(s);
    }, [serviceParam]);

    useEffect(() => {
        setIsIndia(form.country === 'India');
    }, [form.country]);

    const price = isIndia ? selectedService.priceIndia : selectedService.priceIntl;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(3);
    };

    return (
        <>
            {/* Font */}
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');`}</style>

            <main className="min-h-screen bg-[#EDE9E1] text-[#2C2916]" style={{ fontFamily: "'Inter', sans-serif" }}>

                {/* Gold progress bar */}
                <div className="h-1 w-full bg-[#E8E3D8]">
                    <motion.div
                        className="h-full bg-[#7A6E3A]"
                        animate={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                </div>

                <div className="container mx-auto px-4 md:px-6 max-w-6xl py-12 md:py-20">

                    {/* Back link */}
                    <Link
                        href="/life-hub"
                        className="inline-flex items-center gap-2 text-[#7A6E3A] text-xs uppercase tracking-[0.2em] font-semibold mb-10 hover:text-[#2C2916] transition-colors"
                    >
                        <ArrowLeft size={14} /> Back to Life Hub
                    </Link>

                    <AnimatePresence mode="wait">

                        {/* ── STEP 1: Choose service ── */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* Header */}
                                <div className="mb-14">
                                    <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#7A6E3A] flex items-center gap-2 mb-3">
                                        <span className="w-6 h-px bg-[#7A6E3A]" /> Step 1 of 2
                                    </p>
                                    <h1 className="text-5xl md:text-6xl font-bold text-[#2C2916] leading-tight mb-4" style={{ fontFamily: FONT }}>
                                        Reserve your<br /><em className="text-[#7A6E3A]">session.</em>
                                    </h1>
                                    <p className="text-base text-[#5A5040] max-w-xl leading-relaxed">
                                        Choose your session below, then we'll collect your details to confirm the booking.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-start">

                                    {/* Left column — service picker */}
                                    <div className="lg:col-span-2 space-y-3">
                                        {SERVICES.map(svc => (
                                            <motion.button
                                                key={svc.id}
                                                whileHover={{ x: 4 }}
                                                onClick={() => setSelectedService(svc)}
                                                className={`w-full text-left flex items-center justify-between px-6 py-5 border transition-all ${selectedService.id === svc.id
                                                        ? 'border-[#7A6E3A] bg-white shadow-[0_2px_20px_rgba(122,110,58,0.10)]'
                                                        : 'border-[#C8B96E]/40 bg-[#F5F1E8] hover:border-[#C8B96E]'
                                                    }`}
                                            >
                                                <div>
                                                    <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#7A6E3A] mb-0.5">{svc.label}</p>
                                                    <p className="text-base font-bold text-[#2C2916]" style={{ fontFamily: FONT }}>{svc.subtitle}</p>
                                                    <p className="text-xs text-[#A09070] mt-0.5">{svc.duration}</p>
                                                </div>
                                                <div className="text-right shrink-0 ml-4">
                                                    <p className="text-xl font-bold text-[#2C2916]" style={{ fontFamily: FONT }}>
                                                        {isIndia ? svc.priceIndia : svc.priceIntl}
                                                    </p>
                                                    {selectedService.id === svc.id && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            className="w-2 h-2 rounded-full bg-[#7A6E3A] ml-auto mt-1"
                                                        />
                                                    )}
                                                </div>
                                            </motion.button>
                                        ))}

                                        {/* Country toggle for price display */}
                                        <div className="flex items-center gap-3 pt-2">
                                            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7A6E3A]">Show prices in:</p>
                                            <button
                                                onClick={() => setIsIndia(true)}
                                                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors ${isIndia ? 'bg-[#2C2916] text-[#EDE9E1]' : 'border border-[#C8B96E] text-[#7A6E3A]'}`}
                                            >₹ India</button>
                                            <button
                                                onClick={() => setIsIndia(false)}
                                                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors ${!isIndia ? 'bg-[#2C2916] text-[#EDE9E1]' : 'border border-[#C8B96E] text-[#7A6E3A]'}`}
                                            >£ International</button>
                                        </div>
                                    </div>

                                    {/* Right — selected summary sticky card */}
                                    <div className="lg:sticky lg:top-8">
                                        <div className="border border-[#C8B96E]/40 bg-white p-8 shadow-[0_4px_30px_rgba(122,110,58,0.07)]">
                                            <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#7A6E3A] mb-1">Selected Session</p>
                                            <h3 className="text-2xl font-bold text-[#2C2916] mb-1 leading-snug" style={{ fontFamily: FONT }}>
                                                {selectedService.subtitle}
                                            </h3>
                                            <p className="text-sm text-[#A09070] mb-6">{selectedService.duration}</p>

                                            <div className="border-t border-[#C8B96E]/40 pt-5 mb-6">
                                                <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#7A6E3A] mb-1">Session Investment</p>
                                                <p className="text-4xl font-bold text-[#2C2916]" style={{ fontFamily: FONT }}>{price}</p>
                                            </div>

                                            <button
                                                onClick={() => setStep(2)}
                                                className="w-full bg-[#2C2916] text-[#EDE9E1] py-4 text-sm font-semibold uppercase tracking-[0.18em] flex items-center justify-center gap-2 hover:bg-[#7A6E3A] transition-colors rounded-full"
                                            >
                                                Continue <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ── STEP 2: Details form ── */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* Header */}
                                <div className="mb-12">
                                    <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#7A6E3A] flex items-center gap-2 mb-3">
                                        <span className="w-6 h-px bg-[#7A6E3A]" /> Step 2 of 2
                                    </p>
                                    <h1 className="text-5xl md:text-6xl font-bold text-[#2C2916] leading-tight mb-4" style={{ fontFamily: FONT }}>
                                        Your details,<br /><em className="text-[#7A6E3A]">your journey.</em>
                                    </h1>
                                    <p className="text-base text-[#5A5040] max-w-xl leading-relaxed">
                                        Please fill in the details below. All sessions are conducted via Zoom.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">

                                    {/* Form */}
                                    <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">

                                        {/* Who are you */}
                                        <div>
                                            <FieldLabel>I am a</FieldLabel>
                                            <div className="flex gap-3">
                                                {(['student', 'professional'] as const).map(type => (
                                                    <button
                                                        key={type}
                                                        type="button"
                                                        onClick={() => setForm(p => ({ ...p, type }))}
                                                        className={`flex-1 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] border transition-colors ${form.type === type
                                                                ? 'bg-[#2C2916] text-[#EDE9E1] border-[#2C2916]'
                                                                : 'bg-[#F5F1E8] text-[#7A6E3A] border-[#C8B96E]/60 hover:border-[#7A6E3A]'
                                                            }`}
                                                    >
                                                        {type}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Name & Email */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <FieldLabel>Full Name</FieldLabel>
                                                <div className="relative">
                                                    <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8B96E]" />
                                                    <input
                                                        required type="text" name="name" value={form.name} onChange={handleChange}
                                                        placeholder="Your full name"
                                                        className={`${InputBase} pl-10`}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <FieldLabel>Email Address</FieldLabel>
                                                <div className="relative">
                                                    <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8B96E]" />
                                                    <input
                                                        required type="email" name="email" value={form.email} onChange={handleChange}
                                                        placeholder="you@email.com"
                                                        className={`${InputBase} pl-10`}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* WhatsApp & Country */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <FieldLabel>WhatsApp Number</FieldLabel>
                                                <div className="relative">
                                                    <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8B96E]" />
                                                    <input
                                                        required type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange}
                                                        placeholder="+91 99999 99999"
                                                        className={`${InputBase} pl-10`}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <FieldLabel>Country / Location</FieldLabel>
                                                <div className="relative">
                                                    <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8B96E]" />
                                                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C8B96E] pointer-events-none" />
                                                    <select
                                                        name="country" value={form.country} onChange={handleChange}
                                                        className={`${InputBase} pl-10 appearance-none cursor-pointer`}
                                                    >
                                                        {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Date & Time */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <FieldLabel>Preferred Date</FieldLabel>
                                                <div className="relative">
                                                    <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8B96E]" />
                                                    <input
                                                        required type="date" name="date" value={form.date} onChange={handleChange}
                                                        min={new Date().toISOString().split('T')[0]}
                                                        className={`${InputBase} pl-10`}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <FieldLabel>Preferred Time (IST)</FieldLabel>
                                                <div className="relative">
                                                    <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8B96E]" />
                                                    <input
                                                        required type="time" name="time" value={form.time} onChange={handleChange}
                                                        className={`${InputBase} pl-10`}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Notes */}
                                        <div>
                                            <FieldLabel>What would you like to focus on? (Optional)</FieldLabel>
                                            <div className="relative">
                                                <MessageSquare size={14} className="absolute left-4 top-4 text-[#C8B96E]" />
                                                <textarea
                                                    name="notes" value={form.notes} onChange={handleChange}
                                                    rows={4}
                                                    placeholder="Share any specific topics, questions, or areas you'd like to explore in your session..."
                                                    className={`${InputBase} pl-10 resize-none`}
                                                />
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="inline-flex items-center justify-center gap-2 border border-[#C8B96E] text-[#7A6E3A] px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] hover:border-[#7A6E3A] transition-colors rounded-full"
                                            >
                                                <ArrowLeft size={14} /> Back
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 bg-[#2C2916] text-[#EDE9E1] py-4 text-sm font-semibold uppercase tracking-[0.18em] flex items-center justify-center gap-2 hover:bg-[#7A6E3A] transition-colors rounded-full"
                                            >
                                                Confirm Booking — {price} <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </form>

                                    {/* Summary sticky */}
                                    <div className="lg:sticky lg:top-8">
                                        <div className="border border-[#C8B96E]/40 bg-white p-8 shadow-[0_4px_30px_rgba(122,110,58,0.07)]">
                                            <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#7A6E3A] mb-1">Your Booking</p>
                                            <h3 className="text-xl font-bold text-[#2C2916] mb-1 leading-snug" style={{ fontFamily: FONT }}>
                                                {selectedService.subtitle}
                                            </h3>
                                            <p className="text-xs text-[#A09070] mb-5">{selectedService.duration}</p>

                                            <div className="space-y-3 text-sm text-[#5A5040] border-t border-[#C8B96E]/30 pt-5">
                                                {form.name && (
                                                    <div className="flex items-center gap-2">
                                                        <User size={12} className="text-[#C8B96E]" />
                                                        <span>{form.name}</span>
                                                    </div>
                                                )}
                                                {form.country && (
                                                    <div className="flex items-center gap-2">
                                                        <MapPin size={12} className="text-[#C8B96E]" />
                                                        <span>{form.country}</span>
                                                    </div>
                                                )}
                                                {form.date && (
                                                    <div className="flex items-center gap-2">
                                                        <Calendar size={12} className="text-[#C8B96E]" />
                                                        <span>{new Date(form.date).toDateString()} {form.time && `· ${form.time} IST`}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="border-t border-[#C8B96E]/40 mt-5 pt-5">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#7A6E3A]">Total</p>
                                                    <p className="text-3xl font-bold text-[#2C2916]" style={{ fontFamily: FONT }}>{price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ── STEP 3: Success ── */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="min-h-[60vh] flex items-center justify-center py-20"
                            >
                                <div className="max-w-2xl mx-auto text-center">

                                    {/* Mandala icon */}
                                    <div className="w-24 h-24 rounded-full border-2 border-[#7A6E3A] bg-[#F5F1E8] mx-auto flex items-center justify-center mb-8 relative">
                                        <CheckCircle2 size={36} className="text-[#7A6E3A]" />
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                            className="absolute inset-0 rounded-full border border-dashed border-[#C8B96E]/50"
                                        />
                                    </div>

                                    <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#7A6E3A] mb-4 flex items-center justify-center gap-2">
                                        <span className="w-6 h-px bg-[#7A6E3A]" /> Booking Received <span className="w-6 h-px bg-[#7A6E3A]" />
                                    </p>

                                    <h2 className="text-5xl md:text-6xl font-bold text-[#2C2916] leading-tight mb-5" style={{ fontFamily: FONT }}>
                                        Your session<br /><em className="text-[#7A6E3A]">is confirmed.</em>
                                    </h2>

                                    <p className="text-lg text-[#5A5040] leading-relaxed mb-3">
                                        Thank you, <strong className="text-[#2C2916]">{form.name}</strong>. Your <strong>{selectedService.subtitle}</strong> booking has been received.
                                    </p>
                                    <p className="text-base text-[#A09070] mb-10">
                                        We'll reach out to you on WhatsApp at <strong className="text-[#7A6E3A]">{form.whatsapp}</strong> within 24 hours to confirm your slot and share the Zoom link.
                                    </p>

                                    {/* Summary box */}
                                    <div className="bg-white border border-[#C8B96E]/40 p-8 text-left mb-10 shadow-[0_4px_30px_rgba(122,110,58,0.06)]">
                                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#7A6E3A] mb-0.5">Session</p>
                                                <p className="font-semibold text-[#2C2916]">{selectedService.subtitle}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#7A6E3A] mb-0.5">Duration</p>
                                                <p className="font-semibold text-[#2C2916]">{selectedService.duration}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#7A6E3A] mb-0.5">Date</p>
                                                <p className="font-semibold text-[#2C2916]">{form.date ? new Date(form.date).toDateString() : '—'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#7A6E3A] mb-0.5">Time (IST)</p>
                                                <p className="font-semibold text-[#2C2916]">{form.time || '—'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#7A6E3A] mb-0.5">Investment</p>
                                                <p className="font-semibold text-[#2C2916]">{price}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#7A6E3A] mb-0.5">Location</p>
                                                <p className="font-semibold text-[#2C2916]">{form.country}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        href="/life-hub"
                                        className="inline-flex items-center gap-2 bg-[#2C2916] text-[#EDE9E1] px-10 py-4 text-sm font-semibold uppercase tracking-[0.18em] hover:bg-[#7A6E3A] transition-colors rounded-full"
                                    >
                                        <ArrowLeft size={14} /> Back to Life Hub
                                    </Link>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </main>
        </>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE EXPORT — wrap in Suspense for useSearchParams
// ─────────────────────────────────────────────────────────────────────────────
export default function LifeHubBookPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#EDE9E1] flex items-center justify-center">
                <p className="text-[#7A6E3A] text-sm uppercase tracking-[0.3em]">Loading...</p>
            </div>
        }>
            <BookingForm />
        </Suspense>
    );
}
