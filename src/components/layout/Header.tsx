import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Search, ShieldCheck, LogOut, LayoutDashboard, ChevronRight } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    globalSearchQuery,
    setGlobalSearchQuery,
    isAuthenticated,
    setIsAuthenticated,
    setIsAuthModalOpen,
    setAuthMode,
    candidateProfile,
    notifications,
    markNotificationRead
  } = useApp();


  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e6dfd8] bg-[#faf9f5]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Wordmark with Anthropic Radial Glyph Accent */}
        <div
          className="flex items-center space-x-2.5 cursor-pointer group"
          onClick={() => setActiveView(isAuthenticated ? 'dashboard' : 'landing')}
        >
          {/* Radial Spike Asterisk Mark */}
          <div className="w-7 h-7 rounded-lg bg-[#cc785c] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif-display text-xl font-normal tracking-tight text-[#141413]">
                CareerPulse
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#efe9de] text-[#141413] border border-[#e6dfd8] font-mono font-medium">
                AI AUTOPILOT
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links for Public vs Logged In */}
        {activeView === 'landing' ? (
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#3d3d3a]">
            <a href="#how-it-works" className="hover:text-[#cc785c] transition-colors">How It Works</a>
            <a href="#ai-matching" className="hover:text-[#cc785c] transition-colors">AI Job Match</a>
            <a href="#pricing" className="hover:text-[#cc785c] transition-colors">Pricing</a>
            <a href="#security" className="hover:text-[#cc785c] transition-colors">Privacy & Safety</a>
          </nav>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (globalSearchQuery.trim()) {
                setActiveView('jobs');
              }
            }}
            className="hidden md:flex items-center flex-1 max-w-md mx-8 relative"
          >
            <Search className="w-4 h-4 text-[#6c6a64] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              placeholder="Search jobs — e.g. UI engineer, React, Node.js..."
              className="w-full pl-10 pr-4 py-1.5 text-xs bg-[#efe9de] border border-[#e6dfd8] rounded-lg text-[#141413] focus:outline-none focus:border-[#cc785c] transition-all placeholder:text-[#6c6a64]"
            />
          </form>
        )}


        {/* User Action Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {isAuthenticated ? (
            <>
              {/* Privacy Verified Badge */}
              <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#efe9de] border border-[#e6dfd8] text-[#3d3d3a] text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5db872]" />
                <span>Encrypted & Verified</span>
              </div>

              {/* View Switcher Button */}
              {activeView === 'landing' ? (
                <button
                  onClick={() => setActiveView('dashboard')}
                  className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-medium transition-all shadow-sm"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Go to App Dashboard</span>
                </button>
              ) : null}

              {/* Notifications Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg bg-[#efe9de] border border-[#e6dfd8] text-[#141413] hover:border-[#cc785c] transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#cc785c] rounded-full text-[10px] text-white font-bold flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#faf9f5] border border-[#e6dfd8] rounded-xl shadow-xl p-4 z-50">
                    <div className="flex items-center justify-between pb-3 border-b border-[#e6dfd8]">
                      <h4 className="text-xs font-semibold text-[#141413] uppercase tracking-wider font-mono">
                        Notifications ({notifications.length})
                      </h4>
                      <button
                        onClick={() => notifications.forEach((n) => markNotificationRead(n.id))}
                        className="text-[11px] text-[#cc785c] hover:underline"
                      >
                        Mark all read
                      </button>
                    </div>

                    <div className="divide-y divide-[#e6dfd8] max-h-80 overflow-y-auto mt-2">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            n.read ? 'opacity-70 bg-transparent' : 'bg-[#efe9de] border-l-2 border-[#cc785c]'
                          } hover:bg-[#efe9de]`}
                        >
                          <div className="flex items-start justify-between">
                            <h5 className="text-xs font-medium text-[#141413]">{n.title}</h5>
                            <span className="text-[10px] text-[#6c6a64] font-mono">{n.timestamp}</span>
                          </div>
                          <p className="text-[11px] text-[#3d3d3a] mt-1 leading-relaxed">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar & Logout */}
              <div className="flex items-center space-x-2 pl-2 border-l border-[#e6dfd8]">
                <div className="w-8 h-8 rounded-full bg-[#cc785c] text-white font-bold text-xs flex items-center justify-center shadow-sm">
                  {candidateProfile.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-medium text-[#141413] leading-none">{candidateProfile.name}</p>
                  <p className="text-[10px] text-[#6c6a64] mt-0.5 font-mono">{candidateProfile.currentRole}</p>
                </div>
                <button
                  onClick={() => {
                    setIsAuthenticated(false);
                    setActiveView('landing');
                  }}
                  title="Sign Out"
                  className="p-1.5 text-[#6c6a64] hover:text-[#c64545] transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="text-xs font-medium text-[#3d3d3a] hover:text-[#141413] px-3 py-1.5 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-medium shadow-sm transition-all"
              >
                <span>Start Free Job Search</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
