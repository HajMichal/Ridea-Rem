import { Loader } from "@mantine/core";

interface LoadingType {
  isDownloading?: boolean;
}
export const Loading = ({ isDownloading = false }: LoadingType) => {
  return (
    <div
      className={`absolute z-[9999] flex items-center justify-center text-brand ${
        !isDownloading && "h-full"
      }`}
    >
      {isDownloading ? (
        "POBIERANIE..."
      ) : (
        <Loader color="yellow" size="xl" variant="dots" />
      )}
    </div>
  );
};
