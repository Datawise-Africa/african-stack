import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowRight, 
  Globe, 
  Users, 
  Zap, 
  Target, 
  BookOpen,
  Mail,
  ExternalLink
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About The African Stack
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The intellectual and strategic home for Africa&apos;s data, AI, and infrastructure movement. 
            Where we showcase what we&apos;re building, reflect on the future, and connect the dots between 
            innovation, policy, and the real world.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    The African Stack isn&apos;t just another website — it&apos;s a platform for vision, influence, 
                    and impact. We&apos;re building the intellectual foundation for Africa&apos;s data-driven future, 
                    one strategic insight at a time.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Through our flagship newsletter and curated content, we connect the dots between 
                    innovation, policy, and real-world impact across African markets.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-16 w-16 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Strategic Focus</h3>
                  <p className="text-muted-foreground">
                    Data Infrastructure • AI Policy • Innovation Ecosystems
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* What We Do */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Strategic Analysis</CardTitle>
                <CardDescription>
                  Deep insights on data infrastructure, AI policy, and innovation trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our weekly newsletter provides comprehensive analysis of Africa&apos;s evolving 
                  tech landscape, helping leaders make informed decisions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Community Building</CardTitle>
                <CardDescription>
                  Connecting data leaders, AI innovators, and infrastructure builders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We foster a community of 2,500+ subscribers across 25+ African countries, 
                  creating opportunities for collaboration and knowledge sharing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Future Vision</CardTitle>
                <CardDescription>
                  Showcasing what we&apos;re building today and tomorrow&apos;s possibilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We highlight innovative projects, emerging technologies, and policy 
                  developments that will shape Africa&apos;s digital future.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Datawise Africa Connection */}
        <section className="mb-16">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Powered by Datawise Africa</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    The African Stack is a flagship initiative of Datawise Africa, a leading 
                    organization dedicated to advancing data-driven solutions across the continent.
                  </p>
                  <p className="text-lg text-muted-foreground mb-6">
                    Through our work at Datawise Africa, we&apos;ve seen firsthand the transformative 
                    power of data and AI in solving Africa&apos;s unique challenges. The African Stack 
                    extends this mission by creating a platform for strategic thinking and knowledge sharing.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild>
                      <Link href="https://datawiseafrica.com" target="_blank">
                        Visit Datawise Africa
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="https://datawiseafrica.com/datalab" target="_blank">
                        Explore DataLab
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Globe className="h-16 w-16 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Datawise Africa</h3>
                  <p className="text-muted-foreground">
                    Advancing data-driven solutions across Africa
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Leadership */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Leadership</h2>
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Felix</h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    Felix leads The African Stack initiative, bringing deep expertise in data 
                    infrastructure, AI policy, and African tech ecosystems. With a background 
                    in both technical implementation and strategic thinking, Felix is uniquely 
                    positioned to guide our community through Africa&apos;s digital transformation.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Through Datawise Africa, Felix has worked with governments, startups, and 
                    international organizations to build data-driven solutions that address 
                    Africa&apos;s most pressing challenges.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Leading Africa&apos;s data and AI movement
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Newsletter Stats */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">12+</div>
              <div className="text-sm text-muted-foreground">Newsletter Issues</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2.5K+</div>
              <div className="text-sm text-muted-foreground">Subscribers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-sm text-muted-foreground">African Countries</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Expert Contributors</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Join Our Community
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Be part of Africa&apos;s data and AI movement. Subscribe to our newsletter and 
                connect with like-minded innovators.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/newsletter/subscribe">
                    <Mail className="w-4 h-4 mr-2" />
                    Subscribe to Newsletter
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/newsletter">
                    Browse Archive
                    <ArrowRight className="ml-2 h-4 w-4" />
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