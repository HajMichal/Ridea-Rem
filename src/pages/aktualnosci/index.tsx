import React, { useEffect } from "react";
import { ScrollArea } from "@mantine/core";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const SideBar = dynamic(() => import("~/components/SideBar"));
const Navbar = dynamic(() => import("~/components/navbar/Navbar"));
const CreateNewPost = dynamic(
  () => import("~/components/newsPageComponent/CreateNewPost")
);
const NewsContent = dynamic(
  () => import("~/components/newsPageComponent/NewsContent")
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
      <SideBar />
      <div className="w-full">
        <Navbar />
        <ScrollArea h={"88%"}>
          {status === "authenticated" && (
            <>
              <CreateNewPost role={sessionData.user.role} />
              {imagesData && (
                <NewsContent
                  isLoading={isLoading}
                  imagesData={imagesData}
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
