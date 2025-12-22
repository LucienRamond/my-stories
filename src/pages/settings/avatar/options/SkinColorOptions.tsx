import { Button } from "@/components/ui/button";
import {
  skinColor,
  type avatarType,
  type skinColorType,
} from "./AvatarOptions";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import type { Dispatch, SetStateAction } from "react";

export default function SkinColorOptions({
  avatar,
  setAvatar,
}: {
  avatar: avatarType;
  setAvatar: Dispatch<SetStateAction<avatarType>>;
}) {
  const skinColorOptions = (skinColor_option: skinColorType) => {
    return createAvatar(adventurer, {
      seed: "Felix",
      hair: [avatar.hair],
      eyes: [avatar.eyes],
      mouth: [avatar.mouth],
      hairColor: [avatar.hairColor],
      skinColor: [skinColor_option],
    }).toDataUri();
  };

  return (
    <>
      {skinColor.map((skinColor_option) => {
        return (
          <Button
            key={skinColor_option}
            disabled={avatar.skinColor == skinColor_option}
            className=" w-[100px] h-[100px]"
            onClick={() =>
              setAvatar({ ...avatar, skinColor: skinColor_option })
            }
          >
            <img
              src={skinColorOptions(skinColor_option)}
              alt={`Avatar de l'utilisateur`}
            />
          </Button>
        );
      })}
    </>
  );
}
