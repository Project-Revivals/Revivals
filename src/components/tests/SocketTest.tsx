import React, { useState, useEffect } from "react";
import { useSockets } from "../../providers/SocketProvider";

// websocketを試しに使ってみるためのコンポーネント
export default function SocketTest(){
    const { socket } = useSockets();
    const [messages, setMessages] = useState<string[]>([]);
    const [text, setText] = useState<string>("");

    // コンポーネントが初回マウントされた際、socketに接続する
    useEffect(() => {
        // サーバーへの接続を確認
        socket.on("connect", () => {
            if(socket.connected){
                console.log("サーバーに接続しました" + "\n" + `id: ${socket.id}`);
            }else{
                console.error("サーバーへの接続が失敗しました");
            };
        });

        // 他ユーザーからmessageを受け取ったら、画面にmessageを追加する
        socket.on("responseMessage", (message) => {
            console.log(message);
            addMessage(message);
        });

        // クリーンアップ関数
        return () => {
            // コンポーネントがアンマウントされた際、socketから切断する
            socket.disconnect();
            console.log("サーバーへの接続を切断しました");
        };
    }, []);


    // 画面にmassageを追加する関数
    function addMessage(message: string): void{
        setMessages((prev) => [...prev, message]);
    }

    // 他ユーザーにmessageを送信する関数
    function sendMessage(message: string): void{
        socket.emit("sendMessage", message);
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