import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";
import { InView } from "react-intersection-observer";

const SpaceProjects = () => {
    const projects = [
        {
            title: "Super Bot",
            category: "Full-Stack Automation",
            problem: "Users needed a unified tool for media downloading, file conversion, and cloud storage management within Telegram.",
            solution: "Engineered a multi-feature bot with async processing for video downloads (YouTube/Instagram), Photo-to-PDF conversion, and Google Drive integration.",
            tech: ["Python", "Telegram API", "FFmpeg", "Google Drive API", "Payment Integration"],
            image: "/assets/generated_images/super_bot_telegram_interface.png",
        },
        {
            title: "OCR Privacy Utility Bot",
            category: "Sole Developer",
            problem: "Sharing screenshots containing sensitive UPI IDs posed a significant privacy risk.",
            solution: "Built an automated bot using OCR and image processing to detect and redact UPI IDs instantly.",
            tech: ["Python", "OCR", "Image Processing"],
            image: "/assets/generated_images/ocr_bot_interface_redacting_sensitive_info.png",
        },
        {
            title: "Cloud-Based Android Infrastructure",
            category: "Systems Architect & DevOps",
            problem: "Physical device farms are expensive and difficult to scale for automated testing.",
            solution: "Architected a containerized environment using Docker, Redroid, and scrcpy-web on Ubuntu VPS.",
            tech: ["Docker", "Redroid", "scrcpy-web", "VPS Ubuntu"],
        },
    ];

    return (
        <section
            id="projects"
            className="flex flex-col items-center justify-center gap-8 h-fit relative overflow-hidden py-20"
        >
            <div className="w-full max-w-6xl px-4">
                <InView triggerOnce={false}>
                    {({ inView, ref }) => (
                        <motion.div
                            ref={ref}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            variants={slideInFromTop}
                            className="text-[40px] font-medium text-center text-gray-200 z-50 mb-12"
                        >
                            Deployed
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                                {" "}
                                Systems{" "}
                            </span>
                        </motion.div>
                    )}
                </InView>

                <div className="space-y-8">
                    {projects.map((project, index) => (
                        <InView key={index} triggerOnce={false}>
                            {({ inView, ref }) => (
                                <motion.div
                                    ref={ref}
                                    initial="hidden"
                                    animate={inView ? "visible" : "hidden"}
                                    variants={index % 2 === 0 ? slideInFromLeft(0.5) : slideInFromRight(0.5)}
                                    className="rounded-md text-[white] w-full py-6 px-8 border border-[#7042f88b] opacity-[0.9] bg-[#0300145e] backdrop-blur-md"
                                >
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                            <div>
                                                <span className="text-xs text-purple-400 uppercase tracking-widest">
                                                    {project.category}
                                                </span>
                                                <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mt-2">
                                                    {project.title}
                                                </h3>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 text-xs bg-[#7042f861] border border-[#7042f88b] rounded-full text-gray-300"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-6 items-start">
                                            <div className="space-y-4 text-gray-300 flex-1">
                                                <div>
                                                    <h4 className="text-sm font-bold text-purple-400 mb-2">PROBLEM</h4>
                                                    <p className="text-sm leading-relaxed">{project.problem}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-cyan-400 mb-2">SOLUTION</h4>
                                                    <p className="text-sm leading-relaxed">{project.solution}</p>
                                                </div>
                                            </div>

                                            {project.image && (
                                                <div className="relative overflow-hidden rounded-md border border-[#7042f88b] w-full md:w-2/5 flex-shrink-0">
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        loading="lazy"
                                                        className="w-full h-auto object-cover max-h-[300px]"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </InView>
                    ))}
                </div>
            </div>

            <div className="hidden md:block w-full h-full absolute top-0 opacity-20 pointer-events-none">
                <video
                    className="w-full h-full object-cover"
                    preload="metadata"
                    playsInline
                    loop
                    muted
                    autoPlay
                    src="/cards-video.webm"
                />
            </div>
        </section>
    );
};

export default SpaceProjects;
