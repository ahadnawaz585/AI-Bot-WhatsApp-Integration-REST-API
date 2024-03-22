import { Config } from "../types/config";

const config: Config = {
    startMessage:  "hi mona", //to start
    endMessage:  "bye mona", // to stop
    welcomeMessage:"🌟 Welcome to your virtual assistance experience with me, Mona, your dedicated AI companion MONA 🤖!\n\n I am here to make your life easier and more efficient, ready to assist you in any way I can.\n\n Simply begin your inquiry with the magic word (!gemini) and watch as I spring into action to fulfill your needs.\n\nWhether you're seeking information, guidance, or just a friendly chat, I'm at your service! Remember, your satisfaction is my top priority, and I'm here to ensure that every interaction leaves you feeling empowered and supported.\n\nSo go ahead, don not hesitate to ask anything. With me by your side, the possibilities are endless! Together, let's embark on this journey of discovery and assistance.\n\n Your trusty AI assistant, crafted with love by Ahad. ❤️",
    closingMessage:"Bye friend🤖!",
    prefixes: ["!gemini", "!stability", "!vision"], //prefixes i wanna check
};

export default config;
