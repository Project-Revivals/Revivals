import React, { useState, useContext } from "react";
import { SocketContext } from "../../providers/SocketProvider";

// websocketを試しに使ってみるためのコンポーネント
export default function SocketTest(){
    const {
        socketRef,
        messages,
        addMessage
    } = useContext(SocketContext);

    const [text, setText] = useState<string>("");

    // 他ユーザーにmessageを送信する関数
    function sendMessage(message: string): void{
        const socketInstance = socketRef.current;
        if(!socketInstance) return;
        socketInstance.emit("sendMessage", message); // 他ユーザーに送信
        const myMessage: string = `You: ${message}`;
        addMessage(myMessage); // 自分の画面に追加
    }

    // input要素のvalueを、他ユーザーにmessageとして送信する関数
    function handleSendButton(): void{
        sendMessage(text);
        setText(""); // ボタンがクリックされたらテキストをクリア
    }

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
                onClick={handleSendButton}
            >
                送信
            </button>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>
                        <span>{message}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
};