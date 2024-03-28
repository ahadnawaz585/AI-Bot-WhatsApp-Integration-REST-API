export class PdfHelper {
    static parseData(data: string): any[] {
      const parsedContent: any[] = [];
      const paragraphs = data.split('\n');
      paragraphs.forEach(paragraph => {
        if (paragraph.trim().startsWith('**')) {
          const boldText = paragraph.replace(/\*\*(.*?)\*\*/g, (match, p1) => p1);
          parsedContent.push({ text: boldText, style: 'bold' });
        } else {
          parsedContent.push({ text: paragraph, style: '' });
        }
      });
      return parsedContent;
    }
  }
  