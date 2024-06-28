"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import useRequest from '../../../hooks/use-request';

export default function Home() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const router = useRouter()
  const { doRequest, errors } = useRequest({
    url:'/api/tickets',
    method: 'post',
    body: {
      title, price
    },
    onSuccess: (_: any) => {
      router.push('/');
      router.refresh();
    }
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    doRequest();
  }; 

  const onBlur = () => {
    const value = parseFloat(price);
    if(isNaN(value)) {
      return;
    }
    setPrice(value.toFixed(2));
  }

  return (
    <form className="p-5" onSubmit={handleSubmit}>
      <h1>Create a ticket</h1>
      <div className="pb-5">
        <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input type="input" value={title} onChange={e => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="pb-5">
        <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
        <input type="input" value={price} onBlur={onBlur} onChange={e => setPrice(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      {errors}
      <div className="pb-5">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create ticket</button>
      </div>
    </form>
  );
}
