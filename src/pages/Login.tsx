import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const response = await fetch('http://localhost:3000/v1/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Single source of truth for successful login
    localStorage.setItem('isAdminAuthenticated', 'true');
    console.log("Login Success:", data);
    
    // Use the custom route name you defined
    window.location.href = '/lostandfoundspace';
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Login failed';
    setError(message);
  } finally {
    setLoading(false);
  }
};
return (
  <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC]">
    <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border border-[#D2B48C]">
      
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#4B3621] mb-2">Welcome Back</h1>
        <p className="text-[#8B4513]">Enter your credentials to manage your drafts.</p>
      </div>

      {/* Error Message Display */}
      {error && (
        <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#4B3621] mb-1">Email Address</label>
          <input
            type="email"
            required
            disabled={loading}
            className="w-full px-4 py-2 border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent outline-none transition-all disabled:opacity-50"
            placeholder="writer@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#4B3621] mb-1">Password</label>
          <input
            type="password"
            required
            disabled={loading}
            className="w-full px-4 py-2 border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent outline-none transition-all disabled:opacity-50"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6F4E37] text-white py-2 rounded-lg font-semibold hover:bg-[#4B3621] transform active:scale-[0.98] transition-all shadow-md disabled:bg-[#A68A74] disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-[#8B4513]">
        Not authorized? <a href="#" className="font-semibold hover:underline">Contact Admin</a>
      </p>
    </div>
  </div>
);
};

export default Login;