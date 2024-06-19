import buildClient from '@/api/build-client';
import { Header } from '../components/header';
import Link from 'next/link';

const Page = async () => {
  const client = await buildClient();
  const { data } = await client.get('/api/tickets');
  return (
    <div>
      <Header />
      <div>
        <h1>Tickets</h1>
        <table>
          <thead>
            <tr>
              <th className='m2'>Title</th>
              <th className='m2'>Price</th>
              <th className='m2'>Link</th>
            </tr>
          </thead>
          {data.map((ticket: { id: string, title: string, price: number }) => {
            return (
              <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.price}</td>
                <td><Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>View</Link></td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
);
};
 
export default Page;