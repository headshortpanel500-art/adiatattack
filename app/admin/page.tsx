'use client';
import React, { useState, useEffect } from 'react';
import { 

  Users, Shield, Ban, Coins, Mail, Lock, UserCog, 
  Plus, Search, Filter, MoreVertical, ChevronDown,
  Edit2, Trash2, AlertCircle, X, CheckCircle, Crown,
  User, Settings, LogOut, Menu, RefreshCw
} from 'lucide-react';
import router from 'next/router';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [editingBalances, setEditingBalances] = useState<{ [key: string]: number }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setStatusMsg({ text: msg, type });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users', { cache: 'no-store' });
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      showToast('Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleUpdate = async (id: string, updatedData: any) => {
    try {
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updatedData }),
      });
      if (res.ok) {
        showToast('✅ Updated Successfully!', 'success');
        fetchUsers();
      }
    } catch (error) {
      showToast('❌ Update failed', 'error');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
      if (res.ok) {
        showToast(`👑 New ${role.toUpperCase()} Created!`, 'success');
        setEmail(''); setPassword('');
        setShowCreateModal(false);
        fetchUsers();
      }
    } catch (error) {
      showToast('❌ Creation failed', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('⚠️ Are you sure you want to delete this user?')) {
      try {
        const res = await fetch('/api/users', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        if (res.ok) {
          showToast('🗑️ User Deleted', 'success');
          fetchUsers();
        }
      } catch (error) {
        showToast('❌ Delete failed', 'error');
      }
    }
  };

  const filteredUsers = users.filter((user: any) => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesFilter;
  });

 const handleLogout = async () => {
    await fetch('/api/logout');
    router.replace('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2f] to-[#16213e] text-white">
      {/* Toast Notification */}
      {statusMsg && (
        <div className={`fixed top-6 right-6 z-50 animate-slideIn`}>
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold backdrop-blur-xl border ${
            statusMsg.type === 'success' 
              ? 'bg-violet-500/20 border-violet-500/50 text-violet-400' 
              : 'bg-rose-500/20 border-rose-500/50 text-rose-400'
          }`}>
            {statusMsg.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {statusMsg.text}
          </div>
        </div>
      )}

      {/* Sidebar Toggle Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-6 left-6 z-40 p-3 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl text-slate-400 hover:text-violet-400 transition-all hover:scale-110"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-[#0f0f1a]/90 backdrop-blur-xl border-r border-violet-900/30 transition-all duration-500 z-30 ${
        isSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8 mt-12">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-black text-green-400">ADMIN</h2>
              <p className="text-[10px] text-slate-500">CONTROL PANEL</p>
            </div>
          </div>

          <nav className="space-y-2">
            <a href="/" className="flex items-center gap-3 px-4 py-3 bg-violet-500/10 text-violet-400 rounded-2xl border border-violet-500/20">
              <Users className="w-5 h-5" />
              <span className="font-bold">Users</span>
            </a>
            <a href="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-violet-500/10 rounded-2xl transition-all">
              <Settings className="w-5 h-5" />
              <span className="font-bold">Settings</span>
            </a>
            <a href="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-violet-500/10 rounded-2xl transition-all" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
              <span className="font-bold">Logout</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-500 ${isSidebarOpen ? 'ml-64' : 'ml-0'} p-6 md:p-12`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                USER MANAGEMENT
              </h1>
              <p className="text-slate-400">Manage your users with ultimate control</p>
            </div>
            
            {/* Stats Cards */}
            <div className="flex gap-4">
              <div className="bg-[#0f0f1a]/50 backdrop-blur-xl border border-violet-900/30 rounded-[30px] p-4 text-center">
                <div className="text-2xl font-black text-violet-400">{users.length}</div>
                <div className="text-xs text-slate-400">TOTAL USERS</div>
              </div>
              <div className="bg-[#0f0f1a]/50 backdrop-blur-xl border border-violet-900/30 rounded-[30px] p-4 text-center">
                <div className="text-2xl font-black text-green-400">{users.filter((u: any) => u.role === 'admin').length}</div>
                <div className="text-xs text-slate-400">ADMINS</div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0f0f1a]/50 border border-violet-900/30 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-violet-500/50 transition-all"
                />
              </div>
              
              {/* Filter */}
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="bg-[#0f0f1a]/50 border border-violet-900/30 px-4 py-4 rounded-2xl outline-none focus:border-violet-500/50 text-slate-300"
              >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="admin">Admins</option>
              </select>
            </div>

            {/* Create Button */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-violet-500 to-purple-600 text-white font-black px-8 py-4 rounded-2xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              CREATE USER
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-[#0f0f1a]/30 backdrop-blur-xl rounded-[40px] border border-violet-900/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-violet-900/20 border-b border-violet-900/30">
                    <th className="p-6 text-left text-xs font-black text-slate-400 uppercase tracking-wider">User / Role</th>
                    <th className="p-6 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Balance</th>
                    <th className="p-6 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="p-6 text-right text-xs font-black text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user: any, index: number) => (
                    <tr 
                      key={user._id} 
                      className="border-b border-violet-900/30 hover:bg-violet-500/5 transition-all group animate-fadeIn"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                            user.role === 'admin' 
                              ? 'bg-gradient-to-br from-green-500/20 to-purple-600/20 border border-green-500/30' 
                              : 'bg-green-900/20 border border-green-900/30'
                          }`}>
                            {user.role === 'admin' ? (
                              <Crown className="w-6 h-6 text-violet-400" />
                            ) : (
                              <User className="w-6 h-6 text-slate-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-white">{user.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-[10px] px-2 py-1 rounded-full font-black ${
                                user.role === 'admin' 
                                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                                  : 'bg-violet-900/30 text-red-400'
                              }`}>
                                {user.role?.toUpperCase()}
                              </span>
                              {user.isBanned && (
                                <span className="text-[10px] px-2 py-1 bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-full font-black">
                                  BANNED
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <Coins className="w-4 h-4 text-violet-400" />
                          <input
                            type="number"
                            defaultValue={user.balance ?? 0}
                            className="bg-violet-900/20 border border-violet-900/30 w-28 px-3 py-2 rounded-xl text-green-400 font-bold outline-none focus:border-violet-500"
                            onChange={(e) => setEditingBalances({
                              ...editingBalances, 
                              [user._id]: Number(e.target.value)
                            })}
                          />
                          <button
                            onClick={() => handleUpdate(user._id, { balance: editingBalances[user._id] })}
                            className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 hover:bg-blue-500/30 transition-all"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                      <td className="p-6">
                        <button
                          onClick={() => handleUpdate(user._id, { isBanned: !user.isBanned })}
                          className={`px-4 py-2 rounded-xl font-black text-xs transition-all ${
                            user.isBanned
                              ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30'
                              : 'bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:bg-rose-500/30'
                          }`}
                        >
                          {user.isBanned ? 'UNBAN USER' : 'BAN USER'}
                        </button>
                      </td>

                      <td className="p-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="p-3 bg-violet-900/20 hover:bg-violet-900/30 rounded-xl transition-all group"
                          >
                            <Edit2 className="w-4 h-4 text-slate-400 group-hover:text-violet-400" />
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="p-3 bg-rose-500/10 hover:bg-rose-500/20 rounded-xl transition-all group"
                          >
                            <Trash2 className="w-4 h-4 text-rose-400 group-hover:text-rose-300" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-20">
                <Users className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 font-bold">No users found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-[#0f0f1a] p-8 rounded-[40px] border border-violet-900/30 max-w-md w-full relative animate-slideUp">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-6 right-6 p-2 bg-violet-900/20 rounded-xl text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-3xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
              CREATE NEW USER
            </h2>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  className="w-full bg-violet-900/20 border border-violet-900/30 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-violet-500"
                  placeholder="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  className="w-full bg-violet-900/20 border border-violet-900/30 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-violet-500"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <UserCog className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <select
                  className="w-full bg-violet-900/20 border border-green-900/30 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-green-500 text-green-400 font-bold appearance-none"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">USER ROLE</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white font-black py-5 rounded-2xl hover:scale-105 transition-all mt-6"
              >
                CREATE USER
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-[#0f0f1a] p-8 rounded-[40px] border border-violet-900/30 max-w-md w-full relative animate-slideUp">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-6 right-6 p-2 bg-violet-900/20 rounded-xl text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-3xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
              EDIT USER
            </h2>

            <div className="space-y-4">
              <div className="bg-violet-900/20 p-4 rounded-2xl border border-violet-900/30">
                <p className="text-sm text-slate-400 mb-1">Email</p>
                <p className="font-bold text-white">{selectedUser.email}</p>
              </div>

              <div className="bg-violet-900/20 p-4 rounded-2xl border border-violet-900/30">
                <p className="text-sm text-slate-400 mb-1">Current Role</p>
                <p className={`font-bold ${selectedUser.role === 'admin' ? 'text-green-400' : 'text-slate-400'}`}>
                  {selectedUser.role?.toUpperCase()}
                </p>
              </div>

              <select
                className="w-full bg-violet-900/20 border border-green-900/30 px-4 py-4 rounded-2xl outline-none focus:border-green-500 text-green-400 font-bold"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">USER ROLE</option>
              </select>

              <button
                onClick={() => {
                  handleUpdate(selectedUser._id, { role });
                  setSelectedUser(null);
                }}
                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white font-black py-5 rounded-2xl hover:scale-105 transition-all"
              >
                UPDATE ROLE
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;