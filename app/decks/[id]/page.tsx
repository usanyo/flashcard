import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/app/generated/prisma/client';
import Game from '@/app/decks/_components/Game';

const adapter = new PrismaPg({ connectionString: process.env.DB_POSTGRES_URL })
const prisma = new PrismaClient({ adapter })

export default async function DeckPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;

  const deck = await prisma.deck.findUniqueOrThrow({ where: { id: Number(id) }, include: { flashcards: { include: { word: true } } } });
  return (<Game deck={deck}/>);
}
