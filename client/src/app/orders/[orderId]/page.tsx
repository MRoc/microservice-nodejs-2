import buildClient from '@/api/build-client';

import { OrderType } from "@/api/order.types";
import { Order } from "@/components/order";

export default async function Home({ params }: { params: { orderId: string } }) {
  const client = await buildClient();
  const { data } = await client.get<OrderType>(`/api/orders/${params.orderId}`);
  return (<div>
    <h1>Order</h1>
    <Order order={data} />
  </div>);
}
