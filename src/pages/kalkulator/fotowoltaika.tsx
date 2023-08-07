import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

const Fotowoltaika = () => {
  const [southRoof, setSouthRoof] = useState(false);
  const [usageLimit, setUsageLimit] = useState<number>(2000);
  const [prizeInLimit, setPrizeInLimit] = useState<number>();
  const [prizeOutOfLimit, setPrizeOutOfLimit] = useState<number>();
  const [recentYearTrendUsage, setRecentYearTrendUsage] = useState<number>();
  const [autoconsumption_step, setAutoconsumption_step] = useState<number>(0.1); // stopien autokonsupcji w procentach (ex: 0.3)

  const { data: sessionData } = useSession();
  const router = useRouter();

  // const { mutate } = api.dataFlow.setJSONFile.useMutation();
  // api.dataFlow.downloadFile.useQuery();

  const { mutate: set_limit_prize_trend, data: limit_prize_trend } =
    api.photovoltaics.prize_trend.useMutation();
  const { mutate: set_outOfLimit_prize_trend, data: outOfLimit_prize_trend } =
    api.photovoltaics.prize_trend.useMutation();
  const { mutate: set_system_power, data: system_power } =
    api.photovoltaics.system_power.useMutation();
  const { mutate: set_estimated_kWh_prod, data: estimated_kWh_prod } =
    api.photovoltaics.estimated_kWh_production.useMutation();
  const { mutate: set_autoconsumption, data: autoconsumption } =
    api.photovoltaics.autoconsumption.useMutation();
  const {
    mutate: set_total_payment_energy_transfer,
    data: total_payment_energy_transfer,
  } = api.photovoltaics.total_payment_energy_transfer.useMutation();

  useEffect(() => {
    if (sessionData === null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void router.push("/api/auth/signin");
    }
  }, [sessionData, router]);

  const hadnelClick = async () => {
    const response = await fetch("/api/saveS3JsonFile");
    const data = await response.json();
    console.log(data.response);
  };

  // D5 = C6 -> Ilość energii zużywanej średnio rocznie
  // D20 -> autokonsumpcja -> D18*D19 =
  //      D18 -> szacowana produkcja -> if(F9){ 1020 * C11 } esle if(!F9) {920 * C11}
  //          F9 -> Dach południowy (tak/nie)
  //          C11 -> moc systemu = E11 * (moc panela = 400) / 1000
  //                E11 -> ilość modułow (wybiera user)
  //      D19 -> stopien autokonspucji w %
  // D21 -> odsprzedana energia -> D18 - D20
  // D23 -> zgromadzone srodki na koncie rozliczeniowym -> D21 * (srednia cena sprzedazy kWh = 0.72)
  // H3 = E4 -> limit zuzycia
  // G3 = F3 = G2 * 49.1%
  // G4 = F4 = G3 * 49.1%

  // D13 -> Łączna opłata za przesył energii elektrycznej  if( (D5 - D20) > H3 ) { (G3 * H3) + (G4 * (D5 - D20 - H3)) } else { (D5 - D20) * G3 }

  useEffect(() => {
    if (system_power) {
      set_estimated_kWh_prod({
        southRoof: southRoof,
        system_power: system_power,
      });
    }
  }, [system_power, southRoof, set_estimated_kWh_prod]);

  useEffect(() => {
    if (autoconsumption_step && estimated_kWh_prod)
      set_autoconsumption({
        autoconsumption_step: autoconsumption_step,
        estimated_kWh_prod: estimated_kWh_prod,
      });
  }, [
    autoconsumption_step,
    estimated_kWh_prod,
    set_estimated_kWh_prod,
    set_autoconsumption,
  ]);

  useEffect(() => {
    if (
      autoconsumption &&
      prizeInLimit &&
      prizeOutOfLimit &&
      recentYearTrendUsage
    )
      set_total_payment_energy_transfer({
        autoconsumption: autoconsumption,
        prizeInLimit: prizeInLimit,
        prizeOutOfLimit: prizeOutOfLimit,
        recentYearTrendUsage: recentYearTrendUsage,
        usageLimit: usageLimit,
      });
  }, [
    autoconsumption,
    prizeInLimit,
    usageLimit,
    prizeOutOfLimit,
    recentYearTrendUsage,
    set_autoconsumption,
    set_total_payment_energy_transfer,
  ]);

  const inLimitOnChange = useCallback(
    (e: { target: { valueAsNumber: number } }) => {
      set_limit_prize_trend(e.target.valueAsNumber);
      setPrizeInLimit(e.target.valueAsNumber);
    },
    [set_limit_prize_trend]
  );
  const outOfLimitOnChange = useCallback(
    (e: { target: { valueAsNumber: number } }) => {
      set_outOfLimit_prize_trend(e.target.valueAsNumber);
      setPrizeOutOfLimit(e.target.valueAsNumber);
    },
    [set_outOfLimit_prize_trend]
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 text-white">
        <button className="text-white" onClick={() => hadnelClick()}>
          TEST
        </button>
        <div>
          <label className="font-bold">Cena energii</label>
          <div className="my-1 flex gap-1">
            <input
              type="number"
              className="text-black"
              onBlur={inLimitOnChange}
            />
            <p>w limicie (G2)</p>
          </div>
          <div className="my-1 flex gap-1">
            <input
              type="number"
              className="text-black"
              onBlur={outOfLimitOnChange}
            />
            <p>poza limitem(G3)</p>
          </div>
        </div>

        <div>
          <label className="font-bold">Cena prądu w limicie kWh</label>
          <div className="flex gap-1">
            <p>{limit_prize_trend}</p>
            <p>PLN/kWh</p>
            <label>Limit zużycia (E4)</label>
            <select
              className="text-black"
              onChange={(e) => {
                setUsageLimit(Number(e.target.value));
              }}
            >
              <option value="2000">2000</option>
              <option value="2600">2600</option>
              <option value="3000">3000</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3">
          <p>cena prądu po przekroczeniu 2000kWh: </p>
          <p>{outOfLimit_prize_trend}</p>
          <p>PLN/kWh</p>
        </div>
        <div>
          <p>Ilość energii zużywanej średnio rocznie w kWh (C6)</p>
          <input
            type="number"
            onBlur={(e) => {
              setRecentYearTrendUsage(e.target.valueAsNumber);
            }}
            className="text-black"
          />
        </div>
        <div>
          <p>Ilość modułów (E11)</p>
          <input
            type="number"
            onBlur={(e) => set_system_power(e.target.valueAsNumber)}
            className="text-black"
          />
        </div>
        <div>
          <p>Stopień autokonsumpcji energii z PV (H6)</p>
          <select
            className="text-black"
            onChange={(e) => {
              setAutoconsumption_step(Number(e.target.value));
            }}
          >
            <option value="0.1">10%</option>
            <option value="0.2">20%</option>
            <option value="0.3">30%</option>
            <option value="0.4">40%</option>
            <option value="0.5">50%</option>
            <option value="0.6">60%</option>
            <option value="0.7">70%</option>
            <option value="0.8">80%</option>
          </select>
        </div>
        <div className="flex gap-2">
          <label htmlFor="">Dach południowy (F9)</label>
          <select
            className="text-black"
            onChange={(e) => setSouthRoof(e.target.value == "true")}
          >
            <option value={"false"}>Nie</option>
            <option value={"true"}>Tak</option>
          </select>
        </div>
        <div>
          Łączna opłata za przesył energii elektrycznej{" "}
          {total_payment_energy_transfer} PLN
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AuthShowcase />
      </div>
    </main>
  );
};

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}

export default Fotowoltaika;
