"use client";

import { useState } from 'react';
import axios, { AxiosError } from 'axios';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string; field?: string }[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password
      });

      console.log(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        const messages = axiosError?.response?.data as { message: string; field?: string }[]
        setErrors(messages);
      } else {
        throw err;
      }
    }
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
      {errors.length > 0 ?? <div>
        <ul>
        {errors.map((error, index) => (
          <li key={index} className="text-red-500 text-xs">{error.message}</li>
        ))}
        </ul>
      </div>}
      <div className="pb-5">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</button>
      </div>
    </form>
  );
}
