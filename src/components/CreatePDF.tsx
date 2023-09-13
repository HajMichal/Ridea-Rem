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

import { type PhotovoltaicCalculations } from "~/store/photovoltaicCalculationSlice";

Font.register({
  family: "Orkney",
  src: `${process.env.NEXT_PUBLIC_BASE_URL}/static/Orkney.otf`,
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    fontFamily: "Orkney",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: "auto",
    height: "auto",
  },
});

interface DataToPDF {
  photovoltaicCalcStore: PhotovoltaicCalculations;
}

const MyDocument = ({ photovoltaicCalcStore }: DataToPDF) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image
        style={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/firstPage.png`}
      />
    </Page>
    <Page size="A4" style={styles.page}>
      <Image
        style={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/secondPage.png`}
      />
    </Page>
    <Page size="A4" style={styles.page}>
      <Image
        style={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/thirdPage.png`}
      />
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text> Koszt instalacji po odjęciu podatków:;</Text>
        <Text>{photovoltaicCalcStore.finall_installation_cost}</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
