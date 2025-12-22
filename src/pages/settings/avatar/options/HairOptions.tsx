import { Button } from "@/components/ui/button";
import { hair, type avatarType, type hairType } from "./AvatarOptions";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import type { Dispatch, SetStateAction } from "react";

export default function HairOptions({
  avatar,
  setAvatar,
}: {
  avatar: avatarType;
  setAvatar: Dispatch<SetStateAction<avatarType>>;
}) {
  const hairOptions = (hair_option: hairType) => {
    return createAvatar(adventurer, {
      seed: "Felix",
      hair: [hair_option],
      eyes: [avatar.eyes],
      mouth: [avatar.mouth],
      hairColor: [avatar.hairColor],
      skinColor: [avatar.skinColor],
    }).toDataUri();
  };

  return (
    <>
      {hair.map((hair_option) => {
        return (
          <Button
            key={hair_option}
            disabled={avatar.hair == hair_option}
            className=" w-[100px] h-[100px]"
            onClick={() => setAvatar({ ...avatar, hair: hair_option })}
          >
            <img
              src={hairOptions(hair_option)}
              alt={`Avatar de l'utilisateur`}
            />
          </Button>
        );
      })}
    </>
  );
}
