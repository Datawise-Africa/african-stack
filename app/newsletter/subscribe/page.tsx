"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Mail, CheckCircle, Users, Globe, Zap, Headphones, Clock } from "lucide-react";
import Link from "next/link";

export default function NewsletterSubscribePage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const interestOptions = [
    { id: "data-infrastructure", label: "Data Infrastructure", icon: Globe },
    { id: "ai-policy", label: "AI Policy & Governance", icon: Users },
    { id: "smart-cities", label: "Smart Cities & IoT", icon: Zap },
    { id: "fintech", label: "Financial Technology", icon: Globe },
    { id: "healthcare", label: "Healthcare Innovation", icon: Users },
    { id: "climate", label: "Climate & Sustainability", icon: Zap },
    { id: "podcasts", label: "Podcasts (Coming Soon)", icon: Headphones, comingSoon: true },
  ];

  const handleInterestChange = (interestId: string, checked: boolean) => {
    if (checked) {
      setInterests([...interests, interestId]);
    } else {
      setInterests(interests.filter(id => id !== interestId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Subscription data:", { email, name, interests });
      setIsSubscribed(true);
    } catch (error) {
      console.error("Failed to subscribe:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardContent className="p-12">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4">Welcome to The African Stack!</h1>
              <p className="text-lg text-muted-foreground mb-6">
                You've successfully subscribed to our newsletter. You'll receive our latest insights 
                on Africa's data, AI, and infrastructure movement.
              </p>
              <div className="space-y-4">
                <Button asChild>
                  <Link href="/newsletter">
                    Browse Newsletter Archive
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/">
                    Back to Homepage
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Homepage
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join <span className="text-primary">The African Stack</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get strategic insights on Africa's data, AI, and infrastructure movement delivered to your inbox.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Subscription Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Subscribe to Our Newsletter</CardTitle>
                  <CardDescription className="text-base">
                    Join thousands of data leaders, AI innovators, and infrastructure builders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-base font-medium">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="mt-2 h-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="name" className="text-base font-medium">Full Name (Optional)</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-2 h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Areas of Interest</Label>
                      <p className="text-sm text-muted-foreground mb-4">
                        Select the topics you're most interested in (optional)
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {interestOptions.map((option) => (
                          <div key={option.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                            <Checkbox
                              id={option.id}
                              checked={interests.includes(option.id)}
                              onCheckedChange={(checked) => 
                                handleInterestChange(option.id, checked as boolean)
                              }
                            />
                            <Label 
                              htmlFor={option.id}
                              className="flex items-center space-x-2 cursor-pointer flex-1"
                            >
                              <option.icon className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">{option.label}</span>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-lg" 
                      disabled={isSubmitting || !email.trim()}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5 mr-2" />
                          Subscribe to Newsletter
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Benefits */}
            <div className="space-y-6">
              {/* What You'll Get */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    What You'll Get
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-sm">Weekly Newsletter</h4>
                        <p className="text-xs text-muted-foreground">
                          Deep analysis of Africa's data and AI landscape
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-sm">Policy Insights</h4>
                        <p className="text-xs text-muted-foreground">
                          AI governance and data policy developments
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-sm">Industry Analysis</h4>
                        <p className="text-xs text-muted-foreground">
                          Trends and opportunities in African tech
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-sm">Expert Interviews</h4>
                        <p className="text-xs text-muted-foreground">
                          Conversations with tech innovators
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Community Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 text-primary mr-2" />
                    Join Our Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">2,500+</div>
                      <p className="text-xs text-muted-foreground">Active Subscribers</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div>
                        <div className="text-lg font-bold text-secondary">25+</div>
                        <p className="text-xs text-muted-foreground">Countries</p>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-accent">12+</div>
                        <p className="text-xs text-muted-foreground">Issues</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Issues Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Recent Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-2 bg-muted/50 rounded text-xs">
                      <div className="font-medium">Data Infrastructure Revolution</div>
                      <div className="text-muted-foreground">Issue #12</div>
                    </div>
                    <div className="p-2 bg-muted/50 rounded text-xs">
                      <div className="font-medium">AI Policy & Governance</div>
                      <div className="text-muted-foreground">Issue #11</div>
                    </div>
                    <div className="p-2 bg-muted/50 rounded text-xs">
                      <div className="font-medium">Smart Cities Approach</div>
                      <div className="text-muted-foreground">Issue #10</div>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full mt-3">
                    <Link href="/newsletter">
                      View All Issues
                      <ArrowLeft className="w-3 h-3 ml-1 rotate-180" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
