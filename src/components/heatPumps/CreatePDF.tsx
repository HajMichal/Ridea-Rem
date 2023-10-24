import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

import { type HeatPumpCalculations } from "~/store/heatPump/heatPumpCalculationSlice";
import { type HeatPumpSliceType } from "~/store/heatPump/heatPumpSlice";

Font.register({
  family: "Orkney",
  fonts: [
    { src: `${process.env.NEXT_PUBLIC_BASE_URL}/static/Orkney.otf` },
    {
      src: `${process.env.NEXT_PUBLIC_BASE_URL}/static/Orkneybold.otf`,
      fontWeight: 600,
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    fontFamily: "Orkney",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  pricingSection: {
    margin: 10,
    padding: 10,
    paddingLeft: 50,
    paddingTop: 50,
    flexGrow: 1,
  },
  image: {
    width: "auto",
    height: "auto",
  },
  title: {
    fontSize: 50,
    fontWeight: 600,
    fontFamily: "Orkney",
    marginTop: -30,
  },
  subTitle: {
    fontSize: 23,
    marginBottom: 10,
  },
  eachRow: {
    paddingHorizontal: 20,
    backgroundColor: "#FEEB1A",
    borderBottomLeftRadius: "50%",
    borderTopRightRadius: "50%",
    padding: 12,
    fontSize: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 3,
    flexDirection: "row",
  },
  priceRow: {
    paddingHorizontal: 20,
    backgroundColor: "#FEEB1A",
    borderBottomLeftRadius: "50%",
    borderTopRightRadius: "50%",
    padding: 10,
    fontSize: 12,
    display: "flex",
    width: "75%",
    marginVertical: 3,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 50,
  },
  paymentReturnTime: {
    paddingHorizontal: 20,
    backgroundColor: "#FEEB1A",
    borderBottomLeftRadius: "50%",
    borderTopRightRadius: "50%",
    padding: 10,
    fontSize: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "75%",
    marginVertical: 3,
    flexDirection: "row",
  },
  boldFont: {
    fontWeight: 600,
    fontFamily: "Orkney",
  },
  imageSection: {
    width: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logoImage: {
    width: 50,
    height: 50,
    marginTop: 50,
    marginLeft: 10,
  },
  signatureImage: {
    transform: "rotate(90deg)",
    width: 250,
    height: "auto",
    marginLeft: -90,
    marginTop: -310,
  },
  pageNum: {
    fontSize: 30,
    fontWeight: 600,
    marginBottom: 30,
    fontFamily: "Orkney",
    textAlign: "center",
  },
});

interface DataToPDF {
  heatPumpCalcStore: HeatPumpCalculations;
  heatPumpStore: HeatPumpSliceType["heatPumpStore"];
  cop?: number;
}

const HeatPumpDocument = ({
  heatPumpCalcStore,
  heatPumpStore,
  cop,
}: DataToPDF) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.pricingSection}>
        <Text style={styles.title}>OFERTA</Text>
        <Text style={styles.subTitle}>DOBÓR MOCY</Text>
        <View style={styles.eachRow}>
          <Text>WIELKOŚĆ POWIERZCHNI OGRZEWANEJ</Text>
          <Text style={styles.boldFont}>{heatPumpStore.heatedArea}</Text>
        </View>
        <View style={styles.eachRow}>
          <Text>KUBATURA</Text>
          <Text style={styles.boldFont}></Text>
        </View>
        <View style={styles.eachRow}>
          <Text>OSZACOWANE ZAPOTRZEBOWANIE NA CIEPŁO</Text>
          <Text style={styles.boldFont}></Text>
        </View>
        <View style={styles.eachRow}>
          <Text>PRZEWIDYWANE ROCZNE ZAPOTRZEBOWANI</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.yearlyHeatingUsage}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>ŚREDNIE SCOP POMPY CIEPŁA</Text>
          <Text style={styles.boldFont}>{cop}</Text>
        </View>
        <View style={styles.eachRow}>
          <Text>PRZEWIDYWANE ZUŻYCIE ENERGII PRZEZ POMPĘ</Text>
          <Text style={styles.boldFont}>
            {heatPumpCalcStore.heatingWithHeatPump.heatPumpUsage} kWh/rok
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>TEMPERATURA BIWALENTNA</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.minimalWorkingTemp}
          </Text>
        </View>
      </View>
      <View style={styles.imageSection}>
        <Image
          style={styles.logoImage}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/blackLogo.png`}
        />
        <Image
          style={styles.signatureImage}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/signatureIdeaRem.png`}
        />
        <Text style={styles.pageNum}>03</Text>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.pricingSection}>
        <Text style={styles.title}>OFERTA</Text>
        <Text style={styles.subTitle}>ZAKRES USŁUG</Text>
        <View style={styles.eachRow}>
          <Text>
            {heatPumpStore.buforType
              .split(" ")
              .slice(0, 3)
              .join(" ")
              .toUpperCase()}
          </Text>
          <Text style={styles.boldFont}></Text>
        </View>
        <View style={styles.eachRow}>
          <Text>POSADOWIENIE NA PODŁOŻU</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.isPumpPlacementOnCobblestone ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>DOSTAWA, MONTAŻ I URUCHOMIENIE POMPY</Text>
          <Text style={styles.boldFont}></Text>
        </View>
        <View style={styles.eachRow}>
          <Text>PRZEWIERT PRZEZ ŚCIANE I PRZYŁĄCZENIE BUFORA</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.makeEnergeticConnection ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>SCHEMAT 17</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.buforType.includes("17") ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>SCHEMAT 24 - ROZSZERZONY</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.buforType.includes("24") ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>SCHEMAT 34 - PEŁNY</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.buforType.includes("34") ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>MODUŁ STERUJĄCY LCD 8 CALI</Text>
          <Text style={styles.boldFont}>TAK</Text>
        </View>
        <View style={styles.eachRow}>
          <Text>PRZEDŁUŻONA GWARANCJA DO 8 LAT</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.isLongerGuarantee ? "TAK" : "NIE"}
          </Text>
        </View>
      </View>
      <View style={styles.imageSection}>
        <Image
          style={styles.logoImage}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/blackLogo.png`}
        />
        <Image
          style={styles.signatureImage}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/signatureIdeaRem.png`}
        />
        <Text style={styles.pageNum}>04</Text>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.pricingSection}>
        <Text style={styles.title}>OFERTA</Text>
        <Text style={styles.subTitle}>PRACE DODATKOWE</Text>
        <View style={styles.eachRow}>
          <Text>MONTAŻ KOLEJNEJ POMPY CIEPŁA W KASAKDZIE</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.isAnotherHeatPumpInCascade ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>POSADADOWIENIE Z ROZSĄCZENIEM KONDENSATU</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.isPlacemnetWithBurst ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>PRZEWIERTY DO KOLEJNEGO POMIESZCZENIA</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.newDrillings ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>INSTALACJA PO WIERZCHU W IZOLACJI Z WEŁNY MINERALNEJ</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.longerIsolationFromMineralWool ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>RURA PREIZOLOWANA (W GRUNCIE)</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.isPreIsolatedPipe ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>MONTAŻ CYRKULACJI DO CWU</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.isMontageCirculationCWU ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <View>
            <Text>DEMONTAŻ STAREGO KOTŁA BEZ WYNOSZENIA</Text>
            <Text>(WĘGLOWEGO, GROSZEK)</Text>
          </View>
          <Text style={styles.boldFont}>
            {heatPumpStore.demontageOldBoiler ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <View>
            <Text>PRZYGOTOWANIE POPRZEZ POSPRZĄTANIE MIEJSCA</Text>
            <Text>POSADOWIENIA ELEMENTÓW MASZYNOWNI</Text>
          </View>
          <Text style={styles.boldFont}>
            {heatPumpStore.cleanMontagePlacement ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>PRZENIESIENIE LUB DEMONTAŻ ZASOBNIKA CWU KLIENTA</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.moveCwu ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <View>
            <Text>SPIĘCIE BUFORA CO, Z DODATKOWYM ŹRÓDŁEM</Text>
            <Text>GRZEWCZYM (KOCIOŁ GAZOWY, BEZ WĘGLA ITP.) </Text>
          </View>
          <Text style={styles.boldFont}>
            {heatPumpStore.mergeNewBufforWithOld ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <View>
            <Text>ZAMKNIĘCIE UKŁADU OTWARTEGO (NIE ZAMYKAMY</Text>
            <Text>UKŁADÓW Z POZOSTAWIONYM KOTŁEM NA PALIWA STAŁE) </Text>
          </View>
          <Text style={styles.boldFont}>
            {heatPumpStore.closingOpenSytem ? "TAK" : "NIE"}
          </Text>
        </View>
      </View>
      <View style={styles.imageSection}>
        <Image
          style={styles.logoImage}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/blackLogo.png`}
        />
        <Image
          style={styles.signatureImage}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/signatureIdeaRem.png`}
        />
        <Text style={styles.pageNum}>05</Text>
      </View>
    </Page>
  </Document>
);

export default HeatPumpDocument;
