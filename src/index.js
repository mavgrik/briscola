import React from 'react'
import { createRoot } from "react-dom/client"
import Logged from './page/Logged'
import { BrowserRouter, Route, Routes} from 'react-router-dom'

const root = createRoot(document.getElementById("root"))

//TODO: Add home with section (profile settings, lobby, ecc...)
//TODO: Clean the code by separating file

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Logged/>}/>
          <Route path="*" element={<Logged/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
