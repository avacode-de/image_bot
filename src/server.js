const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const { Telegraf } = require('telegraf');

const app = express();
app.use(bodyParser.json());

const BOT_TOKEN = 'YOUR_BOT_TOKEN';
const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply('Hello! I am a bot that helps you find images on demand'));

const generateImage = async (prompt) => {
    const browser = await puppeteer.launch({ headless: true, 
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--window-size=1920,1080'
        ], slowMo : 50
    });
    const page = await browser.newPage();

    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    });

    setTimeout(() => {}, 5000);

    try {
        await page.goto('https://www.craiyon.com/', { waitUntil: 'networkidle2' });

        const inputSelector = 'textarea#prompt';
        const buttonSelector = 'button#generateButton';

        await page.waitForSelector(inputSelector, { timeout: 60000 });
        await page.type(inputSelector, prompt);

        await page.waitForSelector('#search-results', { timeout: 60000 });

        await page.click(buttonSelector);

        await page.waitForSelector('a.aspect-\\[1\\/1\\] img', { timeout: 60000 });

        const images = await page.$$eval('a.aspect-\\[1\\/1\\] img', imgs => imgs.map(img => img.src));

        await browser.close();
        return images.slice(0, 3); // Возвращаем только первые три изображения
    } catch (error) {
        await browser.close();
        throw new Error('Error generating images: ' + error.message);
    }
};


bot.on('text', async (ctx) => {
    const userQuery = ctx.message.text;
    console.log(`Received user query: ${userQuery}`);

    try {
        const images = await generateImage(userQuery);

        if (images.length > 0) {
            console.log('Generated images:', images);
            for (const imageUrl of images) {
                // Загружаем изображение и отправляем его в виде фотографии
                await ctx.replyWithPhoto(imageUrl);
            }
        } else {
            console.log('No images generated');
            ctx.reply('Не удалось сгенерировать изображения.');
        }
    } catch (error) {
        console.error(error.message);
        ctx.reply('Произошла ошибка при генерации изображения.');
    }
});


bot.launch();
console.log('Bot is running...');

app.listen(3000, () => {
    console.log('Server running on port 3000');
});