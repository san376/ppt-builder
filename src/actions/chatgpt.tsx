"use server";
import { client } from "@/lib/prisma";
import { ContentItem, ContentType, Slide } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
// import OpenAI from "openai";
// import Anthropic from '@anthropic-ai/sdk'
// export const generateCreativePrompt = async (userPrompt: string) => {
//   // const openai = new OpenAI({
//   //   apiKey: process.env.OPENAI_API_KEY,
//   // });
//   const anthropic = new Anthropic({
//     apiKey: process.env.CLAUDE_API_KEY, // defaults to process.env["ANTHROPIC_API_KEY"]
//   });
//   const finalPrompt = `
// Create a coherent and relevant outline for the following prompt: ${userPrompt}.
// The outline should consist of at least 6 points, with each point written as a single sentence.
// Ensure the outline is well-structured and directly related to the topic.
// Return the output in the following JSON format:

// {
//     "outlines": [
//         "Point 1",
//         "Point 2",
//         "Point 3",
//         "Point 4",
//         "Point 5",
//         "Point 6"
//     ]
// }
//     Ensure that the JSON is valid and properly formatted. Do not include any other
//     text or explainations outside the JSON.
// `

// try {
//   const completion = await openai.chat.completions.create({
//     model: "chatgpt-4o-latest",
//     messages: [
//       {
//         role: "system",
//         content:
//           "You are a helpful AI that generates outlines for presentations.",
//       },
//       {
//         role: "user",
//         content: finalPrompt,
//       },
//     ],
//     max_tokens: 1000,
//     temperature: 0.0,
//   });

//   const responseContent = completion.choices[0].message?.content;
//   if (responseContent) {
//     try {
//       const jsonResponse = JSON.parse(responseContent);
//       return { status: 200, data: jsonResponse };
//     } catch (error) {
//       console.error("Invalid JSON received:", responseContent, error);
//       return { status: 500, error: "Invalid JSON format received from AI" };
//     }
//   }

//   return { status: 400, error: "No content generated" };
// } catch (error) {
//   console.error('ERROR', error)
//   return {status: 500, error:'Internal server error'}
// }

// import { GoogleGenerativeAI } from "@google/generative-ai";
// import "dotenv/config";

// const API_KEY = process.env.GEMINI_API_KEY as string;
// if (!API_KEY) {
//   throw new Error("Missing GEMINI_API_KEY in environment variables.");
// }

// const genAI = new GoogleGenerativeAI(API_KEY);

// export const generateCreativePrompt = async (userPrompt: string) => {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

//   const finalPrompt = `
// Create a coherent and relevant outline for the following prompt: ${userPrompt}.
// The outline should consist of at least 6 points, with each point written as a single sentence.
// Ensure the outline is well-structured and directly related to the topic.
// Return the output in **valid JSON format** without any additional text.

// \`\`\`json
// {
//     "outlines": [
//         "Point 1",
//         "Point 2",
//         "Point 3",
//         "Point 4",
//         "Point 5",
//         "Point 6"
//     ]
// }
// \`\`\`
// `;

//   try {
//     const result = await model.generateContent(finalPrompt);
//     const responseText = result.response.text().trim(); // Ensure trimmed response
//     console.log("Raw Response:", responseText);

//     if (!responseText) {
//       return { status: 400, error: "No content generated" };
//     }

//     // 🔹 **Extract JSON using Regex (Handles Extra Text)**
//     const match = responseText.match(/```json\n([\s\S]*?)\n```/);
//     const jsonText = match ? match[1] : responseText; // Get only the JSON part

//     let jsonResponse;
//     try {
//       jsonResponse = JSON.parse(jsonText);
//     } catch (error) {
//       console.warn("Response is not valid JSON. Returning raw content.");
//       return { status: 200, data: responseText }; // Return plain text if not JSON
//     }

//     return { status: 200, data: jsonResponse };
//   } catch (error) {
//     console.error("ERROR:", error);
//     return { status: 500, error: "Internal server error" };
//   }
// };

import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import { Content } from "vaul";

const API_KEY = process.env.GEMINI_API_KEY as string;

if (!API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const generateCreativePrompt = async (userPrompt: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const finalPrompt = `
Create a coherent and relevant outline for the following prompt: ${userPrompt}.
The outline should consist of at least 6 points, with each point written as a single sentence.
Ensure the outline is well-structured and directly related to the topic.
Return the output in **valid JSON format** without any additional text.

\`\`\`json
{
    "outlines": [
        "Point 1",
        "Point 2",
        "Point 3",
        "Point 4",
        "Point 5",
        "Point 6"
    ]
}
\`\`\`
`;

  try {
    const completion = await model.generateContent(finalPrompt);
    const responseText = completion.response.text().trim(); // Ensure trimmed response

    if (!responseText) {
      return { status: 400, error: "No content generated" };
    }

    // Extract JSON part if additional text is included
    const match = responseText.match(/```json\n([\s\S]*?)\n```/);
    const jsonText = match ? match[1] : responseText; // Get only the JSON part

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(jsonText);
      return { status: 200, data: jsonResponse };
    } catch (error) {
      console.warn("Response is not valid JSON. Returning raw content.");
      return { status: 200, data: responseText }; // Return plain text if not JSON
    }
  } catch (error) {
    console.error("ERROR:", error);
    return { status: 500, error: "Internal server error" };
  }
};

