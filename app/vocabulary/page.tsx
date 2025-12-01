import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/app/generated/prisma/client';
import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';
import VocabularySearch from '@/app/vocabulary/_components/VocabularySearch';

const adapter = new PrismaPg({ connectionString: process.env.DB_POSTGRES_URL })
const prisma = new PrismaClient({ adapter })

export default async function VocabularyPage({ searchParams }: { searchParams: Promise<{ q: string | null }> }) {
  const { q } = await searchParams
  async function createWord(formData: FormData) {
    'use server'

    const newWord = {
      hungarian: formData.get('hungarian') as string,
      english: formData.get('english') as string,
      past: formData.get('past') as string
    }
    await prisma.word.create({
      data: newWord
    })

    revalidatePath('/vocabulary')
  }

  const words = await prisma.word.findMany({
    where: {
      OR: [
        {
          hungarian: { contains: q || '' }
        },
        {
          english: { contains: q || '' }
        },
        {
          past: { contains: q || '' }
        }
      ]
    }
  })
  return <div className="max-w-3xl mx-auto">
    <h1>Szotar</h1>
    <VocabularySearch />
    <form action={createWord}>
      <Table>
        <TableCaption>Az osszes szo listaja.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Magyar</TableHead>
            <TableHead>Angol</TableHead>
            <TableHead>Multido</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Input name="hungarian" placeholder="Magyar szo"/>
            </TableCell>
            <TableCell>
              <Input name="english" placeholder="Angol szo"/>
            </TableCell>
            <TableCell className="flex gap-2">
              <Input name="past" placeholder="Mult ido" className="w-3/4"/>
              <Button type="submit" className="w-1/4">+</Button>
            </TableCell>
          </TableRow>
          {words.map((word) => (
            <TableRow key={word.id}>
              <TableCell className="font-medium">{word.hungarian}</TableCell>
              <TableCell>{word.english}</TableCell>
              <TableCell>{word.past}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </form>
  </div>
}
