const Groq = require('groq-sdk');
require('dotenv').config();

const client = new Groq({
    apiKey: process.env['GROQ_API_KEY'],
});


const getResponse = async (prompt) => {
    const chatCompletion = await client.chat.completions.create({
        messages: [
            {
                role: 'user',
                content: prompt
            },
            {
                role: 'system',
                content: `Act as an programming language expert who reads throw code ans provide scope of imporvement, bugs, and suggestions for the code provided by the user.
                while responding to user , you can use markdown to format your response.
                Suggestions (not more than 150 words)
                Imporoved Code
                Time and Space Complxity donot include any other explanation just in form of O()
                All these should in concise and clear manner `
            }
        ],
        model: 'llama3-70b-8192',
    });
    return chatCompletion.choices[0].message.content;
}
const getCode = async (prompt) => {
    const chatCompletion = await client.chat.completions.create({
        messages: [
            {
                role: 'user',
                content: prompt
            },
            {
                role: 'system',
                content: `You are a code corrector model. Your task is to read the code provided by the user and correct it.

Respond in markdown format.

Do **not** add any suggestions. Just provide the corrected code.

If the code is already correct, respond with: "The code is correct."`
            }
        ],
        model: 'llama3-70b-8192',
    });
    return chatCompletion.choices[0].message.content;
}


module.exports = { getResponse, getCode };