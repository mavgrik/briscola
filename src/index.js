import React from 'react'
import { createRoot } from "react-dom/client"
import Logged from './page/Logged'
import { BrowserRouter, Route, Routes} from 'react-router-dom'

//TODO: Adapt css for mobile devices

const root = createRoot(document.getElementById("root"))

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
