import Image from 'next/image'
import Image1 from '@/public/image/1.png'
import Image2 from '@/public/image/upload.png'

const DetailPhotos = ({ params }: any) => {
  const { id } = params || {}
  const imgSrc = [Image1, Image2][Number(id)]
  return (
    <>
      <Image src={imgSrc ?? ''} alt=""></Image>
    </>
  )
}

export default DetailPhotos