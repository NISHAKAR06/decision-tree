import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TreePine, 
  Calculator, 
  Code, 
  Play, 
  Award,
  ArrowRight,
  BookOpen,
  Lightbulb,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: TreePine,
      title: "What is a Decision Tree?",
      description: "Start with the basics - learn what decision trees are and how they work with simple examples",
      href: "/what-is-decision-tree",
      color: "bg-primary"
    },
    {
      icon: Calculator,
      title: "Entropy & Information Gain",
      description: "Understand the mathematical concepts that make decision trees smart",
      href: "/entropy-information-gain",
      color: "bg-secondary"
    },
    {
      icon: Brain,
      title: "How It Works",
      description: "See step-by-step how algorithms build decision trees from data",
      href: "/how-it-works",
      color: "bg-accent"
    },
    {
      icon: Code,
      title: "Code Examples",
      description: "Learn to implement decision trees with Python and scikit-learn",
      href: "/code-examples",
      color: "bg-primary"
    },
    {
      icon: Play,
      title: "Try It Yourself",
      description: "Interactive tools to experiment with entropy and tree building",
      href: "/try-it-yourself",
      color: "bg-secondary"
    },
    {
      icon: Award,
      title: "Quiz",
      description: "Test your knowledge with interactive quizzes and practice problems",
      href: "/quiz",
      color: "bg-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Machine Learning Made Simple
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Learn <span className="bg-gradient-primary bg-clip-text text-transparent">Decision Trees</span>
              <br />Like Never Before
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Master the fundamentals of Decision Tree algorithms with our beginner-friendly, 
              visual approach. From basic concepts to code implementation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/what-is-decision-tree">
                <Button size="lg" className="bg-gradient-primary shadow-soft hover:shadow-glow transition-shadow">
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/try-it-yourself">
                <Button size="lg" variant="outline" className="hover:bg-primary-light transition-colors">
                  Try Interactive Demo
                  <Play className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-primary/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-secondary/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-20 w-8 h-8 bg-accent/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Why Learn Decision Trees */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Learn Decision Trees?</h2>
            <p className="text-lg text-muted-foreground">
              Decision trees are one of the most intuitive and powerful machine learning algorithms
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-gradient-card rounded-xl shadow-card">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy to Understand</h3>
              <p className="text-muted-foreground">
                Visual flowcharts that humans can interpret and trust
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-card rounded-xl shadow-card">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Highly Accurate</h3>
              <p className="text-muted-foreground">
                Powerful for both classification and regression problems
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-card rounded-xl shadow-card">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Foundation Skill</h3>
              <p className="text-muted-foreground">
                Gateway to advanced algorithms like Random Forest and XGBoost
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Learning Journey</h2>
            <p className="text-lg text-muted-foreground">
              Follow our structured path from beginner to confident practitioner
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Link key={feature.title} to={feature.href}>
                <Card className="h-full bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Step {index + 1}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Master Decision Trees?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of students learning machine learning the visual way
          </p>
          <Link to="/what-is-decision-tree">
            <Button size="lg" variant="secondary" className="shadow-soft">
              Begin Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Decision Tree Academy. Made with ❤️ for learning.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;