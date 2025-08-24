# 🛡️ Guardian AI - Advanced AI Action Validation System

## 📋 **Overview**

Guardian AI is a comprehensive safety and bias detection system that validates AI actions before execution. It acts as a protective layer between AI systems and potentially harmful operations, ensuring safety, fairness, and compliance.

## 🚀 **Key Features**

### **1. Action Validation**
- **Dangerous Action Detection**: Identifies destructive operations (database deletion, file system operations, financial transactions)
- **Bias Detection**: Detects gender, racial, age, and educational biases in AI actions
- **Toxicity Analysis**: Identifies harmful or inappropriate language patterns
- **Context Awareness**: Distinguishes between positive and negative contexts

### **2. Multi-Model Coordination**
- **AI Model Orchestration**: Coordinates multiple AI models for comprehensive decision-making
- **Consensus Rules**: Implements intelligent consensus mechanisms
- **Escalation Logic**: Automatically escalates disputed decisions to human review

### **3. Comprehensive Logging**
- **Action Tracking**: Logs all AI actions with detailed metadata
- **Performance Metrics**: Tracks bias scores, toxicity scores, and confidence levels
- **Audit Trail**: Maintains complete history for compliance and debugging

## 🏗️ **Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Guardian AI   │    │   Backend       │
│   (React)       │◄──►│   Backend       │◄──►│   (Express)     │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Guardian      │    │   Action        │    │   Logs          │
│   Demo          │    │   Validation    │    │   Storage       │
│   Component     │    │   Engine        │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 **Installation & Setup**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- MongoDB (optional, for production)

### **1. Install Dependencies**
```bash
npm install
```

### **2. Environment Variables**
Create `.env` file:
```env
# OpenAI API Key (for enhanced AI features)
OPENAI_API_KEY=your_openai_api_key_here

# MongoDB Connection (optional)
MONGO_URI=mongodb://localhost:27017/guardian-ai

# Server Configuration
PORT=3001
NODE_ENV=development
```

### **3. Start Development Server**
```bash
# Start backend
npm run dev:backend

# Start frontend (in another terminal)
npm run dev
```

## 📡 **API Endpoints**

### **Guardian AI Routes**

#### **POST /guardian/check-action**
Validates an AI action using Guardian AI logic.

**Request Body:**
```json
{
  "action": "delete all user accounts",
  "context": "User requested account deletion",
  "userId": "user123",
  "sessionId": "session456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "blocked",
    "safe": false,
    "reason": "Mass user account modification detected",
    "confidence": 0.95,
    "riskLevel": "high",
    "suggestions": [
      "This action could cause irreversible damage. Please review and reconsider."
    ],
    "metadata": {
      "biasScore": 0,
      "toxicityScore": 0,
      "actionCategory": "deletion",
      "detectedThreats": ["userAccounts"]
    }
  }
}
```

#### **GET /guardian/logs**
Retrieves Guardian AI logs with filtering and pagination.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 50)
- `status`: Filter by status (approved, warn, blocked)
- `actionCategory`: Filter by action category
- `startDate`: Filter by start date
- `endDate`: Filter by end date

#### **POST /guardian/logs**
Saves Guardian results to storage.

#### **GET /guardian/stats**
Returns Guardian AI statistics and metrics.

## 🎯 **Usage Examples**

### **1. Basic Action Validation**
```typescript
import { guardianAI } from './backend/guardian';

const action = {
  action: "transfer all funds to external account",
  context: "User requested money transfer",
  userId: "user123",
  timestamp: new Date()
};

const result = guardianAI.validateAction(action);
console.log(result.status); // "blocked"
console.log(result.reason); // "Financial risk detected"
```

### **2. Integration with Existing Systems**
```typescript
// Before executing any AI action
async function executeAIAction(action: string, context: string) {
  try {
    // Validate with Guardian AI
    const response = await fetch('/guardian/check-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, context })
    });
    
    const result = await response.json();
    
    if (result.data.status === 'blocked') {
      throw new Error(`Action blocked: ${result.data.reason}`);
    }
    
    if (result.data.status === 'warn') {
      console.warn(`Warning: ${result.data.reason}`);
      // Show warning modal but allow proceed
    }
    
    // Proceed with action execution
    return await performAction(action);
    
  } catch (error) {
    console.error('Action validation failed:', error);
    throw error;
  }
}
```

### **3. Custom Bias Detection**
```typescript
// Extend Guardian AI with custom patterns
class CustomGuardianAI extends GuardianAI {
  protected checkCustomBias(text: string) {
    // Add your custom bias detection logic
    const customPatterns = [
      /your_custom_pattern/gi
    ];
    
    // Implementation...
  }
}
```

## 🎨 **Frontend Components**

### **Guardian AI Demo**
The demo component showcases Guardian AI's multi-model coordination:

