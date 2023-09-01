import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

import { type PhotovoltaicCalculations } from "~/store/photovoltaicCalculationSlice";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

interface DataToPDF {
  photovoltaicCalcStore: PhotovoltaicCalculations;
}
// Create Document Component
const MyDocument = ({ photovoltaicCalcStore }: DataToPDF) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text> Koszt instalacji po odjęciu podatków:</Text>
        <Text>{photovoltaicCalcStore.finall_installation_cost}</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
