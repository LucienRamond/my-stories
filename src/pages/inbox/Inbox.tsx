import { Button } from "@/components/ui/button";
import Page from "@/components/ui/page";
import { UserPenIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../providers/UserContext";
import Conversation from "./Conversation";

type UserType = {
  id: number;
  name: string;
  avatar_img: string;
};

export default function Inbox() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<UserType>();
  const { content, isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    fetch(`${BASE_URL}/users/all`)
      .then((response) => response.json())
      .then((res) => setUsers(res));
  }, [BASE_URL]);

  return (
    <Page>
      {isLoggedIn() && (
        <div className=" grid grid-cols-[1fr_5fr] border rounded min-h-[500px]">
          <div className=" w-[200px] border-r p-2 flex flex-col gap-1">
            {users.map((user) => {
              return (
                user.id != content.id && (
                  <Button
                    key={user.id}
                    className=" justify-start"
                    onClick={() => setSelectedConversation(user)}
                  >
                    {user.name}
                  </Button>
                )
              );
            })}
          </div>

          <div>
            {selectedConversation && (
              <Conversation
                sender_id={content.id}
                recipient_id={selectedConversation.id}
              />
            )}
          </div>
        </div>
      )}
      {!isLoggedIn() && (
        <div className=" mx-auto grid gap-2">
          <div>Vous devez être connecté pour envoyer des messages !</div>
          <NavLink to={"/connexion"}>
            <Button className=" flex gap-2  p-2 m-auto">
              <div className=" flex justify-center items-center gap-2">
                <UserPenIcon />
                <div>Connexion</div>
              </div>
            </Button>
          </NavLink>
        </div>
      )}
    </Page>
  );
}
