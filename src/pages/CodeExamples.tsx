import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Code, Play, Download, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const CodeExamples = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Code Examples
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn to implement decision trees with Python and scikit-learn
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Basic Implementation */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-6 w-6 text-primary" />
                  Basic Decision Tree with scikit-learn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Let's start with the simplest way to create a decision tree using Python and scikit-learn:
                </p>
                
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <div className="space-y-1">
                    <div><span className="text-green-400"># Import necessary libraries</span></div>
                    <div><span className="text-blue-400">from</span> sklearn.tree <span className="text-blue-400">import</span> DecisionTreeClassifier</div>
                    <div><span className="text-blue-400">from</span> sklearn.model_selection <span className="text-blue-400">import</span> train_test_split</div>
                    <div><span className="text-blue-400">from</span> sklearn.metrics <span className="text-blue-400">import</span> accuracy_score</div>
                    <div><span className="text-blue-400">import</span> pandas <span className="text-blue-400">as</span> pd</div>
                    <div></div>
                    <div><span className="text-green-400"># Load your data</span></div>
                    <div>data = pd.read_csv(<span className="text-yellow-300">'your_dataset.csv'</span>)</div>
                    <div>X = data.drop(<span className="text-yellow-300">'target_column'</span>, axis=<span className="text-purple-400">1</span>)  <span className="text-green-400"># Features</span></div>
                    <div>y = data[<span className="text-yellow-300">'target_column'</span>]  <span className="text-green-400"># Target variable</span></div>
                    <div></div>
                    <div><span className="text-green-400"># Split the data</span></div>
                    <div>X_train, X_test, y_train, y_test = train_test_split(</div>
                    <div className="ml-4">X, y, test_size=<span className="text-purple-400">0.2</span>, random_state=<span className="text-purple-400">42</span></div>
                    <div>)</div>
                    <div></div>
                    <div><span className="text-green-400"># Create and train the model</span></div>
                    <div>model = DecisionTreeClassifier(random_state=<span className="text-purple-400">42</span>)</div>
                    <div>model.fit(X_train, y_train)</div>
                    <div></div>
                    <div><span className="text-green-400"># Make predictions</span></div>
                    <div>y_pred = model.predict(X_test)</div>
                    <div>accuracy = accuracy_score(y_test, y_pred)</div>
                    <div><span className="text-blue-400">print</span>(<span className="text-yellow-300">f'Accuracy: {'{accuracy:.2f}'}'</span>)</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Parameters */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-6 w-6 text-secondary" />
                  Fine-tuning Parameters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Control how your decision tree grows with these important parameters:
                </p>
                
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
                  <div className="space-y-1">
                    <div><span className="text-green-400"># Advanced Decision Tree with parameters</span></div>
                    <div>model = DecisionTreeClassifier(</div>
                    <div className="ml-4">criterion=<span className="text-yellow-300">'gini'</span>,  <span className="text-green-400"># or 'entropy'</span></div>
                    <div className="ml-4">max_depth=<span className="text-purple-400">5</span>,  <span className="text-green-400"># Limit tree depth</span></div>
                    <div className="ml-4">min_samples_split=<span className="text-purple-400">20</span>,  <span className="text-green-400"># Min samples to split</span></div>
                    <div className="ml-4">min_samples_leaf=<span className="text-purple-400">10</span>,  <span className="text-green-400"># Min samples in leaf</span></div>
                    <div className="ml-4">max_features=<span className="text-yellow-300">'sqrt'</span>,  <span className="text-green-400"># Features to consider</span></div>
                    <div className="ml-4">random_state=<span className="text-purple-400">42</span></div>
                    <div>)</div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="p-3 bg-primary-light rounded">
                      <strong>criterion:</strong> 'gini' or 'entropy'<br />
                      <span className="text-muted-foreground">How to measure split quality</span>
                    </div>
                    <div className="p-3 bg-secondary-light rounded">
                      <strong>max_depth:</strong> None or integer<br />
                      <span className="text-muted-foreground">Maximum tree depth</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-accent-light rounded">
                      <strong>min_samples_split:</strong> 2 or more<br />
                      <span className="text-muted-foreground">Min samples to split a node</span>
                    </div>
                    <div className="p-3 bg-primary-light rounded">
                      <strong>min_samples_leaf:</strong> 1 or more<br />
                      <span className="text-muted-foreground">Min samples in leaf node</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Complete Example */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-accent" />
                  Complete Example: Iris Classification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <div className="space-y-1">
                    <div><span className="text-blue-400">from</span> sklearn.datasets <span className="text-blue-400">import</span> load_iris</div>
                    <div><span className="text-blue-400">from</span> sklearn.tree <span className="text-blue-400">import</span> DecisionTreeClassifier, plot_tree</div>
                    <div><span className="text-blue-400">from</span> sklearn.model_selection <span className="text-blue-400">import</span> train_test_split</div>
                    <div><span className="text-blue-400">from</span> sklearn.metrics <span className="text-blue-400">import</span> classification_report</div>
                    <div><span className="text-blue-400">import</span> matplotlib.pyplot <span className="text-blue-400">as</span> plt</div>
                    <div></div>
                    <div><span className="text-green-400"># Load the famous Iris dataset</span></div>
                    <div>iris = load_iris()</div>
                    <div>X, y = iris.data, iris.target</div>
                    <div></div>
                    <div><span className="text-green-400"># Split the data</span></div>
                    <div>X_train, X_test, y_train, y_test = train_test_split(</div>
                    <div className="ml-4">X, y, test_size=<span className="text-purple-400">0.3</span>, random_state=<span className="text-purple-400">42</span></div>
                    <div>)</div>
                    <div></div>
                    <div><span className="text-green-400"># Create and train the model</span></div>
                    <div>dt = DecisionTreeClassifier(</div>
                    <div className="ml-4">criterion=<span className="text-yellow-300">'entropy'</span>,</div>
                    <div className="ml-4">max_depth=<span className="text-purple-400">3</span>,</div>
                    <div className="ml-4">random_state=<span className="text-purple-400">42</span></div>
                    <div>)</div>
                    <div>dt.fit(X_train, y_train)</div>
                    <div></div>
                    <div><span className="text-green-400"># Make predictions and evaluate</span></div>
                    <div>y_pred = dt.predict(X_test)</div>
                    <div><span className="text-blue-400">print</span>(classification_report(y_test, y_pred, 
                                          target_names=iris.target_names))</div>
                    <div></div>
                    <div><span className="text-green-400"># Visualize the tree</span></div>
                    <div>plt.figure(figsize=(<span className="text-purple-400">15</span>, <span className="text-purple-400">10</span>))</div>
                    <div>plot_tree(dt, feature_names=iris.feature_names, </div>
                    <div className="ml-8">class_names=iris.target_names, filled=<span className="text-blue-400">True</span>)</div>
                    <div>plt.show()</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature Importance */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-6 w-6 text-primary" />
                  Understanding Feature Importance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  See which features are most important for your decision tree:
                </p>
                
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <div className="space-y-1">
                    <div><span className="text-green-400"># Get feature importance</span></div>
                    <div>feature_importance = dt.feature_importances_</div>
                    <div>feature_names = iris.feature_names</div>
                    <div></div>
                    <div><span className="text-green-400"># Create a DataFrame for better visualization</span></div>
                    <div><span className="text-blue-400">import</span> pandas <span className="text-blue-400">as</span> pd</div>
                    <div>importance_df = pd.DataFrame({'{'}</div>
                    <div className="ml-4"><span className="text-yellow-300">'feature'</span>: feature_names,</div>
                    <div className="ml-4"><span className="text-yellow-300">'importance'</span>: feature_importance</div>
                    <div>{'}'})</div>
                    <div></div>
                    <div><span className="text-green-400"># Sort by importance</span></div>
                    <div>importance_df = importance_df.sort_values(<span className="text-yellow-300">'importance'</span>, 
                                                    ascending=<span className="text-blue-400">False</span>)</div>
                    <div><span className="text-blue-400">print</span>(importance_df)</div>
                    <div></div>
                    <div><span className="text-green-400"># Plot feature importance</span></div>
                    <div>plt.figure(figsize=(<span className="text-purple-400">10</span>, <span className="text-purple-400">6</span>))</div>
                    <div>plt.bar(importance_df[<span className="text-yellow-300">'feature'</span>], importance_df[<span className="text-yellow-300">'importance'</span>])</div>
                    <div>plt.title(<span className="text-yellow-300">'Feature Importance in Decision Tree'</span>)</div>
                    <div>plt.xlabel(<span className="text-yellow-300">'Features'</span>)</div>
                    <div>plt.ylabel(<span className="text-yellow-300">'Importance'</span>)</div>
                    <div>plt.xticks(rotation=<span className="text-purple-400">45</span>)</div>
                    <div>plt.show()</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8">
              <Link to="/how-it-works">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous: How It Works
                </Button>
              </Link>
              <Link to="/try-it-yourself">
                <Button className="bg-gradient-primary">
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