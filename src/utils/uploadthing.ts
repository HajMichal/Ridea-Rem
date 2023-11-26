import { generateComponents } from "@uploadthing/react";

import type { OurFileRouter } from "~/server/uploadthing";
import { generateReactHelpers } from "@uploadthing/react/hooks";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();

export const { useUploadThing } = generateReactHelpers<OurFileRouter>();
