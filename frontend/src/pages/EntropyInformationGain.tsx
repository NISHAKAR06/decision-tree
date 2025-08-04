import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Calculator, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const EntropyInformationGain = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Entropy & Information Gain
            </h1>
            <p className="text-xl text-muted-foreground">
              Understanding the math behind how decision trees choose the best questions
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Entropy Explanation */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  What is Entropy?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">
                  <strong>Entropy</strong> measures how "mixed up" or "confused" your data is. 
                  Think of it like measuring chaos in a room:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl mb-2">📚📚📚📚</div>
                    <h3 className="font-semibold text-green-800">Low Entropy</h3>
                    <p className="text-sm text-green-600">All books are the same → Very organized!</p>
                    <div className="mt-2 text-lg font-mono text-green-700">Entropy ≈ 0</div>
                  </div>
                  
                  <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-2xl mb-2">📚🎮📱🍎</div>
                    <h3 className="font-semibold text-red-800">High Entropy</h3>
                    <p className="text-sm text-red-600">Mix of different things → Very messy!</p>
                    <div className="mt-2 text-lg font-mono text-red-700">Entropy ≈ 1</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Entropy Formula */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-secondary" />
                  Entropy Formula
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-6 rounded-lg text-center">
                  <div className="text-2xl font-mono mb-4">
                    H(S) = -Σ p<sub>i</sub> × log<sub>2</sub>(p<sub>i</sub>)
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>H(S)</strong> = Entropy of set S</p>
                    <p><strong>p<sub>i</sub></strong> = Probability of class i</p>
                    <p><strong>Σ</strong> = Sum over all classes</p>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold">Step-by-step example:</h4>
                  <div className="bg-primary-light p-4 rounded-lg space-y-2 text-sm">
                    <p><strong>Dataset:</strong> 10 people → 6 like pizza 🍕, 4 like burgers 🍔</p>
                    <p><strong>Step 1:</strong> Calculate probabilities</p>
                    <p className="ml-4">• P(pizza) = 6/10 = 0.6</p>
                    <p className="ml-4">• P(burger) = 4/10 = 0.4</p>
                    <p><strong>Step 2:</strong> Apply formula</p>
                    <p className="ml-4">• H(S) = -(0.6 × log₂(0.6) + 0.4 × log₂(0.4))</p>
                    <p className="ml-4">• H(S) = -(0.6 × (-0.74) + 0.4 × (-1.32))</p>
                    <p className="ml-4">• H(S) = 0.97 bits</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Information Gain */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Information Gain</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4">
                  <strong>Information Gain</strong> tells us how much "cleaner" our data becomes after asking a question. 
                  It's the difference between entropy before and after splitting.
                </p>
                
                <div className="bg-accent-light p-4 rounded-lg">
                  <div className="text-center text-lg font-mono mb-2">
                    Information Gain = Original Entropy - Weighted Average of Split Entropies
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    Higher gain = Better question to ask!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex w-full flex-col items-center justify-center gap-4 pt-8 sm:flex-row sm:justify-between">
              <Link to="/what-is-decision-tree">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous: What is a Decision Tree?
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="sm">
                  Next: How It Works
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntropyInformationGain;
