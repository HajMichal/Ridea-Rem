import "~/styles/globals.css";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { useIdle } from "@uidotdev/usehooks";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const idle = useIdle(600000);

  if (idle && router.pathname !== "/auth/signin")
    void signOut({
      redirect: false,
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}auth/signin`,
    });
  return (
    <>
      <Head>
        <title>IdeaRem - Kalkulator 🔢</title>
        <link rel="icon" href="/icons/logo_solo_white.svg" sizes="any" />
      </Head>
      <SessionProvider session={session}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Component {...pageProps} />
        </MantineProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
