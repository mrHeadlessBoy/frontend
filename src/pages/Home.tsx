import React, { useEffect, useState } from 'react';

interface Article {
  id: number;
  title: string;
  category: 'Lore' | 'Survival' | 'World' | 'Drafts';
  excerpt: string;
}

const CATEGORIES = ['Lore', 'Survival', 'World', 'Drafts'] as const;

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/v1/api/articles')
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching archives:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F1EE] p-8 font-sans text-[#4B3832]">
      <header className="mb-12 border-b border-[#BE9B7B] pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">The Trembling Path</h1>
          <p className="mt-2 italic text-[#854442]">Archiving the remnants of a broken world.</p>
        </div>
        {/* <a href="/thehollowlogin" className="text-xs text-[#BE9B7B] hover:underline">ADMIN ACCESS</a> */}
      </header>

      {loading ? (
        <div className="text-center py-20 italic text-[#854442]">Consulting the scrolls...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((cat) => (
            <section key={cat} className="space-y-4">
              <h2 className="text-xl font-bold uppercase tracking-widest text-[#3C2F2F] border-l-4 border-[#BE9B7B] pl-3">
                {cat}
              </h2>
              <div className="space-y-4">
                {articles.filter(a => a.category === cat).map(article => (
                  <div key={article.id} className="bg-white p-5 rounded shadow-sm hover:shadow-md transition-shadow border border-[#E5E5E5]">
                    <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3">{article.excerpt}</p>
                    <button className="hover:cursor-pointer mt-4 text-xs font-bold text-[#BE9B7B] hover:text-[#854442]">READ MORE →</button>
                  </div>
                ))}
                {articles.filter(a => a.category === cat).length === 0 && (
                  <p className="text-xs italic text-gray-400">No entries in this ledger yet.</p>
                )}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;