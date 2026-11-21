const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const reviewCode = async (language, code) => {

  const prompt = `
You are an expert ${language} code reviewer.

Analyze the following code.

Return ONLY valid JSON.

Rules:
- Score is REQUIRED.
- Score must be an integer between 0 and 100.
- Evaluate based on:
  1. Correctness
  2. Readability
  3. Efficiency
  4. Coding Standards
  5. Best Practices
- Give exactly 3 strengths.
- Give exactly 3 improvements.
- Return the fully corrected code.
- Give exactly 3 interview questions based on this code.
- Give exactly 4 recommended topics the student should study.
- Estimate the Time Complexity.
- Estimate the Space Complexity.
- Classify the code difficulty as Easy, Medium or Hard.
- Do NOT return markdown.
- Do NOT write explanations.
- Do NOT omit any field.

Return exactly this JSON:

{
  "score": 85,

  "strengths": [
    "Point 1",
    "Point 2",
    "Point 3"
  ],

  "improvements": [
    "Point 1",
    "Point 2",
    "Point 3"
  ],

  "correctedCode": "Complete corrected code",

  "interviewQuestions": [
    "Question 1",
    "Question 2",
    "Question 3"
  ],

  "recommendedTopics": [
    "Topic 1",
    "Topic 2",
    "Topic 3",
    "Topic 4"
  ],

  "timeComplexity": "O(n)",

  "spaceComplexity": "O(1)",

  "difficulty": "Medium"
}

Code:

${code}
`;

 
try {

    const completion = await groq.chat.completions.create({

      model: "openai/gpt-oss-120b",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.2,

    });



    const text = completion.choices[0].message.content;

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("\n===== RAW AI RESPONSE =====");
    console.log(cleaned);
    console.log("===========================\n");

    const result = JSON.parse(cleaned);

    // Score
    result.score = Math.max(
      0,
      Math.min(100, Number(result.score) || 0)
    );

    // Arrays
    if (!Array.isArray(result.strengths)) {
      result.strengths = [];
    }

    if (!Array.isArray(result.improvements)) {
      result.improvements = [];
    }

    if (!Array.isArray(result.interviewQuestions)) {
      result.interviewQuestions = [];
    }

    if (!Array.isArray(result.recommendedTopics)) {
      result.recommendedTopics = [];
    }

    // Complexity
    result.timeComplexity =
      result.timeComplexity || "Not Determined";

    result.spaceComplexity =
      result.spaceComplexity || "Not Determined";

    result.difficulty =
      result.difficulty || "Medium";

    console.log("\n===== PARSED JSON =====");
    console.log(result);
    console.log("=======================\n");

    return result;

  } catch (error) {

    console.error("Groq Error:", error);

    return {

      score: 0,

      strengths: [
        "Unable to analyze code."
      ],

      improvements: [
        "Please try again."
      ],

      correctedCode: code,

      interviewQuestions: [],

      recommendedTopics: [],

      timeComplexity: "Not Determined",

      spaceComplexity: "Not Determined",

      difficulty: "Unknown",

    };

  }

};

module.exports = {
  reviewCode,
};