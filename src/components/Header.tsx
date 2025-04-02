// src/components/Header.tsx
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-vu-space/20 backdrop-blur-md text-vu-cyan py-4 sticky top-0 z-50 border-b border-vu-blue/20">
      <div className="flex justify-between items-center px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Image
            src="/venture_universe_logo.jpg"
            alt="Venture Universe Logo"
            width={50}
            height={50}
            className="rounded-full object-contain drop-shadow-[0_0_5px_rgba(0,253,252,0.5)]"
          />
          <h1 className="text-2xl font-bold drop-shadow-[0_0_5px_rgba(0,253,252,0.5)]">Venture Universe</h1>
        </div>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink href="/" className="hover:text-vu-blue drop-shadow-[0_0_3px_rgba(0,253,252,0.3)]">
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/news" className="hover:text-vu-blue drop-shadow-[0_0_3px_rgba(0,253,252,0.3)]">
                News
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/articles" className="hover:text-vu-blue drop-shadow-[0_0_3px_rgba(0,253,252,0.3)]">
                Articles
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/about" className="hover:text-vu-blue drop-shadow-[0_0_3px_rgba(0,253,252,0.3)]">
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/contact" className="hover:text-vu-blue drop-shadow-[0_0_3px_rgba(0,253,252,0.3)]">
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}