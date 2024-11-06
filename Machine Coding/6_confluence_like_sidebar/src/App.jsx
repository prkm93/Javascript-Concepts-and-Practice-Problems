import './App.css';
import DATA from './data';
import SidebarTree from './SidebarTree';

function App() {
  return (
    <>
      <SidebarTree nodes={DATA} />
    </>
  );
}

export default App;
