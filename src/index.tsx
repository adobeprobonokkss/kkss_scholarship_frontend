import React from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "@spectrum-web-components/theme/src/themes.js";
import { Theme } from "@swc-react/theme";
import App from "./App";
import "./index.css";

const firebaseConfig = {
  apiKey: "AIzaSyCpuU7tJgSciOLdUB-fVJsRaSpDRD72NJs",
  authDomain: "kkss-5a230.firebaseapp.com",
  projectId: "kkss-5a230",
  storageBucket: "kkss-5a230.appspot.com",
  messagingSenderId: "578642137246",
  appId: "1:578642137246:web:da939c030664ab4c00eb8f",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Theme theme="spectrum" scale="medium" color="light">
      <App />
    </Theme>
  </React.StrictMode>
);
