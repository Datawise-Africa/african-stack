import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Users, 
  PenTool, 
  Code, 
  MessageSquare, 
  BookOpen,
  CheckCircle,
  Mail,
  Github,
  Twitter,
  Linkedin
} from "lucide-react";

export default function ContributePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contribute to <span className="text-primary">The African Stack</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join our mission to build Africa's intellectual and strategic home for data, AI, and infrastructure. 
            Your contributions help shape the future of African technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="#newsletter">
                <PenTool className="w-4 h-4 mr-2" />
                Write for Us
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#community">
                <Users className="w-4 h-4 mr-2" />
                Join Community
              </Link>
            </Button>
          </div>
        </div>

        {/* Ways to Contribute */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Ways to Contribute</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Newsletter Writing */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <PenTool className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Newsletter Articles</CardTitle>
                <CardDescription>
                  Share your insights on data, AI, and infrastructure in Africa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Strategic analysis and policy insights
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Case studies and success stories
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Technical deep-dives and tutorials
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Industry trends and predictions
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="#newsletter">
                    Submit Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Community Engagement */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Community Engagement</CardTitle>
                <CardDescription>
                  Participate in discussions and share knowledge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Comment on articles and share insights
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Suggest topics and ideas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Connect with other contributors
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Provide feedback and suggestions
                  </li>
                </ul>
                <Button asChild className="w-full" variant="outline">
                  <Link href="#community">
                    Join Discussion
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Technical Contributions */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Technical Contributions</CardTitle>
                <CardDescription>
                  Help improve our platform and tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Platform development and features
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Data visualization tools
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    API integrations and improvements
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Bug fixes and optimizations
                  </li>
                </ul>
                <Button asChild className="w-full" variant="outline">
                  <Link href="https://github.com/datawiseafrica/african-stack" target="_blank">
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Content Guidelines */}
        <section id="newsletter" className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-primary" />
                Content Guidelines
              </CardTitle>
              <CardDescription>
                What we're looking for in newsletter contributions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Topics We Cover</h3>
                  <div className="space-y-2">
                    {[
                      "Data Infrastructure & Governance",
                      "AI Policy & Implementation",
                      "Smart Cities & IoT Solutions",
                      "Financial Technology Innovation",
                      "Healthcare Technology",
                      "Climate & Sustainability Tech",
                      "Startup Ecosystems",
                      "Digital Transformation"
                    ].map((topic) => (
                      <div key={topic} className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Content Requirements</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">800-2000 words with clear structure</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">African context and local relevance</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Data-driven insights and analysis</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Original research or unique perspectives</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Professional tone and clear writing</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Submission Process</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg font-bold text-primary">1</span>
                    </div>
                    <h4 className="font-medium mb-2">Submit Proposal</h4>
                    <p className="text-sm text-muted-foreground">
                      Send us your article idea and outline
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg font-bold text-primary">2</span>
                    </div>
                    <h4 className="font-medium mb-2">Review & Feedback</h4>
                    <p className="text-sm text-muted-foreground">
                      We'll review and provide feedback
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg font-bold text-primary">3</span>
                    </div>
                    <h4 className="font-medium mb-2">Publish & Share</h4>
                    <p className="text-sm text-muted-foreground">
                      Your article goes live in our newsletter
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Community Section */}
        <section id="community" className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-6 w-6 mr-2 text-secondary" />
                Join Our Community
              </CardTitle>
              <CardDescription>
                Connect with like-minded professionals and contributors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Community Benefits</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Access to exclusive content and early releases</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Networking opportunities with industry leaders</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Collaboration opportunities on projects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Priority consideration for speaking opportunities</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
                  <div className="space-y-4">
                    <Button asChild className="w-full justify-start">
                      <Link href="/newsletter/subscribe">
                        <Mail className="w-4 h-4 mr-2" />
                        Subscribe to Newsletter
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link href="https://twitter.com/datawiseafrica" target="_blank">
                        <Twitter className="w-4 h-4 mr-2" />
                        Follow on Twitter
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link href="https://linkedin.com/company/datawiseafrica" target="_blank">
                        <Linkedin className="w-4 h-4 mr-2" />
                        Connect on LinkedIn
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contributor Spotlight */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Contributors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "AI Policy Researcher",
                location: "Cape Town, South Africa",
                contribution: "3 articles on AI governance",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
              },
              {
                name: "Kwame Asante",
                role: "Data Infrastructure Expert",
                location: "Accra, Ghana",
                contribution: "2 articles on smart cities",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kwame"
              },
              {
                name: "Amina Hassan",
                role: "Fintech Innovation Lead",
                location: "Lagos, Nigeria",
                contribution: "4 articles on financial technology",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amina"
              }
            ].map((contributor, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <img
                    src={contributor.avatar}
                    alt={contributor.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4"
                  />
                  <h3 className="font-semibold mb-1">{contributor.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{contributor.role}</p>
                  <p className="text-xs text-muted-foreground mb-3">{contributor.location}</p>
                  <Badge variant="outline" className="text-xs">
                    {contributor.contribution}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Make Your Mark?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our community of thought leaders, innovators, and change-makers 
                who are shaping Africa's digital future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="mailto:contribute@datawiseafrica.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Start Contributing
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/newsletter">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read Our Work
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
