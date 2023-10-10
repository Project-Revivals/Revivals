import { useState, useEffect } from "react";
import { useSockets } from "../../providers/SocketProvider";

// websocketを試しに使ってみるためのコンポーネント
export default function SocketTest(){
    const { socket } = useSockets();
    const [messages, setMessages] = useState<string[]>([]);
    const [text, setText] = useState<string>("");

    // 初回レンダリング時、socketのセットアップを行う
    useEffect(() => {
        socket.on("connect", () => {
            console.log(`connect: ${socket.connected}`);
        });

        socket.on("responseMessage", (message) => {
            console.log(message);
        });

        socket.emit("message", "hello world");
    }, []);

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(event) => {
                    const newText: string = event.target.value;
                    setText(newText);
                }}
            />
            <button
                onClick={() => {

                }}
            >
                送信
            </button>
            <ul>
                {messages.map()}
            </ul>
        </div>
    )
};