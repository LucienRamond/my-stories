import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonalIcon } from "lucide-react";
import { useEffect, useState } from "react";

type MessageType = {
  message: string;
  sender_id: number;
  recipient_id: number;
  timestamp: string;
};

export default function Conversation({
  sender_id,
  recipient_id,
}: {
  sender_id: number;
  recipient_id: number;
}) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [onSendingMessage, setOnSendingMessage] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${BASE_URL}/messages/${sender_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipient_id: recipient_id,
      }),
    })
      .then((response) => response.json())
      .then((res) => setMessages(res));
  }, [BASE_URL, recipient_id, sender_id, onSendingMessage]);

  const send_new_message = (message: string) => {
    setOnSendingMessage(true);
    fetch(`${BASE_URL}/messages/create/${sender_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        recipient_id: recipient_id,
      }),
    }).then(() => {
      setNewMessage("");
      setOnSendingMessage(false);
    });
  };

  return (
    <div className=" p-2 min-h-[500px] grid items-end gap-2 grid-rows-[1fr_max-content]">
      <div className=" grid gap-4">
        {messages.map((message) => {
          return (
            <div
              key={message.timestamp}
              className={` py-1 px-2 rounded-xl w-fit ${
                message.sender_id == sender_id
                  ? "bg-blue-500 ml-auto"
                  : "bg-(--secondary)"
              }`}
            >
              {message.message}
            </div>
          );
        })}
      </div>
      <div className=" flex gap-2">
        <Input
          value={newMessage}
          onChange={(message) => setNewMessage(message.target.value)}
          className=" text-black border border-(--border) bg-white "
        />
        <Button onClick={() => send_new_message(newMessage)}>
          <SendHorizonalIcon />
        </Button>
      </div>
    </div>
  );
}
