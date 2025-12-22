import { Button } from "@/components/ui/button";
import { eyebrows, type avatarType, type eyesType } from "./AvatarOptions";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import type { Dispatch, SetStateAction } from "react";

export default function EyesOptions({
  avatar,
  setAvatar,
}: {
  avatar: avatarType;
  setAvatar: Dispatch<SetStateAction<avatarType>>;
}) {
  const eyesOptions = (eyes_option: eyesType) => {
    return createAvatar(adventurer, {
      seed: "Felix",
      hair: [avatar.hair],
      eyebrows: [avatar.eyebrows],
      eyes: [eyes_option],
      mouth: [avatar.mouth],
      hairColor: [avatar.hairColor],
      skinColor: [avatar.skinColor],
    }).toDataUri();
  };

  return (
    <>
      {eyebrows.map((eyes_option) => {
        return (
          <Button
            key={eyes_option}
            disabled={avatar.eyes == eyes_option}
            className=" w-[100px] h-[100px]"
            onClick={() => setAvatar({ ...avatar, eyes: eyes_option })}
          >
            <img
              src={eyesOptions(eyes_option)}
              alt={`Avatar de l'utilisateur`}
            />
          </Button>
        );
      })}
    </>
  );
}
