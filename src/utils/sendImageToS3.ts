import { type FileData } from "~/pages/aktualnosci";
export const sendImageToS3 = async (
  predesignedData: FileData | undefined,
  file: File | null
) => {
  if (predesignedData?.url && predesignedData?.fields && file) {
    const params = {
      ...predesignedData!.fields, // eslint-disable-line @typescript-eslint/no-unnecessary-type-assertion
      "Content-Type": file.type,
      file,
    };
    const formData = new FormData();
    for (const name in params) {
      formData.append(name, params[name as keyof typeof params]);
    }
    await fetch(predesignedData.url, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
};
