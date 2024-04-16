import React from "react";
import { api } from "~/utils/api";
import { Loading } from "../Loading";
import { ScrollArea } from "@mantine/core";
import { FilesTable } from "./FilesTable";

interface FileSectionType {
  userRole: number | undefined;
}

export const FileSection = ({ userRole }: FileSectionType): React.ReactNode => {
  const {
    data: documentsFiles,
    isLoading,
    isSuccess: isDocumentSuccess,
  } = api.getAllDocumentRouter.getAllFiles.useQuery("documents");
  const { data: specificationFiles, isSuccess: isSpecificationSuccess } =
    api.getAllDocumentRouter.getAllFiles.useQuery("specification");
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
          {isDocumentSuccess && documentsFiles.length > 0 && (
            <FilesTable
              files={documentsFiles}
              title="DOKUMENTACJE"
              userRole={userRole}
            />
          )}
          {isSpecificationSuccess && specificationFiles.length > 0 && (
            <FilesTable
              files={specificationFiles}
              title="SPECYFIKACJE"
              userRole={userRole}
            />
          )}
        </ScrollArea>
      )}
    </>
  );
};
