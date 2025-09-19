import Image from "next/image";
import test1 from "@/public/imgs/竖屏test.jpg";


interface ISwitchPhototsProps{
  files: File[];
}

const SwitchPhotots = (props: ISwitchPhototsProps) => {


  return (
    <div className="w-full flex flex-wrap">
      {/* {
        Array.from(props.files, (file: File, index) =>{
          const fileName = file?.name || '';
          return (
            <div className="w-[20.75rem] h-[27rem] flex flex-col mx-[0.25rem]" key={index} data-index = {index}>
              <div onBlur={(evt)=>{
                console.log(evt.target.textContent)
              }} className="w-full h-[3rem] text-center leading-[3rem] text-[1.5rem] overflow-auto mb-[0.5rem]" contentEditable >
                {fileName}
              </div>
              <div className="w-full flex-1 h-[calc(100%-4.5rem)]">
                <Image className="w-full max-h-full rounded-[30px]" alt="" src={test1}/>
              </div>
            </div>
          )
        })
      } */}
      <div className="w-[20.75rem] h-[27rem] flex flex-col mx-[0.25rem]" key={0} data-index = {0}>
        <div onBlur={(event)=>{console.log(event.target.textContent)}} className="w-full h-[3rem] text-center leading-[3rem] text-[1.5rem] overflow-auto my-[0.25rem]" contentEditable ></div>
        <div className="w-full flex-1 h-[calc(100%-4.5rem)]">
          <Image className="w-full max-h-full rounded-[30px]" alt="" src={test1}/>
        </div>
      </div>

      <div className="w-[20.75rem] h-[27rem] flex flex-col mx-[0.25rem]" key={0} data-index = {0}>
        <div className="w-full h-[3rem] text-center leading-[3rem] text-[1.5rem] overflow-auto mb-[0.5rem]" contentEditable />
        <div className="w-full flex-1 h-[calc(100%-4.5rem)]">
          <Image className="w-full max-h-full rounded-[30px]" alt="" src={test1}/>
        </div>
      </div>

    </div>
  )
}

export default SwitchPhotots