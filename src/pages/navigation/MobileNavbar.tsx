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
  BookTextIcon,
  FolderCodeIcon,
  HomeIcon,
  MenuIcon,
  PencilOffIcon,
  UserPenIcon,
} from "lucide-react";
import { useContext, useState } from "react";
import { UserContext } from "../providers/UserContext";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";

export default function MobileNavbar() {
  const { content, isLoggedIn } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const avatarOptions = () => {
    return createAvatar(adventurer, {
      seed: "Felix",
      hair: [content.avatar_img.hair],
      eyebrows: [content.avatar_img.eyebrows],
      eyes: [content.avatar_img.eyes],
      mouth: [content.avatar_img.mouth],
      skinColor: [content.avatar_img.skinColor],
      hairColor: [content.avatar_img.hairColor],
      earrings: undefined,
    }).toDataUri();
  };

  const toggleMenu = () => {
    return setOpen(!open);
  };

  return (
    <div className="w-full p-2 absolute">
      <div className=" grid grid-cols-1">
        <div
          className={` grid grid-cols-3 p-2 row-start-1 col-start-1 col-end-2 row-end-2 w-full`}
        >
          <Button
            onClick={() => setOpen(!open)}
            variant="outline"
            className={`z-50 row-start-1 col-start-1 col-end-3 col-span-2 w-fit`}
          >
            <MenuIcon />
          </Button>
          <div className="row-start-1 col-start-1 col-end-4 col-span-2 justify-self-center flex gap-2">
            <div className="z-50 h-fit font-bold text-2xl">
              <span>My stories</span>
            </div>
          </div>
          <div className="row-start-1 h-fit col-start-3 col-end-4 z-50 justify-self-end flex gap-2">
            {isLoggedIn() && (
              <img
                className=" w-13 -translate-y-[7px] mx-auto"
                src={avatarOptions()}
                alt={`Avatar de l'utilisateur`}
              />
            )}
            {!isLoggedIn() && (
              <div className=" flex gap-2  p-2">
                <PencilOffIcon />
              </div>
            )}
          </div>
        </div>

        <div
          className={`${
            open ? "grow-menu h-[360px]" : "reduce-menu h-[54px]"
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
                  <Link href="/histoires" className=" h-full  rounded-none">
                    <div className=" flex gap-2  p-2">
                      <BookTextIcon
                        color="var(--muted-foreground)"
                        className=" scale-125 mt-1.5"
                      />
                      <div className=" text-lg font-semibold">Histoires</div>
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
                    href="/dessins"
                    className=" hover:bg-(--input) h-full  rounded-none"
                  >
                    <div className=" flex gap-2  p-2">
                      <FolderCodeIcon
                        color="var(--muted-foreground)"
                        className=" scale-125 mt-1.5"
                      />
                      <div className=" text-lg font-semibold">Dessins</div>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="h-20 flex items-center">
                <NavigationMenuLink asChild>
                  <Link
                    href="/connexion"
                    className=" hover:bg-(--input) h-full  rounded-none"
                  >
                    <div className=" flex gap-2  p-2">
                      <UserPenIcon
                        color="var(--muted-foreground)"
                        className=" scale-125 mt-1.5"
                      />
                      <div className=" text-lg font-semibold">Utilisateur</div>
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
