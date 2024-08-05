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
import { type AirConditionStore } from "~/store/airCondition/airConditionSlice";
import { type AirConditionCalculationStore } from "~/store/airCondition/airConditionCalculationSlice";

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
  image: {
    width: "auto",
    height: "auto",
  },
  boldFont: {
    fontWeight: 600,
    fontFamily: "Orkney",
  },
  logoImage: {
    width: 150,
    height: "auto",
    marginTop: 25,
    marginLeft: 10,
  },
  mainHeader: {
    width: "85%",
    height: 40,
    marginBottom: 10,
    marginTop: 30,
    backgroundColor: "#d1db5a",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainHeaderText: {
    fontSize: 22,
    color: "#FFF",
    fontWeight: 600,
    fontFamily: "Orkney",
    letterSpacing: 1.2,
    marginBottom: -10,
  },
  elementSection: {
    width: "85%",
    height: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -10,
    marginTop: 3,
  },
  elementName: {
    fontFamily: "Orkney",
    fontSize: 14,
  },
  elementValue: {
    fontFamily: "Orkney",
    fontWeight: 600,
    fontSize: 14,
  },
  montageEleName: {
    fontFamily: "Orkney",
    fontSize: 10,
    width: "90%",
  },
  montageEleValue: {
    fontFamily: "Orkney",
    fontWeight: 600,
    fontSize: 10,
  },
  centerContent: {
    display: "flex",
    justifyContent: "center",
    marginTop: 13,
    marginBottom: 5,
  },
  shortHeader: {
    marginBottom: 10,
    backgroundColor: "#d1db5a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
    height: 40,
    width: "85%",
  },
  shortHeaderText: {
    fontSize: 13,
    color: "#FFF",
    fontWeight: 600,
    fontFamily: "Orkney",
    letterSpacing: 1.2,
    marginBottom: -5,
  },
  eachCost: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  priceText: {
    fontWeight: 600,
    fontFamily: "Orkney",
    fontSize: 14,
  },
  pricingSection: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
  },
});

