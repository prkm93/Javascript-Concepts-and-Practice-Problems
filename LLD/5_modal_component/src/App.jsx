import { useState } from "react";
import Modal from "./component/Modal";
import "./App.css";

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  return (
    <div className="container">
      <button onClick={handleOpen}>Show modal</button>
      <Modal
        title="Modal"
        show={show}
        onClose={handleClose}
        onOpen={handleOpen}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus
        corporis ex molestias fuga culpa nesciunt optio eos tempora, deserunt,
        numquam accusamus vitae facere veritatis mollitia deleniti temporibus
        non sunt maxime.
      </Modal>
    </div>
  );
}

export default App;
