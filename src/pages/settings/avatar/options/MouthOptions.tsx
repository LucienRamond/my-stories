import { Button } from "@/components/ui/button";
import { mouth, type avatarType, type mouthType } from "./AvatarOptions";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import type { Dispatch, SetStateAction } from "react";

export default function MouthOptions({
  avatar,
  setAvatar,
}: {
  avatar: avatarType;
  setAvatar: Dispatch<SetStateAction<avatarType>>;
}) {
  const mouthOptions = (mouth_option: mouthType) => {
    return createAvatar(adventurer, {
      seed: "Felix",
      hair: [avatar.hair],
      eyes: [avatar.eyes],
      mouth: [mouth_option],
      hairColor: [avatar.hairColor],
      skinColor: [avatar.skinColor],
    }).toDataUri();
  };

  return (
    <>
      {mouth.map((mouth_option) => {
        return (
          <Button
            key={mouth_option}
            disabled={avatar.mouth == mouth_option}
            className=" w-[100px] h-[100px]"
            onClick={() => setAvatar({ ...avatar, mouth: mouth_option })}
          >
            <img
              src={mouthOptions(mouth_option)}
              alt={`Avatar de l'utilisateur`}
            />
          </Button>
        );
      })}
    </>
  );
}
