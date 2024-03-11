import { lazy } from "react";

export const Preview = lazy(() => import("./Preview"));
export const PhotovoltaicFormulas = lazy(
  () => import("./PhotovoltaicFormulas")
);

export const PhotovoltaicMutations = lazy(
  () => import("./PhotovoltaicMutations")
);
