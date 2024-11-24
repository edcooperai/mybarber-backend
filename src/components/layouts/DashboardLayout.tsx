import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Dashboard from '../Dashboard';
import WeeklyCalendar from '../calendar/WeeklyCalendar';
import RevenueAnalytics from '../analytics/RevenueAnalytics';
import ServiceManager from '../services/ServiceManager';
import BookingSettings from '../booking/BookingSettings';
import Settings from '../settings/Settings';
import ClientManager from '../clients/ClientManager';

interface DashboardLayoutProps {
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/')[2] || 'dashboard';

  const handleTabChange = (tab: string) => {
    navigate(`/dashboard/${tab === 'dashboard' ? '' : tab}`);
  };

  const renderContent = () => {
    switch (currentPath) {
      case 'dashboard':
        return <Dashboard onTabChange={handleTabChange} />;
      case 'appointments':
        return <WeeklyCalendar />;
      case 'revenue':
        return <RevenueAnalytics />;
      case 'booking':
        return <BookingSettings />;
      case 'clients':
        return <ClientManager />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onTabChange={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Sidebar 
        activeTab={currentPath} 
        onTabChange={handleTabChange}
        onLogout={onLogout}
      />
      <div className="ml-64 p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardLayout;