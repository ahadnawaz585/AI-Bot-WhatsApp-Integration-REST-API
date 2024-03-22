import { Prefix } from "../types/models";

export class TextHelper {
    private dataToRemove: Prefix[] =['!gemini', '!vision', '!stability'];;
  
    public removeData(text: string): string {
      let modifiedText = text;
      this.dataToRemove.forEach(data => {
        modifiedText = modifiedText.replace(new RegExp(data, 'g'), '');
      });
      return modifiedText;
    }
  }
  