import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './components/Login';
import { StudentDashboard, TeacherDashboard, CompanyDashboard } from './components/Dashboards';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-[#4B53BC] rounded flex items-center justify-center text-white font-bold text-xl animate-pulse">
            S
          </div>
          <p className="text-xs font-bold text-[#616161] uppercase tracking-[0.2em] animate-pulse">Initializing Safari...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-[#242424]">Safari Platform</h1>
        <p className="text-sm text-[#616161] mt-1 italic font-medium">// Connected Node: {user.name} ({user.role})</p>
      </header>

      {user.role === 'student' && <StudentDashboard tab={activeTab} />}
      {user.role === 'teacher' && <TeacherDashboard tab={activeTab} />}
      {user.role === 'company' && <CompanyDashboard tab={activeTab} />}
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
