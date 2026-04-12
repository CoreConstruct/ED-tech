import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Video, 
  CheckSquare, 
  Briefcase, 
  MoreHorizontal,
  Bell,
  Search,
  Settings,
  LogOut,
  User
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full py-4 transition-all relative ${
      active 
        ? 'text-[#4B53BC] bg-white border-l-[3px] border-[#4B53BC]' 
        : 'text-[#616161] hover:text-[#4B53BC] hover:bg-[#F3F2F1]'
    }`}
  >
    <Icon size={22} strokeWidth={active ? 2.5 : 2} />
    <span className={`text-[10px] mt-1 font-medium ${active ? 'font-bold' : ''}`}>{label}</span>
  </button>
);

const Layout = ({ children, activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();

  if (!user) return <>{children}</>;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['student', 'teacher', 'company'] },
    { id: 'lectures', label: 'Lectures', icon: Video, roles: ['student'] },
    { id: 'attendance', label: 'Attendance', icon: CheckSquare, roles: ['student', 'teacher'] },
    { id: 'hiring', label: 'Hiring', icon: Briefcase, roles: ['student', 'company'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(user.role));

  return (
    <div className="flex h-screen bg-[#F5F5F5] overflow-hidden">
      {/* Sidebar (Microsoft Teams Style) */}
      <aside className="w-18 bg-[#EDEBE9] border-r border-[#D1D1D1] flex flex-col items-center flex-shrink-0">
        <div className="py-4">
          <div className="w-8 h-8 bg-[#4B53BC] rounded flex items-center justify-center text-white font-bold text-sm">
            S
          </div>
        </div>
        
        <nav className="flex-1 w-full space-y-0.5">
          {filteredItems.map(item => (
            <SidebarItem 
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            />
          ))}
          <SidebarItem icon={MoreHorizontal} label="More" />
        </nav>

        <div className="w-full pb-6 space-y-2">
           <button onClick={logout} className="flex flex-col items-center justify-center w-full py-3 text-[#616161] hover:text-[#4B53BC] transition-colors">
              <LogOut size={20} />
              <span className="text-[10px] mt-1">Logout</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-12 bg-white border-b border-[#D1D1D1] flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center space-x-6">
            <h1 className="text-sm font-bold text-[#242424] uppercase tracking-tight">Safari Platform</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#616161]" size={14} />
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-[#F3F2F1] border-none rounded px-4 pl-9 py-1 text-xs w-80 focus:ring-1 focus:ring-[#4B53BC]"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Bell size={18} className="text-[#616161]" />
            <Settings size={18} className="text-[#616161]" />
            <div className="flex items-center space-x-2 pl-4 border-l border-[#D1D1D1]">
              <div className="text-right">
                <p className="text-xs font-bold text-[#242424] leading-none">{user.name}</p>
                <p className="text-[10px] text-[#616161] capitalize leading-none mt-1">{user.role}</p>
              </div>
              <div className="w-8 h-8 bg-[#4B53BC] rounded-full flex items-center justify-center text-white font-bold text-xs">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
