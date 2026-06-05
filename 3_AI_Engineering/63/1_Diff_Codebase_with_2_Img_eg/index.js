import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const imgURL = "https://scrimba.com/links/cheese-1-img";
const imgURL2 = "https://scrimba.com/links/cheese-2-img";

const response = await openai.chat.completions.create({
  model: "gpt-4-vision-preview",
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "What's the difference between these two types of cheese?" },
        {
          type: "image_url",
          image_url: {
            url: imgURL
          }
        },
        {
          type: "image_url",
          image_url: {
            url: imgURL2
          }
        }
      ]
    }
  ]
});
console.log(response.choices[0]);

document.body.innerHTML = `
  <img src="${imgURL}" alt="Cheese">
  <img src="${imgURL2}" alt="Cheese">
`;

// The two types of cheese depicted in the images are distinctly different in terms of texture, taste, and the process through which they are made. The first cheese in the image is a Brie type or similar soft cheese, characterized by its soft, creamy interior and white, edible rind. This cheese is typically made from cow's milk and is known for its rich, buttery, and slightly earthy flavor. The rind develops from being surface-ripened with cultures, usually including Penicillium candidum or similar molds, which help to break down the cheese from the outside in as it ages. The second cheese appears to be a type of blue cheese, which is identifiable by the blue or blue-green veining throughout the cheese. This is created by the introduction of Penicillium roqueforti or Penicillium glaucum molds. The cheese is then aged in a temperature and humidity-controlled environment that facilitates the growth of these molds. Blue cheeses are known for their pungent, sharp, and sometimes spicy flavors. Thus, the main differences lie in the type of molds used, the aging process, texture, and flavor profiles. Soft cheeses like Brie have a smooth, creamy texture and a mild taste, while blue cheeses have a crumbly to creamy texture with more intense, tangy, and rich flavors.

