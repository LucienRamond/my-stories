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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useContext, useState } from "react";
import { UserContext } from "../providers/UserContext";

export type DrawingType = {
  id: number;
  name: string;
  img_name: string;
  description: string;
};

export default function Drawing({
  drawing,
  setRefresh,
  refresh,
}: {
  drawing: DrawingType;
  setRefresh: (e: boolean) => void;
  refresh: boolean;
}) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [onDeleteDrawing, setOnDeleteDrawing] = useState(false);
  const { isLoggedIn } = useContext(UserContext);

  const deleteDrawing = (drawing_id: number) => {
    fetch(`${BASE_URL}/drawings/delete/${drawing_id}`, {
      credentials: "include",
      method: "DELETE",
    }).then(() => setRefresh(!refresh));
  };

  return (
    <Card
      key={drawing.id}
      className=" w-full grid grid-rows-[fit-content_fit_content_fit-content] border-(--border) hover:border-(--card-foreground)"
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
          {isLoggedIn() && (
            <Dialog open={onDeleteDrawing} onOpenChange={setOnDeleteDrawing}>
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
                      onClick={() => {
                        deleteDrawing(drawing.id);
                      }}
                      className="bg-red-600! hover:bg-red-700!"
                    >
                      Confirmer
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
