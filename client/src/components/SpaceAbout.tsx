import React from "react";
import { motion } from "framer-motion";
import { slideInFromBottom, slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";
import { InView } from "react-intersection-observer";

const SpaceAbout = () => {
    return (
        <section
            id="about"
            className="flex flex-col md:flex-row relative items-center justify-center min-h-screen w-full h-full"
        >
            <div className="md:absolute w-auto h-auto md:top-[80px] z-[5]">
                <InView triggerOnce={false}>
                    {({ inView, ref }) => (
                        <motion.div
                            ref={ref}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            variants={slideInFromTop}
                            className="text-[40px] pt-[5rem] pb-3 md:p-0 font-medium text-center text-gray-200 z-50"
                        >
                            WHO
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                                {" "}
                                I AM{" "}
                            </span>
                        </motion.div>
                    )}
                </InView>
            </div>

            <div className="flex flex-col items-center justify-start relative md:mt-[90px] lg:mt-12 z-[20] w-auto h-auto max-w-4xl px-4">
                <InView triggerOnce={false}>
                    {({ inView, ref }) => (
                        <motion.div
                            ref={ref}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            variants={slideInFromLeft(0.5)}
                            className="Welcome-box px-[15px] w-[90%] md:w-full py-[8px] z-[20] mb-[20px] border-[#7042f88b] opacity-[0.9]"
                        >
                            <h1 className="Welcome-text text-[16px] w-full text-justify leading-relaxed space-y-4">
                                <p className="mb-4">
                                    I'm <span className="text-white font-bold">Samanta Mondal</span>, an early-stage systems builder focused on <span className="text-white">Telegram bots, Linux automation, and AI-powered tools</span>.
                                </p>
                                <p className="mb-4">
                                    Whether it's deploying containerized Android infrastructures or architecting high-traffic prediction algorithms, I focus on the intersection of stability and speed. I don't just write code; I engineer resilient workflows that operate autonomously.
                                </p>
                                <p>
                                    My goal is simple: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-bold">build useful systems, sharpen my technical depth, and move fast without cutting corners.</span>
                                </p>
                            </h1>
                        </motion.div>
                    )}
                </InView>
            </div>

            <div className="absolute z-[20] bottom-[-4rem] md:bottom-[10px] px-[5px]">
                <div className="cursive text-[20px] font-medium text-center text-gray-300">
                    Building Systems That Work
                </div>
            </div>

            <div className="w-full hidden md:flex items-start justify-center absolute top-[1px]">
                <video
                    loop
                    muted
                    autoPlay
                    playsInline
                    preload="metadata"
                    className="h-full"
                    src="/encryption.webm/"
                />
            </div>
        </section>
    );
};

export default SpaceAbout;
