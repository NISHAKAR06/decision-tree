import { useState, ChangeEvent, FC } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Play, RotateCcw, Upload, BrainCircuit, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import Papa from "papaparse";

// Define the types for the tree nodes
export type DecisionNode = {
  type: 'decision';
  attribute: string;
  subtrees: { [value: string]: TreeNode };
  dataCount: number;
  prediction?: string | number;
};

export type LeafNode = {
  type: 'leaf';
  prediction: string | number;
  count: number;
  total: number;
};

export type TreeNode = DecisionNode | LeafNode;

// The default dataset for the ID3 algorithm
const id3ClassificationData = [
    { 'Outlook': 'Sunny', 'Temp': 'Hot', 'Humidity': 'High', 'Wind': 'Weak', 'PlayTennis': 'No' },
    { 'Outlook': 'Sunny', 'Temp': 'Hot', 'Humidity': 'High', 'Wind': 'Strong', 'PlayTennis': 'No' },
    { 'Outlook': 'Overcast', 'Temp': 'Hot', 'Humidity': 'High', 'Wind': 'Weak', 'PlayTennis': 'Yes' },
    { 'Outlook': 'Rain', 'Temp': 'Mild', 'Humidity': 'High', 'Wind': 'Weak', 'PlayTennis': 'Yes' },
    { 'Outlook': 'Rain', 'Temp': 'Cool', 'Humidity': 'Normal', 'Wind': 'Weak', 'PlayTennis': 'Yes' },
    { 'Outlook': 'Rain', 'Temp': 'Cool', 'Humidity': 'Normal', 'Wind': 'Strong', 'PlayTennis': 'No' },
    { 'Outlook': 'Overcast', 'Temp': 'Cool', 'Humidity': 'Normal', 'Wind': 'Strong', 'PlayTennis': 'Yes' },
    { 'Outlook': 'Sunny', 'Temp': 'Mild', 'Humidity': 'High', 'Wind': 'Weak', 'PlayTennis': 'No' },
    { 'Outlook': 'Sunny', 'Temp': 'Cool', 'Humidity': 'Normal', 'Wind': 'Weak', 'PlayTennis': 'Yes' },
    { 'Outlook': 'Rain', 'Temp': 'Mild', 'Humidity': 'Normal', 'Wind': 'Weak', 'PlayTennis': 'Yes' },
    { 'Outlook': 'Sunny', 'Temp': 'Mild', 'Humidity': 'Normal', 'Wind': 'Strong', 'PlayTennis': 'Yes' },
    { 'Outlook': 'Overcast', 'Temp': 'Mild', 'Humidity': 'High', 'Wind': 'Strong', 'PlayTennis': 'Yes' },
    { 'Outlook': 'Overcast', 'Temp': 'Hot', 'Humidity': 'Normal', 'Wind': 'Weak', 'PlayTennis': 'Yes' },
    { 'Outlook': 'Rain', 'Temp': 'Mild', 'Humidity': 'High', 'Wind': 'Strong', 'PlayTennis': 'No' }
];

