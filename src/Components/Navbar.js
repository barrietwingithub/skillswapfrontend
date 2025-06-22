import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaInfoCircle,
    FaConciergeBell,
    FaTachometerAlt,
    FaBars,
    FaTimes,
} from "react-icons/fa";
import logo from "../assets/logo.jpg";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const linkClasses = (isActive) =>
        `flex items-center gap-2 px-4 py-2 rounded ${
            isActive
                ? "bg-blue text-blue-600 font-bold shadow"
                : "text-white hover:text-blue-300 transition"
        }`;

    return (
        <nav className="sticky top-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img
                        src={logo}
                        alt="SkillSwap"
                        className="h-10 w-10 object-cover rounded-full"
                    />
                    <h1 className="text-white font-bold text-lg">SkillSwap</h1>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-6 font-medium">
                    <li>
                        <NavLink to="/" end className={({ isActive }) => linkClasses(isActive)}>
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={({ isActive }) => linkClasses(isActive)}>
                            <FaInfoCircle />
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/services" className={({ isActive }) => linkClasses(isActive)}>
                            <FaConciergeBell />
                            Services
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard" className={({ isActive }) => linkClasses(isActive)}>
                            <FaTachometerAlt />
                            Dashboard
                        </NavLink>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="text-white md:hidden text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <ul className="md:hidden flex flex-col items-start gap-2 px-6 pb-4">
                    <li>
                        <NavLink to="/" end className={({ isActive }) => linkClasses(isActive)} onClick={() => setMenuOpen(false)}>
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={({ isActive }) => linkClasses(isActive)} onClick={() => setMenuOpen(false)}>
                            <FaInfoCircle />
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/services" className={({ isActive }) => linkClasses(isActive)} onClick={() => setMenuOpen(false)}>
                            <FaConciergeBell />
                            Services
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard" className={({ isActive }) => linkClasses(isActive)} onClick={() => setMenuOpen(false)}>
                            <FaTachometerAlt />
                            Dashboard
                        </NavLink>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
