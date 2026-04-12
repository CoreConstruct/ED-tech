import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(username, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  const hints = [
    { label: 'Student (Free)', u: 'student_free', p: 'free123' },
    { label: 'Student (Paid)', u: 'student_paid', p: 'paid123' },
    { label: 'Teacher', u: 'teacher_ace', p: 'teacher123' },
    { label: 'Company', u: 'recruiter_hr', p: 'hr123' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F2F1] p-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md border border-[#EDEBE9]">
        <div className="mb-8 text-center">
          <div className="w-12 h-12 bg-[#4B53BC] text-white font-bold text-2xl flex items-center justify-center rounded mx-auto mb-4">
            S
          </div>
          <h1 className="text-2xl font-semibold text-[#242424]">Sign in to Safari</h1>
          <p className="text-[#616161] text-sm mt-1">Platform for students and recruiters</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-[#FDE7E9] text-[#A80000] p-3 text-sm rounded border border-[#FDE7E9]">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#616161] uppercase mb-1">Email or Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-b border-[#8A8886] py-2 focus:border-[#4B53BC] outline-none text-sm bg-transparent"
              placeholder="operator_01"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#616161] uppercase mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-[#8A8886] py-2 focus:border-[#4B53BC] outline-none text-sm bg-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#4B53BC] text-white py-2 rounded font-semibold hover:bg-[#3B449B] transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#EDEBE9]">
          <p className="text-[10px] font-bold text-[#A19F9D] uppercase tracking-widest mb-4">Demo Credentials</p>
          <div className="grid grid-cols-2 gap-2">
            {hints.map((h, i) => (
              <button 
                key={i}
                type="button"
                onClick={() => { setUsername(h.u); setPassword(h.p); }}
                className="text-left p-2 hover:bg-[#F3F2F1] rounded transition-colors group"
              >
                <p className="text-[11px] font-bold text-[#484644] truncate">{h.label}</p>
                <p className="text-[9px] text-[#A19F9D]">{h.u} / {h.p}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