const DecisionTreeVisualizer: FC<{ node: TreeNode }> = ({ node }) => {
  if (node.type === 'leaf') {
    const predictionColor = node.prediction === "Yes" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

    return (
      <div className={`p-3 ${predictionColor} rounded-lg text-center shadow-sm`}>
        <div className="font-bold text-lg">{String(node.prediction)}</div>
        <div className="text-sm opacity-80">
            ({((node.count / node.total) * 100).toFixed(0)}% confidence)
        </div>
        <div className="text-xs text-gray-500 mt-1">
            {node.count}/{node.total} samples
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-md">
      <div className="text-center mb-4">
        <div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full text-lg font-semibold shadow-sm">
          {node.attribute}?
        </div>
        <div className="text-xs text-gray-500 mt-1">{node.dataCount} samples</div>
      </div>
      <div className="flex justify-center items-start gap-4 flex-wrap">
        {Object.entries(node.subtrees).map(([value, subtree]) => (
          <div key={value} className="flex flex-col items-center gap-2">
            <div className="text-sm font-medium p-2 bg-white border rounded-md shadow-sm">{value}</div>
            <div className="relative">
              <div className="absolute w-px h-4 bg-gray-300 left-1/2 -top-2"></div>
              <DecisionTreeVisualizer node={subtree} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TryItYourself = () => {
  const [dataset, setDataset] = useState<any[]>(id3ClassificationData);
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [targetAttribute, setTargetAttribute] = useState<string>('PlayTennis');
  const [attributes, setAttributes] = useState<string[]>(['Outlook', 'Temp', 'Humidity', 'Wind']);
  const [predictionInput, setPredictionInput] = useState<any>({});
  const [predictionResult, setPredictionResult] = useState<string | number | null>(null);

  const resetDataset = () => {
    setDataset(id3ClassificationData);
    setTargetAttribute('PlayTennis');
    setAttributes(['Outlook', 'Temp', 'Humidity', 'Wind']);
    setTree(null);
    setPredictionInput({});
    setPredictionResult(null);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const data = result.data as any[];
          const headers = Object.keys(data[0]);
          setDataset(data);
          setTargetAttribute(headers[headers.length - 1]);
          setAttributes(headers.slice(0, -1));
          setTree(null);
          setPredictionResult(null);
        },
      });
    }
  };

  const generateTree = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5001/build_tree', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dataset,
          targetAttribute,
          attributes,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const treeData = await response.json();
      setTree(treeData);
      setPredictionResult(null);
    } catch (error) {
      console.error("Failed to build tree:", error);
    }
  };

  const predictOutcome = () => {
    if (!tree) return;
    let currentNode = tree;
    while (currentNode.type === 'decision') {
      const attributeValue = predictionInput[currentNode.attribute];
      if (attributeValue && currentNode.subtrees[attributeValue]) {
        currentNode = currentNode.subtrees[attributeValue];
      } else {
        setPredictionResult(currentNode.prediction ?? "Unknown");
        return;
      }
    }
    setPredictionResult(currentNode.prediction);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              ID3 Decision Tree Builder
            </h1>
            <p className="text-xl text-muted-foreground">
              Use the default dataset or upload your own to build an ID3 decision tree.
            </p>
          </div>

          <div className="space-y-8">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-6 w-6 text-primary" />
                  1. Provide Your Dataset
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                     <p className="mb-4 text-sm text-muted-foreground">
                      Upload a CSV or use the default "Play Tennis" dataset. The last column is the target.
                    </p>
                    <div className="flex gap-4">
                      <Button asChild variant="outline">
                        <Label htmlFor="csv-upload" className="cursor-pointer">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload CSV
                        </Label>
                      </Button>
                      <Input id="csv-upload" type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
                       <Button onClick={resetDataset} variant="secondary">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset to Default
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Current Data ({dataset.length} rows)</h4>
                    <pre className="text-xs whitespace-pre-wrap">
                      {JSON.stringify(dataset.slice(0, 5), null, 2)}
                      {dataset.length > 5 && "\n..."}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="h-6 w-6 text-secondary" />
                  2. Generate the Decision Tree
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button onClick={generateTree} className="bg-gradient-primary text-lg px-8 py-6">
                  <Play className="mr-2 h-5 w-5" />
                  Build Tree
                </Button>
                {tree && (
                  <div className="mt-6 p-4 bg-muted rounded-lg overflow-x-auto">
                    <h3 className="text-xl font-semibold mb-4">Generated Decision Tree</h3>
                    <DecisionTreeVisualizer node={tree} />
                  </div>
                )}
              </CardContent>
            </Card>

            {tree && (
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-yellow-500" />
                    3. Make a Prediction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Input new data to predict the outcome:</h4>
                      {attributes.map(attr => (
                        <div key={attr}>
                          <Label htmlFor={`predict-${attr}`} className="capitalize">{attr}</Label>
                          <select
                            id={`predict-${attr}`}
                            value={predictionInput[attr] || ''}
                            onChange={(e) => setPredictionInput({...predictionInput, [attr]: e.target.value})}
                            className="w-full p-2 border border-input rounded-md bg-background"
                          >
                            <option value="">Select {attr}...</option>
                            {[...new Set(dataset.map(d => d[attr]))].map(val => (
                              <option key={val} value={val}>{val}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                      <Button onClick={predictOutcome} className="w-full">
                        Predict Outcome
                      </Button>
                    </div>
                    {predictionResult !== null && (
                      <div className="p-6 bg-primary-light rounded-lg text-center">
                        <h4 className="text-lg font-semibold mb-2">Prediction Result</h4>
                        <div className="text-3xl font-bold text-primary">
                          {String(predictionResult)}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

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
