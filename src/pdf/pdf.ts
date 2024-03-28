import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { PdfHelper } from "../helper/pdf.helper";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class pdfUtility {
  static makeAssignment(topic: string, headings: string, data: string) {
    const documentDefinition: TDocumentDefinitions = {
      content: [
        { text: "Outline : ", style: "heading" },
        { text: headings, style: "subHeading" },
        { text: "", pageBreak: "after" },
        { text: topic.toLocaleUpperCase(), style: "topicHeader" },
        ...PdfHelper.parseData(data),
      ],
      styles: {
        topicHeader: {
          fontSize: 20,
          alignment: "center",
          bold: true,
          margin: [20, 20, 20, 20],
        },
        heading: {
          fontSize: 25,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        subHeading: {
          fontSize: 14,
          bold: true,
          margin: [0, 5, 0, 2],
        },
        bold: {
          bold: true,
          margin: [0, 10, 0, 5],
        },
      },
    };
    const pdfDoc = pdfMake.createPdf(documentDefinition);
    return pdfDoc;
  }

  static makePDF(text: string) {
    const parsedContent = PdfHelper.parseData(text);
    const documentDefinition: TDocumentDefinitions = {
      content: parsedContent,
      styles: {
        bold: {
          bold: true,
          margin: [0, 10, 0, 5],
        },
      },
    };
    const pdfDoc = pdfMake.createPdf(documentDefinition);
    return pdfDoc;
  }


}