const existingLayouts = [
  {
    id: uuidv4(),
    slideName: "Image and text",
    type: "imageAndText",
    className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Image and text",
          className: "border",
          content: [
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "image" as ContentType,
                  name: "Image",
                  className: "p-3",
                  content: "",
                  alt: "Title",
                },
              ],
            },
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading1" as ContentType,
                  name: "Heading1",
                  content: "",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  Content: "",
                  placeholder: "start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Image and text",
    type: "imageAndText",
    className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Image and text",
          className: "border",
          content: [
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "image" as ContentType,
                  name: "Image",
                  className: "p-3",
                  content: "",
                  alt: "Title",
                },
              ],
            },
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading1" as ContentType,
                  name: "Heading1",
                  content: "",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  Content: "",
                  placeholder: "start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Image and text",
    type: "imageAndText",
    className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Image and text",
          className: "border",
          content: [
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "image" as ContentType,
                  name: "Image",
                  className: "p-3",
                  content: "",
                  alt: "Title",
                },
              ],
            },
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading1" as ContentType,
                  name: "Heading1",
                  content: "",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  Content: "",
                  placeholder: "start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Image and text",
    type: "imageAndText",
    className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Image and text",
          className: "border",
          content: [
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "image" as ContentType,
                  name: "Image",
                  className: "p-3",
                  content: "",
                  alt: "Title",
                },
              ],
            },
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading1" as ContentType,
                  name: "Heading1",
                  content: "",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  Content: "",
                  placeholder: "start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
          ],
        },
      ],
    },
  },
];

const generateImageUrl = async (prompt: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const improvedPrompt = `
Create a highly realistic, professional image based on the following description. The image should look as if captured in real life, with attention to detail, lighting, and texture.

Description: ${prompt}

Important Notes:
- The image must be in a photorealistic style and visually compelling.
- Ensure all text, signs, or visible writing in the image are in English.
- Pay special attention to lighting, shadows, and textures to make the image as lifelike as possible.
- Avoid elements that appear abstract, cartoonish, or overly artistic. The image should be suitable for professional presentations.
- Focus on accurately depicting the concept described, including specific objects, environment, mood, and context. Maintain relevance to the description provided.

Example Use Cases: Business presentations, educational slides, professional designs.
`;

    const result = await model.generateContent([{ text: improvedPrompt }]);

    // Correctly access the response structure
    const response = await result.response;
    const imageUrl = response.text(); // This extracts the generated image URL

    if (imageUrl) {
      console.log("✅ Image generated successfully:", imageUrl);
      return imageUrl;
    }

    return "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";
  } catch (error) {
    console.error("Failed to generate image:", error);
    return "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";
  }
};

const findImageComponents = (layout: ContentItem): ContentItem[] => {
  const images = [];

  // If the current layout is an image component, add it to the results
  if (layout.type === "image") {
    images.push(layout);
  }

  // If the layout has a content property, check its type
  if (Array.isArray(layout.content)) {
    // Iterate over the array and recursively call findImageComponents
    layout.content.forEach((child) => {
      images.push(...findImageComponents(child as ContentItem));
    });
  } else if (layout.content && typeof layout.content === "object") {
    // If content is an object, recursively call findImageComponents
    images.push(...findImageComponents(layout.content));
  }

  return images;
};

const replaceImagePlaceholders = async (layout: Slide) => {
  const imageComponents = findImageComponents(layout.content);
  console.log("🟢 Found image components:", imageComponents);
  for (const component of imageComponents) {
    console.log("🟢 Generating image for component:", component.alt);
    component.content = await generateImageUrl(
      component.alt || "Placeholder Image"
    );
  }
};

