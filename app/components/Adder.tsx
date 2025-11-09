import { useState } from "react";

const AdderDisplay: React.FC<{ x: string, y: string }> = ({ x, y }) => {
  console.debug("AdderDisplay");
  return <div>{x + y}</div>
}

const Adder: React.FC = () => {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  console.debug("Adder");
  return <form>
    <div>x: <input value={x} onChange={event => setX(event.target.value)} /></div>
    <div>y: <input value={y} onChange={event => setY(event.target.value)} /></div>
    <div><AdderDisplay x={x} y={y} /></div>
  </form>
}

export default Adder
// so this does not reload root and globalLayout
