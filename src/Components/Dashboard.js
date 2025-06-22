import React, { useState, useEffect } from 'react';
import Chat from './Chat';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('chat');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [chatUsers, setChatUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [settings, setSettings] = useState({
        name: '',
        skill: '',
        email: '',
        profileImage: '/default-profile.png',
        role: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Unauthorized. Redirecting...');
            window.location.href = '/register';
            return;
        }

        fetch('http://localhost:5000/api/dashboard', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                const decoded = JSON.parse(atob(token.split('.')[1]));
                const user = data.students.find(s => s.id === decoded.id);
                setCurrentUser(user);
                setSettings({
                    name: user.name,
                    skill: user.skill,
                    email: user.email,
                    profileImage: user.profile_image || '/default-profile.png',
                    role: user.role || '',
                });

                const matches = data.matches
                    .filter(pair => pair.offer.id === user.id || pair.learn.id === user.id)
                    .map(pair => {
                        const matchedUser = pair.offer.id === user.id ? pair.learn : pair.offer;
                        return {
                            id: matchedUser.id,
                            name: matchedUser.name,
                            skill: matchedUser.skill,
                            profileImage: matchedUser.profile_image || '/default-profile.png',
                            role: matchedUser.role || '',
                        };
                    });

                setChatUsers(matches);
            })
            .catch(err => console.error(err));
    }, []);

    const handleSettingsChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSaveChanges = () => {
        const token = localStorage.getItem('token');

        fetch(`http://localhost:5000/api/user/${currentUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: settings.name }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    alert(data.message);
                }
            })
            .catch(err => {
                console.error('Update failed', err);
                alert('Failed to update name');
            });
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            const token = localStorage.getItem('token');
            fetch(`http://localhost:5000/api/user/${currentUser.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(res => res.json())
                .then(() => {
                    alert('Account deleted');
                    localStorage.removeItem('token');
                    window.location.href = '/register';
                })
                .catch(err => {
                    alert('Error deleting account');
                    console.error(err);
                });
        }
    };

    return (
        <div className="h-screen flex flex-col md:flex-row overflow-hidden">
            {/* Top Bar (Mobile) */}
            <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center md:hidden sticky top-0 z-20">
                <h1 className="text-lg font-semibold">SkillSwap Dashboard</h1>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white text-2xl">☰</button>
            </div>

            {/* Sidebar */}
            <div className={`fixed md:static top-0 left-0 h-full z-30 bg-blue-400 p-6 shadow-lg w-64 transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}>
                <div className="flex flex-col items-center mt-12 md:mt-6">
                    <img
                        src={settings.profileImage}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover mb-4"
                    />
                    <h2 className="text-xl font-semibold text-white">{settings.name}</h2>
                    <p className="text-gray-100">Skill: {settings.skill}</p>
                    <p className="text-gray-200 italic">
                        Role: {settings.role === 'offer' ? 'Teaching' : 'Learning'}
                    </p>
                </div>
                <nav className="mt-6 space-y-2">
                    {['chat', 'matches', 'settings'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                                setSidebarOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 rounded font-medium transition ${
                                activeTab === tab
                                    ? 'bg-white text-blue-600'
                                    : 'bg-blue-300 hover:bg-blue-400 text-white'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-blue-200 overflow-hidden relative">
                <div className="p-4 overflow-y-auto h-full">
                    {activeTab === 'matches' && (
                        <>
                            <h2 className="text-2xl font-bold mb-4">Matched Students</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {chatUsers.map(user => (
                                    <div
                                        key={user.id}
                                        className="bg-white p-4 rounded shadow flex items-center space-x-4"
                                    >
                                        <img
                                            src={user.profileImage}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="font-semibold">{user.name}</h3>
                                            <p className="text-sm text-gray-600">Skill: {user.skill}</p>
                                            <p className="text-sm text-gray-500 italic">
                                                Role: {user.role === 'offer' ? 'Teaching' : 'Learning'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeTab === 'settings' && (
                        <>
                            <h2 className="text-2xl font-bold mb-4">Settings</h2>
                            <div className="bg-white p-6 rounded shadow max-w-md">
                                <label className="block mb-4">
                                    <span className="block font-medium">Full Name</span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={settings.name}
                                        onChange={handleSettingsChange}
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                </label>

                                <div className="mb-4">
                                    <span className="block font-medium">Skill</span>
                                    <p className="text-gray-700 bg-gray-100 px-3 py-2 rounded">{settings.skill}</p>
                                </div>

                                <div className="mb-4">
                                    <span className="block font-medium">Email</span>
                                    <p className="text-gray-700 bg-gray-100 px-3 py-2 rounded">{settings.email}</p>
                                </div>

                                <button
                                    onClick={handleSaveChanges}
                                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 mt-4 mr-4"
                                >
                                    Save Name
                                </button>

                                <button
                                    onClick={handleDeleteAccount}
                                    className="bg-red-600 text-white px-2 py-2 rounded hover:bg-red-800 mt-4 mr-4"
                                >
                                    Delete Account
                                </button>

                                <button
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        window.location.href = '/login';
                                    }}
                                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4"
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    )}

                    {activeTab === 'chat' && currentUser.id && (
                        <>
                            <h2 className="text-2xl font-bold mb-4">Chat</h2>
                            <div className="h-[80vh] overflow-y-auto bg-blue-100 rounded shadow p-4">
                                <Chat currentUser={currentUser} chatUsers={chatUsers} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
