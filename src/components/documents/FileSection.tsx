import React from "react";
import { api } from "~/utils/api";
import { Loading } from "../Loading";
import { ScrollArea } from "@mantine/core";
import { EachFileCard } from "./EachFileCard";

interface FileSectionType {
  userRole: number | undefined;
}

export const FileSection = ({ userRole }: FileSectionType): React.ReactNode => {
  const { data, isLoading } = api.getAllDocumentRouter.uploadFile.useQuery();

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center">
          <Loading />
        </div>
      ) : (
        <ScrollArea
          h={userRole === 1 ? "80%" : "85%"}
          className={userRole === 1 ? "mt-20" : "mt-5"}
        >
          <div className="flex justify-center">
            <div className="flex w-[80%] flex-wrap justify-center  gap-28 p-10">
              {data?.map((file, index) => {
                return <EachFileCard fileName={file} key={index} />;
              })}
            </div>
          </div>
        </ScrollArea>
      )}
    </>
  );
};
