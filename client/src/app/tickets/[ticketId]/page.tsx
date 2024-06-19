import buildClient from '@/api/build-client';

export default async function Home({ params }: { params: { ticketId: string } }) {

  const client = await buildClient();
  const { data } = await client.get(`/api/tickets/${params.ticketId}`);

  return (
    <div>
      <h1>Ticket</h1>
      <div>ID</div>
      <div>{data.title}</div>
      <div>{data.price}</div>
      <div>{data.id}</div>
    </div>
  );
}
