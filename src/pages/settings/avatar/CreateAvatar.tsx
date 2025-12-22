import { useState, type Dispatch, type SetStateAction } from "react";
import HairOptions from "./options/HairOptions";
import { Button } from "@/components/ui/button";
import EyebrowsOptions from "./options/EyebrowsOptions";
import EyesOptions from "./options/EyesOptions";
import MouthOptions from "./options/MouthOptions";
import HairColorOptions from "./options/HairColorOptions";
import SkinColorOptions from "./options/SkinColorOptions";
import type { avatarType } from "./options/AvatarOptions";

export default function CreateAvatar({
  avatar,
  setAvatar,
}: {
  avatar: avatarType;
  setAvatar: Dispatch<SetStateAction<avatarType>>;
}) {
  const [optionMenu, setOptionMenu] = useState("hair");

  return (
    <div className=" grid gap-2">
      <div className=" grid gap-2">
        <div className=" flex gap-x-1 gap-y-2 grow-0 justify-center flex-wrap max-w-[600px]">
          <Button
            disabled={optionMenu == "hair"}
            onClick={() => setOptionMenu("hair")}
            className=" basis-[140px]"
          >
            Cheveux
          </Button>
          <Button
            disabled={optionMenu == "eyebrows"}
            className=" w-[140px]"
            onClick={() => setOptionMenu("eyebrows")}
          >
            Sourcils
          </Button>
          <Button
            disabled={optionMenu == "eyes"}
            className=" w-[140px]"
            onClick={() => setOptionMenu("eyes")}
          >
            Yeux
          </Button>
          <Button
            disabled={optionMenu == "mouth"}
            className=" w-[140px]"
            onClick={() => setOptionMenu("mouth")}
          >
            Bouche
          </Button>
          <Button
            disabled={optionMenu == "hairColor"}
            className=" w-[140px]"
            onClick={() => setOptionMenu("hairColor")}
          >
            Couleur des cheveux
          </Button>
          <Button
            disabled={optionMenu == "skinColor"}
            className=" w-[140px]"
            onClick={() => setOptionMenu("skinColor")}
          >
            Couleur de peau
          </Button>
        </div>
      </div>

      <div className=" grid grid-cols-6 gap-1">
        {optionMenu == "hair" && (
          <HairOptions avatar={avatar} setAvatar={setAvatar} />
        )}
        {optionMenu == "eyebrows" && (
          <EyebrowsOptions avatar={avatar} setAvatar={setAvatar} />
        )}
        {optionMenu == "eyes" && (
          <EyesOptions avatar={avatar} setAvatar={setAvatar} />
        )}
        {optionMenu == "mouth" && (
          <MouthOptions avatar={avatar} setAvatar={setAvatar} />
        )}
        {optionMenu == "hairColor" && (
          <HairColorOptions avatar={avatar} setAvatar={setAvatar} />
        )}
        {optionMenu == "skinColor" && (
          <SkinColorOptions avatar={avatar} setAvatar={setAvatar} />
        )}
      </div>
    </div>
  );
}
