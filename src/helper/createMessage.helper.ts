import { Prefix } from "../types/models";
import { Prompt } from "../types/prompt";

export class TextHelper {
  private dataToRemove: Prefix[] = ["!gemini", "!vision", "!stability"];

  public removeData(text: string): Prompt {
    let prompt = text;
    let model: string | null = null;

    this.dataToRemove.forEach((prefix) => {
      const regex = new RegExp(prefix, "gi");
      if (prompt.includes(prefix)) {
        prompt = prompt.replace(regex, "");
        if (!model) model = prefix;
        else model = "!multi"; 
      }
    });

    if (model === null) prompt = "";

    return { prompt, model };
  }
}
