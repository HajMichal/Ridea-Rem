import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  Defs,
  RadialGradient,
  Rect,
  Stop,
  Svg,
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
    marginTop: 50,
    marginLeft: 10,
  },
  mainHeader: {
    width: "85%",
    height: 40,
    marginBottom: 10,
    marginTop: 10,
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -10,
  },
  elementName: {
    fontFamily: "Orkney",
    fontSize: 12,
  },
  elementValue: {
    fontFamily: "Orkney",
    fontWeight: 600,
    fontSize: 12,
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
        <View style={styles.mainHeader}>
          <Text style={styles.mainHeaderText}>ELEMENTY MONTAŻOWE</Text>
        </View>
        <View style={styles.mainHeader}>
          <Text style={styles.mainHeaderText}>PODSUMOWANIE</Text>
        </View>
      </View>
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
