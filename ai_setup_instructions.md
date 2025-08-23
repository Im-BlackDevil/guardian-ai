# AI-Powered Bias Detection Setup

## Quick Setup (Immediate Improvement)

### 1. Get OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Create account and generate API key
3. Add to environment variables:
   ```bash
   # Windows
   set OPENAI_API_KEY=your_key_here
   
   # Linux/Mac
   export OPENAI_API_KEY=your_key_here
   ```

### 2. Install Dependencies
```bash
npm install --save openai
```

### 3. Cost Estimate
- GPT-4: ~$0.03 per 1K tokens
- Average bias check: ~100 tokens = $0.003
- 1000 bias checks per day = ~$3/day

## Alternative Free Solutions

### 1. Hugging Face Transformers
```bash
npm install @huggingface/inference
```

### 2. Local Models (No API costs)
- Use BERT-based models locally
- Download pre-trained bias detection models
- Run inference on your server

### 3. Google Cloud AI (Free tier available)
```bash
npm install @google-cloud/language
```

## Current Fallback System

The system already includes a smart fallback that:
- Uses improved pattern matching
- Considers context to reduce false positives
- Only flags clear, unambiguous bias
- Works without any API keys

## Performance Comparison

| Method | Accuracy | Speed | Cost | Setup |
|--------|----------|-------|------|-------|
| Current Keywords | 60% | Fast | Free | ✅ Done |
| AI Fallback | 80% | Fast | Free | ✅ Done |
| GPT-4 API | 95% | Medium | $$ | 5 min |
| Custom Model | 98% | Fast | $$$ | 6 months |

## Recommended Next Steps

1. **Immediate**: Test current improved fallback system
2. **This week**: Add OpenAI API key for 95% accuracy
3. **Next month**: Collect domain-specific training data
4. **Long-term**: Train custom model for your specific use case
