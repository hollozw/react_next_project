interface IUploadFileParm {
  dir?: string;
  file?: File;
}

export const uploadFile = async ({ dir, file }: IUploadFileParm) => {
  try {
    const res = await fetch("/api/files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dir }), // 传递文件夹路径
    });
    // console.log(res, "res");
  } catch (error) {
    return "";
  }
};
