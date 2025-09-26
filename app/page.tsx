import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Zap, Globe, Star, TrendingUp, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Data Points */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-primary/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-secondary/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-60 right-1/3 w-5 h-5 bg-accent/25 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 gap-4 h-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <div 
                  key={i} 
                  className="bg-primary rounded-sm animate-pulse"
                  style={{ 
                    animationDelay: `${(i % 12) * 0.1}s`,
                    animationDuration: '3s'
                  }}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Floating AI Icons */}
          <div className="absolute top-32 right-16 text-primary/10 animate-float">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div className="absolute bottom-32 left-16 text-secondary/10 animate-float" style={{ animationDelay: '1s' }}>
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div className="absolute top-1/2 right-8 text-accent/10 animate-float" style={{ animationDelay: '2s' }}>
            <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          
          {/* Neural Network Pattern */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-5">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="20" cy="20" r="2" fill="currentColor" className="animate-pulse-glow" />
              <circle cx="80" cy="20" r="2" fill="currentColor" className="animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
              <circle cx="20" cy="80" r="2" fill="currentColor" className="animate-pulse-glow" style={{ animationDelay: '1s' }} />
              <circle cx="80" cy="80" r="2" fill="currentColor" className="animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
              <circle cx="50" cy="50" r="3" fill="currentColor" className="animate-pulse-glow" style={{ animationDelay: '2s' }} />
              <line x1="20" y1="20" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              <line x1="80" y1="20" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              <line x1="20" y1="80" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              <line x1="80" y1="80" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            </svg>
          </div>
          
          {/* Data Flow Lines */}
          <div className="absolute top-1/3 right-1/4 w-24 h-24 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M10,50 Q30,20 50,50 T90,50" stroke="currentColor" strokeWidth="2" fill="none" className="animate-pulse" />
              <path d="M10,30 Q30,60 50,30 T90,30" stroke="currentColor" strokeWidth="1" fill="none" className="animate-pulse" style={{ animationDelay: '1s' }} />
              <path d="M10,70 Q30,40 50,70 T90,70" stroke="currentColor" strokeWidth="1" fill="none" className="animate-pulse" style={{ animationDelay: '2s' }} />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                  The <span className="text-primary">African Stack</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl mx-auto lg:mx-0">
                  Building Africa&apos;s future in data, infrastructure, and intelligence.
                </p>
                <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto lg:mx-0">
                  The intellectual and strategic home for Africa&apos;s data, AI, and infrastructure movement. 
                  Where we showcase what we&apos;re building, reflect on the future, and connect the dots between 
                  innovation, policy, and the real world.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button asChild size="lg" className="text-lg px-8 py-6">
                    <Link href="/newsletter">
                      Read the Latest Issue
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                    <Link href="/newsletter/subscribe">
                      Subscribe to Newsletter
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right Content - Animated CSV Data Visualization */}
              <div className="relative">
                <div className="bg-background/80 backdrop-blur-sm border rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-primary">AI Infrastructure Data</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-muted-foreground">Live</span>
                    </div>
                  </div>
                  
                  {/* Animated CSV Table */}
                  <div className="overflow-hidden h-64 relative">
                    <div className="animate-scroll">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-background/95 backdrop-blur-sm">
                          <tr className="border-b">
                            <th className="text-left py-2 px-3 text-muted-foreground">Country</th>
                            <th className="text-left py-2 px-3 text-muted-foreground">AI Projects</th>
                            <th className="text-left py-2 px-3 text-muted-foreground">Data Centers</th>
                            <th className="text-left py-2 px-3 text-muted-foreground">Growth %</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { country: "Nigeria", projects: "1,247", centers: "23", growth: "+12.5%", trend: "↗" },
                            { country: "Kenya", projects: "892", centers: "18", growth: "+15.2%", trend: "↗" },
                            { country: "South Africa", projects: "1,156", centers: "31", growth: "+8.7%", trend: "↗" },
                            { country: "Ghana", projects: "634", centers: "12", growth: "+22.1%", trend: "↗" },
                            { country: "Egypt", projects: "1,089", centers: "19", growth: "+11.3%", trend: "↗" },
                            { country: "Morocco", projects: "567", centers: "14", growth: "+18.9%", trend: "↗" },
                            { country: "Tunisia", projects: "423", centers: "8", growth: "+14.6%", trend: "↗" },
                            { country: "Ethiopia", projects: "789", centers: "15", growth: "+16.8%", trend: "↗" },
                            { country: "Uganda", projects: "345", centers: "6", growth: "+19.4%", trend: "↗" },
                            { country: "Rwanda", projects: "278", centers: "5", growth: "+25.7%", trend: "↗" },
                            { country: "Tanzania", projects: "234", centers: "4", growth: "+17.3%", trend: "↗" },
                            { country: "Senegal", projects: "189", centers: "3", growth: "+21.5%", trend: "↗" },
                            { country: "Ivory Coast", projects: "156", centers: "2", growth: "+13.8%", trend: "↗" },
                            { country: "Algeria", projects: "298", centers: "7", growth: "+9.2%", trend: "↗" },
                            { country: "Angola", projects: "167", centers: "3", growth: "+16.4%", trend: "↗" },
                          ].map((row, index) => (
                            <tr 
                              key={index} 
                              className="border-b hover:bg-muted/50 transition-colors animate-fade-in-up"
                              style={{ animationDelay: `${index * 0.05}s` }}
                            >
                              <td className="py-2 px-3 font-medium flex items-center">
                                <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
                                {row.country}
                              </td>
                              <td className="py-2 px-3 text-primary font-mono">{row.projects}</td>
                              <td className="py-2 px-3 font-mono">{row.centers}</td>
                              <td className="py-2 px-3 text-green-600 font-medium flex items-center">
                                <span className="mr-1">{row.trend}</span>
                                {row.growth}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Gradient overlays for smooth scrolling effect */}
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
                  </div>
                  
                  {/* Animated Progress Bars */}
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Data Infrastructure Growth</span>
                      <span className="font-medium text-primary">87%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 relative overflow-hidden">
                      <div className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full animate-progress relative" style={{ width: '87%' }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">AI Adoption Rate</span>
                      <span className="font-medium text-secondary">64%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 relative overflow-hidden">
                      <div className="bg-gradient-to-r from-secondary to-secondary/80 h-3 rounded-full animate-progress relative" style={{ width: '64%', animationDelay: '0.5s' }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Policy Implementation</span>
                      <span className="font-medium text-accent">42%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 relative overflow-hidden">
                      <div className="bg-gradient-to-r from-accent to-accent/80 h-3 rounded-full animate-progress relative" style={{ width: '42%', animationDelay: '1s' }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Real-time Stats */}
                  <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold text-primary">2.5K+</div>
                      <div className="text-xs text-muted-foreground">Subscribers</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold text-secondary">25+</div>
                      <div className="text-xs text-muted-foreground">Countries</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold text-accent">12+</div>
                      <div className="text-xs text-muted-foreground">Issues</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
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
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Expert Contributors</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-sm text-muted-foreground">African Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why The African Stack?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A platform for vision, influence, and impact in Africa&apos;s data and AI ecosystem.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Strategic Intelligence</h3>
              <p className="text-muted-foreground">
                Deep insights on data infrastructure, AI policy, and innovation trends shaping Africa&apos;s future.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Policy & Practice</h3>
              <p className="text-muted-foreground">
                Connecting the dots between innovation, policy, and real-world impact across African markets.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Future-Focused</h3>
              <p className="text-muted-foreground">
                Showcasing what we&apos;re building today and reflecting on tomorrow&apos;s possibilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Newsletter Archive</h2>
            <p className="text-xl text-muted-foreground">
              Explore our collection of strategic insights and analysis.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Data Infrastructure", count: "Issue #12", icon: Globe },
              { name: "AI Policy & Governance", count: "Issue #11", icon: TrendingUp },
              { name: "Smart Cities & IoT", count: "Issue #10", icon: Star },
              { name: "Financial Technology", count: "Issue #9", icon: MessageCircle },
              { name: "Healthcare Innovation", count: "Issue #8", icon: BookOpen },
              { name: "Climate & Sustainability", count: "Issue #7", icon: Zap },
            ].map((category, index) => (
              <Link
                key={index}
                href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="p-6 bg-background rounded-lg border hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{category.count}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-primary/5 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Connected to Africa&apos;s Data Future
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join our community of data leaders, AI innovators, and infrastructure builders shaping Africa&apos;s tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/newsletter/subscribe">
                  Subscribe to Newsletter
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/newsletter">
                  Read Latest Issue
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
