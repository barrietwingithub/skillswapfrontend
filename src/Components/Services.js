import React from 'react';
import {
    ChatBubbleLeftRightIcon,
    UserCircleIcon,
    ClockIcon,
    AcademicCapIcon,
    ChartBarIcon,
    LifebuoyIcon
} from '@heroicons/react/24/outline';

const services = [
    {
        title: 'Skill Matching',
        desc: 'Easily connect with students who either want to learn what you know or teach what you want to learn. Our algorithm ensures ideal peer-to-peer matching for effective learning experiences.',
        icon: <AcademicCapIcon className="w-10 h-10 text-indigo-600" />,
        image: '/asssets/cat.jpg',
    },
    {
        title: 'Real-time Chat',
        desc: 'Our integrated chat system allows matched students to communicate instantly. Coordinate sessions, exchange resources, and support each other — all in one place.',
        icon: <ChatBubbleLeftRightIcon className="w-10 h-10 text-indigo-600" />,
        image: '/asssets/chat.jpg',
    },
    {
        title: 'Flexible Scheduling',
        desc: 'With built-in scheduling tools, students can plan sessions based on mutual availability. No time clashes, just smooth and convenient learning.',
        icon: <ClockIcon className="w-10 h-10 text-indigo-600" />,
        image: '/asssets/ler.jpg',
    },

    {
        title: 'Support & Feedback',
        desc: 'Facing challenges? Reach out for support anytime. Also, give feedback to help improve the quality of sessions and the SkillSwap platform itself.',
        icon: <LifebuoyIcon className="w-10 h-10 text-indigo-600" />,
        image: '/asssets/cha.jpg',
    }
];

const Services = () => {
    return (
        <div className="bg-gradient-to-tr from-blue-50 via-white to-indigo-50 py-20 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-800">What SkillSwap Offers</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        SkillSwap is more than just a platform — it's a learning community where students empower each other through teaching, collaboration, and growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-[1.02] border border-gray-100 flex flex-col"
                        >
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center mb-4 gap-4">
                                    {service.icon}
                                    <h2 className="text-xl font-semibold text-gray-800">{service.title}</h2>
                                </div>
                                <p className="text-gray-600 text-sm mb-4 flex-grow">{service.desc}</p>
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-40 object-cover rounded-lg shadow-sm mt-auto"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-20">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                        Ready to enhance your learning journey?
                    </h3>
                    <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-full shadow-lg hover:bg-indigo-700 transition">
                        Get Started with SkillSwap
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Services;