export const generateLayoutsJson = async (outlineArray: string[]) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  //
  const prompt = `### Guidelines
provide you with a pattern and a format to follow, and for each outline, you must generate unique layouts and contents and give me the output in the JSON format expected.

Our final JSON output is a combination of layouts and elements. The available LAYOUTS TYPES are as follows: "accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns", "tableLayout".

The available CONTENT TYPES are "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image", "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column"

Use these outlines as a starting point for the content of the presentations  
${JSON.stringify(outlineArray)}  

The output must be an array of JSON objects.  
1. Write layouts based on the specific outline provided. Do not use types that are not mentioned in the example layouts.  
2. Ensuring each layout is unique.  
3. Adhere to the structure of existing layouts  
4. Fill placeholder data into content fields where required.  
5. Generate unique image placeholders for the 'content' property of image components and also alt text according to the outline.  
6. Ensure proper formatting and schema alignment for the output JSON.  
7. First create LAYOUTS TYPES at the top most level of the JSON output as follows 
${JSON.stringify([
  {
    slideName: "Blank card",
    type: "blank-card",
    className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
    Content: {},
  },
])}

8. The content property of each LAYOUTS TYPE should start with “column” and within the columns content  
property you can use any of the CONTENT TYPES I provided above. Resizable-column, column and other  
multi element contents should be an array because you can have more elements inside them nested.  
Static elements like title and paragraph should have content set to a string. Here is an example of  
what 1 layout with 1 column with 1 title inside would look like:
${JSON.stringify([
  {
    slideName: "Blank card",
    type: "blank-card",
    className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "title" as ContentType,
          name: "Title",
          content: "",
          placeholder: "Untitled Card",
        },
      ],
    },
  },
])}

9. Here is a final example of an example output for you to get an idea
${JSON.stringify([
  {
    id: uuidv4(),
    slideName: "Blank card",
    type: "blank-card",
    className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "title" as ContentType,
          name: "Title",
          content: "",
          placeholder: "Untitled Card",
        },
      ],
    },
  },
  {
    id: uuidv4(),
    slideName: "Accent left",
    type: "accentLeft",
    className: "min-h-[300px]",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      restrictDropTo: true,
      content: [
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Resizable column",
          restrictToDrop: true,
          content: [
            {
              id: uuidv4(),
              type: "image" as ContentType,
              name: "Image",
              content:
                "https://plus.unsplash.com/premium_photo-1736338574763-6cc5bb4b734f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNjJ8fHxlbnwwfHx8fHw%3D",
              alt: "Title",
            },
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading1" as ContentType,
                  name: "Heading1",
                  content: "",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
          ],
        },
      ],
    },
  },
])}
             
            

 
For Images
- The alt text should describe the image clearly and concisely.
- Focus on the main subject(s) of the image and any relevant details such as colors, shapes, people, or objects.
- Ensure the alt text aligns with the context of the presentation slide it will be used on (e.g., professional, educational, business-related).
- Avoid using terms like "image of" or "picture of," and instead focus directly on the content and meaning.

Output the layouts in JSON format. Ensure there are no duplicate layouts across the array.
  `;

  try {
    console.log("Generating layouts...");
    const completion = await model.generateContent(prompt);
    const responseText = completion.response.text().trim(); // Ensure trimmed response

    if (!responseText) {
      return { status: 400, error: "No content generated" };
    }

    // Extract JSON part if additional text is included
    const match = responseText.match(/```json\n([\s\S]*?)\n```/);
    const jsonText = match ? match[1] : responseText; // Get only the JSON part

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(responseText.replace(/```json|```/g, ""));
      await Promise.all(jsonResponse.map(replaceImagePlaceholders));
    } catch (error) {
      console.warn("Error", error);
      throw new Error("Invalid JSON format received from AI"); // Return plain text if not JSON
    }

    console.log("Layouts generated successfully");
    return { status: 200, data: jsonResponse };
  } catch (error) {
    console.error("ERROR:", error);
    return { status: 500, error: "Internal server error" };
  }
};

export const generateLayouts = async (projectId: string, theme: string) => {
  try {
    if (!projectId) {
      return { status: 400, error: "Project ID is required" };
    }
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        error: "User not authenticated",
      };
    }
    const userExist = await client.user.findUnique({
      where: { clerkId: user.id },
    });
    if (!userExist || !userExist.subscription) {
      return {
        status: 403,
        error: userExist?.subscription
          ? "User does not have an active subscription"
          : "User not found in the database",
      };
    }

    const project = await client.project.findUnique({
      where: { id: projectId, isDeleted: false },
    });

    if (!project) {
      return { status: 404, error: "Project not found" };
    }

    if (!project.outlines || project.outlines.length === 0) {
      return { status: 400, error: "Project does not have any outlines" };
    }

    const layouts = await generateLayoutsJson(project.outlines);

    if (layouts.status !== 200) {
      return layouts;
    }

    await client.project.update({
      where: { id: projectId },
      data: { slides: layouts.data, themeName: theme },
    });

    return { status: 200, data: layouts.data };
  } catch (error) {
    console.error("🔴 ERROR:", error);
    return { status: 500, error: "Internal server error", data: [] };
  }
};
