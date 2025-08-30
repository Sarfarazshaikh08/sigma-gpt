import "dotenv/config";

// This is for Gemini model
const getGeminiAPIResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GOOGLE_API_KEY, 
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: message } 
          ]
        }
      ]
    }),
  };

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent",
      options
    );

    const data = await response.json();

    // Gemini’s response format
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  } catch (err) {
    console.error(err);
    return "Error connecting to Gemini API";
  }
};

export default getGeminiAPIResponse;


// This is OpenAi model

// const getOpenAIAPIResponse = async(message) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-5-nano",
//             messages: [{
//                 role: "user",
//                 content: message
//             }]
//         })
//     };

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//         const data = await response.json();
//         return data.choices[0].message.content; //reply
//     } catch(err) {
//         console.log(err);
//     }
// }

// export default getOpenAIAPIResponse;