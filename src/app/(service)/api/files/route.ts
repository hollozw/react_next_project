import fs from "fs";
import path from "path";

interface IReq {
  dir: string;
}
export async function POST(req: any) {
  const { dir }: IReq = await req.json();
  // const folderPath = path.join(process.cwd(), "public", "files"); // 文件夹路径

  try {
    const files = await fs.promises.readdir(dir);
    console.log(files, 'files');
    return new Response(JSON.stringify({ files }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "读取文件夹失败" }), {
      status: 500,
    });
  }
}
