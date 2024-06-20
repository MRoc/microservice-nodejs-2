import buildClient from '@/api/build-client';
import Link from 'next/link';
import { UserType } from '@/api/user.types';
import { OrderType } from '@/api/order.types';
import { Header } from '@/components/header';

const Page = async () => {
  const client = await buildClient();
  const { data: orders } = await client.get<OrderType[]>('/api/orders');
  const { data: currentUser } = await client.get<UserType>('/api/users/currentuser');
  return (
    <div>
      <Header currentUser={currentUser} />
      <div>
        <h1>Orders</h1>
        <table>
          <thead>
            <tr>
              <th className='m2'>Title</th>
              <th className='m2'>Price</th>
              <th className='m2'>Link</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: OrderType) => {
              return (
                <tr key={order.id}>
                  <td>{order.ticket.title}</td>
                  <td>{order.ticket.price}</td>
                  <td><Link href="/orders/[orderId]" as={`/orders/${order.id}`}>View</Link></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
);
};
 
export default Page;