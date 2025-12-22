import { Button } from "@/components/ui/button";
import { eyebrows, type avatarType, type eyebrowsType } from "./AvatarOptions";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import type { Dispatch, SetStateAction } from "react";

export default function EyebrowsOptions({
  avatar,
  setAvatar,
}: {
  avatar: avatarType;
  setAvatar: Dispatch<SetStateAction<avatarType>>;
}) {
  const eyebrowsOptions = (eyebrows_option: eyebrowsType) => {
    return createAvatar(adventurer, {
      seed: "Felix",
      hair: [avatar.hair],
      eyebrows: [eyebrows_option],
      eyes: [avatar.eyes],
      mouth: [avatar.mouth],
      hairColor: [avatar.hairColor],
      skinColor: [avatar.skinColor],
    }).toDataUri();
  };

  return (
    <>
      {eyebrows.map((eyebrows_option) => {
        return (
          <Button
            key={eyebrows_option}
            disabled={avatar.eyebrows == eyebrows_option}
            className=" w-[100px] h-[100px]"
            onClick={() => setAvatar({ ...avatar, eyebrows: eyebrows_option })}
          >
            <img
              src={eyebrowsOptions(eyebrows_option)}
              alt={`Avatar de l'utilisateur`}
            />
          </Button>
        );
      })}
    </>
  );
}
