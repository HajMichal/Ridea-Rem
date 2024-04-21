import React, { useEffect } from "react";
import { ScrollArea } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { NewsContent } from "~/components/newsPageComponent/NewsContent";
import dynamic from "next/dynamic";

const SideBar = dynamic(() => import("~/components/SideBar"));
const Navbar = dynamic(() => import("~/components/Navbar/Navbar"));
const CreateNewPost = dynamic(
  () => import("~/components/newsPageComponent/CreateNewPost")
);

const Aktualnosci = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();

  const { data: imagesData, isLoading } =
    api.newsDataRouter.getLastPosts.useQuery();

  useEffect(() => {
    if (status === "unauthenticated") void router.push("/auth/signin");
  }, [sessionData, router]);

  return (
    <main className="flex h-full max-h-screen justify-center overflow-hidden bg-backgroundGray font-orkney">
      <Toaster />
      <SideBar />
      <div className="w-full">
        <Navbar />
        <ScrollArea h={"88%"}>
          {status === "authenticated" && (
            <>
              <CreateNewPost role={sessionData.user.role} />
              {imagesData && (
                <NewsContent
                  imagesData={imagesData}
                  isLoading={isLoading}
                  role={sessionData.user.role}
                />
              )}
            </>
          )}
        </ScrollArea>
      </div>
    </main>
  );
};
export default Aktualnosci;
