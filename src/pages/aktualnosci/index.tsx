import React, { useEffect, lazy } from "react";
import { Navbar, SideBar } from "~/components";
import { ScrollArea } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Content from "~/components/newsPageComponent/Content";

const CreateNewPost = lazy(
  () => import("~/components/newsPageComponent/CreateNewPost")
);

const Aktualnosci = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const { data: imagesData, isLoading } =
    api.newsDataRouter.getLastPosts.useQuery();

  useEffect(() => {
    if (sessionData === null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/auth/signin");
    }
  }, [sessionData, router]);

  return (
    <main className="flex h-full max-h-screen justify-center overflow-hidden bg-backgroundGray font-orkney">
      <Toaster />
      <SideBar />
      <div className="w-full">
        <Navbar />
        <ScrollArea h={"88%"}>
          {sessionData?.user && <CreateNewPost role={sessionData.user.role} />}
          {imagesData && sessionData?.user && (
            <Content
              imagesData={imagesData}
              isLoading={isLoading}
              role={sessionData.user.role}
            />
          )}
        </ScrollArea>
      </div>
    </main>
  );
};
export default Aktualnosci;
