import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Page from "@/components/ui/page";
import { useRef } from "react";

interface Form extends HTMLFormElement {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

export default function Login() {
  const formRef = useRef<Form>(null);

  const handleForm = () => {
    const form = formRef.current as Form;
    return console.log(
      `Tentative de connexion au compte de ${form.username.value}`
    );
  };

  return (
    <Page>
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
    </Page>
  );
}
