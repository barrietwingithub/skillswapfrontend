import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // adjust if needed

const Chat = ({ currentUser, chatUsers }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]); // list of online user IDs
    const messagesEndRef = useRef(null);

    // Scroll to bottom whenever messages update
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!currentUser) return;

        // Join socket room or namespace for current user
        socket.emit('join', currentUser.id);

        // Receive online users list from server
        socket.on('onlineUsers', (onlineIds) => {
            setOnlineUsers(onlineIds);
        });

        // Receive new messages
        socket.on('receiveMessage', (msg) => {
            if (
                selectedUser &&
                (msg.from === selectedUser.id || msg.to === selectedUser.id)
            ) {
                setMessages((prev) => [...prev, msg]);
            }
        });

        return () => {
            socket.off('receiveMessage');
            socket.off('onlineUsers');
        };
    }, [selectedUser, currentUser]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUser) return;

            try {
                const res = await fetch(
                    `http://localhost:5000/api/chat/history/${currentUser.id}/${selectedUser.id}`
                );
                const data = await res.json();
                if (Array.isArray(data)) {
                    setMessages(data);
                } else {
                    setMessages([]);
                }
            } catch (err) {
                console.error('Failed to fetch messages:', err);
                setMessages([]);
            }
        };

        fetchMessages();
    }, [selectedUser, currentUser]);

    const sendMessage = async () => {
        if (!newMessage.trim() || !selectedUser) return;

        const msg = {
            from: currentUser.id,
            to: selectedUser.id,
            text: newMessage,
            timestamp: new Date().toISOString(),
        };

        try {
            socket.emit('sendMessage', msg);
            await fetch('http://localhost:5000/api/chat/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(msg),
            });

            setMessages((prev) => [...prev, msg]);
            setNewMessage('');
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    };

    // Format timestamp to HH:MM AM/PM
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="flex h-full border rounded shadow-lg">
            {/* User List */}
            <div className="w-1/3 bg-white border-r overflow-y-auto">
                <h3 className="p-4 font-bold border-b">Matched Students</h3>
                {/* Expect chatUsers to be array of matched student objects with
            id, name, skill, profileImage */}
                {chatUsers.map((user) => {
                    const isOnline = onlineUsers.includes(user.id);
                    return (
                        <div
                            key={user.id}
                            onClick={() => setSelectedUser(user)}
                            className={`cursor-pointer px-4 py-2 hover:bg-blue-100 flex items-center space-x-3 ${
                                selectedUser?.id === user.id ? 'bg-blue-300' : ''
                            }`}
                        >
                            <div className="relative">
                                <img
                                    src={user.profileImage || '/default-avatar.png'}
                                    alt={`${user.name}'s avatar`}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                {/* Online status dot */}
                                <span
                                    className={`absolute bottom-0 right-0 block w-3 h-3 rounded-full border-2 border-white ${
                                        isOnline ? 'bg-green-500' : 'bg-gray-400'
                                    }`}
                                    title={isOnline ? 'Online' : 'Offline'}
                                />
                            </div>
                            <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.skill}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col bg-gray-50">
                {selectedUser ? (
                    <>
                        <div className="p-4 border-b flex items-center space-x-3 font-bold">
                            <img
                                src={selectedUser.profileImage || '/default-avatar.png'}
                                alt={`${selectedUser.name}'s avatar`}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <span>{selectedUser.name}</span>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col">
                            {messages.length === 0 && (
                                <div className="text-gray-400 text-center mt-4">No messages yet</div>
                            )}
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`p-2 max-w-xs rounded break-words ${
                                        msg.from === currentUser.id
                                            ? 'bg-blue-500 text-white self-end ml-auto'
                                            : 'bg-gray-300 self-start mr-auto'
                                    }`}
                                >
                                    <div>{msg.text}</div>
                                    <div className="text-xs text-gray-700 mt-1 text-right">
                                        {formatTime(msg.timestamp)}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 border-t flex space-x-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex-1 border rounded px-3 py-2"
                                placeholder="Type a message..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') sendMessage();
                                }}
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="p-4 text-gray-600">Select a student to start chatting</div>
                )}
            </div>
        </div>
    );
};

export default Chat;
