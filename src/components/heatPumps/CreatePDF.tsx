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
        <Text style={styles.subTitle}>DOBÓR MOCY I ZAKRES USŁUG</Text>
        <View style={styles.eachRow}>
          <Text>WIELKOŚĆ POWIERZCHNI OGRZEWANEJ</Text>
          <Text style={styles.boldFont}>{heatPumpStore.heatedArea} m2</Text>
        </View>
        <View style={styles.eachRow}>
          <Text>WYSOKOŚĆ POMIESZCZEŃ</Text>
          <Text style={styles.boldFont}>{heatPumpStore.roomHeight} cm</Text>
        </View>
        <View style={styles.eachRow}>
          <Text>OSZACOWANE ZAPOTRZEBOWANIE NA CIEPŁO</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.suggestedPumpPower}
          </Text>
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
            {heatPumpStore.minimalWorkingTemp} °C
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>
            {heatPumpStore.buforType
              .split(" ")
              .slice(0, 3)
              .join(" ")
              .toUpperCase()}
          </Text>
          <Text style={styles.boldFont}>
            {heatPumpCalcStore.bufforCost !== 0
              ? heatPumpCalcStore.bufforCost
              : "NIE"}
          </Text>
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
          <Text>
            SCHEMAT {heatPumpStore.buforType.split(" ").slice(5, 6).join(" ")}
          </Text>
          <Text style={styles.boldFont}>TAK</Text>
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
        <Text style={styles.pageNum}>03</Text>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.pricingSection}>
        <Text style={styles.title}>OFERTA</Text>
        <Text style={styles.subTitle}>PRACE DODATKOWE</Text>
        <View style={styles.eachRow}>
          <Text>MONTAŻ KOLEJNEJ POMPY CIEPŁA W KASAKDZIE</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.isAnotherHeatPumpInCascade
              ? heatPumpCalcStore.montagePumpInCascadeCost
              : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>POSADADOWIENIE Z ROZSĄCZENIEM KONDENSATU</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.isPlacemnetWithBurst
              ? heatPumpCalcStore.placementWithBurstCost
              : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>PRZEWIERTY DO KOLEJNEGO POMIESZCZENIA</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.newDrillings
              ? heatPumpCalcStore.newDrillingsCost
              : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>INSTALACJA PO WIERZCHU W IZOLACJI Z WEŁNY MINERALNEJ</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.longerIsolationFromMineralWool
              ? heatPumpCalcStore.longerIsolationFromMineralWoolCost
              : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>RURA PREIZOLOWANA (W GRUNCIE)</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.isPreIsolatedPipe
              ? heatPumpStore.longerPreIsolatedPipe +
                "-" +
                heatPumpCalcStore.longerPreIsolatedPipeCost
              : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>MONTAŻ CYRKULACJI DO CWU</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.isMontageCirculationCWU
              ? heatPumpCalcStore.circulationMontageCost
              : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <View>
            <Text>DEMONTAŻ STAREGO KOTŁA BEZ WYNOSZENIA</Text>
            <Text>(WĘGLOWEGO, GROSZEK)</Text>
          </View>
          <Text style={styles.boldFont}>
            {heatPumpStore.demontageOldBoiler
              ? heatPumpCalcStore.demontageOldBoilerCost
              : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <View>
            <Text>PRZYGOTOWANIE POPRZEZ POSPRZĄTANIE MIEJSCA</Text>
            <Text>POSADOWIENIA ELEMENTÓW MASZYNOWNI</Text>
          </View>
          <Text style={styles.boldFont}>
            {heatPumpStore.cleanMontagePlacement
              ? heatPumpCalcStore.cleanPlacementCost
              : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>PRZENIESIENIE LUB DEMONTAŻ ZASOBNIKA CWU KLIENTA</Text>
          <Text style={styles.boldFont}>
            {heatPumpStore.moveCwu ? heatPumpCalcStore.moveCwuCost : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <View>
            <Text>SPIĘCIE BUFORA CO Z DODATKOWYM ŹRÓDŁEM</Text>
            <Text>GRZEWCZYM </Text>
          </View>
          <Text style={styles.boldFont}>
            {heatPumpStore.mergeNewBufforWithOld
              ? heatPumpCalcStore.buforWithSupportCost
              : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <View>
            <Text>ZAMKNIĘCIE UKŁADU OTWARTEGO</Text>
          </View>
          <Text style={styles.boldFont}>
            {heatPumpStore.closingOpenSytem
              ? heatPumpCalcStore.closeOpenedSystemCost
              : "NIE"}
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
        <Text style={styles.subTitle}>WYCENA INSTALACJI I DOTACJE</Text>
        <View style={styles.eachRow}>
          <Text>WARTOŚĆ NETTO</Text>
          <Text style={styles.boldFont}>
            {heatPumpCalcStore.heatPumpPricingBeforeDotations.netSystemValue}
            zł
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>PODATEK VAT {heatPumpStore.forCompany ? "23" : "8"}%</Text>
          <Text style={styles.boldFont}>
            {heatPumpCalcStore.heatPumpPricingBeforeDotations.vatValue}
            zł
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>WARTOŚĆ BRUTTO</Text>
          <Text style={styles.boldFont}>
            {heatPumpCalcStore.heatPumpPricingBeforeDotations.grossSystemValue}
            zł
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>CENA 1 RATY PRZED ODLICZENIEM DOTACJI</Text>
          <Text style={styles.boldFont}>
            {heatPumpCalcStore.loanForPurcharse.instalmentBeforeDotations}
            zł
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>ULGA TERMOMODERNIZACYJNA</Text>
          <Text style={styles.boldFont}>
            {heatPumpCalcStore.termoModernizationRelif}ZŁ
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#FEEB1A",
            borderBottomLeftRadius: "25%",
            borderTopRightRadius: "25%",
            marginTop: 3,
          }}
        >
          <View style={styles.eachRow}>
            <Text>SUMA DOTACJI</Text>
            <Text style={styles.boldFont}>
              {heatPumpCalcStore.heatStoreDotations.dotationSum} zł
            </Text>
          </View>
          <View style={{ fontSize: 12, paddingLeft: 12, paddingBottom: 12 }}>
            <Text></Text>
            <Text>
              DOTACJA POMPĘ CIEPŁA -{" "}
              {heatPumpCalcStore.heatStoreDotations.heatStoreDotationValue}
              zł
            </Text>
            <Text>
              DOTACJA NA MODERNIZACJE CO + CWU -{" "}
              {heatPumpCalcStore.heatStoreDotations.modernizationDotation} zł
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 150,
            marginRight: -300,
            backgroundColor: "#FEEB1A",
            borderBottomLeftRadius: "50%",
            padding: 22,
          }}
        >
          <Text style={{ fontSize: 12 }}>
            OSTATECZNY KOSZT INSTALACJI PO DOFINANSOWANIU:
          </Text>
          <Text style={{ fontSize: 50, marginTop: 4 }}>
            {heatPumpCalcStore.finallGrossInstalationCost} zł
          </Text>
          <Text style={{ fontSize: 12, marginLeft: 10 }}>DOSTĘPNE:</Text>
          <Text style={{ fontSize: 12, marginLeft: 10 }}>
            {heatPumpStore.installmentNumber} RAT W WYSOKOŚCI{" "}
            <Text style={styles.boldFont}>
              {heatPumpCalcStore.loanForPurcharse.finallInstalmentPice} zł
            </Text>
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
