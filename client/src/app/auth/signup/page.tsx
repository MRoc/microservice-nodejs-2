"use client";

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`submit ${email} ${password}`);
  }; 
  return (
    <form className="p-5" onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div className="pb-5">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="pb-5">
        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="pb-5">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</button>
      </div>
    </form>
  );
}
