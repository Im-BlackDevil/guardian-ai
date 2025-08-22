import { motion } from "framer-motion";
import { MessageSquare, Bot, AlertTriangle, CheckCircle, Send, Zap, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  biasDetected?: {
    type: string;
    explanation: string;
    suggestion: string;
    severity: 'low' | 'medium' | 'high';
  };
}

const RealTimeBiasBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Welcome to BiasShield AI! I'm here to help detect biases in real-time. Try typing something that might contain bias...",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [biasStats, setBiasStats] = useState({
    total: 0,
    groupthink: 0,
    anchoring: 0,
    genderCultural: 0,
    toxic: 0,
    confirmation: 0,
    stereotyping: 0
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isDemoRunning, setIsDemoRunning] = useState(false);
  
  // Predefined bias statements for demo
  const biasDemoStatements = [
    "Males are very responsible persons",
    "Females are very weak",
    "Everyone agrees with him, let's finalize this",
    "This guy is from IIT, he'll be better than the others",
    "My first impression is that this won't work",
    "This is absolutely terrible and stupid",
    "All women are emotional",
    "Proves my point exactly",
    "Older people can't learn new technology",
    "All students from that school are lazy"
  ];
  
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
    }
  };

  // Only scroll to bottom when new messages are added, not on every render
  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages.length]);

  // Enhanced bias detection logic (in real app, this would call OpenAI API)
  const detectBias = (text: string): ChatMessage['biasDetected'] | null => {
    const lowerText = text.toLowerCase();
    
    // Enhanced Gender/Cultural bias detection
    if (lowerText.includes('males are') || lowerText.includes('females are') ||
        lowerText.includes('men are') || lowerText.includes('women are') ||
        lowerText.includes('guys are') || lowerText.includes('girls are') ||
        lowerText.includes('this guy is from') || lowerText.includes('she\'s a woman') ||
        lowerText.includes('cultural background') || lowerText.includes('ethnicity') ||
        lowerText.includes('race') || lowerText.includes('nationality') ||
        lowerText.includes('religion') || lowerText.includes('age group') ||
        lowerText.includes('older people') || lowerText.includes('younger people')) {
      return {
        type: 'Gender/Cultural Bias',
        explanation: 'Making broad generalizations based on identity characteristics',
        suggestion: 'Evaluate individuals based on their actions and abilities, not demographics',
        severity: 'high'
      };
    }
    
    // Enhanced Groupthink detection
    if (lowerText.includes('everyone agrees') || lowerText.includes('we all think') || 
        lowerText.includes('nobody disagrees') || lowerText.includes('let\'s finalize this') ||
        lowerText.includes('consensus') || lowerText.includes('unanimous') ||
        lowerText.includes('all of us') || lowerText.includes('the whole team')) {
      return {
        type: 'Groupthink Bias',
        explanation: 'Assuming consensus without considering dissenting views',
        suggestion: 'Actively seek diverse perspectives before making decisions',
        severity: 'medium'
      };
    }
    
    // Enhanced Anchoring bias detection
    if (lowerText.includes('first impression') || lowerText.includes('initial thought') ||
        lowerText.includes('started with') || lowerText.includes('began with') ||
        lowerText.includes('first thing') || lowerText.includes('at first') ||
        lowerText.includes('originally') || lowerText.includes('initially')) {
      return {
        type: 'Anchoring Bias',
        explanation: 'Relying too heavily on first piece of information',
        suggestion: 'Evaluate all information equally, not just initial data',
        severity: 'low'
      };
    }
    
    // Enhanced Toxic/offensive tone detection
    if (lowerText.includes('stupid') || lowerText.includes('idiot') || 
        lowerText.includes('terrible') || lowerText.includes('awful') ||
        lowerText.includes('hate') || lowerText.includes('disgusting') ||
        lowerText.includes('useless') || lowerText.includes('worthless') ||
        lowerText.includes('ridiculous') || lowerText.includes('nonsense') ||
        lowerText.includes('crazy') || lowerText.includes('insane')) {
      return {
        type: 'Toxic Tone',
        explanation: 'Using emotionally charged or offensive language',
        suggestion: 'Express concerns constructively and professionally',
        severity: 'high'
      };
    }
    
    // New: Confirmation bias detection
    if (lowerText.includes('proves my point') || lowerText.includes('confirms what i thought') ||
        lowerText.includes('as expected') || lowerText.includes('i knew it') ||
        lowerText.includes('told you so') || lowerText.includes('obviously')) {
      return {
        type: 'Confirmation Bias',
        explanation: 'Seeking information that confirms existing beliefs',
        suggestion: 'Consider evidence that challenges your assumptions',
        severity: 'medium'
      };
    }
    
    // New: Stereotyping detection
    if (lowerText.includes('all') && (lowerText.includes('people') || lowerText.includes('men') || 
        lowerText.includes('women') || lowerText.includes('students') || lowerText.includes('workers'))) {
      return {
        type: 'Stereotyping Bias',
        explanation: 'Applying broad generalizations to entire groups',
        suggestion: 'Treat each person as an individual, not as a representative of a group',
        severity: 'high'
      };
    }
    
    return null;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      const biasDetected = detectBias(inputText);
      
      if (biasDetected) {
        // Update bias statistics
        setBiasStats(prev => ({
          total: prev.total + 1,
          groupthink: prev.groupthink + (biasDetected.type.includes('Groupthink') ? 1 : 0),
          anchoring: prev.anchoring + (biasDetected.type.includes('Anchoring') ? 1 : 0),
          genderCultural: prev.genderCultural + (biasDetected.type.includes('Gender/Cultural') ? 1 : 0),
          toxic: prev.toxic + (biasDetected.type.includes('Toxic') ? 1 : 0),
          confirmation: prev.confirmation + (biasDetected.type.includes('Confirmation') ? 1 : 0),
          stereotyping: prev.stereotyping + (biasDetected.type.includes('Stereotyping') ? 1 : 0)
        }));
        
        // Add bias detection message
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: `🚨 **Bias Detected: ${biasDetected.type}**\n\n💡 **Explanation:** ${biasDetected.explanation}\n\n✨ **Suggestion:** ${biasDetected.suggestion}`,
          sender: 'bot',
          timestamp: new Date(),
          biasDetected
        };
        
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Add confirmation message
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: '✅ No biases detected in this message. Great job communicating objectively!',
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
      }
      
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <AlertTriangle className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const demoChat = () => {
    if (isDemoRunning) return;
    
    setIsDemoRunning(true);
    
    // Randomly select one statement from the predefined list
    const randomIndex = Math.floor(Math.random() * biasDemoStatements.length);
    const selectedStatement = biasDemoStatements[randomIndex];
    
    // Add user message
    const userMessage: ChatMessage = {
      id: `demo-user-${Date.now()}`,
      text: selectedStatement,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      const biasDetected = detectBias(selectedStatement);
      
      if (biasDetected) {
        // Update bias statistics
        setBiasStats(prev => ({
          total: prev.total + 1,
          groupthink: prev.groupthink + (biasDetected.type.includes('Groupthink') ? 1 : 0),
          anchoring: prev.anchoring + (biasDetected.type.includes('Anchoring') ? 1 : 0),
          genderCultural: prev.genderCultural + (biasDetected.type.includes('Gender/Cultural') ? 1 : 0),
          toxic: prev.toxic + (biasDetected.type.includes('Toxic') ? 1 : 0),
          confirmation: prev.confirmation + (biasDetected.type.includes('Confirmation') ? 1 : 0),
          stereotyping: prev.stereotyping + (biasDetected.type.includes('Stereotyping') ? 1 : 0)
        }));
        
        // Add bias detection message
        const botMessage: ChatMessage = {
          id: `demo-bot-${Date.now()}`,
          text: `🚨 **Bias Detected: ${biasDetected.type}**\n\n💡 **Explanation:** ${biasDetected.explanation}\n\n✨ **Suggestion:** ${biasDetected.suggestion}`,
          sender: 'bot',
          timestamp: new Date(),
          biasDetected
        };
        
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Add confirmation message
        const botMessage: ChatMessage = {
          id: `demo-bot-${Date.now()}`,
          text: '✅ No biases detected in this message. Great job communicating objectively!',
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
      }
      
      setIsDemoRunning(false);
    }, 1500);
  };



  return (
    <motion.section
      id="realtime-bot"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-Time Bias Detection Bot</h2>
          <p className="text-xl text-muted-foreground">
            Experience live bias detection as you type. This simulates how BiasShield AI works in real chat platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
                         <Card className="shadow-card h-[600px] flex flex-col overflow-hidden relative chat-container" style={{ minHeight: '600px' }}>
              <CardHeader className="border-b border-border">
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                  Live Chat Simulation
                  <Badge variant="outline" className="ml-2 bg-success/10 text-success border-success/20">
                    <Bot className="h-3 w-3 mr-1" />
                    AI Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                                                  {/* Messages Area - Contained within chat box boundaries */}
                 <div className="flex-1 overflow-y-auto p-4 space-y-4 relative border-r border-border/20 chat-scroll-container" style={{ scrollbarWidth: 'thin' }}>
                   {/* All messages stay within this container */}
                   <div className="min-h-full pb-4">
                     {messages.map((message) => (
                       <motion.div
                         key={message.id}
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                       >
                         <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                           <div className={`rounded-lg p-3 ${
                             message.sender === 'user' 
                               ? 'bg-primary text-primary-foreground' 
                               : 'bg-muted'
                           }`}>
                             <div className="text-sm whitespace-pre-wrap break-words">{message.text}</div>
                             <div className={`text-xs mt-2 ${
                               message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                             }`}>
                               {message.timestamp.toLocaleTimeString()}
                             </div>
                           </div>
                           
                           {/* Bias Detection Badge - Contained within message */}
                           {message.biasDetected && (
                             <motion.div
                               initial={{ scale: 0.8, opacity: 0 }}
                               animate={{ scale: 1, opacity: 1 }}
                               className={`mt-2 flex items-center space-x-2 ${getSeverityColor(message.biasDetected.severity)} px-3 py-2 rounded-md border max-w-full`}
                             >
                               {getSeverityIcon(message.biasDetected.severity)}
                               <span className="text-xs font-medium truncate">{message.biasDetected.type}</span>
                             </motion.div>
                           )}
                         </div>
                       </motion.div>
                     ))}
                     
                     {/* Analyzing indicator - Contained within chat box */}
                     {isAnalyzing && (
                       <motion.div
                         initial={{ opacity: 0, scale: 0.8 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="flex justify-start mb-4"
                       >
                         <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                           <div className="flex items-center space-x-2">
                             <motion.div
                               animate={{ rotate: 360 }}
                               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                             >
                               <Zap className="h-4 w-4 text-primary" />
                             </motion.div>
                             <span className="text-sm text-muted-foreground">Analyzing for biases...</span>
                           </div>
                         </div>
                       </motion.div>
                     )}
                     
                     {/* Demo analyzing indicator - Contained within chat box */}
                     {isDemoRunning && (
                       <motion.div
                         initial={{ opacity: 0, scale: 0.8 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="flex justify-start mb-4"
                       >
                         <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 max-w-[80%]">
                           <div className="flex items-center space-x-2">
                             <motion.div
                               animate={{ rotate: 360 }}
                               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                             >
                               <Bot className="h-4 w-4 text-primary" />
                             </motion.div>
                             <span className="text-sm text-primary font-medium">Analyzing demo message...</span>
                           </div>
                         </div>
                       </motion.div>
                     )}
                     
                     {/* Scroll anchor - Hidden but functional */}
                     <div ref={messagesEndRef} className="h-0" />
                   </div>
                 </div>
                
                {/* Input Area */}
                <div className="border-t border-border p-4">
                  <div className="flex space-x-2">
                    <Input
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message to test bias detection..."
                      className="flex-1"
                      disabled={isAnalyzing}
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={!inputText.trim() || isAnalyzing}
                      size="sm"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                                     <p className="text-xs text-muted-foreground mt-2">
                     Try phrases like "Everyone agrees with this" or "This guy is from IIT, he'll be better", or click "Demo Chat" for a random bias example
                   </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bias Statistics */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="shadow-card h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Bias Scorecard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Total Biases */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{biasStats.total}</div>
                  <div className="text-sm text-muted-foreground">Total Biases Detected</div>
                </div>
                
                {/* Bias Breakdown */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Groupthink</span>
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                      {biasStats.groupthink}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Anchoring</span>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      {biasStats.anchoring}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Gender/Cultural</span>
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                      {biasStats.genderCultural}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Toxic Tone</span>
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                      {biasStats.toxic}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Confirmation</span>
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                      {biasStats.confirmation}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Stereotyping</span>
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                      {biasStats.stereotyping}
                    </Badge>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="space-y-3 pt-4 border-t border-border">
                                     <Button 
                     variant="outline" 
                     size="sm" 
                     className="w-full"
                                           onClick={() => {
                        setMessages([{
                          id: '1',
                          text: "Welcome to BiasShield AI! I'm here to help detect biases in real-time. Try typing something that might contain bias...",
                          sender: 'bot',
                          timestamp: new Date()
                        }]);
                        setBiasStats({
                          total: 0,
                          groupthink: 0,
                          anchoring: 0,
                          genderCultural: 0,
                          toxic: 0,
                          confirmation: 0,
                          stereotyping: 0
                        });
                        setInputText('');
                        setIsAnalyzing(false);
                        setIsDemoRunning(false);
                      }}
                     disabled={isDemoRunning}
                   >
                     Reset Chat
                   </Button>
                  
                                     <Button 
                     variant="outline" 
                     size="sm" 
                     className="w-full"
                     onClick={demoChat}
                     disabled={isDemoRunning}
                   >
                     {isDemoRunning ? 'Analyzing...' : 'Demo Chat'}
                   </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Integration Info */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Card className="shadow-card border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3">Ready for Real Integration?</h3>
              <p className="text-muted-foreground mb-4">
                This demo shows how BiasShield AI would work in Discord, Slack, Microsoft Teams, and other chat platforms.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="outline" className="px-3 py-1">Discord Bot</Badge>
                <Badge variant="outline" className="px-3 py-1">Slack Integration</Badge>
                <Badge variant="outline" className="px-3 py-1">Teams Webhook</Badge>
                <Badge variant="outline" className="px-3 py-1">CLI Tool</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default RealTimeBiasBot;
