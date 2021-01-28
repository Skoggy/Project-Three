// import React from 'react';
// import { BlobProvider, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
// import PSPDFKit from "./PSPDFKit";
// import ReactDOM from "react-dom";

// const styles = StyleSheet.create({
//     page: {
//         flexDirection: 'row'
//     },
//     section: {
//         flexGrow: 1
//     }
// })


// const MyDocument = (
//     <Document>
//         <Page size="A4" style={styles.page}>
//             <View style={styles.section}>
//                 <Text>Hello World!</Text>
//             </View>
//             <View style={styles.section}>
//                 <Text>We're inside a PDF!</Text>
//             </View>
//         </Page>
//     </Document>

// )

// ReactDOM.render(
//     <BlobProvider document={MyDocument}>
//         {({ blob, url, loading, error }) => {
//             if (blob) {
//                 return <PSPDFKit blob={blob} />;
//             }

//             if (error) {
//                 return error;
//             }

//             return <div>The PDF is rendering...</div>;
//         }}
//     </BlobProvider>,
//     document.getElementById("root")
// );