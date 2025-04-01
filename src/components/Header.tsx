import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../components/ui/navigation-menu";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-black text-white py-4 sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/venture_universe_logo.jpg"
            alt="Venture Universe Logo"
            width={100}
            height={100}
            className="rounded-full object-contain"
          />
          <h1 className="text-2xl font-bold">Venture Universe</h1>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/">Home</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/news">News</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/articles">Articles</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/about">About</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}