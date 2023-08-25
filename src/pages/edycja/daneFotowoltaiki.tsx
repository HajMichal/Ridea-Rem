import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { Navbar } from "~/components/Navbar";
import { SideBar } from "~/components/SideBar";
import { NumberInput } from "@mantine/core";
import { type JsonFileData } from "../kalkulator/fotowoltaika";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const DaneFotowoltaiki = () => {
  const [inptValue, setInptValue] = useState<number>();
  const router = useRouter();
  const { data: sessionData } = useSession();

  const { data } = api.dataFlow.downloadFile.useQuery<JsonFileData>();

  const { mutate } = api.dataFlow.editJSONFile.useMutation();

  const handleIsDataAndValue = () => {
    if (data && inptValue) {
      data.kalkulator.dane.dwa = inptValue;
      console.log(data);
      mutate(data);
    }
  };
  console.log(data);

  useEffect(() => {
    if (sessionData?.user.role !== 1) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/");
    }
  }, [sessionData, router]);

  return (
    <div className="flex h-full min-h-screen justify-center bg-[#E8E7E7] font-orkney">
      <SideBar />

      <div className="w-full">
        <Navbar />
        <div className="flex items-end justify-center gap-5">
          <h2>Title - data name</h2>
          <NumberInput
            hideControls
            label={"Wpisz nową wartość"}
            onChange={(e) => {
              setInptValue(Number(e));
            }}
            placeholder={data && String(data.kalkulator.dane.dwa)}
          />
        </div>
        <button
          onClick={handleIsDataAndValue}
          className="rounded-xl bg-green-500 px-5 py-2 font-semibold"
        >
          Zatwierdź
        </button>
      </div>
    </div>
  );
};

export default DaneFotowoltaiki;
