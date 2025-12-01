import { Flashcard, PrismaClient, Word } from '@/app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DB_POSTGRES_URL })
const prisma = new PrismaClient({ adapter })

export default async function Home() {

  const flashcards = await prisma.flashcard.findMany({
    include: {
      word: true
    }
  })

  return (
    <div>
      <h1>Flashcards</h1>
      <ul>
        {flashcards.map((card: Flashcard & { word: Word }) => (
          <li key={card.id}>
            {card.word.english}
          </li>
        ))}
      </ul>
    </div>
  );
}
