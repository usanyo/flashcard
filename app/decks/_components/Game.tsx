'use client'

import { Deck, Flashcard, Word } from '@/app/generated/prisma/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Game({ deck }: { deck: Deck & { flashcards: (Flashcard & { word: Word })[] } }) {
  const currentFlashCard = deck.flashcards[Math.floor(Math.random() * deck.flashcards.length)];
  return (<div className="relative h-full flex flex-col items-center justify-center">
      <h1 className="absolute top-0 left-0">{deck.name}</h1>
      <div className="flex flex-col gap-2 items-center justify-center p-4 rounded w-sm">
        {currentFlashCard.word.hungarian}
        <Input type="text" placeholder="angolul"/>
        <Input type="text" placeholder="multido"/>
        <Button type="submit">Kesz</Button>
      </div>
    </div>
  )
}
