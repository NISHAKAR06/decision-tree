import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Code } from "lucide-react";
import { Link } from "react-router-dom";

const id3FromScratchCode = `
import pandas as pd
import numpy as np
from graphviz import Digraph

# Dataset
data = {
    'Day': ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14'],
    'Outlook': ['Sunny', 'Sunny', 'Overcast', 'Rain', 'Rain', 'Rain', 'Overcast', 'Sunny', 'Sunny', 'Rain', 'Sunny', 'Overcast', 'Overcast', 'Rain'],
    'Temp': ['Hot', 'Hot', 'Hot', 'Mild', 'Cool', 'Cool', 'Cool', 'Mild', 'Cool', 'Mild', 'Mild', 'Mild', 'Hot', 'Mild'],
    'Humidity': ['High', 'High', 'High', 'High', 'Normal', 'Normal', 'Normal', 'High', 'Normal', 'Normal', 'Normal', 'High', 'Normal', 'High'],
    'Wind': ['Weak', 'Strong', 'Weak', 'Weak', 'Weak', 'Strong', 'Strong', 'Weak', 'Weak', 'Weak', 'Strong', 'Strong', 'Weak', 'Strong'],
    'PlayTennis': ['No', 'No', 'Yes', 'Yes', 'Yes', 'No', 'Yes', 'No', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'No']
}

df = pd.DataFrame(data)

# Entropy
def entropy(y):
    classes, counts = np.unique(y, return_counts=True)
    prob = counts / counts.sum()
    return -np.sum(prob * np.log2(prob))

# Information Gain
def info_gain(X_col, y):
    values, counts = np.unique(X_col, return_counts=True)
    weighted_entropy = 0
    for v, c in zip(values, counts):
        weighted_entropy += (c / len(y)) * entropy(y[X_col == v])
    return entropy(y) - weighted_entropy

# ID3 Algorithm
def id3(X, y, features, graph, parent=None, edge_label=None, depth=0):
    if len(np.unique(y)) == 1:
        label = np.unique(y)[0]
        node = f"Leaf_{depth}_{label}"
        graph.node(node, label, shape='box', style='filled', fillcolor='lightblue')
        if parent:
            graph.edge(parent, node, label=edge_label)
        return node

    if len(features) == 0:
        majority = y.value_counts().idxmax()
        node = f"Leaf_{depth}_{majority}"
        graph.node(node, majority, shape='box', style='filled', fillcolor='lightgreen')
        if parent:
            graph.edge(parent, node, label=edge_label)
        return node

    gains = [info_gain(X[f], y) for f in features]
    best_feat = features[np.argmax(gains)]

    node = f"Node_{depth}_{best_feat}"
    graph.node(node, best_feat, shape='ellipse', style='filled', fillcolor='orange')
    if parent:
        graph.edge(parent, node, label=edge_label)

    remaining_features = [f for f in features if f != best_feat]
    for val in np.unique(X[best_feat]):
        subset_X = X[X[best_feat] == val].drop(columns=[best_feat])
        subset_y = y[X[best_feat] == val]
        id3(subset_X, subset_y, remaining_features, graph, node, str(val), depth+1)

    return node

# Build & Visualize
features = ['Outlook', 'Temp', 'Humidity', 'Wind']
target = df['PlayTennis']

dot = Digraph()
id3(df[features], target, features, dot)

dot.render("id3_tree", format='png', cleanup=False)
dot.view("id3_tree")
`;

const id3SklearnCode = `
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
from sklearn.tree import plot_tree
import matplotlib.pyplot as plt

# Dataset
data = {
    'Day': ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14'],
    'Outlook': ['Sunny', 'Sunny', 'Overcast', 'Rain', 'Rain', 'Rain', 'Overcast', 'Sunny', 'Sunny', 'Rain', 'Sunny', 'Overcast', 'Overcast', 'Rain'],
    'Temp': ['Hot', 'Hot', 'Hot', 'Mild', 'Cool', 'Cool', 'Cool', 'Mild', 'Cool', 'Mild', 'Mild', 'Mild', 'Hot', 'Mild'],
    'Humidity': ['High', 'High', 'High', 'High', 'Normal', 'Normal', 'Normal', 'High', 'Normal', 'Normal', 'Normal', 'High', 'Normal', 'High'],
    'Wind': ['Weak', 'Strong', 'Weak', 'Weak', 'Weak', 'Strong', 'Strong', 'Weak', 'Weak', 'Weak', 'Strong', 'Strong', 'Weak', 'Strong'],
    'PlayTennis': ['No', 'No', 'Yes', 'Yes', 'Yes', 'No', 'Yes', 'No', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'No']
}
df = pd.DataFrame(data)

# Label Encoding
le = LabelEncoder()
for column in ['Outlook', 'Temp', 'Humidity', 'Wind', 'PlayTennis']:
    df[column] = le.fit_transform(df[column])

# Features and Target
X = df[['Outlook', 'Temp', 'Humidity', 'Wind']]
y = df['PlayTennis']

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Decision Tree Classifier
clf = DecisionTreeClassifier(criterion='entropy', max_depth=4, random_state=42)
clf.fit(X_train, y_train)

# Prediction and Accuracy
y_pred = clf.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"Accuracy: {acc:.2f}")

# Plot the tree
plt.figure(figsize=(12, 8))
plot_tree(clf, feature_names=X.columns.tolist(), class_names=['No', 'Yes'], filled=True)
plt.title("Decision Tree Classifier - Play Tennis (scikit-learn)")
plt.show()
`;

const CodeExamples = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              ID3 Algorithm Code Examples
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn to implement the ID3 decision tree from scratch and with scikit-learn.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* From Scratch Implementation */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-6 w-6 text-primary" />
                  ID3 Implementation from Scratch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  This example shows how to build the ID3 algorithm using Python with Pandas, NumPy, and Graphviz for visualization.
                </p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre><code>{id3FromScratchCode}</code></pre>
                </div>
              </CardContent>
            </Card>

            {/* Scikit-learn Implementation */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-6 w-6 text-secondary" />
                  ID3 Implementation with Scikit-learn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  This example demonstrates how to create the same ID3 decision tree using the popular scikit-learn library.
                </p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre><code>{id3SklearnCode}</code></pre>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex w-full flex-col items-center justify-center gap-4 pt-8 sm:flex-row sm:justify-between">
              <Link to="/how-it-works">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous: How It Works
                </Button>
              </Link>
              <Link to="/try-it-yourself">
                <Button size="sm">
                  Next: Try It Yourself
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

export default CodeExamples;
