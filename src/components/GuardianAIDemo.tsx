import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Brain, CheckCircle, XCircle, AlertTriangle, Clock, Zap } from "lucide-react";
import { buildApiUrl, API_CONFIG } from "@/config/api";

interface ModelResponse {
  id: string;
  name: string;
  decision: 'approve' | 'reject' | 'review';
  reason: string;
  confidence: number;
  responseTime: number;
}

interface GuardianDecision {
  finalDecision: 'consensus' | 'escalate';
  decision: 'approve' | 'reject' | 'review';
  reasoning: string;
  confidence: number;
}

const GuardianAIDemo = ({ onClose }: { onClose: () => void }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [modelResponses, setModelResponses] = useState<ModelResponse[]>([]);
  const [guardianDecision, setGuardianDecision] = useState<GuardianDecision | null>(null);
  const [showResults, setShowResults] = useState(false);

  const mockModels = [
    {
      id: 'model-a',
      name: 'Model A - Safety Analyzer',
      decision: 'approve' as const,
      reason: 'Content meets all safety guidelines and shows no harmful patterns.',
      confidence: 0.92,
      responseTime: 1200
    },
    {
      id: 'model-b',
      name: 'Model B - Bias Detector',
      decision: 'reject' as const,
      reason: 'Detected potential gender bias in language patterns.',
      confidence: 0.87,
      responseTime: 1800
    },
    {
      id: 'model-c',
      name: 'Model C - Content Moderator',
      decision: 'review' as const,
      reason: 'Content is borderline - requires human oversight for final decision.',
      confidence: 0.78,
      responseTime: 1500
    }
  ];

  const runDemo = async () => {
    setIsRunning(true);
    setCurrentStep(0);
    setModelResponses([]);
    setGuardianDecision(null);
    setShowResults(false);

    // Simulate connecting to models
    for (let i = 0; i < mockModels.length; i++) {
      setCurrentStep(i + 1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setModelResponses(prev => [...prev, mockModels[i]]);
    }

    // Simulate Guardian AI processing
    setCurrentStep(4);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Calculate Guardian AI decision
    const decisions = mockModels.map(m => m.decision);
    const hasDisagreement = new Set(decisions).size > 1;
    
    const guardianResult: GuardianDecision = {
      finalDecision: hasDisagreement ? 'escalate' : 'consensus',
      decision: hasDisagreement ? 'review' : decisions[0],
      reasoning: hasDisagreement 
        ? 'Models show disagreement. Escalating to human review for final decision.'
        : 'All models agree. Proceeding with consensus decision.',
      confidence: hasDisagreement ? 0.85 : 0.95
    };

    setGuardianDecision(guardianResult);
    setShowResults(true);
    setIsRunning(false);

    // Send to Guardian AI backend for logging
    try {
      await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.GUARDIAN.LOGS), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'Guardian AI Demo - Multi-model coordination',
          context: 'Demonstrating Guardian AI decision making with 3 AI models',
          status: guardianResult.decision,
          reason: guardianResult.reasoning,
          metadata: {
            modelResponses: mockModels,
            finalDecision: guardianResult,
            demoMode: true
          }
        })
      });
      console.log('Guardian AI demo logged successfully');
    } catch (error) {
      console.log('Guardian AI logging failed (demo mode):', error);
    }
  };

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'approve': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'reject': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'review': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getDecisionIcon = (decision: string) => {
    switch (decision) {
      case 'approve': return <CheckCircle className="h-5 w-5" />;
      case 'reject': return <XCircle className="h-5 w-5" />;
      case 'review': return <AlertTriangle className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  const getGuardianColor = (finalDecision: string) => {
    switch (finalDecision) {
      case 'consensus': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'escalate': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-background border border-border rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Brain className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Guardian AI Demo</h2>
                <p className="text-muted-foreground">Watch how Guardian AI coordinates multiple AI models</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {!isRunning && !showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="max-w-2xl mx-auto">
                <div className="p-4 bg-blue-500/10 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Brain className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Guardian AI Orchestration Demo</h3>
                <p className="text-muted-foreground mb-6">
                  This demo simulates how Guardian AI coordinates three specialized AI models to make 
                  informed decisions. Watch as each model analyzes content and Guardian AI aggregates 
                  their responses using intelligent consensus rules.
                </p>
                <Button onClick={runDemo} size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Zap className="h-5 w-5 mr-2" />
                  Start Demo
                </Button>
              </div>
            </motion.div>
          )}

          {isRunning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Progress Indicator */}
              <div className="text-center mb-8">
                <h3 className="text-lg font-semibold mb-4">Connecting to AI Models...</h3>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentStep >= step ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Step {currentStep} of 4: {currentStep === 0 && 'Initializing...'}
                  {currentStep === 1 && 'Connecting to Model A...'}
                  {currentStep === 2 && 'Connecting to Model B...'}
                  {currentStep === 3 && 'Connecting to Model C...'}
                  {currentStep === 4 && 'Guardian AI processing...'}
                </p>
              </div>

              {/* Model Responses */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockModels.map((model, index) => (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: modelResponses.some(r => r.id === model.id) ? 1 : 0,
                      y: modelResponses.some(r => r.id === model.id) ? 0 : 20
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className={`h-full transition-all duration-300 ${
                      modelResponses.some(r => r.id === model.id) 
                        ? 'border-blue-500/50 bg-blue-500/5' 
                        : 'border-border/50'
                    }`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">{model.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {modelResponses.some(r => r.id === model.id) ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getDecisionColor(model.decision)}`}>
                              {getDecisionIcon(model.decision)}
                              {model.decision.charAt(0).toUpperCase() + model.decision.slice(1)}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">{model.reason}</p>
                            <div className="mt-2 text-xs text-muted-foreground">
                              Confidence: {(model.confidence * 100).toFixed(0)}%
                            </div>
                          </motion.div>
                        ) : (
                          <div className="text-center py-4">
                            <div className="animate-pulse">
                              <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2" />
                              <div className="w-16 h-2 bg-gray-300 rounded mx-auto" />
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Guardian AI Processing */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="p-4 bg-blue-500/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Brain className="h-8 w-8 text-blue-500 animate-pulse" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Guardian AI Processing</h4>
                  <p className="text-muted-foreground">Analyzing model responses and applying consensus rules...</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {showResults && guardianDecision && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Results Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Demo Complete!</h3>
                <p className="text-muted-foreground">Here's how Guardian AI coordinated the decision-making process</p>
              </div>

              {/* Model Responses Summary */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4">Individual Model Responses</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {modelResponses.map((model) => (
                    <Card key={model.id} className="h-full">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">{model.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getDecisionColor(model.decision)}`}>
                          {getDecisionIcon(model.decision)}
                          {model.decision.charAt(0).toUpperCase() + model.decision.slice(1)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{model.reason}</p>
                        <div className="mt-2 text-xs text-muted-foreground">
                          Confidence: {(model.confidence * 100).toFixed(0)}%
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Guardian AI Final Decision */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4">Guardian AI Final Decision</h4>
                <Card className={`border-2 ${getGuardianColor(guardianDecision.finalDecision)}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Guardian AI Decision
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Final Decision:</span>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getDecisionColor(guardianDecision.decision)}`}>
                          {getDecisionIcon(guardianDecision.decision)}
                          {guardianDecision.decision.charAt(0).toUpperCase() + guardianDecision.decision.slice(1)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Decision Type:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getGuardianColor(guardianDecision.finalDecision)}`}>
                          {guardianDecision.finalDecision === 'consensus' ? 'Consensus' : 'Escalate for Review'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Confidence:</span>
                        <span className="text-sm">{(guardianDecision.confidence * 100).toFixed(0)}%</span>
                      </div>
                      <div>
                        <span className="font-medium">Reasoning:</span>
                        <p className="text-sm text-muted-foreground mt-1">{guardianDecision.reasoning}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Decision Logic Explanation */}
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg">How Guardian AI Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Consensus Rule:</span> When all models agree, Guardian AI proceeds with the consensus decision
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Disagreement Rule:</span> When models disagree, Guardian AI escalates to human review for final decision
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Confidence Scoring:</span> Each model provides confidence scores that Guardian AI considers in its analysis
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 pt-4">
                <Button onClick={runDemo} variant="outline">
                  Run Demo Again
                </Button>
                <Button onClick={onClose}>
                  Close Demo
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GuardianAIDemo;
