'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn, Moon, Sun, Sparkles, Eye, EyeOff, Zap, Coffee } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.refresh();
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, [router]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        const target = data.role === 'admin' ? '/admin' : '/dashboard';
        router.replace(target);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Connection failed!");
    } finally {
      setLoading(false);
    }
  };

  // Dark mode styles (Ultra Cool)
  const darkStyles = {
    container: 'bg-gradient-to-br from-[#2240b5] via-[#434a61] to-[#1a1f2f]',
    card: 'bg-[#0d111c]/80 backdrop-blur-xl border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)]',
    title: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400',
    input: 'bg-[#1a1f2f]/50 border-slate-700/50 text-white placeholder-slate-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20',
    button: 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/20',
    error: 'bg-red-500/10 border border-red-500/20 text-red-400',
    icon: 'text-slate-400',
    toggleBg: 'bg-slate-800/50 border-slate-700',
  };

  // Light mode styles (Ultra Sweet)
  const lightStyles = {
    container: 'bg-gradient-to-br from-[#dd5b91] via-[#434a61] to-[#1a1f2f]',
    card: 'bg-pink/90 backdrop-blur-xl border-black/80 shadow-[0_20px_50px_rgba(255,200,150,0.3)]',
    title: 'text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-rose-400',
    input: 'bg-[#1a1f2f]/50 border-slate-700/50 text-white placeholder-slate-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20',
    button: 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/20',
    error: 'bg-rose-100/80 border border-rose-200 text-rose-500',
    icon: 'text-slate-400',
    toggleBg: 'bg-amber-100/80 border-amber-200',
  };

  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <div className={`min-h-screen flex items-center justify-center ${styles.container} p-4 transition-all duration-500 relative overflow-hidden`}>
      {/* Animated Background Elements */}
      {isDarkMode ? (
        <>
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-3xl"></div>
        </>
      ) : (
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(0, 225, 255, 0.1),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-t from-amber-200/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-20 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl"></div>
        </>
      )}

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 p-4 rounded-2xl ${styles.toggleBg} backdrop-blur-xl transition-all duration-300 hover:scale-110 z-10 group`}
      >
        {isDarkMode ? (
          <Sun className="w-6 h-6 text-yellow-400 group-hover:rotate-90 transition-transform duration-500" />
        ) : (
          <Moon className="w-6 h-6 text-indigo-600 group-hover:rotate-12 transition-transform duration-500" />
        )}
      </button>

      {/* Main Card */}
      <div 
        className={`${styles.card} p-8 rounded-[40px] border w-full max-w-md relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20"></div>
        
        {/* Header with Icons */}
        <div className="text-center mb-8 relative">
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-3xl ${isDarkMode ? 'bg-purple-500/10' : 'bg-orange-100'} transition-all duration-300 ${isHovering ? 'scale-110 rotate-6' : ''}`}>
              {isDarkMode ? (
                <Zap className="w-12 h-12 text-purple-400" />
              ) : (
                <Coffee className="w-12 h-12 text-amber-500" />
              )}
            </div>
          </div>
          <h2 className={`text-3xl font-black mb-2 ${styles.title} tracking-tighter`}>
            {isDarkMode ? 'ACCESS TO NUCLEAR' : 'ACCESS TO NUCLEAR'}
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-amber-600'}`}>
            {isDarkMode ? '⚡ Walcome to ADIAT nuclear facility' : '🌸 Enter the nuclear facility'}
          </p>
        </div>

        {error && (
          <div className={`${styles.error} p-4 rounded-2xl mb-6 text-center text-sm font-medium flex items-center justify-center gap-2`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping"></span>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div className="relative group">
            <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${styles.icon} transition-all duration-300 group-hover:scale-110`} />
            <input
              className={`w-full ${styles.input} pl-12 pr-4 py-5 rounded-2xl outline-none transition-all duration-300 border`}
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${isDarkMode ? 'from-blue-500/0 via-purple-500/0 to-pink-500/0' : 'from-amber-400/0 via-pink-400/0 to-rose-400/0'} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
          </div>

          {/* Password Input */}
          <div className="relative group">
            <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${styles.icon} transition-all duration-300 group-hover:scale-110`} />
            <input
              className={`w-full ${styles.input} pl-12 pr-12 py-5 rounded-2xl outline-none transition-all duration-300 border`}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${styles.icon} hover:scale-110 transition-all duration-300`}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className={`w-full ${styles.button} font-black py-5 rounded-2xl transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 group relative overflow-hidden`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{isDarkMode ? 'ACCESSING...' : 'JUST A MOMENT...'}</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span>{isDarkMode ? 'LOGIN' : 'LOGIN'}</span>
                  <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </>
              )}
            </span>
            <div className={`absolute inset-0 bg-gradient-to-r ${isDarkMode ? 'from-blue-600 via-purple-600 to-pink-600' : 'from-amber-400 via-orange-400 to-pink-400'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-amber-400'}`}>
            {isDarkMode ? '© 2026 DARK SYSTEM' : '© 2026 SWEET DREAMS'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;