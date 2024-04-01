import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ContentImage, TDocumentDefinitions } from "pdfmake/interfaces";
import { PdfHelper } from "../helper/pdf.helper";

import { MessageMedia } from "whatsapp-web.js";

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

  static async makeImagePDF(images: MessageMedia[]): Promise<Buffer> {
    try {
      const imageContent: ContentImage[] = [];

      for (const image of images) {
        const base64Data = `data:${image.mimetype};base64,${image.data}`;
        imageContent.push({ image: base64Data, width: 500 });
      }

      const documentDefinition: TDocumentDefinitions = {
        content: imageContent,
      };

      const pdfDoc = pdfMake.createPdf(documentDefinition);

      return await this.getPdfBuffer(pdfDoc);
    } catch (error) {
      console.error("Error generating image PDF:", error);
      throw error;
    }
  }

  private static async getPdfBuffer(pdf: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        pdf.getBuffer((buffer: Buffer) => {
          resolve(buffer);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
