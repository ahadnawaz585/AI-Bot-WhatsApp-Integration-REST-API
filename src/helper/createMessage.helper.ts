import { Prefix } from "../types/models";
import { Prompt } from "../types/prompt";
import { Message } from "whatsapp-web.js";
import { Vision } from "../types/vision";
import fs from "fs";

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

  deleteTemporaryImageFiles(imagePaths: Vision[]): void {
    for (const imagePath of imagePaths) {
        try {
            fs.unlinkSync(imagePath.path);
        } catch (error) {
            console.error("Error deleting temporary image file:", error);
        }
    }
}

   async handleMedia(message: Message): Promise<{ path: string; mimeType: string }[]> {
    let imagePaths: { path: string; mimeType: string }[] = [];

    try {
        const media = await message.downloadMedia();
        if (media) {
            if (Array.isArray(media)) {
                for (let i = 0; i < media.length; i++) {
                    const attachment = media[i];
                    if (attachment && attachment.mimetype && attachment.mimetype.startsWith('image')) {
                        const filename = `${i}.${attachment.mimetype.split('/')[1]}`;
                        fs.writeFileSync(filename, attachment.data, 'base64');
                        imagePaths.push({ path: filename, mimeType: attachment.mimetype });
                    }
                }
            } else {
                if (media.mimetype && media.mimetype.startsWith('image')) {
                    const filename = `0.${media.mimetype.split('/')[1]}`;
                    fs.writeFileSync(filename, media.data, 'base64');
                    imagePaths.push({ path: filename, mimeType: media.mimetype });
                }
            }
        }
    } catch (error) {
        console.log("Error downloading media:", error);
    }

    return imagePaths;
}
}
