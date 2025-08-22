import { useContext } from "react";
import { ConfigThemeContext } from "../context-provider/context";

const BackGroundCanvas = () => {
  const { theme } = useContext(ConfigThemeContext);

  return (
    <>
      <div>
        <canvas></canvas>
      </div>
    </>
  )
}

export default BackGroundCanvas