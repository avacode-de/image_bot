# Telegram Bot for Image Generation

This repository contains a Telegram bot that allows users to generate images based on their text prompts. The bot supports two methods for image generation: through Puppeteer automation and by utilizing the Stable Diffusion model hosted on Hugging Face.

## Features

⋅⋅*_Text-Based Image Generation:_ Users can send text prompts to the bot, which will return generated images based on the prompt.

*_Multiple Image Generation Methods:_
⋅⋅⋅*_Puppeteer Method:_ The bot launches a Puppeteer instance, navigates to the Craiyon (formerly DALL-E mini) website, and submits the prompt to generate images.

*_Telegram Bot Integration:_ Built with the Telegraf library, the bot is easy to deploy and integrates seamlessly with Telegram.
