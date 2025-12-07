import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Page from "@/components/ui/page";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
type DrawingType = {
  id: number;
  name: string;
  img_name: string;
  description: string;
};

interface Form extends HTMLFormElement {
  img_name: HTMLInputElement;
  img_description: HTMLInputElement;
}

export default function Drawings() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [drawings, setDrawings] = useState<DrawingType[]>([]);
  const [message, setMessage] = useState<string>("");
  const [onUploadFile, setOnUploadFile] = useState(false);
  const [onDeleteDrawing, setOnDeleteDrawing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [newDrawing, setNewDrawing] = useState("");
  const formRef = useRef<Form>(null);
  const [formData, setFormData] = useState<DrawingType>({
    id: 0,
    name: "",
    img_name: "",
    description: "",
  });

  useEffect(() => {
    fetch(`${BASE_URL}/drawings`)
      .then((response) => response.json())
      .then((data) => setDrawings(data));
  }, [BASE_URL]);

  const uploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewDrawing(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };

  const postImg = () => {
    const form = formRef.current as Form;
    const img_file = new FormData();

    if (file) {
      img_file.append("file", file);
    }

    fetch(`${BASE_URL}/drawings/upload-img-data`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.img_name.value,
        description: form.img_description.value,
      }),
    }).then((response) =>
      response.json().then((file_id) => {
        fetch(`${BASE_URL}/drawings/upload-img-file/${file_id}`, {
          credentials: "include",
          method: "POST",
          mode: "no-cors",
          body: img_file,
        }).then((response) => setMessage(JSON.stringify(response)));
      })
    );
    console.log(message);

    setOnUploadFile(false);
  };

  const deleteDrawing = (drawing_id: number) => {
    fetch(`${BASE_URL}/drawings/delete/${drawing_id}`, {
      method: "DELETE",
    }).then(() => setOnDeleteDrawing(false));
  };

  return (
    <Page>
      <Dialog
        open={onUploadFile}
        onOpenChange={() => {
          setOnUploadFile(!onUploadFile);
          if (onUploadFile == false) {
            setFormData({
              id: 0,
              name: "",
              img_name: "",
              description: "",
            });
            setNewDrawing("");
          }
        }}
      >
        <DialogTrigger className=" mx-auto mb-4 w-[300px]" asChild>
          <Button variant="outline">Ajouter un dessin</Button>
        </DialogTrigger>
        <DialogContent className=" w-full bg-(--card) border-(--border)">
          <DialogHeader>
            <DialogTitle>Ajouter un dessin</DialogTitle>
            <DialogDescription>
              Prends en photo ton dessin et upload le ici !
            </DialogDescription>
          </DialogHeader>
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              postImg();
            }}
            className="w-full mx-auto"
          >
            <div className=" grid gap-4">
              <div className=" grid gap-1">
                <div className=" flex justify-center items-center h-[200px] border rounded bg-(--secondary)">
                  {newDrawing == "" ? (
                    <ImageIcon size={40} />
                  ) : (
                    <img
                      src={`${newDrawing}`}
                      className=" object-cover overflow-hidden h-full min-w-full"
                    />
                  )}
                </div>
                <Input
                  className=" hover:bg-(--secondary)"
                  type="file"
                  id="img_file"
                  onChange={(img) => uploadImg(img)}
                />
                <p className=" opacity-80 text-sm">
                  Fichiers acceptés : png, jpg, jpeg et gif
                </p>
              </div>

              <div className=" grid gap-2">
                <Label htmlFor="img_name">Nom du dessin</Label>
                <Input
                  placeholder="Among Us"
                  id="img_name"
                  value={formData?.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className=" grid gap-2">
                <Label htmlFor="img_description">Description du dessin</Label>
                <Textarea
                  placeholder="Il était une fois..."
                  maxLength={255}
                  className=" h-[150px] resize-none"
                  id="img_description"
                  value={formData?.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                <p className="opacity-80 text-sm">Maximum 255 caractères.</p>
              </div>
            </div>

            <DialogFooter className=" mt-4 grid grid-cols-2 justify-center!">
              <DialogClose asChild>
                <Button>Annuler</Button>
              </DialogClose>
              <Button type="submit">Enregister</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className=" mx-4 max-w-[1400px] grid xl:grid-cols-3 sm:grid-cols-2 gap-4">
        {drawings.map((drawing) => {
          return (
            <Card
              key={drawing.id}
              className="w-full grid grid-rows-[fit-content_fit_content_fit-content] border-(--border) hover:border-(--card-foreground)"
            >
              <CardHeader>
                <CardTitle>{drawing.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[300px] border-y border-(--border)">
                <img
                  className="object-cover h-full w-full"
                  src={`${BASE_URL}/drawings/${drawing.img_name}`}
                  alt="Image du projet"
                />
              </CardContent>
              <CardFooter className=" grid">
                <div>{drawing.description}</div>
                <div>
                  <Dialog
                    open={onDeleteDrawing}
                    onOpenChange={setOnDeleteDrawing}
                  >
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
                            onClick={() => deleteDrawing(drawing.id)}
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
