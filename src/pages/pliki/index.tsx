import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import FileSection from "~/components/documents/FileSection";

const SideBar = dynamic(() => import("~/components/SideBar"));
const Navbar = dynamic(() => import("~/components/navbar/Navbar"));
const FileUploader = dynamic(
  () => import("~/components/documents/FileUploader")
);

const Pliki = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") void router.push("/auth/signin");
  }, [status, router]);

  const userRole = sessionData?.user.role;

  return (
    <main className="flex h-full max-h-screen justify-center overflow-hidden bg-backgroundGray font-orkney">
      <SideBar />
      <div className="w-full">
        <Navbar />
        {userRole === 1 && <FileUploader />}
        <FileSection userRole={userRole} />
      </div>
    </main>
  );
};

export default Pliki;