```tsx
import GuardianAIDemo from '@/components/GuardianAIDemo';

// In your component
const [showGuardianDemo, setShowGuardianDemo] = useState(false);

{showGuardianDemo && (
  <GuardianAIDemo onClose={() => setShowGuardianDemo(false)} />
)}
```

### **Guardian Logs Page**
Access logs at `/logs` route:

```tsx
import GuardianLogs from '@/pages/logs';

// The page includes:
// - Real-time statistics
// - Advanced filtering
// - Export functionality
// - Pagination
```

## 🔒 **Security Features**

### **1. Action Pattern Recognition**
- **Database Operations**: Detects destructive database commands
- **File System**: Identifies dangerous file operations
- **Financial**: Monitors high-risk financial transactions
- **User Management**: Prevents mass account modifications

### **2. Bias Detection Patterns**
- **Gender Stereotyping**: Detects gender-based assumptions
- **Racial Bias**: Identifies racial discrimination
- **Age Discrimination**: Catches age-based biases
- **Educational Bias**: Monitors institutional favoritism

### **3. Toxicity Analysis**
- **Explicit Language**: Identifies harmful words and phrases
- **Violent Content**: Detects threats and violence
- **Context Awareness**: Distinguishes positive from negative usage

## 📊 **Monitoring & Analytics**

### **1. Real-time Metrics**
- Total actions processed
- Approval rates
- Bias detection frequency
- Risk level distribution

### **2. Performance Indicators**
- Response times
- Confidence scores
- False positive rates
- System uptime

### **3. Export Capabilities**
- CSV export for analysis
- JSON API for integration
- Real-time streaming

## 🚀 **Deployment**

### **1. Development**
```bash
npm run dev
```

### **2. Production Build**
```bash
npm run build
npm start
```

### **3. Docker Deployment**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

### **4. Environment Variables**
```bash
# Production
NODE_ENV=production
PORT=3001
MONGO_URI=mongodb://your-mongo-uri
OPENAI_API_KEY=your-production-key
```

## 🔧 **Configuration**

### **1. Bias Detection Sensitivity**
```typescript
// Adjust detection thresholds
const biasThresholds = {
  gender: 0.7,      // 70% confidence required
  racial: 0.8,      // 80% confidence required
  age: 0.75,        // 75% confidence required
  educational: 0.9   // 90% confidence required
};
```

### **2. Action Categories**
```typescript
// Customize action categorization
const actionCategories = {
  deletion: ['delete', 'remove', 'wipe', 'clear'],
  creation: ['create', 'add', 'generate', 'build'],
  modification: ['update', 'change', 'modify', 'edit'],
  financial: ['transfer', 'withdraw', 'send', 'pay']
};
```

### **3. Risk Levels**
```typescript
// Define risk level thresholds
const riskLevels = {
  low: 0.3,      // 0-30% risk
  medium: 0.6,   // 31-60% risk
  high: 0.8,     // 61-80% risk
  critical: 0.9  // 81-100% risk
};
```

## 🧪 **Testing**

### **1. Unit Tests**
```bash
npm run test
```

### **2. Integration Tests**
```bash
npm run test:integration
```

### **3. Manual Testing**
```bash
# Test Guardian AI endpoints
curl -X POST http://localhost:3001/guardian/check-action \
  -H "Content-Type: application/json" \
  -d '{"action":"delete all files","context":"test"}'
```

## 📈 **Performance Optimization**

### **1. Caching**
- Implement Redis for session storage
- Cache validation results
- Optimize pattern matching

### **2. Database Optimization**
- Index frequently queried fields
- Implement connection pooling
- Use read replicas for logs

### **3. API Optimization**
- Implement rate limiting
- Add request validation
- Use compression middleware

## 🔮 **Future Enhancements**

### **1. Machine Learning Integration**
- Train custom bias detection models
- Implement adaptive thresholds
- Add anomaly detection

### **2. Advanced Analytics**
- Predictive risk assessment
- Trend analysis
- Behavioral profiling

### **3. Integration Capabilities**
- Webhook support
- Third-party API integration
- Plugin architecture

## 📞 **Support & Contributing**

### **1. Issues & Bug Reports**
- Use GitHub Issues
- Provide detailed reproduction steps
- Include environment information

### **2. Feature Requests**
- Describe use case clearly
- Provide mockups if possible
- Consider implementation complexity

### **3. Contributing**
- Fork the repository
- Create feature branch
- Submit pull request
- Follow coding standards

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 **Acknowledgments**

- Built with React, TypeScript, and Tailwind CSS
- Powered by Express.js backend
- Enhanced with Framer Motion animations
- Designed for maximum safety and usability

---

**Guardian AI** - Protecting AI systems, one action at a time. 🛡️✨
