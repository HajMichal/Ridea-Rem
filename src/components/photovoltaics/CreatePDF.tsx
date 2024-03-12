/* eslint-disable jsx-a11y/alt-text */
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

import { type PhotovoltaicCalculations } from "~/store/photovoltaic/photovoltaicCalculationSlice";
import { type PhotovoltaicsSlice } from "~/store/photovoltaic/photovoltaicSlice";

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
  header: {
    fontFamily: "Orkney",
    fontWeight: 600,
    marginTop: 7,
  },
  headerBackground: {
    width: "70%",
    height: 40,
    backgroundColor: "#FEEB1A",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  saveRow: {
    width: "100%",
    height: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 1,
  },
  saveTitle: { fontFamily: "Orkney", fontSize: 10 },
  savePrice: { fontFamily: "Orkney", fontWeight: 600, fontSize: 10 },
  estimatedProfit: {
    display: "flex",
    justifyContent: "center",
    height: 100,
    width: "35%",
  },
  estimatedProfitTitle: {
    fontFamily: "Orkney",
    fontSize: 8,
    textAlign: "center",
    width: "100%",
  },
  estimatedProfitTitleBold: {
    fontFamily: "Orkney",
    fontSize: 12,
    textAlign: "center",
    width: "100%",
    fontWeight: 600,
  },
  estimatedPrice: {
    fontSize: 14,
    fontFamily: "Orkney",
    fontWeight: 600,
    width: "100%",
    textAlign: "center",
    marginTop: 15,
  },
  brandUnderScore: {
    width: "70%",
    marginTop: -10,
    height: 10,
    backgroundColor: "#FEEB1A",
    alignSelf: "center",
    zIndex: -200,
  },
  pricingSection: {
    width: "90%",
    marginTop: 5,
    marginLeft: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

interface DataToPDF {
  photovoltaicCalcStore: PhotovoltaicCalculations;
  photovoltaicStore: PhotovoltaicsSlice["photovoltaicStore"];
}

const MyDocument = ({
  photovoltaicCalcStore,
  photovoltaicStore,
}: DataToPDF) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image
        style={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/photovoltaic/firstPage.png`}
      />
    </Page>
    <Page size="A4" style={styles.page}>
      <Image
        style={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/photovoltaic/secondPage.png`}
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
        <Text
          style={{
            right: 0,
            position: "absolute",
            fontSize: 6,
            marginRight: 5,
            marginTop: 5,
          }}
        >
          /nr.zam/ model INW/Z{" "}
          {photovoltaicCalcStore.markup_costs.consultantFeeValue} /{" "}
          {photovoltaicCalcStore.markup_costs.officeFeeValue} /{" "}
          {photovoltaicCalcStore.markup_costs.officeFeeForBoss}
        </Text>
        <Image
          style={{ height: 60 }}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/logo.png`}
        />

        <View style={styles.headerBackground}>
          <Text style={styles.header}>OSZCZĘDNOŚCI Z TWOJEJ INSTALACJI</Text>
        </View>

        <View style={{ width: "85%", marginTop: 30 }}>
          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>
              PRZEWIDYWANA PRODUKCJA ENERGII Z PV
            </Text>
            <Text style={styles.savePrice}>
              {photovoltaicCalcStore.estimated_kWh_prod.toFixed(2)} KWH
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>STOPIEŃ AUTOKONSUMPCJI</Text>
            <Text style={styles.savePrice}>
              {photovoltaicCalcStore.autoconsumption} KWH -{" "}
              {(photovoltaicStore.autoconsumptionInPercent * 100).toFixed(2)}%
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>ZYSK Z KONSUMPCJI WŁASNEJ</Text>
            <Text style={styles.savePrice}>
              {photovoltaicCalcStore.save_on_autoconsumption} ZŁ
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>
              PRZEWIDYWANA ILOŚĆ SPRZEDANYCH KWH DO ZE
            </Text>
            <Text style={styles.savePrice}>
              {photovoltaicCalcStore.energy_sold_to_distributor} KWH
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>WARTOŚĆ SPRZEDANEJ ENERGII</Text>
            <Text style={styles.savePrice}>
              {photovoltaicCalcStore.accumulated_funds_on_account.toFixed(2)} ZŁ
            </Text>
          </View>
        </View>

        <View style={styles.pricingSection}>
          <View style={styles.estimatedProfit}>
            <Text style={styles.estimatedProfitTitleBold}>
              ŚREDNIO MIESIĘCZNY ZYSK
            </Text>
            <Text style={styles.estimatedProfitTitle}>
              Z INSTALACJI FOTOWOLTAICZNEJ
            </Text>
            <Text
              style={{ ...styles.estimatedPrice, fontSize: 20, marginTop: 8 }}
            >
              {(
                photovoltaicCalcStore.yearly_profit_for_installation / 12
              ).toFixed(2)}
              ZŁ
            </Text>
            <View style={styles.brandUnderScore} />
          </View>
          <View style={styles.estimatedProfit}>
            <Text style={styles.estimatedProfitTitleBold}>
              ŚREDNIO ROCZNY ZYSK
            </Text>
            <Text style={styles.estimatedProfitTitle}>
              Z INSTALACJI FOTOWOLTAICZNEJ
            </Text>
            <Text style={styles.estimatedPrice}>
              {" "}
              {photovoltaicCalcStore.yearly_profit_for_installation.toFixed(
                2
              )}{" "}
              ZŁ
            </Text>
          </View>
          <View style={styles.estimatedProfit}>
            <Text style={styles.estimatedProfitTitleBold}>
              ŚREDNIO 10 LETNI ZYSK
            </Text>
            <Text style={styles.estimatedProfitTitle}>
              Z INSTALACJI FOTOWOLTAICZNEJ
            </Text>
            <Text
              style={{ ...styles.estimatedPrice, fontSize: 20, marginTop: 8 }}
            >
              {(
                photovoltaicCalcStore.yearly_profit_for_installation * 10
              ).toFixed(2)}{" "}
              ZŁ
            </Text>
            <View style={styles.brandUnderScore} />
          </View>
        </View>

        <View style={styles.headerBackground}>
          <Text style={styles.header}>FINANSE</Text>
        </View>

        <View style={styles.pricingSection}>
          <View style={styles.estimatedProfit}>
            <Text style={{ ...styles.estimatedProfitTitle, fontSize: 12 }}>
              KWOTA NETTO
            </Text>
            <Text style={{ ...styles.estimatedPrice, fontSize: 14 }}>
              {photovoltaicCalcStore.totalInstallationCosts.total_installation_cost.toFixed(
                2
              )}{" "}
              ZŁ
            </Text>
          </View>
          <View style={styles.estimatedProfit}>
            <Text style={{ ...styles.estimatedProfitTitle, fontSize: 12 }}>
              PODATEK VAT 8%
            </Text>
            <Text style={{ ...styles.estimatedPrice, fontSize: 14 }}>
              {photovoltaicCalcStore.totalInstallationCosts.fee_value.toFixed(
                2
              )}{" "}
              ZŁ
            </Text>
          </View>
          <View style={styles.estimatedProfit}>
            <Text style={{ ...styles.estimatedProfitTitle, fontSize: 12 }}>
              KWOTA BRUTTO
            </Text>
            <Text style={{ ...styles.estimatedPrice, fontSize: 14 }}>
              {photovoltaicCalcStore.totalInstallationCosts.total_gross_cost.toFixed(
                2
              )}{" "}
              ZŁ
            </Text>
          </View>
        </View>

        <View style={styles.headerBackground}>
          <Text style={styles.header}>DOTACJE I ULGI</Text>
        </View>

        <View style={{ width: "85%", marginTop: 20 }}>
          <View style={styles.saveRow}>
            <Text style={{ ...styles.saveTitle, fontWeight: 600 }}>
              ULGA TERMOMODERNIZACYJNA
            </Text>
            <Text style={styles.savePrice}>
              {photovoltaicCalcStore.termoModernization.toFixed(2)} ZŁ
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={{ ...styles.saveTitle, fontWeight: 600 }}>
              DOTACJE Z PROGRAMU &#34;MÓJ PRĄD&#34;
            </Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.isPromotion
                ? photovoltaicCalcStore.dotations_sum +
                  photovoltaicStore.promotionAmount
                : photovoltaicCalcStore.dotations_sum}{" "}
              ZŁ
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={{ ...styles.saveTitle, fontWeight: 600 }}>
              DODATKOWA PROMOCJA
            </Text>
            <Text style={styles.savePrice}>
              {" "}
              {photovoltaicStore.isPromotion
                ? photovoltaicStore.promotionAmount
                : "0"}{" "}
              ZŁ
            </Text>
          </View>
        </View>

        <View style={styles.headerBackground}>
          <Text style={styles.header}>PODSUMOWANIE</Text>
        </View>

        <View style={styles.pricingSection}>
          <View style={styles.estimatedProfit}>
            <Text style={{ ...styles.estimatedProfitTitle, fontSize: 12 }}>
              RATA PRZED DOTACJĄ
            </Text>
            <Text style={{ ...styles.estimatedPrice, fontSize: 14 }}>
              {photovoltaicCalcStore.loanForPurcharse.instalmentBeforeDotations.toFixed(
                2
              )}{" "}
              ZŁ
            </Text>
          </View>

          <View style={styles.estimatedProfit}>
            <Text style={{ ...styles.estimatedProfitTitle, fontSize: 12 }}>
              RATA PO DOTACJI
            </Text>
            <Text
              style={{ ...styles.estimatedPrice, fontSize: 20, marginTop: 8 }}
            >
              {photovoltaicCalcStore.loanForPurcharse.finallInstalmentPice.toFixed(
                2
              )}{" "}
              ZŁ
            </Text>
            <View style={styles.brandUnderScore} />
          </View>

          <View style={styles.estimatedProfit}>
            <Text style={{ ...styles.estimatedProfitTitle, fontSize: 12 }}>
              KWOTA PO DOTACJI
            </Text>
            <Text
              style={{ ...styles.estimatedPrice, fontSize: 20, marginTop: 8 }}
            >
              {(
                photovoltaicCalcStore.finall_installation_cost -
                photovoltaicCalcStore.termoModernization
              ).toFixed(2)}
            </Text>
            <View style={styles.brandUnderScore} />
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
        ></Image>
      </View>
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
          style={{ height: 60, marginTop: 30 }}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/logo.png`}
        />
        <View style={styles.headerBackground}>
          <Text style={styles.header}>DANE TECHNICZNE TWOJEJ INSTALACJI</Text>
        </View>

        <Image
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: -500,
          }}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/photovoltaic/background-photovoltaic.png`}
        ></Image>
        <View style={{ width: "85%", marginTop: 30 }}>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>MOC SYSTEMU PV</Text>
            <Text style={styles.savePrice}>
              {photovoltaicCalcStore.system_power} KW
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>ILOŚĆ MODUŁÓW</Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.modulesCount} SZT
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>MOC MODUŁU</Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.panelPower} W
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>ILOŚC OPTYMALIZATORÓW TIGO</Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.tigoCount} SZT
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>MENADŻER ENERGII - EMS</Text>
            <Text style={styles.savePrice}>
              {" "}
              {photovoltaicStore.emsDotation ? "TAK" : "NIE"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>ZABEZPIECZENIE ELEKTRYCZNE</Text>
            <Text style={styles.savePrice}>AC/DC</Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>STELAŻE ALUMINIOWE</Text>
            <Text style={styles.savePrice}>ALUMINIOWE</Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>
              MONTAŻ NA DACHU PŁASKIM - EKIERKI
            </Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.isEccentricsChoosed ? "TAK" : "NIE"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>MONTAŻ NA GRUNCIE</Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.isGroundMontage ? "TAK" : "NIE"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>MONTAŻ NA WIELU POŁACIACH</Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.isSolarEdgeChoosed ? "TAK" : "NIE"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>MAGAZYN ENERGII</Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.energyStoreDotation
                ? photovoltaicStore.energyStorePower + "W"
                : "NIE"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>INWERTER HYBRYDOWY</Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.isInwerterChoosed ? "TAK" : "NIE"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>MAGAZYN CIEPŁA</Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.heatStoreDotation ? "TAK" : "NIE"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>POJEMNOŚĆ ZBIORNIKA CWU</Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.heatStoreDotation
                ? photovoltaicStore.tankSize
                : "BRAK"}
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default MyDocument;

// <View style={styles.pricingSection}>
// <Text style={styles.title}>OFERTA</Text>
// <Text style={styles.subTitle}>KOSZTA I OSZCZĘDNOŚCI</Text>

// <View style={styles.eachRow}>
//   <Text>TWOJE OBECNE ZUŻYCIE ENERGII </Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicStore.recentYearTrendUsage} kWh
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>TARCZA SOLIDARNOŚCIOWA</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicStore.usageLimit} kWh
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>KOSZTY ENERGII ELEKTRYCZNEJ </Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicCalcStore.total_energy_trend_fee.toFixed(2)} zł
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>KOSZTY OPŁAT DYSTRYBUCJI</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicCalcStore.total_payment_energy_transfer.toFixed(2)} zł
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>PRZEWIDYWANA WYSOKOŚC RACHUNKU ZA 2024 </Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicCalcStore.yearly_bill_without_photovolatics.toFixed(2)}{" "}
//     zł
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>ŚREDNI KOSZT KAŻDEJ kWh </Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicCalcStore.estiamted_price_for_trend_in_1KWH.toFixed(2)}{" "}
//     zł
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>PRZEWIDYWANA PRODUKCJA ENERGI Z PV </Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicCalcStore.estimated_kWh_prod.toFixed(2)} kWh
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>STOPIEŃ AUTOKONSUMPCJI </Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicCalcStore.autoconsumption} kWh -{" "}
//     {(photovoltaicStore.autoconsumptionInPercent * 100).toFixed(2)}%
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>PRZEWIDYWANA ILOŚĆ SPRZEDANYCH kWh DO ZE</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicCalcStore.energy_sold_to_distributor} kWh
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>WARTOŚĆ SPRZEDANEJ ENERGII (0,72 zł/kWh)</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicCalcStore.accumulated_funds_on_account.toFixed(2)} zł
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>INDYWIDUALNY PROJEKT INSTALACJI</Text>
//   <Text style={styles.boldFont}>TAK</Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>WIELKOŚĆ MAGAZYNU ENERGII</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicStore.energyStoreDotation
//       ? photovoltaicStore.energyStorePower
//       : "BRAK"}
//   </Text>
// </View>
// <View style={styles.priceRow}>
//   <Text>ZYSK ROCZNY Z PV </Text>
//   <Text
//     style={{
//       fontSize: 30,
//       fontWeight: 600,
//       marginRight: 20,
//       paddingTop: 10,
//     }}
//   >
//     {photovoltaicCalcStore.yearly_profit_for_installation.toFixed(2)} zł
//   </Text>
// </View>
// <View style={styles.paymentReturnTime}>
//   <Text>ZWROT NASTĄPI PO CZASIE:</Text>
//   <Text>
//     {photovoltaicCalcStore.payment_return_time.years ?? 0}{" "}
//     {photovoltaicCalcStore.payment_return_time.years === 1
//       ? "ROK "
//       : "LAT "}
//     I {photovoltaicCalcStore.payment_return_time.months ?? 0}{" "}
//     {photovoltaicCalcStore.payment_return_time.months === 1
//       ? "MIESIĄCA"
//       : "MIESIĘCY"}
//   </Text>
// </View>
// <View>
//   <Text style={{ fontSize: 8, marginTop: 10, marginLeft: 10 }}>
//     /nr.zam/ model INW/Z{" "}
//     {photovoltaicCalcStore.markup_costs.consultantFeeValue} /{" "}
//     {photovoltaicCalcStore.markup_costs.officeFeeValue} /{" "}
//     {photovoltaicCalcStore.markup_costs.officeFeeForBoss}
//   </Text>
// </View>
// </View>
// <View style={styles.imageSection}>
// <Image
//   style={styles.logoImage}
//   src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/blackLogo.png`}
// />
// <Image
//   style={styles.signatureImage}
//   src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/signatureIdeaRem.png`}
// />
// <Text style={styles.pageNum}>03</Text>
// </View>
// </Page>
// <Page size="A4" style={styles.page}>
// <View style={styles.pricingSection}>
// <Text style={styles.title}>OFERTA</Text>
// <Text style={styles.subTitle}>DANE TECHNICZNE INSTALACJI</Text>

