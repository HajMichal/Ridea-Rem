import { Loader } from "@mantine/core";
import React from "react";

export const Loading = () => {
  return (
    <div className="absolute z-[9999] flex h-full w-full items-center justify-center">
      <Loader color="yellow" size="xl" variant="dots" />
    </div>
  );
};
