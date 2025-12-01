import { InputGroup, InputGroupText } from '@/components/ui/input-group';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/app/generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DB_POSTGRES_URL })
const prisma = new PrismaClient({ adapter })

export default async function CreateDeckPage() {
  async function createDeck(formData: FormData) {
    'use server'

    const name = formData.get('name') as string;
    const wordIds = Array.from(formData.entries())
      .filter(([key, value]) => key.startsWith('word_') && value === 'on')
      .map(([key]) => Number(key.replace('word_', '')));
    await prisma.deck.create({
      data: {
        name,
        flashcards: {
          create: wordIds.map((id) => ({ wordId: id }))
        }
      }
    })
  }

  const words = await prisma.word.findMany();

  return <div className="max-w-3xl mx-auto">
    <h2 className="py-8">Uj szoszedet</h2>
    <form action={createDeck}>
      <div className="flex justify-between">
        <Input type="text"  name="name" placeholder="szoszedet neve" className="w-xs mb-8" />
        <Button type="submit" className="min-w-24">Kesz</Button>
      </div>

      <Table>
        <TableCaption>Az osszes szo listaja.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox name="all" />
            </TableHead>
            <TableHead>Magyar</TableHead>
            <TableHead>Angol</TableHead>
            <TableHead>Multido</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {words.map((word) => (
            <TableRow key={word.id}>
              <TableCell>
                <Checkbox name={'word_' + word.id.toString()} />
              </TableCell>
              <TableCell className="font-medium">{word.hungarian}</TableCell>
              <TableCell>{word.english}</TableCell>
              <TableCell>{word.past}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </form>
  </div>;
}
