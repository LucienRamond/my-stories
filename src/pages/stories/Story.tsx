import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import parse from "html-react-parser";
import { UserContext } from "../providers/UserContext";

export type StoryType = {
  id: number;
  name: string;
  story: string;
};

export default function Story({
  story,
  setRefresh,
  refresh,
}: {
  story: StoryType;
  setRefresh: (e: boolean) => void;
  refresh: boolean;
}) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [onDeleteStory, setOnDeleteStory] = useState(false);
  const { isLoggedIn } = useContext(UserContext);

  const deleteStory = (story_id: number) => {
    fetch(`${BASE_URL}/stories/delete/${story_id}`, {
      method: "DELETE",
    }).then(() => setRefresh(!refresh));
  };

  return (
    <Card
      key={story.id}
      className="w-full grid grid-rows-[fit-content_fit_content_fit-content] border-(--border) hover:border-(--card-foreground)"
    >
      <CardHeader>
        <CardTitle>{story.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-2 min-h-[100px] border-y border-(--border)">
        <div>{parse(story.story)}</div>
      </CardContent>
      {isLoggedIn() && (
        <CardFooter className=" grid">
          <div>
            <Dialog open={onDeleteStory} onOpenChange={setOnDeleteStory}>
              <DialogTrigger className=" rounded p-1 w-full mt-2 bg-red-600! hover:bg-red-700! ">
                Supprimer
              </DialogTrigger>
              <DialogContent className="bg-(--secondary) border-(--border)">
                <DialogHeader>
                  <DialogTitle>Supprimer le dessin ?</DialogTitle>
                  <DialogDescription className=" w-full py-4 grid grid-cols-2 gap-4">
                    <DialogClose asChild>
                      <Button className=" bg-(--input)!">Annuler</Button>
                    </DialogClose>
                    <Button
                      onClick={() => deleteStory(story.id)}
                      className="bg-red-600! hover:bg-red-700!"
                    >
                      Confirmer
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
