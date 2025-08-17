import { useState, ChangeEvent, FC } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  ArrowLeft,
  Play,
  RotateCcw,
  Upload,
  BrainCircuit,
  Lightbulb,
} from "lucide-react";
import { Link } from "react-router-dom";
import Papa from "papaparse";
import Tree from "react-d3-tree";

// Define the types for the tree nodes
export type DecisionNode = {
  type: "decision";
  attribute: string;
  subtrees: { [value: string]: TreeNode };
  dataCount: number;
  prediction?: string | number;
};

export type LeafNode = {
  type: "leaf";
  prediction: string | number;
  count: number;
  total: number;
};

export type TreeNode = DecisionNode | LeafNode;

// The default dataset for the ID3 algorithm
const id3ClassificationData = [
  {
    Outlook: "Sunny",
    Temp: "Hot",
    Humidity: "High",
    Wind: "Weak",
    PlayTennis: "No",
  },
  {
    Outlook: "Sunny",
    Temp: "Hot",
    Humidity: "High",
    Wind: "Strong",
    PlayTennis: "No",
  },
  {
    Outlook: "Overcast",
    Temp: "Hot",
    Humidity: "High",
    Wind: "Weak",
    PlayTennis: "Yes",
  },
  {
    Outlook: "Rain",
    Temp: "Mild",
    Humidity: "High",
    Wind: "Weak",
    PlayTennis: "Yes",
  },
  {
    Outlook: "Rain",
    Temp: "Cool",
    Humidity: "Normal",
    Wind: "Weak",
    PlayTennis: "Yes",
  },
  {
    Outlook: "Rain",
    Temp: "Cool",
    Humidity: "Normal",
    Wind: "Strong",
    PlayTennis: "No",
  },
  {
    Outlook: "Overcast",
    Temp: "Cool",
    Humidity: "Normal",
    Wind: "Strong",
    PlayTennis: "Yes",
  },
  {
    Outlook: "Sunny",
    Temp: "Mild",
    Humidity: "High",
    Wind: "Weak",
    PlayTennis: "No",
  },
  {
    Outlook: "Sunny",
    Temp: "Cool",
    Humidity: "Normal",
    Wind: "Weak",
    PlayTennis: "Yes",
  },
  {
    Outlook: "Rain",
    Temp: "Mild",
    Humidity: "Normal",
    Wind: "Weak",
    PlayTennis: "Yes",
  },
  {
    Outlook: "Sunny",
    Temp: "Mild",
    Humidity: "Normal",
    Wind: "Strong",
    PlayTennis: "Yes",
  },
  {
    Outlook: "Overcast",
    Temp: "Mild",
    Humidity: "High",
    Wind: "Strong",
    PlayTennis: "Yes",
  },
  {
    Outlook: "Overcast",
    Temp: "Hot",
    Humidity: "Normal",
    Wind: "Weak",
    PlayTennis: "Yes",
  },
  {
    Outlook: "Rain",
    Temp: "Mild",
    Humidity: "High",
    Wind: "Strong",
    PlayTennis: "No",
  },
];

