import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { UserContext } from "../providers/UserContext";
import { useNavigate } from "react-router-dom";

import CreateAvatar from "./avatar/CreateAvatar";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import { type avatarType } from "./avatar/options/AvatarOptions";

export default function Settings() {
  const { content, editContent } = useContext(UserContext);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<avatarType>({
    hair: content.avatar_img.hair,
    eyebrows: content.avatar_img.eyebrows,
    eyes: content.avatar_img.eyes,
    mouth: content.avatar_img.mouth,
    skinColor: content.avatar_img.skinColor,
    hairColor: content.avatar_img.hairColor,
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

  const update_avatar = () => {
    fetch(`${BASE_URL}/user/update`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: content.id,
        avatar_img: JSON.stringify(avatar),
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        editContent({ ...content, avatar_img: avatar });
        setOnModifying(false);
      });
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
            <Button onClick={() => update_avatar()} className=" mx-auto">
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
