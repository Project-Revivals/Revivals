import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import Providers from "./providers/Providers";

const container = document.getElementById("root") as Element;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Providers>
            <App/>
        </Providers>
    </React.StrictMode>
);