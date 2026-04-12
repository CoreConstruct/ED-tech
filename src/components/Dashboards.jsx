import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PlayCircle, CheckSquare, Briefcase, TrendingUp, Users, Calendar, Rocket, Sparkles } from 'lucide-react';

// --- Shared Components ---

const Card = ({ title, children, footer }) => (
  <div className="bg-white border border-[#EDEBE9] rounded shadow-sm flex flex-col h-full">
    <div className="p-5 border-b border-[#F3F2F1]">
      <h3 className="text-sm font-bold text-[#242424]">{title}</h3>
    </div>
    <div className="p-5 flex-1">{children}</div>
    {footer && <div className="p-4 bg-[#FAF9F8] border-t border-[#F3F2F1] rounded-b">{footer}</div>}
  </div>
);

// --- Student Components ---

export const StudentDashboard = ({ tab }) => {
  const { user } = useAuth();
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [jobs] = useState([
    { id: 1, title: 'Cloud Architect', company: 'Global Tech', location: 'Remote', salary: '$120k' },
    { id: 2, title: 'UI Researcher', company: 'Design Pro', location: 'Seattle', salary: '$95k' },
    { id: 3, title: 'Systems Lead', company: 'Core Systems', location: 'Remote', salary: '$110k' },
  ]);

  if (tab === 'dashboard') {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded border border-[#EDEBE9] shadow-sm">
          <h2 className="text-xl font-bold text-[#242424]">Good Morning, {user.name}</h2>
          <p className="text-[#616161] text-sm mt-1">Here is what is happening today in your Safari workspace.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card title="Upcoming Session">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#EDEBE9] rounded flex items-center justify-center text-[#4B53BC]">
                <Video size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">Algorithms 101</p>
                <p className="text-xs text-[#616161]">Starts in 15 mins</p>
              </div>
            </div>
          </Card>
          <Card title="Recent Activity">
            <p className="text-xs text-[#616161]">You completed "Intro to OS" yesterday.</p>
          </Card>
          <Card title="Quick Sync">
             <button className="text-xs text-[#4B53BC] font-semibold hover:underline">View my schedule</button>
          </Card>
        </div>
      </div>
    );
  }

  if (tab === 'lectures') {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#242424]">Recorded Lectures</h2>
        <div className="grid gap-3">
          {['Data Structures', 'Operating Systems', 'Networking'].map((title, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white border border-[#EDEBE9] rounded hover:bg-[#FAF9F8] transition-all cursor-pointer group">
              <div className="flex items-center space-x-4">
                <PlayCircle className="text-[#4B53BC]" size={24} />
                <span className="font-semibold text-sm">{title}</span>
              </div>
              <span className="text-xs text-[#616161]">Watch now</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tab === 'attendance') {
    return (
      <div className="max-w-lg">
        <div className="bg-white p-8 rounded border border-[#EDEBE9] shadow-md">
          <h2 className="text-lg font-bold mb-4">Class Attendance</h2>
          {attendanceMarked ? (
            <div className="p-4 bg-[#EBF3FC] text-[#005A9E] rounded border border-[#C7E0F4] font-semibold text-sm">
              Successfully marked present for today's session.
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-[#616161]">Confirm your presence for the active synchronous session.</p>
              <button 
                onClick={() => setAttendanceMarked(true)}
                className="bg-[#4B53BC] text-white px-6 py-2 rounded text-sm font-semibold hover:bg-[#3B449B]"
              >
                Mark Attendance
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (tab === 'hiring') {
    if (user.tier === 'paid') {
      return (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-[#242424]">Hiring Opportunities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <Card key={job.id} title={job.title} footer={<button className="text-xs text-[#4B53BC] font-bold">Apply Now</button>}>
                <p className="text-[#4B53BC] font-bold text-sm mb-1">{job.company}</p>
                <div className="flex justify-between text-xs text-[#616161] mt-4 font-medium">
                  <span>{job.location}</span>
                  <span>{job.salary}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-[#242424]">Hiring Portals</h2>
          <div className="max-w-4xl mx-auto">
             <div className="hiring-ad-blue p-12 rounded-lg flex flex-col items-center text-center space-y-6 group cursor-pointer transition-transform hover:scale-[1.01]">
                <div className="p-4 bg-white/20 rounded-full">
                  <Rocket size={48} />
                </div>
                <h3 className="text-3xl font-black tracking-tight leading-none uppercase">Elevate Your Career Portfolio</h3>
                <p className="text-white/80 max-w-md">Our high-performance hiring dashboard is currently locked. Discover exclusive opportunities with top-tier global operators.</p>
                <button className="bg-white text-[#0078D4] px-10 py-3 rounded-full font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-[#005A9E]/40 transition-all flex items-center space-x-2">
                   <span>Unlock Hiring Dashboard</span>
                   <Sparkles size={16} />
                </button>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Curiosity: The first step to a premium upgrade</p>
             </div>
          </div>
        </div>
      );
    }
  }

  return <div>Welcome to Safari.</div>;
};

// --- Teacher Dashboard ---

export const TeacherDashboard = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 border border-[#EDEBE9] rounded shadow-sm">
        <div className="flex items-center space-x-4 mb-2">
           <TrendingUp className="text-[#4B53BC]" size={20} />
           <span className="text-xs font-bold text-[#616161] uppercase mt-0.5">Performance</span>
        </div>
        <p className="text-2xl font-bold">84%</p>
        <p className="text-xs text-[#616161]">Average Attendance</p>
      </div>
      <div className="bg-white p-6 border border-[#EDEBE9] rounded shadow-sm">
        <div className="flex items-center space-x-4 mb-2">
           <Users className="text-[#4B53BC]" size={20} />
           <span className="text-xs font-bold text-[#616161] uppercase mt-0.5">Engagement</span>
        </div>
        <p className="text-2xl font-bold">1.2k</p>
        <p className="text-xs text-[#616161]">Total Active Students</p>
      </div>
      <div className="bg-white p-6 border border-[#EDEBE9] rounded shadow-sm">
        <div className="flex items-center space-x-4 mb-2">
           <Calendar className="text-[#4B53BC]" size={20} />
           <span className="text-xs font-bold text-[#616161] uppercase mt-0.5">Sessions</span>
        </div>
        <p className="text-2xl font-bold">4</p>
        <p className="text-xs text-[#616161]">Scheduled Today</p>
      </div>
    </div>
  </div>
);

// --- Company Dashboard ---

export const CompanyDashboard = () => {
  const [vacancies, setVacancies] = useState([
    { title: 'Project Tech Lead', location: 'Seattle', status: 'Active' },
    { title: 'UX Specialist', location: 'Remote', status: 'Paused' },
  ]);

  return (
    <div className="grid lg:grid-cols-3 gap-8">
       <div className="lg:col-span-1">
          <div className="bg-white p-6 border border-[#EDEBE9] rounded shadow-sm">
             <h3 className="text-sm font-bold mb-6">Create Job Posting</h3>
             <div className="space-y-4">
                <div>
                   <label className="block text-xs font-bold text-[#616161] uppercase mb-1">Title</label>
                   <input className="w-full border border-[#D1D1D1] rounded p-2 text-sm focus:border-[#4B53BC] outline-none" placeholder="e.g. Project Manager" />
                </div>
                <div>
                   <label className="block text-xs font-bold text-[#616161] uppercase mb-1">Location</label>
                   <input className="w-full border border-[#D1D1D1] rounded p-2 text-sm focus:border-[#4B53BC] outline-none" placeholder="e.g. Remote" />
                </div>
                <button className="w-full bg-[#4B53BC] text-white py-2 rounded text-sm font-bold">Post Vacancy</button>
             </div>
          </div>
       </div>

       <div className="lg:col-span-2">
          <div className="bg-white border border-[#EDEBE9] rounded shadow-sm overflow-hidden">
             <div className="p-4 border-b border-[#EDEBE9] bg-[#FAF9F8]">
                <h3 className="text-sm font-bold">Active Listings</h3>
             </div>
             <div className="divide-y divide-[#EDEBE9]">
                {vacancies.map((v, i) => (
                   <div key={i} className="p-4 flex items-center justify-between hover:bg-[#F3F2F1] cursor-pointer">
                      <div>
                         <p className="text-sm font-bold text-[#242424]">{v.title}</p>
                         <p className="text-xs text-[#616161]">{v.location}</p>
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${v.status === 'Active' ? 'bg-[#DFF6DD] text-[#107C10]' : 'bg-[#FFF4CE] text-[#797775]'}`}>
                         {v.status}
                      </span>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};

// Internal icon helper
const Video = ({ size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
  </svg>
)
