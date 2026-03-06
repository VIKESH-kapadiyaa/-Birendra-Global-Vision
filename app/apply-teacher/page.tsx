"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Upload, CheckCircle, Video, MapPin, BookOpen, User, Mail, Phone, Sparkles, Heart } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function EducatorApplication() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        subject: '',
        customSubject: '',
        motivation: ''
    });

    const subjects = [
        "Mathematics", "Physics", "Chemistry", "Biology",
        "English Literature", "Psychology", "Computer Science",
        "Economics", "Occult Sciences", "Other"
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubjectSelect = (sub: string) => {
        setFormData({ ...formData, subject: sub, customSubject: sub === 'Other' ? formData.customSubject : '' });
    };

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const dropFile = e.dataTransfer.files[0];
        if (dropFile && (dropFile.type.includes('video/mp4') || dropFile.type.includes('video/quicktime'))) {
            setFile(dropFile);
        } else {
            alert('Please upload a valid .MP4 or .MOV video file.');
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectFile = e.target.files?.[0];
        if (selectFile) {
            setFile(selectFile);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await supabase.from('teachers').insert([{
                full_name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                country: formData.country,
                city: formData.city,
                subject: formData.subject === 'Other' ? formData.customSubject : formData.subject,
                motivation: formData.motivation
            }]);
        } catch (error) {
            console.error('Failed to save to Supabase:', error);
        }

        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const isValidStep1 = formData.fullName && formData.email && formData.phone;
    const isValidStep2 = formData.country && formData.city;
    const isValidStep3 = formData.subject && (formData.subject !== 'Other' || formData.customSubject) && file;
    const isValidStep4 = formData.motivation.length > 20;

    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-amber-500/30 overflow-hidden relative">

            {/* Back to Home Navigation */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 z-50">
                <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <ArrowLeft size={16} />
                    </div>
                    <span className="text-xs uppercase tracking-widest font-bold">Return Home</span>
                </Link>
            </div>

            {/* Cosmic Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[150px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-[#020202]/50 to-[#020202] z-0" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12 md:py-24 min-h-screen flex items-center justify-center">

                <AnimatePresence mode="wait">
                    {!isSuccess ? (
                        <motion.div
                            key="form-container"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            transition={{ duration: 0.5 }}
                            className="w-full max-w-4xl"
                        >
                            {/* Header */}
                            <div className="text-center mb-12">
                                <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Become An <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">Educator</span></h1>
                                <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">Join the Elite Global Faculty at Birendra Global Vision. Inspire the next generation of leaders.</p>
                            </div>

                            {/* Progress Bar & Form Wrapper */}
                            <div className="bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden">

                                {/* Progress Indicator */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-amber-500 to-yellow-400"
                                        initial={{ width: '25%' }}
                                        animate={{ width: `${(step / 4) * 100}%` }}
                                        transition={{ duration: 0.5, ease: "circOut" }}
                                    />
                                </div>

                                <form onSubmit={handleSubmit} className="relative z-10">
                                    <AnimatePresence mode="wait">

                                        {/* STEP 1: Personal Identity */}
                                        {step === 1 && (
                                            <motion.div
                                                key="step1"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <div className="flex items-center gap-3 mb-8">
                                                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500"><User size={20} /></div>
                                                    <h2 className="text-xl md:text-2xl font-bold">Personal Identity</h2>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Full Legal Name</label>
                                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-amber-500 transition-colors" placeholder="Dr. Jane Doe" />
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Email Address</label>
                                                        <div className="relative">
                                                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-amber-500 transition-colors" placeholder="jane.doe@university.edu" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Phone Number</label>
                                                        <div className="relative">
                                                            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-amber-500 transition-colors" placeholder="+1 (555) 000-0000" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pt-6 flex justify-end">
                                                    <button type="button" onClick={() => setStep(2)} disabled={!isValidStep1} className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Continue to Location</button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* STEP 2: Location */}
                                        {step === 2 && (
                                            <motion.div
                                                key="step2"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <div className="flex items-center gap-3 mb-8">
                                                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500"><MapPin size={20} /></div>
                                                    <h2 className="text-xl md:text-2xl font-bold">Base of Operations</h2>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Country of Residence</label>
                                                        <select name="country" value={formData.country} onChange={handleInputChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-amber-500 transition-colors">
                                                            <option value="" disabled className="bg-[#0a0a0a]">Select Country...</option>
                                                            <option value="US" className="bg-[#0a0a0a]">United States</option>
                                                            <option value="UK" className="bg-[#0a0a0a]">United Kingdom</option>
                                                            <option value="IN" className="bg-[#0a0a0a]">India</option>
                                                            <option value="AU" className="bg-[#0a0a0a]">Australia</option>
                                                            <option value="CA" className="bg-[#0a0a0a]">Canada</option>
                                                            <option value="SG" className="bg-[#0a0a0a]">Singapore</option>
                                                            <option value="Other" className="bg-[#0a0a0a]">Other</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs uppercase tracking-widest text-white/50 font-bold">City / Place</label>
                                                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-amber-500 transition-colors" placeholder="e.g. London, UK" />
                                                    </div>
                                                </div>

                                                <div className="pt-6 flex justify-between">
                                                    <button type="button" onClick={() => setStep(1)} className="px-8 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">Back</button>
                                                    <button type="button" onClick={() => setStep(3)} disabled={!isValidStep2} className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Continue to Expertise</button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* STEP 3: Expertise & Video */}
                                        {step === 3 && (
                                            <motion.div
                                                key="step3"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-8"
                                            >
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500"><BookOpen size={20} /></div>
                                                    <h2 className="text-xl md:text-2xl font-bold">Subject Expertise & Demo</h2>
                                                </div>

                                                <div className="space-y-4">
                                                    <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Primary Subject</label>
                                                    <div className="flex flex-wrap gap-2 md:gap-3">
                                                        {subjects.map(sub => (
                                                            <button
                                                                key={sub}
                                                                type="button"
                                                                onClick={() => handleSubjectSelect(sub)}
                                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${formData.subject === sub ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'}`}
                                                            >
                                                                {sub}
                                                            </button>
                                                        ))}
                                                    </div>

                                                    <AnimatePresence>
                                                        {formData.subject === 'Other' && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                                                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <input type="text" name="customSubject" value={formData.customSubject} onChange={handleInputChange} placeholder="What unique subject do you want to teach?" className="w-full bg-white/5 border border-amber-500/30 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-amber-500 transition-colors" />
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>

                                                {/* Video Upload Dropzone */}
                                                <div className="space-y-2">
                                                    <label className="text-xs uppercase tracking-widest text-white/50 font-bold flex justify-between">
                                                        <span>Demo Pitch Video</span>
                                                        <span className="text-amber-500 font-normal">Required (2-5 mins)</span>
                                                    </label>
                                                    <div
                                                        onDragOver={(e) => e.preventDefault()}
                                                        onDrop={handleFileDrop}
                                                        className={`relative border-2 border-dashed ${file ? 'border-green-500/50 bg-green-500/5' : 'border-white/20 bg-white/5'} hover:border-amber-500/50 transition-colors rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden group`}
                                                    >
                                                        <input type="file" accept="video/mp4,video/quicktime" onChange={handleFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />

                                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${file ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-white/40 group-hover:bg-amber-500/20 group-hover:text-amber-400'}`}>
                                                            {file ? <CheckCircle size={32} /> : <Upload size={32} />}
                                                        </div>

                                                        {file ? (
                                                            <div>
                                                                <p className="text-white font-bold mb-1">{file.name}</p>
                                                                <p className="text-green-400/80 text-xs">Video successfully attached. Tap to swap.</p>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <p className="text-white font-medium mb-1">Drag and drop your demo video here</p>
                                                                <p className="text-white/40 text-xs">Supports .MP4 or .MOV up to 500MB</p>
                                                                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-xs uppercase tracking-wider font-bold hover:bg-white/20 transition-colors text-white/80"><Video size={14} /> Browse Files</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="pt-6 flex justify-between">
                                                    <button type="button" onClick={() => setStep(2)} className="px-8 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">Back</button>
                                                    <button type="button" onClick={() => setStep(4)} disabled={!isValidStep3} className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Final Step</button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* STEP 4: Motivation & Submit */}
                                        {step === 4 && (
                                            <motion.div
                                                key="step4"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <div className="flex items-center gap-3 mb-8">
                                                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500"><Sparkles size={20} /></div>
                                                    <h2 className="text-xl md:text-2xl font-bold">The Vision</h2>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Why do you want to join Birendra Global Vision?</label>
                                                    <textarea
                                                        name="motivation"
                                                        value={formData.motivation}
                                                        onChange={handleInputChange}
                                                        required
                                                        rows={6}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                                                        placeholder="Share your teaching philosophy and why you resonate with our global mission..."
                                                    />
                                                    <p className="text-right text-[10px] text-white/30">{formData.motivation.length} chars (minimum 20)</p>
                                                </div>

                                                <div className="pt-8 flex justify-between items-center">
                                                    <button type="button" onClick={() => setStep(3)} className="px-8 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors" disabled={isSubmitting}>Back</button>

                                                    <button
                                                        type="submit"
                                                        disabled={!isValidStep4 || isSubmitting}
                                                        className="relative px-8 md:px-12 py-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.3)]"
                                                    >
                                                        {isSubmitting ? (
                                                            <motion.div className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                                <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" /> Transmitting...
                                                            </motion.div>
                                                        ) : (
                                                            <span>Submit Application</span>
                                                        )}
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </form>
                            </div>
                        </motion.div>
                    ) : (
                        // SUCCESS STATE
                        <motion.div
                            key="success-container"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#0a0a0a]/80 backdrop-blur-3xl border border-green-500/20 rounded-3xl p-8 md:p-16 shadow-2xl shadow-green-500/10 text-center max-w-2xl w-full relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1),transparent)] pointer-events-none" />

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1, rotate: 360 }}
                                transition={{ type: "spring", damping: 15, stiffness: 100 }}
                                className="w-24 h-24 mx-auto bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-8"
                            >
                                <Heart size={48} className="text-amber-500 fill-amber-500" />
                            </motion.div>

                            <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-3xl md:text-5xl font-black mb-4">Application Beautifully Received.</motion.h2>
                            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-white/80 text-base md:text-lg mb-10 max-w-md mx-auto">
                                Thank you from the bottom of our hearts, {formData.fullName.split(' ')[0]}.
                                We are absolutely thrilled to review your demo pitch and vision. We deeply value educators like you! You will hear from us very soon.
                            </motion.p>

                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                                <Link href="/" className="inline-flex px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-lg">
                                    Return to Cosmos
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
