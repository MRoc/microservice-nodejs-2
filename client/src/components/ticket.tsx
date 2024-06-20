"use client";

import useRequest from '@/hooks/use-request';
import { useRouter } from 'next/navigation'

const Ticket = ({ id, title, price } : { id: string, title: string, price: string}) => {
  const router = useRouter()
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: id
    },
    onSuccess: (order: { id: string}) => router.push(`/orders/${order.id}`)
  });

  return (
    <div>
      <h1>Ticket</h1>
      <div>ID</div>
      <div>{id}</div>
      <div>{title}</div>
      <div>{price}</div>
      {errors}
      <div><button onClick={(e) => doRequest({})} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Purchase</button></div>
    </div>
  );
};
 
export { Ticket };