import React from 'react'

const Footer = ()=>{
    return (
        <footer className="absolute bottom-0 w-full text-center bg-black bg-opacity-60 py-3">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} SkillSwap • Built for the Computer Science Department
            </p>
        </footer>
    );
};

export default Footer