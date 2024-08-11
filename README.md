# Telegram Bot for Image Generation

This repository contains a Telegram bot that allows users to generate images based on their text prompts. The bot supports two methods for image generation: through Puppeteer automation and by utilizing the Stable Diffusion model hosted on Hugging Face.

## Features

- **Text-Based Image Generation**: Users can send text prompts to the bot, which will return generated images based on the prompt.
- **Multiple Image Generation Methods**:
  - **Craiyon via Puppeteer**: Automates web interactions to generate images.
  - **Stable Diffusion via Hugging Face API**: Uses the powerful Stable Diffusion model for high-quality image generation.
- **Telegram Bot Integration**: Built with the Telegraf library, the bot is easy to deploy and integrates seamlessly with Telegram.

## How It Works

1. **User Interaction**: Users interact with the bot by sending text messages containing prompts for image generation.
2. **Image Generation**:
   - **Puppeteer Method**: The bot launches a Puppeteer instance, navigates to the Craiyon (formerly DALL-E mini) website, and submits the prompt to generate images.
   - **API Method**: Alternatively, the bot sends the prompt to the Hugging Face API, which uses the Stable Diffusion model to generate an image.
3. **Image Retrieval**: Once the images are generated, the bot retrieves the image URLs and sends them back to the user in the chat.

## Getting Started

### Prerequisites

- Node.js
- Telegram Bot Token (obtainable from [BotFather](https://core.telegram.org/bots#botfather))
- Hugging Face API Key (obtainable from [Hugging Face](https://huggingface.co/))

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/telegram-image-gen-bot.git
    cd telegram-image-gen-bot
    ```

2. **Install the required dependencies:**
    ```bash
    npm install
    ```

3. **Set up your environment:**
    - Replace `'YOUR_BOT_TOKEN'` in the `bot.js` file with your actual Telegram bot token.
    - Replace `'HUGGING_FACE_API'` in the `generateImage.js` file with your actual Hugging Face API key.

4. **Run the bot:**
    ```bash
    node bot.js
    ```

5. **The bot will be running and listening on port 3000.**

### Usage

- **Start a chat with your bot on Telegram.**
- **Send a text prompt to the bot.**
- **Receive generated images directly in the chat.**

### Example Code Usage

If you want to directly use the Stable Diffusion model via the Hugging Face API, you can utilize the `generateImage` function provided in the `generateImage.js` file:

```javascript
const generateImage = require('./generateImage');

const prompt = 'A fantasy landscape with mountains and rivers';
generateImage(prompt)
    .then(imageUrl => console.log('Generated Image URL:', imageUrl))
    .catch(error => console.error('Error:', error));
```
### Troubleshooting

- If the bot fails to generate images, ensure that the external services are accessible and the selectors in Puppeteer are up-to-date.
- Check the console logs for any errors during the Puppeteer execution or API requests.

### Contributing

Contributions are welcome! Feel free to submit issues and pull requests to enhance the bot's functionality.