// <View style={styles.eachRow}>
//   <Text>MOC SYSTEMU PV</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicCalcStore.system_power} kW
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>ILOŚĆ MODUŁÓW</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicStore.modulesCount} szt.
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>MOC MODUŁU</Text>
//   <Text style={styles.boldFont}>{photovoltaicStore.panelPower}</Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>ILOŚĆ OPTYMALIZATORÓW TIGO</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicStore.tigoCount ?? 0} szt.
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>SYSTEM OGRZEWANIA ELEKTRYCZNEGO MAGAZNU</Text>
//   <Text style={styles.boldFont}>2 kW</Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>MENADŻER ENERGII - EMS</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicStore.emsDotation ? "1 szt." : "NIE"}
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>ZABEZPIECZENIE ELEKTRYCZNE</Text>
//   <Text style={styles.boldFont}>AC/DC</Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>STELAŻE</Text>
//   <Text style={styles.boldFont}>ALUMINIOWE</Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>MONTAŻ NA DACHU PŁASKIM - EKIERKI</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicStore.isEccentricsChoosed ? "TAK" : "NIE"}
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>MONTAŻ NA GRUNCIE</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicStore.isGroundMontage ? "TAK" : "NIE"}
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>MONTAŻ NA WIELU POŁACIACH</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicStore.isSolarEdgeChoosed ? "TAK" : "NIE"}
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>MAGAZYN ENERGII</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicStore.energyStoreDotation
//       ? photovoltaicStore.energyStorePower + "W"
//       : "NIE"}
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>INWERTER HYBRYDOWY</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicStore.isInwerterChoosed ? "TAK" : "NIE"}
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>MAGAZYN CIEPŁA</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicStore.heatStoreDotation ? "TAK" : "NIE"}
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>POJEMNOŚĆ ZBIORNIKA CWU</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicStore.heatStoreDotation
//       ? photovoltaicStore.tankSize
//       : "BRAK"}
//   </Text>
// </View>
// </View>
// <View style={styles.imageSection}>
// <Image
//   style={styles.logoImage}
//   src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/blackLogo.png`}
// />
// <Image
//   style={styles.signatureImage}
//   src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/signatureIdeaRem.png`}
// />
// <Text style={styles.pageNum}>04</Text>
// </View>
// </Page>
// <Page size="A4" style={styles.page}>
// <View style={styles.pricingSection}>
// <Text style={styles.title}>OFERTA</Text>
// <Text style={styles.subTitle}>WYCENA INSTALACJI I DOTACJE</Text>
// <View style={styles.eachRow}>
//   <Text>WARTOŚĆ NETTO</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicCalcStore.totalInstallationCosts.total_installation_cost.toFixed(
//       2
//     )}{" "}

