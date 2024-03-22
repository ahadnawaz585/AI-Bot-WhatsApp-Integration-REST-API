export interface visionMessage {
  prompt: string;
  imagePaths: Vision[];
}

export interface Vision {
  path: string;
  mimeType: string;
}