// Helper function to transform our tree data into the format react-d3-tree expects
const transformDataForD3 = (node: TreeNode): any => {
  if (node.type === "leaf") {
    return {
      name: `Prediction: ${node.prediction}`,
      attributes: {
        Confidence: `${((node.count / node.total) * 100).toFixed(0)}%`,
        Samples: `${node.count}/${node.total}`,
      },
    };
  }

  const children = Object.entries(node.subtrees).map(([value, childNode]) => {
    const transformedChild = transformDataForD3(childNode);
    transformedChild.edgeLabel = value;
    return transformedChild;
  });

  return {
    name: `Split on: ${node.attribute}`,
    attributes: {
      Samples: String(node.dataCount),
    },
    children,
  };
};

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}: any) => {
  const isLeaf = !nodeDatum.children;

  let cardBg = "bg-blue-100";
  let textBg = "text-blue-800";

  if (isLeaf) {
    if (nodeDatum.name.includes("Yes")) {
      cardBg = "bg-green-100";
      textBg = "text-green-800";
    } else if (nodeDatum.name.includes("No")) {
      cardBg = "bg-red-100";
      textBg = "text-red-800";
    }
  }

  return (
    <g>
      <foreignObject {...foreignObjectProps}>
        <div className="w-full h-full flex flex-col items-center">
          {/* Render the edge label text above the node card */}
          {nodeDatum.edgeLabel && (
            <div className="text-sm font-bold text-gray-700 pb-1">
              {nodeDatum.edgeLabel}
            </div>
          )}
          <div
            className={`border rounded-lg shadow-xl ${cardBg} ${textBg} p-2 w-full flex-grow flex flex-col justify-center`}
          >
            <h3 className="font-bold text-center text-sm">{nodeDatum.name}</h3>
            {nodeDatum.attributes && (
              <div className="text-xs text-center mt-1">
                {Object.entries(nodeDatum.attributes).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {String(value)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </foreignObject>
    </g>
  );
};

const DecisionTreeVisualizer: FC<{ node: TreeNode; predictionPath: any[] }> = ({
  node,
  predictionPath,
}) => {
  const d3Data = transformDataForD3(node);
  const foreignObjectProps = { width: 150, height: 120, x: -75, y: -60 };

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <Tree
        data={d3Data}
        orientation="vertical"
        pathFunc="elbow"
        separation={{ siblings: 1.5, nonSiblings: 2 }}
        translate={{ x: 400, y: 100 }}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
        }
        pathClassFunc={(linkDatum) => {
          const source = linkDatum.source.data;
          const target = linkDatum.target.data;
          if (
            predictionPath.includes(source) &&
            predictionPath.includes(target)
          ) {
            return "active-link";
          }
          return "rd3t-link";
        }}
      />
    </div>
  );
};

const TryItYourself = () => {
  const [dataset, setDataset] = useState<any[]>(id3ClassificationData);
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [targetAttribute, setTargetAttribute] = useState<string>("PlayTennis");
  const [attributes, setAttributes] = useState<string[]>([
    "Outlook",
    "Temp",
    "Humidity",
    "Wind",
  ]);
  const [predictionInput, setPredictionInput] = useState<any>({});
  const [predictionResult, setPredictionResult] = useState<
    string | number | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [predictionPath, setPredictionPath] = useState<any[]>([]);

  const resetDataset = () => {
    setDataset(id3ClassificationData);
    setTargetAttribute("PlayTennis");
    setAttributes(["Outlook", "Temp", "Humidity", "Wind"]);
    setTree(null);
    setPredictionInput({});
    setPredictionResult(null);
    setError(null);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
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
    setError(null);
    setTree(null);
    setPredictionPath([]); // Clear path on new tree generation
    try {
      const response = await fetch("http://127.0.0.1:5001/build_tree", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dataset,
          targetAttribute,
          attributes,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }
      const treeData = await response.json();
      setTree(treeData);
      setPredictionResult(null);
    } catch (error: any) {
      console.error("Failed to build tree:", error);
      setError(
        `Failed to connect to the backend. Please ensure the Python server is running. Details: ${error.message}`
      );
    }
  };

  const predictOutcome = () => {
    if (!tree) return;

    const path: any[] = [];
    let currentNode = tree;

    path.push(currentNode);

    while (currentNode.type === "decision") {
      const attributeValue = predictionInput[currentNode.attribute];
      if (attributeValue && currentNode.subtrees[attributeValue]) {
        currentNode = currentNode.subtrees[attributeValue];
        path.push(currentNode);
      } else {
        // Path ends here, but it's not a leaf. Use fallback prediction.
        setPredictionResult(currentNode.prediction ?? "Unknown");
        setPredictionPath(path);
        return;
      }
    }

    setPredictionResult(currentNode.prediction);
    setPredictionPath(path);
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
              Use the default dataset or upload your own to build an ID3
              decision tree.
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Upload a CSV or use the default "Play Tennis" dataset. The
                      last column is the target.
                    </p>
                    <div className="flex gap-4">
                      <Button asChild variant="outline">
                        <Label htmlFor="csv-upload" className="cursor-pointer">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload CSV
                        </Label>
                      </Button>
                      <Input
                        id="csv-upload"
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <Button onClick={resetDataset} variant="secondary">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset to Default
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      Current Data ({dataset.length} rows)
                    </h4>
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
                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg text-sm">
                    <strong>Error:</strong> {error}
                  </div>
                )}
                <Button
                  onClick={generateTree}
                  className="bg-gradient-primary text-lg px-8 py-6"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Build Tree
                </Button>
                {tree && (
                  <div className="mt-6 p-4 bg-muted rounded-lg overflow-x-auto">
                    <h3 className="text-xl font-semibold mb-4">
                      Generated Decision Tree
                    </h3>
                    <DecisionTreeVisualizer
                      node={tree}
                      predictionPath={predictionPath}
                    />
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="space-y-4">
                      <h4 className="font-semibold">
                        Input new data to predict the outcome:
                      </h4>
                      {attributes.map((attr) => (
                        <div key={attr}>
                          <Label
                            htmlFor={`predict-${attr}`}
                            className="capitalize"
                          >
                            {attr}
                          </Label>
                          <select
                            id={`predict-${attr}`}
                            value={predictionInput[attr] || ""}
                            onChange={(e) =>
                              setPredictionInput({
                                ...predictionInput,
                                [attr]: e.target.value,
                              })
                            }
                            className="w-full p-2 border border-input rounded-md bg-background"
                          >
                            <option value="">Select {attr}...</option>
                            {[...new Set(dataset.map((d) => d[attr]))].map(
                              (val) => (
                                <option key={val} value={val}>
                                  {val}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      ))}
                      <Button onClick={predictOutcome} className="w-full">
                        Predict Outcome
                      </Button>
                    </div>
                    {predictionResult !== null && (
                      <div className="p-6 bg-primary-light rounded-lg text-center">
                        <h4 className="text-lg font-semibold mb-2">
                          Prediction Result
                        </h4>
                        <div className="text-3xl font-bold text-primary">
                          {String(predictionResult)}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex w-full flex-col items-center justify-center gap-4 pt-8 sm:flex-row sm:justify-between">
              <Link to="/code-examples">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous: Code Examples
                </Button>
              </Link>
              <Link to="/quiz">
                <Button size="sm">
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