//     zł
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>PODATEK VAT 8%</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicCalcStore.totalInstallationCosts.fee_value.toFixed(2)}{" "}

//     zł
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>WARTOŚĆ BRUTTO</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicCalcStore.totalInstallationCosts.total_gross_cost.toFixed(
//       2
//     )}{" "}

//     zł
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>WARTOŚĆ RATY PRZED ODLICZENIEM DOTACJI</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicCalcStore.loanForPurcharse.instalmentBeforeDotations.toFixed(
//       2
//     )}{" "}
//     zł
//   </Text>
// </View>
// <View style={styles.eachRow}>
//   <Text>ULGA TERMOMODERNIZACYJNA</Text>
//   <Text style={styles.boldFont}>
//     {photovoltaicCalcStore.termoModernization.toFixed(2)} ZŁ
//   </Text>
// </View>
// <View
//   style={{
//     backgroundColor: "#FEEB1A",
//     borderBottomLeftRadius: "25%",
//     borderTopRightRadius: "25%",
//     marginTop: 3,
//   }}
// >
//   <View style={styles.eachRow}>
//     <Text>DOTACJA `&#34;`MÓJ PRĄD 5.0`&#34;`</Text>
//     <Text style={styles.boldFont}>
//       {photovoltaicStore.isPromotion
//         ? photovoltaicCalcStore.dotations_sum +
//           photovoltaicStore.promotionAmount
//         : photovoltaicCalcStore.dotations_sum}{" "}
//       ZŁ
//     </Text>
//   </View>
//   <View style={{ fontSize: 12, paddingLeft: 12, paddingBottom: 12 }}>
//     <Text>INSTALACJA FOTOWOLTAICZNA - {photovoltaics_dotation} ZŁ</Text>
//     <Text>
//       MAGAZYN CIEPŁA (BUFOR) -{" "}
//       {photovoltaicStore.heatStoreDotation
//         ? // ? photovoltaicCalcStore.heatStoreCalcDotation
//           "do 5000"
//         : "0"}{" "}
//       ZŁ
//     </Text>
//     <Text>
//       SYSTEM ZARZĄDZANIA ENERGIĄ (EMS/HEMS) -{" "}
//       {photovoltaicStore.emsDotation ? energyStore_dotation : "0"} ZŁ
//     </Text>
//     <Text>
//       DOTACJA NA MAGAZYN ENERGII -{" "}
//       {photovoltaicStore.energyStoreDotation
//         ? photovoltaicCalcStore.energyStoreDotationValue
//         : "0"}{" "}
//       ZŁ
//     </Text>
//     <Text>
//       PROMOCJA -{" "}
//       {photovoltaicStore.isPromotion
//         ? photovoltaicStore.promotionAmount
//         : "0"}{" "}
//       ZŁ
//     </Text>
//   </View>
// </View>

// <View
//   style={{
//     marginTop: 150,
//     marginRight: -300,
//     backgroundColor: "#FEEB1A",
//     borderBottomLeftRadius: "50%",
//     padding: 22,
//   }}
// >
//   <Text style={{ fontSize: 12 }}>
//     OSTATECZNY KOSZT INSTALACJI PO DOFINANSOWANIU:
//   </Text>
//   <Text style={{ fontSize: 50, marginTop: 4 }}>
//     {(
//       photovoltaicCalcStore.finall_installation_cost -
//       photovoltaicCalcStore.termoModernization
//     ).toFixed(2)}{" "}
//     zł
//   </Text>
//   <Text style={{ fontSize: 12, marginLeft: 10 }}>DOSTĘPNE:</Text>
//   <Text style={{ fontSize: 12, marginLeft: 10 }}>
//     {photovoltaicStore.installmentNumber} RAT W WYSOKOŚCI{" "}
//     <Text style={styles.boldFont}>
//       {photovoltaicCalcStore.loanForPurcharse.finallInstalmentPice.toFixed(
//         2
//       )}{" "}
//       ZŁ
//     </Text>
//   </Text>
// </View>
// </View>
// <View style={styles.imageSection}>
// <Image
//   style={styles.logoImage}
//   src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/blackLogo.png`}
// />
// <Image
//   style={styles.signatureImage}
//   src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/signatureIdeaRem.png`}
// />
// <Text style={styles.pageNum}>05</Text>
// </View>
