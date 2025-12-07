"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "@radix-ui/react-navigation-menu";
import { HomeIcon, ImageIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function ComputerNavbar() {
  const location = useLocation();

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
          <NavigationMenuItem className=" h-20 border-(--border) flex items-center">
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()} ${
                location.pathname == "/dessins" && "bg-(--input)/75"
              }`}
            >
              <Link
                href="/dessins"
                className=" hover:bg-(--input) h-full w-full rounded-l-none rounded-r-[15px]"
              >
                <div className=" flex gap-2  p-2">
                  <ImageIcon
                    color="var(--muted-foreground)"
                    className=" scale-125 mt-1.5"
                  />
                  <div className=" text-lg font-semibold">Dessins</div>
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
