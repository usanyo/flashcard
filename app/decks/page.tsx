import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/app/generated/prisma/client';
import Link from 'next/link';

const adapter = new PrismaPg({ connectionString: process.env.DB_POSTGRES_URL })
const prisma = new PrismaClient({ adapter })

export default async function DecksPage() {
  const decks = await prisma.deck.findMany()
  return (
    <div>
      <h1>Gyakorlatok</h1>
      <ul>
        {decks.map((deck) => (
          <li key={deck.id}>
            <Link href={`/decks/${deck.id}`}>
              {deck.name}
            </Link>
            </li>
        ))}
      </ul>
    </div>)
    ;
}
