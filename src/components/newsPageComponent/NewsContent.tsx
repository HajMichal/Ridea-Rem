import { Loader } from "@mantine/core";
import React from "react";
import { NewsCard } from "./NewsCard";

interface ImagesDataType {
  id: string;
  title: string;
  description: string;
  url: string;
}

interface ContentType {
  imagesData: ImagesDataType[];
  role: number;
  isLoading: boolean;
}

export default function NewsContent({
  isLoading,
  imagesData,
  role,
}: ContentType) {
  return (
    <div className="flex flex-1 flex-wrap justify-start gap-5 p-10">
      {isLoading ? (
        <div className="flex w-full justify-center">
          <Loader color="yellow" size="xl" variant="dots" />
        </div>
      ) : (
        imagesData.map((imgData) => {
          return (
            <NewsCard
              role={role}
              description={imgData.description}
              id={imgData.id}
              title={imgData.title}
              url={imgData.url}
              key={imgData.id}
            />
          );
        })
      )}
    </div>
  );
}
