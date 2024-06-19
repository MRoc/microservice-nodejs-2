import buildClient from '@/api/build-client';

interface OrderType {
    id: string;
    version: number;
    status: string;
    userId: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
};

export default async function Home({ params }: { params: { orderId: string } }) {
  const client = await buildClient();
  const { data } = await client.get<OrderType>(`/api/orders/${params.orderId}`);
  return (<div>
    <h1>Order</h1>
    <div>Order ID: {data.id}</div>
    <div>Order Version: {data.version}</div>
    <div>Order Status: {data.status}</div>
    <div>User ID: {data.userId}</div>
    <div>Expires At: {data.expiresAt}</div>
    <div>Ticket ID: {data.ticket.id}</div>
    <div>Ticket Price: {data.ticket.price}</div>
  </div>);
}
