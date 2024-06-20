import buildClient from '@/api/build-client';

import { OrderType } from "@/api/order.types";
import { UserType } from '@/api/user.types';
import { Order } from "@/components/order";

export default async function Home({ params }: { params: { orderId: string } }) {
  const client = await buildClient();
  const { data: order } = await client.get<OrderType>(`/api/orders/${params.orderId}`);
  const { data: user } = await client.get<UserType>('/api/users/currentuser');
  return (<div>
    <h1>Order</h1>
    <Order order={order} user={user} />
  </div>);
}
