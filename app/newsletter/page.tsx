import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Users, TrendingUp, Globe, Zap } from "lucide-react";

// Mock newsletter data
const newsletterIssues = [
  {
    id: "issue-12",
    title: "The Data Infrastructure Revolution in Africa",
    date: "2024-01-15",
    summary: "How African countries are building world-class data infrastructure to power their digital economies.",
    readTime: "8 min read",
    category: "Data Infrastructure",
    subscribers: "2,500+",
    icon: Globe,
  },
  {
    id: "issue-11",
    title: "AI Policy & Governance: Lessons from the Continent",
    date: "2024-01-01",
    summary: "A deep dive into how African nations are crafting AI policies that balance innovation with ethical considerations.",
    readTime: "12 min read",
    category: "AI Policy",
    subscribers: "2,400+",
    icon: TrendingUp,
  },
  {
    id: "issue-10",
    title: "Smart Cities: The African Approach",
    date: "2023-12-15",
    summary: "Exploring how African cities are leveraging IoT and data to solve unique urban challenges.",
    readTime: "10 min read",
    category: "Smart Cities",
    subscribers: "2,300+",
    icon: Zap,
  },
  {
    id: "issue-9",
    title: "Fintech Innovation: Beyond Mobile Money",
    date: "2023-12-01",
    summary: "The next wave of financial technology innovations emerging from African markets.",
    readTime: "9 min read",
    category: "Financial Technology",
    subscribers: "2,200+",
    icon: Users,
  },
  {
    id: "issue-8",
    title: "Healthcare AI: Transforming Patient Care",
    date: "2023-11-15",
    summary: "How AI is revolutionizing healthcare delivery across the African continent.",
    readTime: "11 min read",
    category: "Healthcare Innovation",
    subscribers: "2,100+",
    icon: Globe,
  },
  {
    id: "issue-7",
    title: "Climate Tech: Data-Driven Sustainability",
    date: "2023-11-01",
    summary: "Using data and AI to address climate challenges and build sustainable futures.",
    readTime: "7 min read",
    category: "Climate & Sustainability",
    subscribers: "2,000+",
    icon: TrendingUp,
  },
];

export default function NewsletterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The African Stack Newsletter
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Strategic insights on Africa's data, AI, and infrastructure movement
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/newsletter/subscribe">
                Subscribe to Newsletter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">
                Learn More About Us
              </Link>
            </Button>
          </div>
        </div>

        {/* Newsletter Issues */}
        <div className="space-y-6">
          {newsletterIssues.map((issue) => (
            <Card key={issue.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <issue.icon className="h-5 w-5 text-primary" />
                      <Badge variant="outline">{issue.category}</Badge>
                    </div>
                    <CardTitle className="text-2xl mb-2">
                      <Link 
                        href={`/newsletter/${issue.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        {issue.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-base">
                      {issue.summary}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(issue.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div>{issue.readTime}</div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {issue.subscribers} subscribers
                    </div>
                  </div>
                  <Button asChild variant="outline">
                    <Link href={`/newsletter/${issue.id}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subscribe CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Don't Miss the Next Issue
              </h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of data leaders, AI innovators, and infrastructure builders 
                who rely on The African Stack for strategic insights.
              </p>
              <Button asChild size="lg">
                <Link href="/newsletter/subscribe">
                  Subscribe Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
