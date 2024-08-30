import Folder from "./Folder/Folder";
import { fileExplorer } from "./data/data";

function App() {
  return (
    <div>
      <Folder fileExplorer={fileExplorer} />
    </div>
  );
}

export default App;
