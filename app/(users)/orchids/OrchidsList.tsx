import Link from 'next/link';
import React from 'react'
import { Orchids } from '../../../typings';

const fetchOrchids = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
    const orchids: Orchids[] = await res.json();
    return orchids;
}

export default async function OrchidsList() {
    const orchids = await fetchOrchids()

  return (
    <>
        {orchids.map((orchid) => (
            <p key={orchid.id}>
                <Link href={`/orchids/${orchid.id}`}>Orchid: {orchid.id}</Link>
            </p>
        ))}
    </>
  )
}
