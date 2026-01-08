import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Page from "@/components/ui/page";
import { SendHorizonalIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/UserContext";

type UserType = {
  id: number;
  name: string;
  avatar_img: string;
};

export default function Inbox() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [users, setUsers] = useState<UserType[]>([]);
  const { content } = useContext(UserContext);

  useEffect(() => {
    fetch(`${BASE_URL}/users/all`)
      .then((response) => response.json())
      .then((res) => setUsers(res));
  }, [BASE_URL]);

  return (
    <Page>
      <div className=" grid grid-cols-[1fr_5fr] border rounded">
        <div className=" w-[200px] border-r p-2 flex flex-col gap-1">
          {users.map((user) => {
            return (
              user.id != content.id && (
                <Button key={user.id} className=" justify-start">
                  {user.name}
                </Button>
              )
            );
          })}
        </div>
        <div className=" p-2 min-h-[500px] grid grid-rows-[1fr_max-content]">
          <div>Conversations</div>
          <div className=" flex gap-2">
            <Input className=" text-black border border-(--border) bg-white " />
            <Button>
              <SendHorizonalIcon />
            </Button>
          </div>
        </div>
      </div>
    </Page>
  );
}
