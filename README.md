# 🛡️ Guardian AI (with Bias Shield AI)

Guardian AI is a **safety layer for all AIs** — it works like a *guardian angel* sitting on top of other AI systems to prevent mistakes, bias, and harmful actions.  
It ensures that before an AI executes something irreversible or risky, it asks:  
> ❓ Is this safe?  
> ❓ Is this fair?  
> ❓ Could this harm the user or others?  

This project also includes **Bias Shield AI**, a sub-module that detects **biases in text, decisions, or models**, and flags them for review.  

---

## 🚨 The Problem
AI systems are powerful but sometimes make **serious mistakes**:
- An AI email assistant deleted all important emails by mistake.
- Recruitment AIs have shown **gender or racial bias**.
- Finance bots give **high-risk advice** without warnings.
- Health AIs may suggest **unsafe diets or habits**.

These mistakes happen because **AI lacks common sense and oversight**.

---

## 🛡️ The Solution — Guardian AI
Guardian AI is the **AI watchdog**:
- Monitors AI outputs and decisions.  
- Flags dangerous, biased, or unfair actions.  
- Warns the user before execution.  
- Ensures consistency and transparency across AI systems.  

Think of it as **“AI for monitoring AI”**.

---

## ✨ Key Features
- **Bias Detection** (via Bias Shield AI) → checks hiring texts, recruitment scores, or content for bias.  
- **Action Validator** → prevents destructive actions (e.g., deleting all emails).  
- **Risk Assessment** → rates AI outputs as safe, moderate, or dangerous.  
- **Explainability** → Guardian AI explains *why* it blocked or flagged something.  
- **UI/UX** → Light, consistent design, readable fonts, clear messaging.  

---

## 🏗️ Architecture

```
User Request → Target AI → Guardian AI (Review Layer) → Final Action / Warning
```

- **Frontend (Next.js + Tailwind + Framer Motion)** → clean, consistent UI  
- **Backend (Node/Express or Next.js API routes)** → connects Guardian AI logic  
- **Database (PostgreSQL / MongoDB)** → stores logs of flagged actions & user confirmations  
- **Integrations** → plug Guardian AI into multiple AIs (chatbots, assistants, automation tools)  

---

## 🚀 Demo Use Cases
- **Email Safety** → “Delete all emails” → Guardian AI warns about important messages.  
- **Recruitment** → “Rank candidates” → Bias Shield flags possible bias.  
- **Finance** → “Sell all stocks” → Guardian AI warns about high risk.  
- **Health** → “Make a diet plan” → Guardian AI prevents unsafe advice.  

---

## 🖼️ Screenshots
👉 Replace the placeholders below with your screenshots.

- **Landing Page (Guardian AI + Bias Shield AI branding)**  
  ![Landing Page](./screenshots/landing.png)

- **Bias Detection Bot**  
  ![Bias Bot](./screenshots/bias-bot.png)

- **Guardian Logs (AI Mistakes Prevention Log)**  
  ![Guardian Logs](./screenshots/logs.png)

- **System Architecture Diagram**  
  ![Architecture](./screenshots/architecture.png)

---

## ⚡ Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/guardian-ai.git
cd guardian-ai

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🛠️ Usage
1. Open the app in your browser: `http://guidance-ai.vercel.app`  
2. Try the **Bias Detection Bot** — type a text, see bias analysis.  
3. Use the **Guardian Logs** page — track flagged AI actions.  
4. Integrate Guardian AI API with your own AI assistants.  

---

## 📖 Example Guardian AI Warning
```json
{
  "action": "delete_emails",
  "risk": "high",
  "reason": "This will delete 1243 emails including 12 important ones.",
  "suggestion": "Confirm selection of emails before deletion."
}
```

--

AI is growing everywhere — but **who watches the AI?**  
Guardian AI is the **oversight layer** that keeps AIs **safe, fair, and trustworthy**.  
- Protects users from **AI accidents**.  
- Reduces **bias and unfairness**.  
- Builds **trust in automation**.  

> Just like antivirus protects your computer, **Guardian AI protects you from AI itself**.

---

## 👩‍💻 Team
- Subham Agarwal (Developer / Hackathon participant)  
- Vivek Kumar (AI/ML)
- Sundaram Gupta
- Shikhar Jain (UI/UX)
- Shekher Dube

---
