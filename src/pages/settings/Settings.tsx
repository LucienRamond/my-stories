import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { UserContext } from "../providers/UserContext";
import { useNavigate } from "react-router-dom";

import CreateAvatar from "./avatar/CreateAvatar";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import {
  eyebrows,
  eyes,
  hair,
  hairColor,
  mouth,
  skinColor,
  type avatarType,
} from "./avatar/options/AvatarOptions";

export default function Settings() {
  const { content } = useContext(UserContext);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<avatarType>({
    hair: hair[11],
    eyebrows: eyebrows[0],
    eyes: eyes[12],
    mouth: mouth[14],
    skinColor: skinColor[2],
    hairColor: hairColor[1],
  });
  const [onModifying, setOnModifying] = useState(false);

  const avatarOptions = () => {
    return createAvatar(adventurer, {
      seed: "Felix",
      hair: [avatar.hair],
      eyebrows: [avatar.eyebrows],
      eyes: [avatar.eyes],
      mouth: [avatar.mouth],
      skinColor: [avatar.skinColor],
      hairColor: [avatar.hairColor],
      earrings: undefined,
    }).toDataUri();
  };

  const logout = () => {
    fetch(`${BASE_URL}/user/logout`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then(() => navigate("/"));
  };

  return (
    <>
      <div className=" grid gap-4">
        <img
          className=" w-[140px] mx-auto bg-white rounded-xl"
          src={avatarOptions()}
          alt={`Avatar de l'utilisateur`}
        />
        <div className=" w-full text-center text-2xl">{content.name}</div>
        {!onModifying && (
          <Button onClick={() => setOnModifying(true)}>Modifier</Button>
        )}
        {onModifying && (
          <div className=" grid gap-2">
            <Button onClick={() => setOnModifying(false)} className=" mx-auto">
              Sauvegarder
            </Button>
            <CreateAvatar avatar={avatar} setAvatar={setAvatar} />
          </div>
        )}

        <Button
          onClick={() => logout()}
          className=" bg-red-600! border border-white/50!"
        >
          Deconnexion
        </Button>
      </div>
    </>
  );
}
