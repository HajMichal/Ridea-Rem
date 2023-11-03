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
import { type ForCompanySlice } from "~/store/forCompany/forCompanySlice";
import { type ForCompanyCalculation } from "~/store/forCompany/forCompanyCalculationSlice";

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
    fontSize: 40,
    fontWeight: 600,
    fontFamily: "Orkney",
    marginTop: -30,
  },
  subTitle: {
    fontSize: 18,
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
  forCompanyCalcStore: ForCompanyCalculation;
  forCompanyStore: ForCompanySlice["forCompanyStore"];
}

const ForCompanyDocument = ({
  forCompanyCalcStore,
  forCompanyStore,
}: DataToPDF) => (
  <Document>
    <Page size="A4" style={styles.page}></Page>
  </Document>
);

export default ForCompanyDocument;
