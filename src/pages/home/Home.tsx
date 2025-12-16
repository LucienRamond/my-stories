import Page from "@/components/ui/page";
import { useContext } from "react";
import { UserContext } from "../providers/UserContext";

export default function Home() {
  const { content } = useContext(UserContext);

  return (
    <Page>
      <div>{content.name}</div>
    </Page>
  );
}
