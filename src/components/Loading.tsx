import { Loader } from "@mantine/core";
import React from "react";

export const Loading = () => {
  return (
    <div className="flex w-full justify-center">
      <Loader color="yellow" size="xl" variant="dots" />
    </div>
  );
};
