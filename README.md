

---

# WhatsApp Chatbot REST API

This project is a REST API integrated with WhatsApp using the `whatsapp-web.js` library. It operates as a chatbot, allowing you to interact with WhatsApp programmatically, send messages, and generate QR codes for authentication.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/ahadnawaz585/AI-Bot-WhatsApp-Integration-REST-API
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
   - Rename `.env.example` to `.env`.
   - Generate an API key from the Gemini website and add it to the `.env` file.

## Usage

### Starting the Server

To start the server, run the following command:
```bash
npm run start
```

### Chatbot Functionality

- This project operates as a chatbot integrated with WhatsApp.
- It interacts with users, responds to messages, and performs actions based on user queries.
- Users can send messages to the WhatsApp number associated with the chatbot to initiate conversations and request information or perform actions.

### Text/Image to PDF Conversion

- The API supports converting text/Image to PDF.
- Users can prompt the chatbot to generate a PDF file from a given text by sending a specific command or query.
- Users can convert image to PDF .

### Assignment Generation

- This feature generates assignments with at least 15-20 headings.
- The chatbot automatically creates assignments based on the given topic, providing users with educational materials and resources.

### Text/Image Conversion

- The API supports text to text, text to image, and image to text conversions.
- Users can perform various conversions by interacting with the chatbot and sending specific requests or commands.

## Contributing

Contributions are welcome! If you have any ideas for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- [Gemini API](https://gemini.google.com/app)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [pdfmake](https://www.npmjs.com/package/pdfmake)
- [Stability API](https://stability.ai/news/api-platform-for-stability-ai)

---
