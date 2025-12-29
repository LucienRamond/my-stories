import { Button } from "@/components/ui/button";
import {
  hairColor,
  type avatarType,
  type hairColorType,
} from "./AvatarOptions";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import type { Dispatch, SetStateAction } from "react";

export default function HairColorOptions({
  avatar,
  setAvatar,
}: {
  avatar: avatarType;
  setAvatar: Dispatch<SetStateAction<avatarType>>;
}) {
  const hairColorOptions = (hairColor_option: hairColorType) => {
    return createAvatar(adventurer, {
      seed: "Felix",
      hair: [avatar.hair],
      eyes: [avatar.eyes],
      mouth: [avatar.mouth],
      hairColor: [hairColor_option],
      skinColor: [avatar.skinColor],
    }).toDataUri();
  };

  return (
    <>
      {hairColor.map((hairColor_option) => {
        return (
          <Button
            key={hairColor_option}
            disabled={avatar.hairColor == hairColor_option}
            className=" w-full h-full"
            onClick={() =>
              setAvatar({ ...avatar, hairColor: hairColor_option })
            }
          >
            <img
              src={hairColorOptions(hairColor_option)}
              alt={`Avatar de l'utilisateur`}
            />
          </Button>
        );
      })}
    </>
  );
}
