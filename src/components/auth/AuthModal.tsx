import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, setIsAuthenticated, setActiveView } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);
      if (authMode === 'signup') {
        setActiveView('onboarding');
      } else {
        setActiveView('dashboard');
      }
    }, 800);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);
      if (authMode === 'signup') {
        setActiveView('onboarding');
      } else {
        setActiveView('dashboard');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141413]/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-[#6c6a64] hover:text-[#141413] rounded-lg hover:bg-[#efe9de] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-[#efe9de] border border-[#e6dfd8] text-[#cc785c] mb-1">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif-display text-2xl text-[#141413] tracking-tight">
            {authMode === 'login' ? 'Welcome Back to CareerPulse' : 'Start Your AI Job Search'}
          </h3>
          <p className="text-xs text-[#6c6a64]">
            {authMode === 'login'
              ? 'Enter your credentials to access your AI application tracker.'
              : 'Join thousands of job seekers applying to top tech roles on autopilot.'}
          </p>
        </div>

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleAuth}
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-3 py-2.5 px-4 rounded-xl bg-[#efe9de] hover:bg-[#e8e0d2] border border-[#e6dfd8] text-[#141413] text-xs font-semibold transition-all shadow-sm mb-4"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-[#e6dfd8] w-full" />
          <span className="bg-[#faf9f5] px-3 text-[10px] text-[#6c6a64] font-mono uppercase tracking-widest absolute">
            Or with email
          </span>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#3d3d3a] mb-1">Work or Personal Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex.morgan@company.com"
              className="w-full px-3.5 py-2.5 text-xs bg-[#efe9de] border border-[#e6dfd8] rounded-xl text-[#141413] focus:outline-none focus:border-[#cc785c] transition-all placeholder:text-[#6c6a64]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-[#3d3d3a]">Password</label>
              {authMode === 'login' && (
                <a href="#forgot" className="text-[11px] text-[#cc785c] hover:underline">
                  Forgot?
                </a>
              )}
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 text-xs bg-[#efe9de] border border-[#e6dfd8] rounded-xl text-[#141413] focus:outline-none focus:border-[#cc785c] transition-all placeholder:text-[#6c6a64]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <span>{authMode === 'login' ? 'Sign In to Dashboard' : 'Create Free Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Privacy Note */}
        <div className="mt-5 text-center flex items-center justify-center space-x-1.5 text-[11px] text-[#6c6a64]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#5db872]" />
          <span>256-bit Encrypted. We never sell your resume or personal data.</span>
        </div>

        {/* Toggle Mode Footer */}
        <div className="mt-6 pt-4 border-t border-[#e6dfd8] text-center text-xs text-[#6c6a64]">
          {authMode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setAuthMode('signup')} className="text-[#cc785c] font-semibold hover:underline">
                Sign up free
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={() => setAuthMode('login')} className="text-[#cc785c] font-semibold hover:underline">
                Sign in
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
