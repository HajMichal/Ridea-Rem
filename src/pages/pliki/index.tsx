import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SideBar } from "~/components/LazyLoading";
import { Navbar } from "~/components";
import { FileUploader, FileSection } from "~/components/documents/";
import { Toaster } from "react-hot-toast";

const Pliki = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const userRole = sessionData?.user.role;
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
        {userRole === 1 && <FileUploader />}
        <FileSection userRole={userRole} />
      </div>
    </main>
  );
};

export default Pliki;
