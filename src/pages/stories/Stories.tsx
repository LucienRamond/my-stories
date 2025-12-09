import Page from "@/components/ui/page";
import { useEffect, useRef, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CustomEditor from "./CustomEditor";
import parse from "html-react-parser";

type StoryType = {
  id: number;
  name: string;
  story: string;
};

interface Form extends HTMLFormElement {
  story_name: HTMLInputElement;
  story_story: HTMLInputElement;
}

export default function Stories() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [stories, setStories] = useState<StoryType[]>([]);
  const [onDeleteStory, setOnDeleteStory] = useState(false);
  const [onCreateStory, setOnCreateStory] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [message, setMessage] = useState<string>("");
  const formRef = useRef<Form>(null);

  const [formData, setFormData] = useState<StoryType>({
    id: 0,
    name: "",
    story: "",
  });

  useEffect(() => {
    fetch(`${BASE_URL}/stories`)
      .then((response) => response.json())
      .then((data) => setStories(data));
  }, [BASE_URL]);

  const deleteStory = (story_id: number) => {
    fetch(`${BASE_URL}/stories/delete/${story_id}`, {
      method: "DELETE",
    }).then(() => setOnDeleteStory(false));
  };

  const postStory = () => {
    const form = formRef.current as Form;

    fetch(`${BASE_URL}/stories/create`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.story_name.value,
        story: editorContent,
      }),
    }).then((response) => setMessage(JSON.stringify(response)));
    console.log(message);
    setFormData({
      id: 0,
      name: "",
      story: "",
    });
    setOnCreateStory(false);
  };

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  return (
    <Page>
      <Dialog open={onCreateStory} onOpenChange={setOnCreateStory}>
        <DialogTrigger className=" mx-auto mb-4 w-[300px]" asChild>
          <Button variant="outline">Ecrire une histoire</Button>
        </DialogTrigger>
        <DialogContent className=" border-x-0 sm:border rounded-none sm:rounded-lg max-w-auto sm:p-6 p-0 py-2 lg:min-w-[1000px] sm:min-w-[95vw] bg-(--card) border-(--border)">
          <DialogHeader className=" ">
            <DialogTitle>Ecris une histoire</DialogTitle>
            <DialogDescription>
              Ecris ton histoire et enregistre la ici !
            </DialogDescription>
          </DialogHeader>
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              postStory();
            }}
            className="w-full mx-auto"
          >
            <div className=" grid gap-4">
              <div className=" grid gap-2 w-full p-2 max-w-[500px]">
                <Label htmlFor="story_name">Nom de l'histoire</Label>
                <Input
                  placeholder="Le petit prince"
                  id="story_name"
                  value={formData?.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <CustomEditor
                  value={formData?.story}
                  onChange={handleEditorChange}
                  placeholder="Il était une fois..."
                  readOnly={false}
                />
              </div>
            </div>

            <DialogFooter className=" p-2 mt-4 grid grid-cols-2 justify-center!">
              <DialogClose asChild>
                <Button>Annuler</Button>
              </DialogClose>
              <Button type="submit">Enregister</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className=" mx-4 max-w-[1400px] min-w-[1000px] grid gap-4">
        {stories.map((story: StoryType) => {
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
                          {/* Supprime le dernier de la liste ????? */}
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
            </Card>
          );
        })}
      </div>
    </Page>
  );
}
