import dynamic from "next/dynamic";

// desabilitando SSR pois evita problemas de pre-renderização (canva element não pode ser renderizado no servidor)
const App = dynamic(() => import("./App"), { ssr: false });

export default App;
