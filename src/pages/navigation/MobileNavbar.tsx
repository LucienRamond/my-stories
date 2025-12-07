import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import TextedSeparator from "@/components/ui/texted-separator";
import { Link } from "@radix-ui/react-navigation-menu";
import {
  CircleQuestionMarkIcon,
  CircleUserRoundIcon,
  FolderCodeIcon,
  HomeIcon,
  SettingsIcon,
} from "lucide-react";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);

  console.log(open);

  const toggleMenu = () => {
    return setOpen(!open);
  };
  return (
    <div className="w-full p-2 absolute">
      <div className=" grid grid-cols-1">
        <div
          className={` grid grid-cols-2 p-2 row-start-1 col-start-1 col-end-2 row-end-2 w-full`}
        >
          <Button
            onClick={() => setOpen(!open)}
            variant="outline"
            className={`z-50 row-start-1 col-start-1 col-end-3 col-span-2 w-fit`}
          >
            <MenuIcon />
          </Button>
          <div className="row-start-1 col-start-1 col-end-3 col-span-2 justify-self-center flex gap-2">
            <div className="z-50 h-fit font-bold text-2xl">
              <span>Lucr4</span>
            </div>
          </div>
        </div>

        <div
          className={`${
            open ? "grow-menu h-[460px]" : "reduce-menu h-[54px]"
          } pt-10 bg-(--card) rounded-xl border border-(--border) row-start-1 z-5 row-end-2 col-start-1 col-end-2 w-full col-span-2`}
        >
          <NavigationMenu
            className={`${
              open
                ? "grow-menu-text scale-100 opacity-100 translate-0"
                : "reduce-menu-text scale-100 opacity-0 slide-text transition delay-200 -translate-x-[110%]"
            } p-2l col-start-1 col-end-3 w-full mx-auto`}
          >
            <NavigationMenuList className="flex-col gap-0">
              <NavigationMenuItem className="h-20 flex items-center">
                <NavigationMenuLink asChild>
                  <Link href="/" onClick={() => toggleMenu()} className="">
                    <div className=" flex gap-2 p-2">
                      <HomeIcon
                        className=" scale-125 mt-1.5"
                        color="var(--muted-foreground)"
                      />
                      <div className=" text-lg font-semibold">Acceuil</div>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <div className=" w-[90vw]">
                <TextedSeparator />
              </div>

              <NavigationMenuItem className="h-20 flex items-center">
                <NavigationMenuLink asChild>
                  <Link href="/a-propos" className=" h-full  rounded-none">
                    <div className=" flex gap-2  p-2">
                      <CircleQuestionMarkIcon
                        color="var(--muted-foreground)"
                        className=" scale-125 mt-1.5"
                      />
                      <div className=" text-lg font-semibold">À propos</div>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <div className=" w-[70vw]">
                <TextedSeparator />
              </div>
              <NavigationMenuItem className="h-20 flex items-center">
                <NavigationMenuLink asChild>
                  <Link
                    href="/projets"
                    className=" hover:bg-(--input) h-full  rounded-none"
                  >
                    <div className=" flex gap-2  p-2">
                      <FolderCodeIcon
                        color="var(--muted-foreground)"
                        className=" scale-125 mt-1.5"
                      />
                      <div className=" text-lg font-semibold">Projets</div>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <div className=" w-[50vw]">
                <TextedSeparator />
              </div>
              <NavigationMenuItem className=" h-20 flex items-center">
                <NavigationMenuLink asChild>
                  <Link
                    href="/competences"
                    className=" hover:bg-(--input) h-full  rounded-none"
                  >
                    <div className=" flex gap-2  p-2">
                      <SettingsIcon
                        color="var(--muted-foreground)"
                        className=" scale-125 mt-1.5"
                      />
                      <div className=" text-lg font-semibold">Compétences</div>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <div className=" w-[30vw]">
                <TextedSeparator />
              </div>
              <NavigationMenuItem className=" h-20  flex items-center">
                <NavigationMenuLink asChild>
                  <Link
                    href="/contact"
                    className=" hover:bg-(--input) h-full w-full rounded-l-none rounded-r-[15px]"
                  >
                    <div className=" flex gap-2  p-2">
                      <CircleUserRoundIcon
                        color="var(--muted-foreground)"
                        className=" scale-125 mt-1.5"
                      />
                      <div className=" text-lg font-semibold">Contact</div>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}
