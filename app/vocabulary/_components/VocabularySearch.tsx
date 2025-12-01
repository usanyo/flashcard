'use client'

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function VocabularySearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="relative max-w-xs">
      <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground"/>
      <Input
        className="bg-background pl-9"
        id="search-input"
        placeholder="Search..."
        type="search"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  )
}
