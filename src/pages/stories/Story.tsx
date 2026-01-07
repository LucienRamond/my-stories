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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useContext, useRef, useState } from "react";
import parse from "html-react-parser";
import { UserContext } from "../providers/UserContext";
import CustomEditor from "./CustomEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type StoryType = {
  id: number;
  name: string;
  story: string;
  created_by: [{ name: string; id: number }];
};

interface Form extends HTMLFormElement {
  story_name: HTMLInputElement;
  story_story: HTMLInputElement;
}

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
  const { content, isLoggedIn } = useContext(UserContext);
  const [onModifyStory, setOnModifyStory] = useState(false);
  const formRef = useRef<Form>(null);
  const [editorContent, setEditorContent] = useState("");
  const [formData, setFormData] = useState<StoryType>({
    id: story.id,
    name: story.name,
    story: story.story,
    created_by: [
      { name: story.created_by[0].name, id: story.created_by[0].id },
    ],
  });

  const deleteStory = (story_id: number) => {
    fetch(`${BASE_URL}/stories/delete/${story_id}`, {
      method: "DELETE",
    }).then(() => setRefresh(!refresh));
  };

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const modifyStory = () => {
    const form = formRef.current as Form;

    fetch(`${BASE_URL}/stories/update/${story.id}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: story.id,
        name: form.story_name.value,
        story: editorContent == "" ? story.story : editorContent,
      }),
    })
      .then(() => setOnModifyStory(false))
      .then(() => setRefresh(!refresh));
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
          <div className=" grid grid-cols-2 gap-2">
            <Dialog open={onDeleteStory} onOpenChange={setOnDeleteStory}>
              <DialogTrigger asChild>
                <Button
                  disabled={content.id != story.created_by[0].id}
                  className=" rounded p-1 w-full mt-2 bg-red-600! hover:bg-red-700! "
                >
                  Supprimer
                </Button>
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
            <Dialog open={onModifyStory} onOpenChange={setOnModifyStory}>
              <DialogTrigger asChild>
                <Button
                  disabled={content.id != story.created_by[0].id}
                  className=" rounded p-1 w-full mt-2 bg-blue-600! hover:bg-blue-700! "
                >
                  Modifier
                </Button>
              </DialogTrigger>
              <DialogContent className=" border-x-0 sm:border rounded-none sm:rounded-lg max-w-auto sm:p-6 p-0 py-2 lg:min-w-[1000px] sm:min-w-[95vw] bg-(--card) border-(--border)">
                <DialogHeader className=" ">
                  <DialogTitle>Modifies ton histoire</DialogTitle>
                  <DialogDescription>
                    Modifies ton histoire et enregistre la ici !
                  </DialogDescription>
                </DialogHeader>
                <form
                  ref={formRef}
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className="w-full mx-auto"
                >
                  <div className=" grid gap-4">
                    <div className=" grid gap-2 w-full p-2 max-w-[500px]">
                      <Label htmlFor="story_name">Nom de l'histoire</Label>
                      <Input
                        placeholder="Le petit prince"
                        id="story_name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <CustomEditor
                        value={editorContent}
                        onChange={handleEditorChange}
                        placeholder="Il était une fois..."
                        readOnly={false}
                        defaultValue={story.story}
                      />
                    </div>
                  </div>

                  <DialogFooter className=" p-2 mt-4 grid grid-cols-2 justify-center!">
                    <DialogClose asChild>
                      <Button>Annuler</Button>
                    </DialogClose>
                    <Button type="submit" onClick={modifyStory}>
                      Modifier
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      )}
      <div className=" italic px-2">Ecrite par {story.created_by[0].name}</div>
    </Card>
  );
}
