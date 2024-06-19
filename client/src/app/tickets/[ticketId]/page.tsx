import buildClient from '@/api/build-client';
import { Ticket } from '@/components/ticket';

interface TicketType {
  id: string;
  title: string;
  price: string;
};

export default async function Home({ params }: { params: { ticketId: string } }) {
  const client = await buildClient();
  const { data } = await client.get<TicketType>(`/api/tickets/${params.ticketId}`);
  return <Ticket id={data.id} title={data.title} price={data.price} />;
}
