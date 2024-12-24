import Link from 'next/link';

export default async function Home() {
  return (
    <main className='flex flex-col items-center gap-y-5 pt-24 text-center'>
      <h1>Homepage</h1>
      <Link href={'/posts'}>All Posts</Link>
    </main>
  );
}
