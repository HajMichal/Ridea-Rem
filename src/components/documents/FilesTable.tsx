import { Text } from "@mantine/core";
import { EachFileCard } from "./EachFileCard";

interface FilesTableType {
  title: string;
  files: string[];
  userRole: number | undefined;
}

export const FilesTable = ({ title, files, userRole }: FilesTableType) => {
  return (
    <div className="flex flex-wrap justify-center">
      <Text size="xl" className="w-full pt-5 text-center text-3xl text-dark">
        {title}
      </Text>
      <div className="flex w-[80%] flex-wrap justify-center  gap-28 p-10">
        {files?.map((file, index) => {
          return (
            <EachFileCard fileName={file} userRole={userRole} key={index} />
          );
        })}
      </div>
    </div>
  );
};
