import Image, { StaticImageData } from "next/image";
import { classNameMerged } from "@/utils/utils";
import "./index.scss";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { RotateAnimation } from "./hook";
import { ConfigTemeContext } from "../context-provider/context";

interface ImageCardProps {
  alt: string;
  src: string | StaticImageData;
  style?: React.CSSProperties;
  className?: string;
  imageclassName?: string;
}

const ImageCard = (props: ImageCardProps) => {
  const { style, className, imageclassName, ...rest } = props || {};
  const { theme } = useContext(ConfigTemeContext);
  const refDiv = useRef<null | HTMLDivElement>(null);
  const [rotateAnimation, setRotateAnimation] =
    useState<null | RotateAnimation<HTMLElement>>(null);
  const ImageClass = "object-cover";

  useEffect(() => {
    if (refDiv.current && !rotateAnimation) {
      setRotateAnimation(new RotateAnimation(refDiv, 10));
    }
  }, [refDiv, rotateAnimation]);

  const divClass = useMemo(()=> {
    return classNameMerged('image-card', className);
  }, [className, theme])

  return (
    <>
      <div style={{...style}} className={divClass}>
        <div style={{ width: "100%", height: "100%", position: 'relative' }} ref={refDiv}>
          <Image
            fill
            {...rest}
            alt={props.alt ?? ""}
            className={classNameMerged(ImageClass, imageclassName)}
          />
        </div>
      </div>
    </>
  );
};

export default ImageCard;
