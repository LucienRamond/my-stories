import Page from "@/components/ui/page";
import { useContext } from "react";
import { UserContext } from "../providers/UserContext";

export default function Home() {
  const { content, isLoggedIn } = useContext(UserContext);

  return (
    <Page>
      {isLoggedIn() && (
        <div className=" text-2xl font-extrabold">Bonjour {content.name} !</div>
      )}
      {!isLoggedIn() && <div className=" text-2xl font-extrabold">Home</div>}
    </Page>
  );
}
