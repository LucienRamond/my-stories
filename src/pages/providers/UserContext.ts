import { createContext } from "react";

export type ContentProps = {
  name: string;
};

interface ContextProps {
  content: ContentProps;
  editContent: (arg0: ContentProps) => void;
}

export const UserContext = createContext<ContextProps>({
  content: {
    name: "Lucc3",
  },
  editContent: () => {},
});
