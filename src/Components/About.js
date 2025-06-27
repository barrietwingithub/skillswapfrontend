import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {FaUsers, FaHandshake, FaLightbulb, FaLaptopCode, FaChalkboardTeacher} from "react-icons/fa";
import aboutImage from "../assets/kam.jpg"; 
import devImage from "../assets/me.jpg";
import {Link} from "react-router-dom"; 
const About = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="bg-white text-gray-800">
            {/* Hero Section */}
            <div
                className="relative h-[85vh] bg-cover bg-center"
                style={{ backgroundImage: `url(${aboutImage})` }}
            >
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center px-4">
                        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4" data-aos="zoom-in">
                           About SkillSwap
                        </h1>
                        <p className="text-white text-lg md:text-xl max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                            A platform that empowers students to share knowledge, build confidence, and grow together through peer-to-peer learning.
                        </p>
                    </div>
                </div>
            </div>

            {/* XeOne-style Value Section */}
            <section className="relative z-10 -mt-20 px-4 md:px-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <div className="bg-indigo-400 text-white rounded-md p-8 shadow-lg text-center transition-transform duration-300 hover:scale-105" data-aos="fade-up">
                        <FaUsers className="text-4xl mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Community</h3>
                        <p>We grow stronger together—every student has something to offer and something to learn.</p>
                    </div>
                    <div className="bg-purple-400 text-white rounded-md p-8 shadow-lg text-center transition-transform duration-300 hover:scale-105" data-aos="fade-up" data-aos-delay="100">
                        <FaHandshake className="text-4xl mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Collaboration</h3>
                        <p>SkillSwap thrives on connections—offering, learning, and sharing freely without barriers.</p>
                    </div>
                    <div className="bg-cyan-400 text-white rounded-md p-8 shadow-lg text-center transition-transform duration-300 hover:scale-105" data-aos="fade-up" data-aos-delay="200">
                        <FaLightbulb className="text-4xl mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Growth</h3>
                        <p>Beyond grades—it's about building real, usable knowledge to help you thrive personally and professionally.</p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-6 md:px-24">
                <div className="max-w-5xl mx-auto text-center" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-6">Our Mission</h2>
                    <p className="text-lg leading-relaxed text-gray-700">
                        At SkillSwap, we believe the best learning happens through real conversations and collaboration. This platform connects students who want to teach with those who are ready to learn—building confidence, community, and real-world skills along the way.
                    </p>
                </div>
            </section>

            {/* Highlights Section */}
            <div className="bg-gray-100 py-20 px-6 md:px-24 text-center text-gray-800">
                <h2 className="text-3xl font-bold mb-12" data-aos="zoom-in">
                    Why SkillSwap?
                </h2>
                <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    <div
                        className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition"
                        data-aos="fade-up"
                    >
                        <FaUsers className="text-4xl text-indigo-600 mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2">Peer-to-Peer Learning</h3>
                        <p>
                            Learn directly from your fellow students—no rigid rules, just real skills shared in real time.
                        </p>
                    </div>
                    <div
                        className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <FaLaptopCode className="text-4xl text-green-600 mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2">Practical Knowledge</h3>
                        <p>
                            Whether it’s coding, design, or communication—swap tips and grow your real-world toolkit.
                        </p>
                    </div>
                    <div
                        className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        <FaChalkboardTeacher className="text-4xl text-blue-600 mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2">No Cost, No Limits</h3>
                        <p>
                            No fees. No institutions. Just curious minds helping each other succeed—anytime, anywhere.
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Team Section */}
            <div className="bg-gray-200 py-16 px-6 md:px-20 text-center">
                <h2 className="text-3xl font-bold mb-10">Meet the Developer</h2>
                <div className="flex justify-center">
                    <div className="bg-gray-100 shadow-lg rounded-lg p-6 max-w-sm">
                        <img
                            src={devImage}
                            alt="Developer"
                            className="w-40 h-40 object-cover rounded-full mx-auto mb-6 shadow-md"
                        />
                        <h3 className="text-xl font-semibold">Assanatu Barrie</h3>
                        <p className="text-gray-800 text-sm mt-2">
                            I'm a passionate software developer and the creator of SkillSwap. I built this platform to break down traditional learning
                            barriers and foster real student collaboration. My goal is to help others share what they know and discover what they need—
                            all in a space that’s student-powered, practical, and personal.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
