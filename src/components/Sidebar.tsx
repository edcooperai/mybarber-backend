import React from 'react';
import { Calendar, Users, BarChart3, Settings, CalendarRange, DollarSign } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onLogout }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'appointments', icon: Calendar, label: 'Appointments' },
    { id: 'revenue', icon: DollarSign, label: 'Revenue' },
    { id: 'booking', icon: CalendarRange, label: 'Booking' },
    { id: 'clients', icon: Users, label: 'Clients' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogoClick = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  };

  return (
    <div className="bg-black h-screen w-64 fixed left-0 top-0 text-white p-6">
      <button 
        onClick={handleLogoClick}
        className="flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity"
      >
        <div className="text-2xl font-bold tracking-tight">
          <span className="text-white">mybarber</span>
          <span className="text-[#8f00ff]">.ai</span>
        </div>
      </button>
      
      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
                activeTab === item.id
                  ? 'bg-[#8f00ff] text-white'
                  : 'hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;