import express, { Application, Request, Response } from "express";
import mongoose, { Schema, Document, model, Types } from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
app.use(cors());

// Define request body type
interface EmailRequest {
  topic: string;
  keywords: string[];
  tone: "friendly" | "why" | "professional";
  language: string;
  userId: string;
}

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.DB_URL || "mongodb://127.0.0.1:27017/interview";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// User Schema & Model
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

// Content Schema & Model

interface IContent extends Document {
  topic: string;
  keywords: string[];
  language: string;
  userId: Types.ObjectId;
  tone: string;
  data: string;
  type: string;
}

const contentSchema = new Schema<IContent>(
  {
    topic: { type: String, required: true },
    keywords: { type: [String], required: true },
    language: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tone: { type: String, required: true },
    data: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

const Content = model<IContent>("Content", contentSchema);

const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Helper: generate content with Gemini
async function generateContent(prompt: string): Promise<string> {
  const result = await geminiModel.generateContent(prompt);
  return result.response.text();
}

async function saveContent(
  type: string,
  req: Request,
  res: Response,
  prompt: string
) {
  try {
    const { topic, keywords, language, userId, tone } = req.body;

    // Check user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Generate with Gemini
    const data = await generateContent(prompt);

    // Save in MongoDB
    const newContent = await Content.create({
      topic,
      keywords,
      language,
      userId,
      tone,
      data,
      type,
    });

    const populated = await newContent.populate("userId", "name email");

    return res.status(201).json({
      type,
      content: populated,
    });
  } catch (error) {
    console.error(`❌ Error generating ${type}:`, error);
    return res.status(500).json({ error: `Failed to generate ${type}` });
  }
}

// Routes
app.get("/users", async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
});

app.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: any = await User.findOne({ email });
    if (!user) {
      res.json({ message: "Wrong Email", success: false });
    }
    console.log(user , " asd aksd as daks dkas ", password)
    if (user?.password === password) {
      res.json({
        message: "User Logged in",
        success: true,
        data: { email: user.email, name: user.name },
      });
    } else {
      res.json({ message: "Wrong Password", success: false });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/content", async (req: Request, res: Response) => {
  const content = await Content.find();
  res.json(content);
});

app.post("/generate-email", async (req: Request, res: Response) => {
  const { topic, keywords, tone, language, userId } = req.body as EmailRequest;

  try {
    const prompt = `
Generate an email template with the following details:

- Topic: ${topic}
- Keywords: ${keywords.join(", ")}
- Tone: ${tone} (friendly, professional, why/explanatory)
- Language: ${language}

The email must include:
1. Subject line
2. Greeting
3. Body content
4. Closing and signature
`;
    console.log("called here mahesh 123123");
    const result = await geminiModel.generateContent(prompt);
    console.log("called here mahesh 123123", result);
    const email = result.response.text();
    console.log("called here mahesh 123123", email);
    const newContent = await Content.create({
      topic: topic,
      keywords: keywords,
      language: language,
      userId: userId,
      tone: tone,
      data: email,
      type: "email",
    });

    res.json({ newContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate email" });
  }
});

app.post("/instagram-caption", async (req: Request, res: Response) => {
  const { topic, keywords, tone, language } = req.body;

  const prompt = `
Generate a short and engaging Instagram caption.

- Topic: ${topic}
- Keywords: ${keywords.join(", ")}
- Tone: ${tone}
- Language: ${language}

Keep it creative and under 3 sentences.
`;

  return saveContent("instagram-caption", req, res, prompt);
});

// 2) Blog
app.post("/blog", async (req: Request, res: Response) => {
  const { topic, keywords, tone, language } = req.body;

  const prompt = `
Generate a blog article.

- Topic: ${topic}
- Keywords: ${keywords.join(", ")}
- Tone: ${tone}
- Language: ${language}

Include a title, introduction, 2-3 body paragraphs, and a conclusion.
`;

  return saveContent("blog", req, res, prompt);
});

// 3) Product Description
app.post("/product-description", async (req: Request, res: Response) => {
  const { topic, keywords, tone, language } = req.body;

  const prompt = `
Generate a product description.

- Product: ${topic}
- Keywords: ${keywords.join(", ")}
- Tone: ${tone}
- Language: ${language}

Make it persuasive and highlight benefits in 4-6 sentences.
`;

  return saveContent("product-description", req, res, prompt);
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
