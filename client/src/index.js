import React from 'react'
import { createRoot } from "react-dom/client";
import Login from './page/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './css/backgroud.css'

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
