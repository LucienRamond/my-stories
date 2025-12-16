import Page from "@/components/ui/page";
import { useEffect, useState } from "react";
import Drawing, { type DrawingType } from "./Drawing";
import CreateDrawing from "./CreateDrawing";

export default function Drawings() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [drawings, setDrawings] = useState<DrawingType[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/drawings`)
      .then((response) => response.json())
      .then((data) => setDrawings(data));
  }, [BASE_URL, refresh]);

  return (
    <Page>
      <CreateDrawing refresh={refresh} setRefresh={setRefresh} />
      <div className=" sm:mx-4 mx-1 max-w-[1400px] grid xl:grid-cols-3 sm:grid-cols-2 gap-4">
        {drawings.map((drawing) => {
          return (
            <Drawing
              key={drawing.id}
              drawing={drawing}
              setRefresh={(state: boolean) => setRefresh(state)}
              refresh={refresh}
            />
          );
        })}
      </div>
    </Page>
  );
}
