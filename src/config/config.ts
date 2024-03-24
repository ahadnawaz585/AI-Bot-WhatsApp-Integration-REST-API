import { Config } from "../types/config";

const config: Config = {
    startMessage: "hi mona", // The message to start interacting with the bot
    endMessage: "bye mona", // The message to stop interacting with the bot
    welcomeMessage: 
`🌟 Welcome to your virtual assistant experience with Mona, your dedicated AI companion MONA 🤖!

I am here to make your life easier and more efficient, ready to assist you in any way I can.

Simply begin your inquiry with one of the magic words:
- "!gemini" for text-based assistance
- "!stability" for image generation with text prompts
- "!vision" for image-based assistance

Whether you're seeking information, guidance, or just a friendly chat, I'm at your service! Remember, your satisfaction is my top priority, and I'm here to ensure that every interaction leaves you feeling empowered and supported.

So go ahead, don't hesitate to ask anything. With me by your side, the possibilities are endless! Together, let's embark on this journey of discovery and assistance.

Your trusty AI assistant, crafted with love by Ahad. ❤️`, // The welcome message displayed when a user starts interacting with the bot
    closingMessage: "Bye friend 🤖!", // The message displayed when a user stops interacting with the bot
    validationMessage: "Sorry, I couldn't understand your request. Please try again 🙂", // The message displayed when the user's request is not understood
    serverError: "An unexpected error occurred while processing your request! Please try again later or contact support for assistance. 🛠️", // The message displayed when an unexpected server error occurs
    prefixes: ["!gemini", "!stability", "!vision"], // The prefixes used to identify different types of requests
};

export default config;
