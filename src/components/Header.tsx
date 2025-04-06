import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-10 left-1/2 transform -translate-x-1/2 w-1/2 bg-vu-space/20 backdrop-blur-md text-vu-cyan py-4 z-50 shadow-[0_4px_6px_rgba(0,0,0,0.1)] border-b border-vu-blue/20 rounded-lg">
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
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink href="/" className="hover:text-vu-blue drop-shadow-[0_0_3px_rgba(0,253,252,0.3)] text-lg">
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/news" className="hover:text-vu-blue drop-shadow-[0_0_3px_rgba(0,253,252,0.3)] text-lg">
                News
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/articles" className="hover:text-vu-blue drop-shadow-[0_0_3px_rgba(0,253,252,0.3)] text-lg">
                Articles
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/about" className="hover:text-vu-blue drop-shadow-[0_0_3px_rgba(0,253,252,0.3)] text-lg">
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/contact" className="hover:text-vu-blue drop-shadow-[0_0_3px_rgba(0,253,252,0.3)] text-lg">
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}