import React, { useEffect, useState } from "react";
import { UserContext, type ContentProps } from "./UserContext";

interface Props {
  children?: React.ReactNode;
}

const UserProvider: React.FC<Props> = ({ children }) => {
  const [content, setContent] = useState<ContentProps>({ name: "Lucc3" });

  function getContentFromLocalStorage() {
    const savedContent = localStorage.getItem("content");
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    } else {
      setContent({
        name: "Lucc3",
      });
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getContentFromLocalStorage();
  }, []);

  function editContentHandler(newContent: ContentProps) {
    setContent(() => {
      localStorage.setItem("content", JSON.stringify(newContent));
      return newContent;
    });
  }

  return (
    <UserContext.Provider
      value={{
        content: { name: content.name },
        editContent: editContentHandler,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
