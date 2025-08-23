import { motion } from "framer-motion";
import { MessageSquare, Bot, AlertTriangle, CheckCircle, Send, Zap, Shield, TrendingUp, Brain, Target, Users, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import { biasDetectionService, BiasAnalysis, TextAnalysis } from "@/lib/biasDetectionService";
import { detectBiasRules } from "../utils/biasRules";
import { detectBiasML } from "../utils/mlBias";
// import { aiBiasDetector } from "../utils/aibiasDetection";


interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  biasAnalysis?: TextAnalysis;
}

const RealTimeBiasBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Welcome to BiasShield AI! I'm here to help detect biases in real-time using advanced AI analysis. Try typing something that might contain bias...",
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
    
    try {
      // Use both rule-based and ML-based bias detection
      const rules = detectBiasRules(inputText);
      const ml = await detectBiasML(inputText);
      
      console.log("Rule-based bias:", rules);
      console.log("ML-based bias:", ml);
      
      // Determine if bias is detected based on our functions
      const hasBias = rules.length > 0 || ml.length > 0;
      
      if (hasBias) {
        // Update bias statistics
        setBiasStats(prev => ({
          total: prev.total + 1,
          groupthink: prev.groupthink + (ml.includes('groupthink') ? 1 : 0),
          anchoring: prev.anchoring + (ml.includes('anchoring') ? 1 : 0),
          genderCultural: prev.genderCultural + (ml.includes('gender_bias') || ml.includes('cultural_bias') ? 1 : 0),
          toxic: prev.toxic + (ml.includes('toxic') ? 1 : 0),
          confirmation: prev.confirmation + (ml.includes('confirmation') ? 1 : 0),
          stereotyping: prev.stereotyping + (ml.includes('stereotyping') ? 1 : 0)
        }));
        
        // Short and precise bias detection message
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: `🚨 **Bias Detected!**\n\n**🔍 Bias Type:** ${getBiasTypeDisplay(rules, ml)}\n\n**⚠️ Warning:** ${getWarningMessage(rules, ml)}\n\n**💡 Recommended:** ${getRecommendedSentence(inputText, rules, ml)}`,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Short confirmation message
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: `✅ **No Bias Detected**\n\nYour message appears to be bias-free and professional.`,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Bias detection error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: '❌ **Analysis Error**\n\nPlease try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAnalyzing(false);
    }
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
      case 'medium': return <AlertCircle className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const demoChat = async () => {
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
    
              try {
       // Use both rule-based and ML-based bias detection for demo
       const rules = detectBiasRules(selectedStatement);
       const ml = await detectBiasML(selectedStatement);
       
       console.log("Demo - Rule-based bias:", rules);
       console.log("Demo - ML-based bias:", ml);
       
       // Determine if bias is detected based on our functions
       const hasBias = rules.length > 0 || ml.length > 0;
       
       if (hasBias) {
                 // Update bias statistics
                   setBiasStats(prev => ({
            total: prev.total + 1,
            groupthink: prev.groupthink + (ml.includes('groupthink') ? 1 : 0),
            anchoring: prev.anchoring + (ml.includes('anchoring') ? 1 : 0),
            genderCultural: prev.genderCultural + (ml.includes('gender_bias') || ml.includes('cultural_bias') ? 1 : 0),
            toxic: prev.toxic + (ml.includes('toxic') ? 1 : 0),
            confirmation: prev.confirmation + (ml.includes('confirmation') ? 1 : 0),
            stereotyping: prev.stereotyping + (ml.includes('stereotyping') ? 1 : 0)
          }));
          
          // Short and precise demo bias detection message
          const botMessage: ChatMessage = {
            id: `demo-bot-${Date.now()}`,
            text: `🚨 **Demo: Bias Detected!**\n\n**🔍 Bias Type:** ${getBiasTypeDisplay(rules, ml)}\n\n**⚠️ Warning:** ${getWarningMessage(rules, ml)}\n\n**💡 Recommended:** ${getRecommendedSentence(selectedStatement, rules, ml)}`,
            sender: 'bot',
            timestamp: new Date()
          };
        
        setMessages(prev => [...prev, botMessage]);
             } else {
         // Short confirmation message for demo
         const botMessage: ChatMessage = {
           id: `demo-bot-${Date.now()}`,
           text: `✅ **Demo: No Bias Detected**\n\nThis demo message appears to be bias-free.`,
           sender: 'bot',
           timestamp: new Date()
         };
         
         setMessages(prev => [...prev, botMessage]);
       }
    } catch (error) {
      console.error('Demo analysis error:', error);
      const errorMessage: ChatMessage = {
        id: `demo-bot-${Date.now()}`,
        text: '❌ **Demo Analysis Error**\n\nSorry, there was an error analyzing the demo message. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsDemoRunning(false);
    }
  };

  // Helper functions for better bias detection messages
  const getBiasTypeDisplay = (rules: string[], ml: string[]) => {
    const allTypes = [...new Set([...rules, ...ml])];
    
    if (allTypes.length === 0) return "None detected";
    
    // Map technical terms to user-friendly names
    const typeMapping: { [key: string]: string } = {
      'groupthink': '🤝 Groupthink Bias',
      'anchoring': '⚓ Anchoring Bias', 
      'gender_bias': '🚻 Gender Bias',
      'cultural_bias': '🌍 Cultural Bias',
      'toxic': '☠️ Toxic Language',
      'confirmation': '✅ Confirmation Bias',
      'stereotyping': '🏷️ Stereotyping',
      'generalization': '📊 Over-Generalization',
      'everyone': '👥 Group Generalization',
      'every': '📊 Absolute Statement',
      'always': '⏰ Absolute Statement',
      'never': '⏰ Absolute Statement',
      'finalize': '🔒 Premature Decision',
      'agrees': '🤝 Assumed Consensus',
      'stupid': '😤 Insulting Language',
      'terrible': '😤 Negative Language',
      'iit': '🎓 Educational Bias',
      'better': '⭐ Comparative Bias',
      'women': '👩 Gender Stereotyping',
      'men': '👨 Gender Stereotyping',
      'males': '👨 Gender Stereotyping',
      'females': '👩 Gender Stereotyping'
    };
    
    return allTypes.map(type => typeMapping[type] || type).join(', ');
  };

  const getWarningMessage = (rules: string[], ml: string[]) => {
    const allTypes = [...new Set([...rules, ...ml])];
    
    if (allTypes.length === 0) return "No bias detected";
    
    const warnings: string[] = [];
    
    if (allTypes.some(t => t.includes('groupthink') || t.includes('agrees') || t.includes('finalize'))) {
      warnings.push("This can suppress diverse opinions and lead to poor decision-making");
    }
    if (allTypes.some(t => t.includes('stereotyping') || t.includes('women') || t.includes('men') || t.includes('males') || t.includes('females'))) {
      warnings.push("This reinforces harmful stereotypes and excludes individuals");
    }
    if (allTypes.some(t => t.includes('toxic') || t.includes('stupid') || t.includes('terrible'))) {
      warnings.push("This creates a hostile environment and damages team relationships");
    }
    if (allTypes.some(t => t.includes('generalization') || t.includes('everyone') || t.includes('always') || t.includes('never'))) {
      warnings.push("This oversimplifies complex situations and ignores exceptions");
    }
    if (allTypes.some(t => t.includes('iit') || t.includes('better'))) {
      warnings.push("This unfairly judges people based on background rather than merit");
    }
    if (allTypes.some(t => t.includes('anchoring') || t.includes('first impression'))) {
      warnings.push("This can limit your perspective and prevent better solutions");
    }
    if (allTypes.some(t => t.includes('confirmation'))) {
      warnings.push("This reinforces existing beliefs without considering alternatives");
    }
    
    return warnings.length > 0 ? warnings.join('. ') : "This language may be unintentionally biased";
  };

  const getRecommendedSentence = (originalText: string, rules: string[], ml: string[]) => {
    const allTypes = [...new Set([...rules, ...ml])];
    
    if (allTypes.length === 0) return "Your message is already bias-free!";
    
    let recommendation = originalText;
    
    // Replace problematic patterns with inclusive alternatives
    if (allTypes.some(t => t.includes('groupthink') || t.includes('agrees'))) {
      recommendation = recommendation.replace(/everyone agrees|we all think|nobody disagrees/gi, "several team members support this");
    }
    if (allTypes.some(t => t.includes('finalize'))) {
      recommendation = recommendation.replace(/let's finalize|finalize this/gi, "let's move forward with this approach");
    }
    if (allTypes.some(t => t.includes('stereotyping') || t.includes('women') || t.includes('men'))) {
      recommendation = recommendation.replace(/all women|all men|males are|females are/gi, "some people");
    }
    if (allTypes.some(t => t.includes('toxic') || t.includes('stupid') || t.includes('terrible'))) {
      recommendation = recommendation.replace(/stupid|terrible|awful|hate/gi, "challenging");
    }
    if (allTypes.some(t => t.includes('generalization') || t.includes('everyone') || t.includes('always') || t.includes('never'))) {
      recommendation = recommendation.replace(/everyone|always|never|all/gi, "many people");
    }
    if (allTypes.some(t => t.includes('iit') || t.includes('better'))) {
      recommendation = recommendation.replace(/from iit.*better|he'll be better/gi, "with relevant experience");
    }
    if (allTypes.some(t => t.includes('anchoring'))) {
      recommendation = recommendation.replace(/first impression|initial thought/gi, "one perspective");
    }
    if (allTypes.some(t => t.includes('confirmation'))) {
      recommendation = recommendation.replace(/proves my point|as expected/gi, "supports this view");
    }
    
    return recommendation;
  };


  return (
    <motion.section
      id="realtime-bot"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">Real-Time Bias Detection Bot</h2>
          <p className="text-lg sm:text-xl text-muted-foreground px-4">
            Experience live bias detection as you type. This simulates how BiasShield AI works in real chat platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Chat Interface */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="xl:col-span-2"
          >
                         <Card className="shadow-card h-[500px] sm:h-[550px] lg:h-[600px] flex flex-col overflow-hidden">
                           <CardHeader className="border-b border-border flex-shrink-0 p-4 sm:p-6">
                             <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0">
                               <div className="flex items-center">
                                 <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
                                 <span className="text-base sm:text-lg">Live Chat Simulation</span>
                               </div>
                               <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs sm:text-sm">
                                 <Bot className="h-3 w-3 mr-1" />
                                 AI Active
                               </Badge>
                             </CardTitle>
                           </CardHeader>
                           
                           <CardContent className="flex-1 flex flex-col p-0 min-h-0">
                             {/* Messages Area - Fixed height with proper scrolling */}
                             <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 min-h-0">
                               {messages.map((message) => (
                                 <motion.div
                                   key={message.id}
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3 sm:mb-4`}
                                 >
                                   <div className={`max-w-[85%] sm:max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                                     <div className={`rounded-lg p-2 sm:p-3 ${
                                       message.sender === 'user' 
                                         ? 'bg-primary text-primary-foreground' 
                                         : 'bg-muted'
                                     }`}>
                                       <div className="text-xs sm:text-sm whitespace-pre-wrap break-words">{message.text}</div>
                                       <div className={`text-xs mt-1 sm:mt-2 ${
                                         message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                                       }`}>
                                         {message.timestamp.toLocaleTimeString()}
                                       </div>
                                     </div>
                                     
                                     {/* Bias Detection Badge */}
                                     {message.biasAnalysis && (
                                       <motion.div
                                         initial={{ scale: 0.8, opacity: 0 }}
                                         animate={{ scale: 1, opacity: 1 }}
                                         className={`mt-2 flex items-center space-x-2 ${getSeverityColor(message.biasAnalysis.overallRisk)} px-2 sm:px-3 py-1 sm:py-2 rounded-md border max-w-full`}
                                       >
                                         {getSeverityIcon(message.biasAnalysis.overallRisk)}
                                         <span className="text-xs font-medium truncate">{message.biasAnalysis.overallRisk.toUpperCase()}</span>
                                       </motion.div>
                                     )}
                                   </div>
                                 </motion.div>
                               ))}
                               
                               {/* Analyzing indicator */}
                               {isAnalyzing && (
                                 <motion.div
                                   initial={{ opacity: 0, scale: 0.8 }}
                                   animate={{ opacity: 1, scale: 1 }}
                                   className="flex justify-start mb-3 sm:mb-4"
                                 >
                                   <div className="bg-muted rounded-lg p-2 sm:p-3 max-w-[85%] sm:max-w-[80%]">
                                     <div className="flex items-center space-x-2">
                                       <motion.div
                                         animate={{ rotate: 360 }}
                                         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                       >
                                         <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                                       </motion.div>
                                       <span className="text-xs sm:text-sm text-muted-foreground">Analyzing for biases...</span>
                                     </div>
                                   </div>
                                 </motion.div>
                               )}
                               
                               {/* Demo analyzing indicator */}
                               {isDemoRunning && (
                                 <motion.div
                                   initial={{ opacity: 0, scale: 0.8 }}
                                   animate={{ opacity: 1, scale: 1 }}
                                   className="flex justify-start mb-3 sm:mb-4"
                                 >
                                   <div className="bg-primary/10 border border-primary/20 rounded-lg p-2 sm:p-3 max-w-[85%] sm:max-w-[80%]">
                                     <div className="flex items-center space-x-2">
                                       <motion.div
                                         animate={{ rotate: 360 }}
                                         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                       >
                                         <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                                       </motion.div>
                                       <span className="text-xs sm:text-sm text-primary font-medium">Analyzing demo message...</span>
                                     </div>
                                   </div>
                                 </motion.div>
                               )}
                               
                               {/* Scroll anchor */}
                               <div ref={messagesEndRef} className="h-0" />
                             </div>
                           
                             {/* Input Area - Fixed at bottom */}
                             <div className="border-t border-border p-3 sm:p-4 flex-shrink-0">
                               <div className="flex space-x-2">
                                 <Input
                                   value={inputText}
                                   onChange={(e) => setInputText(e.target.value)}
                                   onKeyPress={handleKeyPress}
                                   placeholder="Type a message to test bias detection..."
                                   className="flex-1 text-sm sm:text-base"
                                   disabled={isAnalyzing}
                                 />
                                 <Button 
                                   onClick={handleSendMessage} 
                                   disabled={!inputText.trim() || isAnalyzing}
                                   size="sm"
                                   className="px-3 sm:px-4"
                                 >
                                   <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                                 </Button>
                               </div>
                               <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
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
            className="xl:col-span-1"
          >
            <Card className="shadow-card h-[500px] sm:h-[550px] lg:h-[600px]">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
                  Bias Scorecard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                {/* Total Biases */}
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{biasStats.total}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Total Biases Detected</div>
                </div>
                
                {/* Bias Breakdown */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm">Groupthink</span>
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 text-xs">
                      {biasStats.groupthink}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm">Anchoring</span>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
                      {biasStats.anchoring}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm">Gender/Cultural</span>
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                      {biasStats.genderCultural}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm">Toxic Tone</span>
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                      {biasStats.toxic}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm">Confirmation</span>
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 text-xs">
                      {biasStats.confirmation}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm">Stereotyping</span>
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                      {biasStats.stereotyping}
                    </Badge>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-border">
                                     <Button 
                     variant="outline" 
                     size="sm" 
                     className="w-full text-xs sm:text-sm"
                                           onClick={() => {
                        setMessages([{
                          id: '1',
                          text: "Welcome to BiasShield AI! I'm here to help detect biases in real-time using advanced AI analysis. Try typing something that might contain bias...",
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
                     className="w-full text-xs sm:text-sm"
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
          className="mt-8 sm:mt-12 text-center"
        >
          <Card className="shadow-card border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Ready for Real Integration?</h3>
              <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                This demo shows how BiasShield AI would work in Discord, Slack, Microsoft Teams, and other chat platforms.
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                <Badge variant="outline" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">Discord Bot</Badge>
                <Badge variant="outline" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">Slack Integration</Badge>
                <Badge variant="outline" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">Teams Webhook</Badge>
                <Badge variant="outline" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">CLI Tool</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default RealTimeBiasBot;
