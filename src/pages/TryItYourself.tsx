import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Calculator, Play, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

const TryItYourself = () => {
  const [dataset, setDataset] = useState([
    { weather: "Sunny", play: "No" },
    { weather: "Sunny", play: "No" },
    { weather: "Overcast", play: "Yes" },
    { weather: "Rain", play: "Yes" },
    { weather: "Rain", play: "Yes" },
    { weather: "Rain", play: "No" },
    { weather: "Overcast", play: "Yes" },
    { weather: "Sunny", play: "No" }
  ]);
  
  const [newWeather, setNewWeather] = useState("");
  const [newPlay, setNewPlay] = useState("");
  const [entropy, setEntropy] = useState<number | null>(null);
  
  const calculateEntropy = () => {
    const counts: Record<string, number> = {};
    dataset.forEach(item => {
      counts[item.play] = (counts[item.play] || 0) + 1;
    });
    
    const total = dataset.length;
    let entropy = 0;
    
    Object.values(counts).forEach(count => {
      const probability = count / total;
      if (probability > 0) {
        entropy -= probability * Math.log2(probability);
      }
    });
    
    setEntropy(entropy);
  };
  
  const addDataPoint = () => {
    if (newWeather && newPlay) {
      setDataset([...dataset, { weather: newWeather, play: newPlay }]);
      setNewWeather("");
      setNewPlay("");
      setEntropy(null);
    }
  };
  
  const resetDataset = () => {
    setDataset([
      { weather: "Sunny", play: "No" },
      { weather: "Sunny", play: "No" },
      { weather: "Overcast", play: "Yes" },
      { weather: "Rain", play: "Yes" },
      { weather: "Rain", play: "Yes" },
      { weather: "Rain", play: "No" },
      { weather: "Overcast", play: "Yes" },
      { weather: "Sunny", play: "No" }
    ]);
    setEntropy(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Try It Yourself
            </h1>
            <p className="text-xl text-muted-foreground">
              Interactive tools to experiment with entropy and decision tree concepts
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Entropy Calculator */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-primary" />
                  Interactive Entropy Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6">
                  Modify the dataset below and see how entropy changes. Add or remove data points 
                  to understand how entropy measures the "messiness" of your data.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Dataset Display */}
                  <div>
                    <h3 className="font-semibold mb-3">Current Dataset</h3>
                    <div className="bg-muted p-4 rounded-lg max-h-60 overflow-y-auto">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="font-semibold">Weather</div>
                        <div className="font-semibold">Play Tennis?</div>
                        {dataset.map((item, index) => (
                          <>
                            <div key={`weather-${index}`} className="p-2 bg-background rounded">
                              {item.weather}
                            </div>
                            <div key={`play-${index}`} className={`p-2 rounded ${
                              item.play === "Yes" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}>
                              {item.play}
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <Button onClick={calculateEntropy} className="bg-gradient-primary">
                        <Play className="mr-2 h-4 w-4" />
                        Calculate Entropy
                      </Button>
                      <Button onClick={resetDataset} variant="outline">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset
                      </Button>
                    </div>
                  </div>
                  
                  {/* Add Data Point */}
                  <div>
                    <h3 className="font-semibold mb-3">Add New Data Point</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="weather">Weather</Label>
                        <select 
                          id="weather"
                          value={newWeather}
                          onChange={(e) => setNewWeather(e.target.value)}
                          className="w-full p-2 border border-input rounded-md bg-background"
                        >
                          <option value="">Select weather...</option>
                          <option value="Sunny">Sunny</option>
                          <option value="Overcast">Overcast</option>
                          <option value="Rain">Rain</option>
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="play">Play Tennis?</Label>
                        <select 
                          id="play"
                          value={newPlay}
                          onChange={(e) => setNewPlay(e.target.value)}
                          className="w-full p-2 border border-input rounded-md bg-background"
                        >
                          <option value="">Select answer...</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      
                      <Button 
                        onClick={addDataPoint} 
                        className="w-full"
                        disabled={!newWeather || !newPlay}
                      >
                        Add Data Point
                      </Button>
                    </div>
                    
                    {/* Entropy Result */}
                    {entropy !== null && (
                      <div className="mt-6 p-4 bg-primary-light rounded-lg">
                        <h4 className="font-semibold mb-2">Entropy Result</h4>
                        <div className="text-2xl font-bold text-primary">
                          {entropy.toFixed(3)} bits
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {entropy < 0.5 ? "Low entropy - data is quite organized!" :
                           entropy < 1 ? "Medium entropy - some mixing in the data" :
                           "High entropy - data is very mixed!"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Information Gain Simulator */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-6 w-6 text-secondary" />
                  Information Gain Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  This simulation shows how different questions split your data and their information gain:
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Split by Weather</h4>
                    <div className="space-y-2 text-sm">
                      <div>Sunny: 3 No, 0 Yes</div>
                      <div>Overcast: 0 No, 2 Yes</div>
                      <div>Rain: 1 No, 2 Yes</div>
                    </div>
                    <div className="mt-2 font-bold text-blue-700">
                      Information Gain: 0.246
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Split by Temperature</h4>
                    <div className="space-y-2 text-sm">
                      <div>Hot: 2 No, 1 Yes</div>
                      <div>Mild: 1 No, 1 Yes</div>
                      <div>Cool: 1 No, 2 Yes</div>
                    </div>
                    <div className="mt-2 font-bold text-green-700">
                      Information Gain: 0.029
                    </div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">Split by Humidity</h4>
                    <div className="space-y-2 text-sm">
                      <div>High: 3 No, 1 Yes</div>
                      <div>Normal: 1 No, 3 Yes</div>
                    </div>
                    <div className="mt-2 font-bold text-purple-700">
                      Information Gain: 0.151
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-gradient-primary text-primary-foreground rounded-lg">
                  <p className="font-semibold">
                    🏆 Best Split: Weather (highest information gain = 0.246)
                  </p>
                  <p className="text-sm opacity-90 mt-1">
                    This question creates the purest subsets, making it the best choice for the root node!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Decision Tree Builder */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Visual Decision Tree Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  See how a decision tree would split your current dataset:
                </p>
                
                <div className="bg-muted p-6 rounded-lg">
                  <div className="text-center space-y-4">
                    <div className="inline-block p-3 bg-primary text-primary-foreground rounded-lg">
                      Weather?
                    </div>
                    
                    <div className="flex justify-center gap-8 flex-wrap">
                      <div className="text-center">
                        <div className="text-sm font-semibold mb-2">Sunny</div>
                        <div className="p-2 bg-red-100 text-red-800 rounded text-sm">
                          Don't Play<br />
                          <span className="text-xs">(100% No)</span>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm font-semibold mb-2">Overcast</div>
                        <div className="p-2 bg-green-100 text-green-800 rounded text-sm">
                          Play!<br />
                          <span className="text-xs">(100% Yes)</span>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm font-semibold mb-2">Rain</div>
                        <div className="p-2 bg-yellow-100 text-yellow-800 rounded text-sm">
                          Mixed<br />
                          <span className="text-xs">(67% Yes, 33% No)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-muted-foreground">
                  💡 <strong>Pro tip:</strong> The "Rain" branch would need further splitting with another question 
                  (like humidity or wind) to get pure leaf nodes!
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8">
              <Link to="/code-examples">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous: Code Examples
                </Button>
              </Link>
              <Link to="/quiz">
                <Button className="bg-gradient-primary">
                  Next: Take the Quiz
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

export default TryItYourself;