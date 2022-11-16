import React from 'react'
import { Orchids } from '../../../../typings';
import { notFound } from 'next/navigation';

type PageProps = {
    params: {
        orchidId: string;
    };
}

const fetchOrchid = async (orchidId: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${orchidId}`, { next: { revalidate: 60 }});
  const orchid: Orchids = await res.json();;
  return orchid;
}

export default async function OrchidPage({params: {orchidId}}: PageProps) {
  const orchid = await fetchOrchid(orchidId);

  if (!orchid.id) return notFound();

  return (
    <div className='p-10 bg-yellow-200 border-2 m-2 shadow-lg'>
      <p>
        #{orchid.id}: {orchid.title}
      </p>
      <p>Completed: {orchid.completed ? "Yes" : "No"}</p>
      <p className="border-t border-black mt-5 text-right">
        By user: {orchid.userId}
      </p>
    </div>
  )
}

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const orchids: Orchids[] = await res.json();

  // Trimmed for demo. Prebuilding the first 10 pages to avoid being rate limited by API
  const trimmedOrchids = orchids.splice(0, 10)

  return trimmedOrchids.map(orchid => ({
    orchidId: orchid.id.toString(),
  }))
}