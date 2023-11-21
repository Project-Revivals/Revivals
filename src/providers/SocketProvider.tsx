import React, { useEffect, useState } from "react";
import { createContext, ReactNode, useContext, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from './../config/default';
import { ClientToServerEvents, Rooms, ServerToClientEvents } from "./../types/socketModels";


/* Provider定義 */
type Context = {
    socketRef: React.MutableRefObject<Socket<ServerToClientEvents, ClientToServerEvents> | null>;
    messages: string[];
    addMessage: (message: string) => void;
};

export const SocketContext = createContext<Context>({
    socketRef: {} as React.MutableRefObject<Socket<ServerToClientEvents, ClientToServerEvents> | null>,
    messages: [],
    addMessage: (message: string) => {}
});

// socketを管理するprovider
export default function SocketProvider({children}: {children: ReactNode}){
    /* useState等 */
    const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null); // socketインスタンス
    const [messages, setMessages] = useState<string[]>([]);
    const [roomIdList, setRoomIdList] = useState<string[]>([]);

    /* useEffect等 */
    useEffect(() => {
        // サーバーに接続する
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL);
        socketRef.current = socket;

        // サーバーへの接続を確認
        socket.on("connect", () => {
            if(socket.connected){
                console.log("サーバーに接続しました" + "\n" + `id: ${socket.id}`);
                socket.emit("getRooms"); // サーバー接続時、ルーム一覧を取得する
            }else{
                console.error("サーバーへの接続が失敗しました");
            };
        });

        // 他ユーザーからmessageを受け取ったら、画面にmessageを追加する
        socket.on("responseMessage", (message) => {
            console.log("送信しました\n"+message);
            addMessage(message);
        });


        /* ルーム関係の処理 */
        // ルーム一覧を取得した際、stateで管理する
        socket.on("getRooms", (newRoomIdList) => {
            setRoomIdList(newRoomIdList);
        });

        // クリーンアップ関数
        return () => {
            if(!socket) return;
            // コンポーネントがアンマウントされた際、socketから切断する
            socket.disconnect();
            socketRef.current = null;
            console.log("サーバーへの接続を切断しました");
        };
    }, []);

    /* 関数定義 */
    // 画面にmassageを追加する関数
    function addMessage(message: string): void{
        setMessages((prev) => [...prev, message]);
    }

    return (
        <SocketContext.Provider
            value={{
                socketRef,
                messages,
                addMessage
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};