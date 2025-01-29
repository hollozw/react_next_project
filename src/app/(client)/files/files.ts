// src/app/(client)/files/files.ts
export const getFiles = async (url: string) => {
  try {
    const response = await fetch(
      `/api/getFiles?directory=${encodeURIComponent(url)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch files");
    }
    const data = await response.json();
    return data.files;
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
};

// 使用示例
// getFiles("your-directory-path").then((files) => {
//   console.log("Files:", files);
// });
