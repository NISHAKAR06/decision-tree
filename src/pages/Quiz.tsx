import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      question: "What is entropy in the context of decision trees?",
      options: [
        "A measure of how fast the algorithm runs",
        "A measure of impurity or randomness in the data",
        "The number of features in the dataset",
        "The depth of the decision tree"
      ],
      correct: 1,
      explanation: "Entropy measures the impurity or randomness in a dataset. Higher entropy means more mixed/chaotic data, while lower entropy means more organized data."
    },
    {
      id: 2,
      question: "Which splitting criterion tries to maximize information gain?",
      options: [
        "Random splitting",
        "Alphabetical order",
        "Entropy-based splitting",
        "Size-based splitting"
      ],
      correct: 2,
      explanation: "Entropy-based splitting calculates information gain for each possible split and chooses the one that maximizes it, creating the purest possible subsets."
    },
    {
      id: 3,
      question: "What happens when a decision tree node has entropy = 0?",
      options: [
        "The algorithm stops and creates a leaf node",
        "The tree continues growing indefinitely",
        "An error occurs",
        "The node is deleted"
      ],
      correct: 0,
      explanation: "When entropy = 0, all samples in the node belong to the same class (pure node). This is a perfect stopping condition, so a leaf node is created."
    },
    {
      id: 4,
      question: "What is information gain?",
      options: [
        "The total number of questions asked",
        "The reduction in entropy after a split",
        "The accuracy of the model",
        "The time saved by using the algorithm"
      ],
      correct: 1,
      explanation: "Information gain = Original entropy - Weighted average of split entropies. It measures how much 'cleaner' the data becomes after asking a question."
    },
    {
      id: 5,
      question: "Which parameter controls the maximum depth of a decision tree in scikit-learn?",
      options: [
        "min_samples_split",
        "criterion",
        "max_depth",
        "random_state"
      ],
      correct: 2,
      explanation: "The 'max_depth' parameter limits how deep the tree can grow, helping prevent overfitting by stopping the tree from becoming too complex."
    },
    {
      id: 6,
      question: "In the tennis playing example, why is 'Weather' often the best first split?",
      options: [
        "It's the first column in the dataset",
        "It has the highest information gain",
        "It has the most possible values",
        "It's the most important feature"
      ],
      correct: 1,
      explanation: "Weather typically has the highest information gain because it creates relatively pure subsets (e.g., 'Overcast' → always play, 'Sunny' → usually don't play)."
    }
  ];

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correct) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const currentQ = questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQ?.id] !== undefined;

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <Award className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                Quiz Complete!
              </h1>
              <p className="text-xl text-muted-foreground">
                Here's how you did on the Decision Tree quiz
              </p>
            </div>

            <Card className="bg-gradient-card shadow-card mb-8">
              <CardHeader>
                <CardTitle className="text-center">Your Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-primary mb-2">
                    {score}/{questions.length}
                  </div>
                  <div className="text-2xl text-muted-foreground">
                    {Math.round((score / questions.length) * 100)}% Correct
                  </div>
                  <div className="mt-4">
                    {score === questions.length && (
                      <div className="text-green-600 font-semibold">🎉 Perfect score! You're a Decision Tree expert!</div>
                    )}
                    {score >= questions.length * 0.8 && score < questions.length && (
                      <div className="text-blue-600 font-semibold">🚀 Excellent! You have a strong understanding!</div>
                    )}
                    {score >= questions.length * 0.6 && score < questions.length * 0.8 && (
                      <div className="text-yellow-600 font-semibold">👍 Good job! Review the concepts and try again!</div>
                    )}
                    {score < questions.length * 0.6 && (
                      <div className="text-red-600 font-semibold">📚 Keep studying! Review the lessons and try again!</div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {questions.map((question, index) => {
                    const userAnswer = selectedAnswers[question.id];
                    const isCorrect = userAnswer === question.correct;
                    
                    return (
                      <div key={question.id} className="p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                          ) : (
                            <XCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">
                              Question {index + 1}: {question.question}
                            </h3>
                            <div className="text-sm space-y-1">
                              <div>
                                <strong>Your answer:</strong> {question.options[userAnswer]}
                              </div>
                              {!isCorrect && (
                                <div>
                                  <strong>Correct answer:</strong> {question.options[question.correct]}
                                </div>
                              )}
                              <div className="text-muted-foreground mt-2">
                                <strong>Explanation:</strong> {question.explanation}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-center gap-4 mt-8">
                  <Button onClick={resetQuiz} className="bg-gradient-primary">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                  <Link to="/">
                    <Button variant="outline">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Decision Tree Quiz
            </h1>
            <p className="text-xl text-muted-foreground">
              Test your knowledge with interactive questions about decision trees
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>
                Question {currentQuestion + 1}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-xl font-semibold mb-6">
                {currentQ.question}
              </h2>
              
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(currentQ.id, index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      selectedAnswers[currentQ.id] === index
                        ? "border-primary bg-primary-light text-primary-foreground"
                        : "border-border bg-background hover:border-primary-light hover:bg-primary-light/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQ.id] === index
                          ? "border-primary-foreground bg-primary-foreground"
                          : "border-muted-foreground"
                      }`}>
                        {selectedAnswers[currentQ.id] === index && (
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button 
              onClick={handlePrevious}
              variant="outline"
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            <Button 
              onClick={handleNext}
              className="bg-gradient-primary"
              disabled={!isAnswered}
            >
              {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next"}
              {currentQuestion !== questions.length - 1 && (
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;