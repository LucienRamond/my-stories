import { createContext } from "react";
import type { avatarType } from "../settings/avatar/options/AvatarOptions";

export type ContentProps = {
  name: string;
  id: number;
  avatar_img: avatarType;
};

interface ContextProps {
  content: ContentProps;
  editContent: (arg0: ContentProps) => void;
  isLoggedIn: () => boolean;
}

export const UserContext = createContext<ContextProps>({
  content: {
    name: "Lucc3",
    id: 0,
    avatar_img: {
      hair: "short12",
      eyebrows: "variant01",
      eyes: "variant13",
      mouth: "variant15",
      skinColor: "ecad80",
      hairColor: "3eac2c",
    },
  },
  editContent: () => {},
  isLoggedIn: () => false,
});
