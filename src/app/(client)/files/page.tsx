import "./index.scss";
import Image from "next/image";

const Index = () => {
  return (
    <>
      <header className="full">放入文件内容</header>
      <nav className="flex flex-wrap">
        <div className="photo_nav">
          <div className="title">预览图片</div>
          <div className="photo-container">
            <img alt="无法加载该图片" className="photo" src="/imgs/38.jpg" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Index;
