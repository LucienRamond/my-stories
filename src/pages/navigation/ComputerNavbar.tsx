"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "@radix-ui/react-navigation-menu";
import {
  BookTextIcon,
  FolderCodeIcon,
  HomeIcon,
  MessageSquareTextIcon,
  UserPenIcon,
} from "lucide-react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../providers/UserContext";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";

export default function ComputerNavbar() {
  const { content, isLoggedIn } = useContext(UserContext);
  const location = useLocation();

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

  return (
    <div className=" fixed w-full -translate-x-2 flex justify-center">
      <NavigationMenu className="bg-(--secondary) border border-(--border) rounded-2xl">
        <NavigationMenuList className=" gap-0">
          <NavigationMenuItem className="border-r border-(--border)  h-20 flex items-center">
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()} ${
                location.pathname == "/" && "bg-(--input)/75"
              }`}
            >
              <Link
                href="/"
                className=" hover:bg-(--input) h-full w-full rounded-r-none rounded-l-[15px]"
              >
                <div className=" flex gap-2 p-2">
                  <HomeIcon
                    className=" scale-125 mt-1.5"
                    color="var(--muted-foreground)"
                  />
                  <div className=" text-lg">Acceuil</div>
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="border-r border-(--border)  h-20 flex items-center">
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()} ${
                location.pathname == "/histoires" && "bg-(--input)/75"
              }`}
            >
              <Link
                href="/histoires"
                className=" hover:bg-(--input) h-full w-full rounded-none"
              >
                <div className=" flex gap-2 p-2">
                  <BookTextIcon
                    className=" scale-125 mt-1.5"
                    color="var(--muted-foreground)"
                  />
                  <div className=" text-lg">Histoires</div>
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="border-r border-(--border)  h-20 flex items-center">
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()} ${
                location.pathname == "/dessins" && "bg-(--input)/75"
              }`}
            >
              <Link
                href="/dessins"
                className=" hover:bg-(--input) h-full w-full rounded-none"
              >
                <div className=" flex gap-2 p-2">
                  <FolderCodeIcon
                    className=" scale-125 mt-1.5"
                    color="var(--muted-foreground)"
                  />
                  <div className=" text-lg">Dessins</div>
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="border-r border-(--border)  h-20 flex items-center">
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()} ${
                location.pathname == "/messagerie" && "bg-(--input)/75"
              }`}
            >
              <Link
                href="/messagerie"
                className=" hover:bg-(--input) h-full w-full rounded-none"
              >
                <div className=" flex gap-2 p-2">
                  <MessageSquareTextIcon
                    className=" scale-125 mt-1.5"
                    color="var(--muted-foreground)"
                  />
                  <div className=" text-lg">Messagerie</div>
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className=" h-20 border-(--border) flex items-center">
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()} ${
                location.pathname == "/connexion" && "bg-(--input)/75"
              }`}
            >
              <Link
                href="/connexion"
                className={` hover:bg-(--input) h-full w-full rounded-l-none rounded-r-[15px] ${
                  isLoggedIn() && "px-1!"
                }`}
              >
                {isLoggedIn() && (
                  <img
                    className=" w-[60px] mx-auto"
                    src={avatarOptions()}
                    alt={`Avatar de l'utilisateur`}
                  />
                )}
                {!isLoggedIn() && (
                  <div className=" flex gap-2  p-2">
                    <UserPenIcon className=" scale-125 mt-1.5" />
                  </div>
                )}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
