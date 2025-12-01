import './globals.css';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList, navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

export default function RootLayout({
                                     children
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className="h-full">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Kezdőlap</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/create-deck">Új szószedet</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/decks">Gyakorlatok</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/vocabulary">Szotar</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    <div className="h-[calc(100vh-36px)]">
      {children}
    </div>
    </body>
    </html>
  );
}
