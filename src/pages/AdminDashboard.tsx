import React, { useState, useEffect } from 'react';
import { LayoutDashboard, BookOpen, PenTool, /* Settings */ LogOut, Search, Plus, Trash2, Edit3, X } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('articles');
  const [articles, setArticles] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [newArticle, setNewArticle] = useState({ 
    title: '', 
    category: 'Lore', 
    excerpt: '', 
    status: 'Published' 
  });

  const fetchArticles = async () => {
    try {
      const res = await fetch('https://oraclemind.onrender.com/v1/api/articles');
      const data = await res.json();
      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch archives:", err);
    }
  };

  useEffect(() => { fetchArticles(); }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    window.location.href = '/thehollowlogin';
  };

  const handleEditClick = (article: any) => {
    setNewArticle({
      title: article.title,
      category: article.category,
      excerpt: article.excerpt,
      status: article.status
    });
    setEditingId(article.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to strike this from the archives?")) return;
    try {
      await fetch(`https://oraclemind.onrender.com/v1/api/articles/${id}`, { method: 'DELETE' });
      fetchArticles();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = editingId !== null;
    const url = isEditing 
      ? `https://oraclemind.onrender.com/v1/api/articles/${editingId}` 
      : `https://oraclemind.onrender.com/v1/api/articles`;
    const method = isEditing ? 'PATCH' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticle)
      });

      if (response.ok) {
        setIsModalOpen(false);
        setEditingId(null);
        setNewArticle({ title: '', category: 'Lore', excerpt: '', status: 'Published' });
        fetchArticles();
      }
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  // Helper to render different tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="bg-white p-8 rounded-xl border border-[#D2B48C] shadow-sm">
            <h2 className="text-2xl font-bold text-[#4B3621] mb-4">Archive Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#F5F5DC] rounded-lg border border-[#D2B48C]">
                <p className="text-sm uppercase tracking-widest font-bold text-[#8B4513]">Total Entries</p>
                <p className="text-4xl font-black text-[#4B3621]">{articles.length}</p>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white p-8 rounded-xl border border-[#D2B48C] shadow-sm">
            <h2 className="text-2xl font-bold text-[#4B3621] mb-4">Archive Settings</h2>
            <p className="italic text-gray-600">"The fundamental laws of the Path are currently locked."</p>
          </div>
        );
      default:
        return (
          <>
            <div className="flex justify-between items-end mb-8">
              <h1 className="text-3xl font-bold text-[#4B3621]">Archive Management</h1>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-[#D2B48C]" size={18} />
                <input type="text" placeholder="Search archives..." className="pl-10 pr-4 py-2 border border-[#D2B48C] rounded-lg outline-none" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-[#D2B48C] overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[#F5F5DC] text-[#4B3621] uppercase text-xs font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F5DC]">
                  {articles.map((article: any) => (
                    <tr key={article.id} className="hover:bg-[#FDFCF0] transition-colors">
                      <td className="px-6 py-4 font-medium text-[#4B3621]">{article.title}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-bold rounded bg-[#F5F5DC] text-[#8B4513] border border-[#D2B48C]">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${article.status === 'Published' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                          <span className="text-sm text-gray-600">{article.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right space-x-3">
                        {/* FIX: Arrow functions for onClick */}
                        <button onClick={() => handleEditClick(article)} className="text-[#8B4513] hover:text-[#4B3621] cursor-pointer"><Edit3 size={18} /></button>
                        <button onClick={() => handleDelete(article.id)} className="text-red-800 hover:text-red-600 cursor-pointer"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FDFCF0]">
      <aside className="w-64 bg-[#4B3621] text-[#F5F5DC] hidden md:flex flex-col shadow-xl">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-widest uppercase border-b border-[#6F4E37] pb-2">
            The Hollow <span className="text-[#D2B48C]">Admin</span>
          </h2>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <NavItem icon={<BookOpen size={20}/>} label="Articles" active={activeTab === 'articles'} onClick={() => setActiveTab('articles')} />
          <NavItem icon={<PenTool size={20}/>} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>
        <div className="p-4 bg-[#3C2F2F]">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-[#D2B48C] hover:text-white transition-colors cursor-pointer">
            <LogOut size={20} />
            <span>Abandon Session</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-[#D2B48C] flex items-center justify-between px-8">
          <div className="text-[#4B3621] font-medium italic">"The ink is the only thing that doesn't tremble."</div>
          <button 
            onClick={() => { setEditingId(null); setIsModalOpen(true); }} 
            className="bg-[#6F4E37] text-white px-4 py-2 rounded shadow-md flex items-center gap-2 hover:bg-[#4B3621] transition-all cursor-pointer"
          >
            <Plus size={18} />
            <span>Write New Article</span>
          </button>
        </header>

        <section className="p-8">
          {renderTabContent()}
        </section>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 border-2 border-[#D2B48C] shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#4B3621]">
                {editingId ? 'Revise Archive' : 'New Archive Entry'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="cursor-pointer"><X size={24} className="text-[#8B4513]" /></button>
            </div>
            {/* FIX: Use handleSave instead of handleCreate */}
            <form onSubmit={handleSave} className="space-y-4">
              <input 
                type="text" placeholder="Article Title" required 
                className="w-full p-2 border border-[#D2B48C] rounded"
                value={newArticle.title} onChange={e => setNewArticle({...newArticle, title: e.target.value})}
              />
              <select 
                className="w-full p-2 border border-[#D2B48C] rounded bg-white"
                value={newArticle.category} onChange={e => setNewArticle({...newArticle, category: e.target.value as any})}
              >
                <option value="Lore">Lore</option>
                <option value="Survival">Survival</option>
                <option value="World">World</option>
                <option value="Drafts">Drafts</option>
              </select>
              <textarea 
                placeholder="Excerpt..." required className="w-full p-2 border border-[#D2B48C] rounded h-24"
                value={newArticle.excerpt} onChange={e => setNewArticle({...newArticle, excerpt: e.target.value})}
              />
              <button type="submit" className="w-full bg-[#6F4E37] text-white py-2 rounded font-bold hover:bg-[#4B3621] cursor-pointer">
                {editingId ? 'Update Ledger' : 'Commit to Ledger'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }: any) => (
  <button onClick={onClick} className={`flex items-center gap-3 w-full px-4 py-3 rounded-md transition-all cursor-pointer ${active ? 'bg-[#D2B48C] text-[#4B3621] font-bold' : 'text-[#D2B48C] hover:bg-[#6F4E37] hover:text-white'}`}>
    {icon} <span>{label}</span>
  </button>
);

export default AdminDashboard;