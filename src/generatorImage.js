const axios = require('axios');

const HUGGING_FACE_API_KEY = 'HUGGING_FACE_API';
const MODEL_URL = 'https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4';

async function generateImage(prompt) {
    try {
        const response = await axios.post(MODEL_URL, { inputs: prompt }, {
            headers: {
                'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Ответ от сервера', response.data);

        if (!response.data.generated_image_url) {
            throw new Error('Ошибка при получении URL сгенерированного изображения');
        }

        return response.data.generated_image_url;
    } catch (error) {
        console.error('Произошла ошибка при генерации изображения:', error.message);
        throw error; // Прокидываем ошибку выше для обработки в вызывающем коде
    }
}

module.exports = generateImage;
