import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Navbar, SideBar } from "~/components";
import { FileUploader, FileSection } from "~/components/documents/";
import { Toaster } from "react-hot-toast";

const Pliki = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") void router.push("/auth/signin");
  }, [status, router]);

  const userRole = sessionData?.user.role;

  return (
    <main className="flex h-full max-h-screen justify-center overflow-hidden bg-backgroundGray font-orkney">
      <Toaster />
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
