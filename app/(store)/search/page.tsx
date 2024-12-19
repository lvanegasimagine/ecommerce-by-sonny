import React from 'react';

export default async function SearchPage({
    searchParams,
}: {
    searchParams: { query: string };
}) {
    const { query } = await searchParams;

    return <div>Searching for: {query}</div>;
}
