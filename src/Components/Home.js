import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/img1.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <>
            {/* Hero Section */}
            <div
                className="relative min-h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative flex flex-col justify-center items-center text-white text-center h-full px-4">
                    <div
                        className="bg-white/20 backdrop-blur-md rounded-xl p-6 mt-40 max-w-2xl shadow-lg"
                        data-aos="fade-down"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            Teach what you know, Learn what you love.
                        </h1>
                        <p className="text-lg mb-6">
                            SkillSwap connects learners with peers offering real, practical knowledge—no tutors, just teamwork.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <Link
                                to="/register?action=offer"
                                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg transition"
                            >
                                Offer a Skill
                            </Link>
                            <Link
                                to="/register?action=learn"
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg transition"
                            >
                                Learn a Skill
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default Home;
