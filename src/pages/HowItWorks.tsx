import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Cog, TreePine, Target, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              How Decision Trees Work
            </h1>
            <p className="text-xl text-muted-foreground">
              Step-by-step process of how algorithms build decision trees from data
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Algorithm Overview */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cog className="h-6 w-6 text-primary" />
                  The Tree Building Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-6">
                  Building a decision tree is like being a detective - you ask the most helpful questions 
                  first to solve the mystery as quickly as possible!
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-primary-light rounded-lg">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Start with all your data</h3>
                      <p className="text-sm text-muted-foreground">
                        Begin at the root with your entire dataset
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-secondary-light rounded-lg">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Find the best question</h3>
                      <p className="text-sm text-muted-foreground">
                        Calculate information gain for all possible splits
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-accent-light rounded-lg">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Split the data</h3>
                      <p className="text-sm text-muted-foreground">
                        Divide your data based on the best question
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-primary-light rounded-lg">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Repeat for each branch</h3>
                      <p className="text-sm text-muted-foreground">
                        Continue until stopping criteria are met
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step by Step Example */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TreePine className="h-6 w-6 text-secondary" />
                  Real Example: Predicting Tennis Play
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Dataset: Should we play tennis?</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Features: Weather (Sunny/Overcast/Rain), Temperature (Hot/Mild/Cool), Humidity (High/Normal), Wind (Strong/Weak)
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      <div className="p-2 bg-background rounded text-center">Sunny, Hot, High, Weak → No</div>
                      <div className="p-2 bg-background rounded text-center">Sunny, Hot, High, Strong → No</div>
                      <div className="p-2 bg-background rounded text-center">Overcast, Hot, High, Weak → Yes</div>
                      <div className="p-2 bg-background rounded text-center">Rain, Mild, High, Weak → Yes</div>
                      <div className="p-2 bg-background rounded text-center">Rain, Cool, Normal, Weak → Yes</div>
                      <div className="p-2 bg-background rounded text-center">Rain, Cool, Normal, Strong → No</div>
                      <div className="p-2 bg-background rounded text-center">Overcast, Cool, Normal, Strong → Yes</div>
                      <div className="p-2 bg-background rounded text-center">Sunny, Mild, High, Weak → No</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Step 1: Calculate information gain for each feature</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <strong className="text-green-800">Weather</strong>
                        <br />Information Gain: 0.246
                      </div>
                      <div className="p-3 bg-blue-50 rounded border border-blue-200">
                        <strong className="text-blue-800">Temperature</strong>
                        <br />Information Gain: 0.029
                      </div>
                      <div className="p-3 bg-purple-50 rounded border border-purple-200">
                        <strong className="text-purple-800">Humidity</strong>
                        <br />Information Gain: 0.151
                      </div>
                      <div className="p-3 bg-orange-50 rounded border border-orange-200">
                        <strong className="text-orange-800">Wind</strong>
                        <br />Information Gain: 0.048
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-100 rounded-lg border border-green-300">
                      <p className="text-green-800 font-semibold">
                        🏆 Winner: Weather (highest information gain = 0.246)
                      </p>
                      <p className="text-green-700 text-sm mt-1">
                        This becomes our root node question!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stopping Criteria */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-accent" />
                  When to Stop Building?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">The algorithm stops growing the tree when certain conditions are met:</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded border border-red-200">
                      <h4 className="font-semibold text-red-800">Pure Node</h4>
                      <p className="text-sm text-red-600">All data points have the same class</p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded border border-blue-200">
                      <h4 className="font-semibold text-blue-800">Maximum Depth</h4>
                      <p className="text-sm text-blue-600">Tree has reached predefined depth limit</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded border border-green-200">
                      <h4 className="font-semibold text-green-800">Minimum Samples</h4>
                      <p className="text-sm text-green-600">Too few data points to split further</p>
                    </div>
                    
                    <div className="p-3 bg-purple-50 rounded border border-purple-200">
                      <h4 className="font-semibold text-purple-800">No Information Gain</h4>
                      <p className="text-sm text-purple-600">No split improves the model</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Algorithm Pseudocode */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-6 w-6 text-primary" />
                  Algorithm Pseudocode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <div className="space-y-1">
                    <div><span className="text-blue-400">function</span> buildTree(data, features):</div>
                    <div className="ml-4"><span className="text-yellow-400">if</span> stopping_criteria_met(data):</div>
                    <div className="ml-8"><span className="text-purple-400">return</span> createLeafNode(data)</div>
                    <div className="ml-4"></div>
                    <div className="ml-4">best_feature = findBestSplit(data, features)</div>
                    <div className="ml-4">node = createNode(best_feature)</div>
                    <div className="ml-4"></div>
                    <div className="ml-4"><span className="text-yellow-400">for each</span> value <span className="text-yellow-400">in</span> best_feature.values:</div>
                    <div className="ml-8">subset = filterData(data, best_feature, value)</div>
                    <div className="ml-8">node.addChild(value, buildTree(subset, features))</div>
                    <div className="ml-4"></div>
                    <div className="ml-4"><span className="text-purple-400">return</span> node</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8">
              <Link to="/entropy-information-gain">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous: Entropy & Information Gain
                </Button>
              </Link>
              <Link to="/code-examples">
                <Button className="bg-gradient-primary">
                  Next: Code Examples
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

export default HowItWorks;