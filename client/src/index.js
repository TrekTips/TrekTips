import React from "react";
import { createRoot } from "react-dom/client";
import App from "../components/App.jsx";

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(<App />);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );