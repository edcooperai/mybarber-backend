import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              to="/"
              className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity"
            >
              <span className="text-white">mybarber</span>
              <span className="text-[#8f00ff]">.ai</span>
            </Link>
            <button
              onClick={handleGetStarted}
              className="bg-[#8f00ff] text-white px-4 py-2 rounded-lg hover:bg-[#7a00d9] transition-colors flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-8">
              <span className="text-white">Smart Booking for</span>
              <br />
              <span className="text-[#8f00ff]">Modern Barbers</span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12">
              Streamline your barbershop with intelligent scheduling, client management,
              and business analytics. All in one place.
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-[#8f00ff] text-white px-8 py-4 rounded-lg hover:bg-[#7a00d9] transition-colors text-lg font-semibold flex items-center gap-2 mx-auto"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Smart Scheduling</h3>
              <p className="text-gray-400">
                Intelligent booking system that adapts to your working hours and service durations.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Client Management</h3>
              <p className="text-gray-400">
                Keep track of client preferences, history, and build lasting relationships.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Business Analytics</h3>
              <p className="text-gray-400">
                Make data-driven decisions with detailed insights into your business performance.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;