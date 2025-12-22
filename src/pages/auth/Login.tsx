import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Page from "@/components/ui/page";
import { useContext, useRef } from "react";
import { UserContext } from "../providers/UserContext";
import { useNavigate } from "react-router-dom";
import Settings from "../settings/Settings";

interface Form extends HTMLFormElement {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

export default function Login() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const formRef = useRef<Form>(null);
  const { content, editContent, isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleForm = () => {
    const form = formRef.current as Form;
    fetch(`${BASE_URL}/user/login`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: form.username.value,
        password: form.password.value,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        editContent({ ...content, name: data.name });
        navigate("/");
      });
  };

  return (
    <Page>
      {isLoggedIn() && <Settings />}
      {!isLoggedIn() && (
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            handleForm();
          }}
        >
          <div className=" grid gap-4 min-w-[90vw] sm:min-w-[450px]">
            <div className=" grid gap-2 w-full p-2 ">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input placeholder="Detective Conan" id="username" />
            </div>
            <div className=" grid gap-2 w-full p-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input type="password" placeholder="*******" id="password" />
            </div>
            <Button type="submit">Connexion</Button>
          </div>
        </form>
      )}
    </Page>
  );
}
