import { useContext } from "react";
import { ConfigTemeContext } from "../context-provider/context";

const BackGroundCanvas = () => {
  const { theme } = useContext(ConfigTemeContext);

  return (
    <>
      <div>
        <canvas></canvas>
      </div>
    </>
  )
}

export default BackGroundCanvas