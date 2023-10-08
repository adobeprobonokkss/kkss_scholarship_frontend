import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/theme/src/themes.js";
import "./index.css";
const [React, ReactDOM] = await Promise.all([
  import("react"),
  import("react-dom/client"),
]);
const { Suspense, lazy } = await import("react");
const App = lazy(() => import("./App"));

export var db: any;

const Index = async () => {
  const { initializeApp } = await import("firebase/app");
  const { getFirestore } = await import("firebase/firestore");
  const { Theme } = await import("@swc-react/theme");

  const firebaseConfig = {
    apiKey: "AIzaSyCpuU7tJgSciOLdUB-fVJsRaSpDRD72NJs",
    authDomain: "kkss-5a230.firebaseapp.com",
    projectId: "kkss-5a230",
    storageBucket: "kkss-5a230.appspot.com",
    messagingSenderId: "578642137246",
    appId: "1:578642137246:web:da939c030664ab4c00eb8f",
  };

  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <Theme theme="spectrum" scale="medium" color="light">
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </Theme>
    </React.StrictMode>
  );
};

Index();
