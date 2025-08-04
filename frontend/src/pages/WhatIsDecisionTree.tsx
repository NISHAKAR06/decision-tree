import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TreePine, ArrowRight, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";

const WhatIsDecisionTree = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              What is a Decision Tree?
            </h1>
            <p className="text-xl text-muted-foreground">
              Let's start with the basics - understanding what decision trees are and how they work
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Simple Definition */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TreePine className="h-6 w-6 text-primary" />
                  Simple Definition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">
                  A <strong>Decision Tree</strong> is like asking a series of yes/no questions to make a decision. 
                  It's a flowchart that helps computers (and humans!) make choices by following a path of questions 
                  until reaching a final answer.
                </p>
              </CardContent>
            </Card>

            {/* Structure Explanation */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-6 w-6 text-secondary" />
                  Tree Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-primary-light rounded-lg">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-primary-foreground font-bold">?</span>
                    </div>
                    <h3 className="font-semibold">Root Node</h3>
                    <p className="text-sm text-muted-foreground">The first question at the top</p>
                  </div>
                  <div className="text-center p-4 bg-accent-light rounded-lg">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-accent-foreground font-bold">?</span>
                    </div>
                    <h3 className="font-semibold">Internal Nodes</h3>
                    <p className="text-sm text-muted-foreground">Questions in the middle</p>
                  </div>
                  <div className="text-center p-4 bg-secondary-light rounded-lg">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-secondary-foreground font-bold">!</span>
                    </div>
                    <h3 className="font-semibold">Leaf Nodes</h3>
                    <p className="text-sm text-muted-foreground">Final answers at the bottom</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Real Example */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Real Example: "Should I Wear a Jacket?"</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-6 rounded-lg">
                  <div className="text-center space-y-4">
                    <div className="p-3 bg-primary text-primary-foreground rounded-lg inline-block">
                      Is it cold outside? (&lt; 60°F)
                    </div>
                    <div className="flex justify-center gap-8">
                      <div className="text-center">
                        <div className="mb-2 text-green-600 font-semibold">YES</div>
                        <div className="p-2 bg-green-100 text-green-800 rounded">
                          Wear a jacket! 🧥
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="mb-2 text-red-600 font-semibold">NO</div>
                        <div className="p-2 bg-red-100 text-red-800 rounded">
                          No jacket needed! ☀️
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex w-full flex-col items-center justify-center gap-4 pt-8 sm:flex-row sm:justify-between">
              <Link to="/">
                <Button variant="outline" size="sm">← Back to Home</Button>
              </Link>
              <Link to="/entropy-information-gain">
                <Button size="sm">
                  Next: Entropy & Information Gain
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

export default WhatIsDecisionTree;
