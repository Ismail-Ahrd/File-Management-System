import {NextUIProvider} from "@nextui-org/react";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FileFolderProvider } from "./contexts/FileFolderContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <AuthProvider>
          <FileFolderProvider>
            <App />
          </FileFolderProvider>
        </AuthProvider>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>,
)
