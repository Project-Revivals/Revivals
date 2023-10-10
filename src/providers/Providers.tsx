import React from "react";
import { ReactNode } from "react";
import SocketProvider from "./SocketProvider";


export default function Providers({children}: {children: ReactNode}){
    return (
        <SocketProvider>
            {children}
        </SocketProvider>
    )
};