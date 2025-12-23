import React, { useEffect, useState } from "react";
import { UserContext, type ContentProps } from "./UserContext";

interface Props {
  children?: React.ReactNode;
}

const UserProvider: React.FC<Props> = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [content, setContent] = useState<ContentProps>({
    name: "Lucc3",
    id: 0,
    avatar_img: {
      hair: "short12",
      eyebrows: "variant01",
      eyes: "variant13",
      mouth: "variant15",
      skinColor: "ecad80",
      hairColor: "3eac2c",
    },
  });
  const [isLogged, setIsLogged] = useState(false);

  function getContentFromLocalStorage() {
    const savedContent = localStorage.getItem("content");
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    } else {
      setContent({
        name: "Lucc3",
        id: 0,
        avatar_img: {
          hair: "short12",
          eyebrows: "variant01",
          eyes: "variant13",
          mouth: "variant15",
          skinColor: "ecad80",
          hairColor: "3eac2c",
        },
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

  function isLoggedIn() {
    fetch(`${BASE_URL}/user/islogged`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.islogged) {
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      });
    return isLogged;
  }

  return (
    <UserContext.Provider
      value={{
        content: {
          name: content.name,
          id: content.id,
          avatar_img: content.avatar_img,
        },
        editContent: editContentHandler,
        isLoggedIn: isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
