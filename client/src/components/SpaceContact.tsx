import React from "react";
import { motion } from "framer-motion";
import { slideInFromBottom, slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";
import { InView } from "react-intersection-observer";
import { Send } from "lucide-react";
import { SiTelegram, SiGithub } from "react-icons/si";

const SpaceContact = () => {
    return (
        <section
            id="contact"
            className="flex flex-col items-center justify-center min-h-screen w-full h-full relative py-20"
        >
            <div className="max-w-6xl w-full px-4 z-20">
                <InView triggerOnce={false}>
                    {({ inView, ref }) => (
                        <motion.div
                            ref={ref}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            variants={slideInFromTop}
                            className="text-[40px] font-medium text-center text-gray-200 z-50 mb-12"
                        >
                            Initiate
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                                {" "}
                                Handshake{" "}
                            </span>
                        </motion.div>
                    )}
                </InView>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InView triggerOnce={false}>
                        {({ inView, ref }) => (
                            <motion.div
                                ref={ref}
                                initial="hidden"
                                animate={inView ? "visible" : "hidden"}
                                variants={slideInFromLeft(0.5)}
                                className="rounded-md text-[white] p-8 border border-[#7042f88b] opacity-[0.9] bg-[#0300145e] backdrop-blur-md"
                            >
                                <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                                    Get In Touch
                                </h3>
                                <p className="text-gray-300 mb-8 leading-relaxed">
                                    Available for high-impact projects involving backend systems, automation, and infrastructure.
                                </p>
                                <div className="flex gap-4 flex-wrap">
                                    <a
                                        href="https://t.me/Samanta2087"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-[#7042f861] border border-[#7042f88b] rounded-lg hover:bg-[#7042f8] hover:scale-105 transition-all cursor-pointer"
                                    >
                                        <SiTelegram size={20} />
                                        <span>Telegram</span>
                                    </a>
                                    <a
                                        href="https://github.com/Samanta2087"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-[#7042f861] border border-[#7042f88b] rounded-lg hover:bg-[#7042f8] hover:scale-105 transition-all cursor-pointer"
                                    >
                                        <SiGithub size={20} />
                                        <span>GitHub</span>
                                    </a>
                                    <a
                                        href="mailto:samantas6085@gmail.com"
                                        className="flex items-center gap-2 px-6 py-3 bg-[#7042f861] border border-[#7042f88b] rounded-lg hover:bg-[#7042f8] hover:scale-105 transition-all cursor-pointer"
                                    >
                                        <Send size={20} />
                                        <span>Email</span>
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </InView>

                    <InView triggerOnce={false}>
                        {({ inView, ref }) => (
                            <motion.div
                                ref={ref}
                                initial="hidden"
                                animate={inView ? "visible" : "hidden"}
                                variants={slideInFromRight(0.5)}
                                className="rounded-md text-[white] p-8 border border-[#7042f88b] opacity-[0.9] bg-[#0300145e] backdrop-blur-md"
                            >
                                <h3 className="text-sm text-purple-400 uppercase tracking-widest mb-6">
                                    // FUTURE_EXPERIMENTS_QUEUE
                                </h3>
                                <ul className="space-y-4 text-gray-300">
                                    <li className="flex gap-4">
                                        <span className="text-purple-500 shrink-0">[PENDING]</span>
                                        <span className="text-sm">AI-Driven Voice Cloning for customer support agents</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-purple-500 shrink-0">[PENDING]</span>
                                        <span className="text-sm">Decentralized storage layer for high-volume logs</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-cyan-500 shrink-0">[ACTIVE]</span>
                                        <span className="text-sm">Scalable proxy rotation network for data scraping</span>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </InView>
                </div>

                <InView triggerOnce={false}>
                    {({ inView, ref }) => (
                        <motion.div
                            ref={ref}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            variants={slideInFromBottom}
                            className="text-center mt-12 pt-8 border-t border-[#7042f88b]"
                        >
                            <p className="text-xs text-gray-400 font-mono">
                                © {new Date().getFullYear()} SAMANTA MONDAL. ALL SYSTEMS OPERATIONAL.
                            </p>
                        </motion.div>
                    )}
                </InView>
            </div>

            <div className="w-full hidden md:flex items-start justify-center absolute top-0 opacity-10 pointer-events-none">
                <video
                    loop
                    muted
                    autoPlay
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                    src="/encryption.webm/"
                />
            </div>
        </section>
    );
};

export default SpaceContact;
