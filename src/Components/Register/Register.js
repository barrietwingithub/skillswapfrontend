import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import sideImage from '../../assets/loo.jpg';

const Register = () => {
    const location = useLocation();
    const history = useHistory();

    const [profileImage, setProfileImage] = useState(null);
    const [section, setSection] = useState('offer');
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [skill, setSkill] = useState('');
    const [reason, setReason] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const action = params.get('action');
        setSection(action === 'learn' ? 'learn' : 'offer');
    }, [location]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setProfileImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password,
                skill,
                reason,
                role: section,
                profileImage,
            });

            if (res.status === 201) {
                alert(res.data.message);
                localStorage.setItem('token', res.data.token || '');
                history.push('/dashboard');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <div className="min-h-screen bg-blue-200 flex items-center justify-center py-4 px-4">
            <div className="flex flex-col md:flex-row max-w-4xl w-full rounded-3xl shadow-lg overflow-hidden bg-white">

                {/* Left Side with Image */}
                <div className="md:w-1/2 relative">
                    <img
                        src={sideImage}
                        alt="Register Visual"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-6 text-white">
                        <h2 className="text-3xl font-bold mb-2">Join SkillSwap</h2>
                        <p className="text-lg">Create your high-level learning platform!</p>
                        <Link
                            to="/"
                            className="mt-4 text-sm bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>

                {/* Right Side Form */}
                <div className="md:w-1/2 p-6 md:p-8 bg-blue-50">
                    <div className="text-center mb-4">
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-blue-400"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto flex items-center justify-center text-gray-600">
                                Image
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-2 text-sm block mx-auto"
                        />
                    </div>

                    <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
                        Register to {section === 'offer' ? 'Offer' : 'Learn'} a Skill
                    </h2>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded bg-white"
                            required
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded bg-white"
                            required
                        />

                        <div className="flex items-center border rounded px-3 py-2 bg-white">
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="cursor-pointer mr-2"
                            >
                                {showPassword ? '🔓' : '🔒'}
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                className="flex-1 outline-none bg-white"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <select
                            value={skill}
                            onChange={e => setSkill(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded bg-white"
                        >
                            <option value="">Select a skill</option>
                            <option value="webdev">Web Development</option>
                            <option value="graphic">Graphic Design</option>
                            <option value="python">Python Programming</option>
                            <option value="react">React</option>
                            <option value="publicspeaking">Public Speaking</option>
                            <option value="creative">Creative Writing</option>
                            <option value="database">Database</option>
                        </select>

                        <textarea
                            rows={2}
                            placeholder={`Why do you want to ${section}?`}
                            value={reason}
                            onChange={e => setReason(e.target.value)}
                            required
                            className="w-full px-2 py-2 border rounded bg-white"
                        ></textarea>

                        <button className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition duration-300">
                            Register
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-700 mt-4">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-800 underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