interface DataToPDF {
  airConditionStore: AirConditionStore;
  airConditionCalcStore: AirConditionCalculationStore;
}
const AirConditionDocument = ({
  airConditionStore,
  airConditionCalcStore,
}: DataToPDF) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image
        style={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/airCondition/airConditionFirstPage.png`}
      />
    </Page>
    <Page size="A4" style={styles.page}>
      <View
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Image
          style={styles.logoImage}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/logoprzyjazna.png`}
        />
        <View style={styles.mainHeader}>
          <Text style={styles.mainHeaderText}>DANE TECHNICZNE</Text>
        </View>
        <View style={styles.elementSection}>
          <Text style={styles.elementName}>TYP KLIMATYZATORA:</Text>
          <Text style={styles.elementValue}>
            {airConditionStore.choosedAirConditioner?.type}
          </Text>
        </View>
        <View style={styles.elementSection}>
          <Text style={styles.elementName}>MOC:</Text>
          <Text style={styles.elementValue}>
            {airConditionStore.choosedAirConditioner?.power} kW
          </Text>
        </View>
        <View style={styles.elementSection}>
          <Text style={styles.elementName}>OPCJA:</Text>
          <Text style={styles.elementValue}>
            {airConditionStore.choosedAirConditioner?.option}
          </Text>
        </View>
        <View style={styles.elementSection}>
          <Text style={styles.elementName}>POWIERZCHNIA:</Text>
          <Text style={styles.elementValue}>
            {airConditionStore.choosedAirConditioner?.area} m/kw
          </Text>
        </View>
        <View style={styles.elementSection}>
          <Text style={styles.elementName}>CHŁODZENIE/GRZANIE:</Text>
          <Text style={styles.elementValue}>
            {airConditionStore.choosedAirConditioner?.energyType}
          </Text>
        </View>
        <View style={styles.mainHeader}>
          <Text style={styles.mainHeaderText}>ELEMENTY MONTAŻOWE</Text>
        </View>
        <View style={styles.elementSection}>
          <Text style={styles.montageEleName}>
            RURA MIEDZIANA W OTULINIE 1/4 + 3/8
          </Text>
          <Text style={styles.montageEleValue}>
            {airConditionStore.copperPipeLen} mb.
          </Text>
        </View>
        <View style={styles.elementSection}>
          <Text style={styles.montageEleName}>KABEL MIEDZIANY 3X1.5</Text>
          <Text style={styles.montageEleValue}>
            {airConditionStore.copperCableLen15} mb.
          </Text>
        </View>
        <View style={styles.elementSection}>
          <Text style={styles.montageEleName}>KABEL MIEDZIANY 3X1.6</Text>
          <Text style={styles.montageEleValue}>
            {airConditionStore.copperCableLen16} mb.
          </Text>
        </View>

        <View style={styles.elementSection}>
          <Text style={styles.montageEleName}>RURKA SKROPLIN</Text>
          <Text style={styles.montageEleValue}>
            {airConditionStore.pipeDashLen} mb.
          </Text>
        </View>
        <View style={styles.elementSection}>
          <Text style={styles.montageEleName}>WSPORNIK KLIMATYZATORA</Text>
          <Text style={styles.montageEleValue}>
            {airConditionStore.airConditionerSupport} szt.
          </Text>
        </View>
        <View style={styles.elementSection}>
          <Text style={styles.montageEleName}>KORYTO 8X6mm</Text>
          <Text style={styles.montageEleValue}>
            {airConditionStore.gutterLen} mb.
          </Text>
        </View>
        <View style={styles.elementSection}>
          <Text style={styles.montageEleName}>ŁĄCZNIK/KOLANO/ZAKOŃCZENIE</Text>
          <Text style={styles.montageEleValue}>
            {airConditionStore.pipeConnector} kpl.
          </Text>
        </View>
        <View style={styles.elementSection}>
          <Text style={styles.montageEleName}>RURA ELASTYCZNA FI 50</Text>
          <Text style={styles.montageEleValue}>
            {airConditionStore.elasticPipeLen} mb.
          </Text>
        </View>
        <View style={styles.elementSection}>
          <Text style={styles.montageEleName}>TAŚMA DO INSTALACJI</Text>
          <Text style={styles.montageEleValue}>
            {airConditionStore.tape} szt.
          </Text>
        </View>
        <View style={styles.elementSection}>
          <Text style={styles.montageEleName}>PRZEPUST ŚCIENNY</Text>
          <Text style={styles.montageEleValue}>
            {airConditionStore.wallPass} szt.
          </Text>
        </View>
        <View style={styles.centerContent}>
          <Text style={styles.elementValue}>ELEMENTY DODATKOWE DO WYBORU</Text>
        </View>
        <View style={styles.elementSection}>
          <Text style={styles.montageEleName}>
            SYFON (PRZYŁĄCZENIE SKROPLIN DO KANALIZACJI)
          </Text>
          <Text style={styles.montageEleValue}>
            {airConditionStore.syfon ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.elementSection}>
          <Text style={styles.montageEleName}>
            POMPA SKROPLIN (W PRZYPADKU GDY NIE DA SIĘ ODPROWADZIĆ ZE SKOSEM)
          </Text>
          <Text style={styles.montageEleValue}>
            {airConditionStore.dashPump ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.mainHeader}>
          <Text style={styles.mainHeaderText}>PODSUMOWANIE</Text>
        </View>

        <View style={styles.pricingSection}>
          <View style={styles.eachCost}>
            <View style={styles.shortHeader}>
              <Text style={styles.shortHeaderText}>KOSZT NETTO</Text>
            </View>
            <Text style={styles.priceText}>
              {airConditionCalcStore.installationPricing.netInstallationPrice}{" "}
              zł
            </Text>
          </View>
          <View style={styles.eachCost}>
            <View style={styles.shortHeader}>
              <Text style={styles.shortHeaderText}>PODATEK VAT</Text>
            </View>
            <Text style={styles.priceText}>
              {airConditionCalcStore.installationPricing.vatValue} zł
            </Text>
          </View>
          <View style={styles.eachCost}>
            <View style={styles.shortHeader}>
              <Text style={styles.shortHeaderText}>KOSZT BRUTTO</Text>
            </View>
            <Text style={styles.priceText}>
              {airConditionCalcStore.installationPricing.grossInstallationPrice}{" "}
              zł
            </Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          right: 0,
          position: "absolute",
          fontSize: 6,
          marginRight: 5,
          marginTop: 5,
          width: "100%",
          textAlign: "right",
        }}
      >
        /nr.zam/ model INW/Z {airConditionStore.consultantMarkup} /{" "}
        {airConditionCalcStore.officeProvision.officeProvision} /{" "}
        {airConditionCalcStore.officeProvision.bossProvision}
      </Text>
      <Image
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -500,
        }}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/background.png`}
      />
    </Page>
  </Document>
);

export default AirConditionDocument;
