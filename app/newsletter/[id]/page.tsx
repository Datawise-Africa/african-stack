import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  Share2, 
  Mail,
  Globe,
  TrendingUp,
  Zap
} from "lucide-react";

// Mock newsletter data
const newsletterIssues: Record<string, any> = {
  "issue-12": {
    id: "issue-12",
    title: "The Data Infrastructure Revolution in Africa",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Data Infrastructure",
    subscribers: "2,500+",
    icon: Globe,
    content: `
      <h2>Introduction</h2>
      <p>Africa is experiencing a data infrastructure revolution that's reshaping how we think about digital transformation. From undersea cables to edge computing, the continent is building the foundation for a data-driven future.</p>
      
      <h2>The Current Landscape</h2>
      <p>Over the past five years, Africa has seen unprecedented investment in data infrastructure. Major undersea cable projects like 2Africa and Equiano are bringing high-speed internet to coastal cities, while terrestrial fiber networks are extending connectivity inland.</p>
      
      <h2>Key Developments</h2>
      <h3>Undersea Cables</h3>
      <p>The 2Africa cable, one of the world's largest subsea cable projects, will connect 33 countries across Africa, Europe, and Asia. This represents a $1 billion investment in Africa's digital future.</p>
      
      <h3>Data Centers</h3>
      <p>Major cloud providers are establishing data centers across Africa. AWS has launched regions in Cape Town and Johannesburg, while Microsoft Azure is expanding its presence in South Africa and planning new regions in Nigeria and Kenya.</p>
      
      <h3>Edge Computing</h3>
      <p>Edge computing is becoming crucial for latency-sensitive applications. Companies are deploying edge infrastructure closer to users, reducing latency and improving performance for African applications.</p>
      
      <h2>Policy Implications</h2>
      <p>Governments across Africa are recognizing the strategic importance of data infrastructure. New policies are emerging around data localization, cybersecurity, and digital sovereignty.</p>
      
      <h2>Challenges and Opportunities</h2>
      <p>While progress is significant, challenges remain. Power infrastructure, regulatory frameworks, and skills development are critical areas that need attention. However, these challenges also present opportunities for innovation and local solutions.</p>
      
      <h2>Looking Ahead</h2>
      <p>The next phase of Africa's data infrastructure development will focus on 5G networks, IoT connectivity, and AI-ready infrastructure. The continent is positioning itself to be a leader in the global digital economy.</p>
    `,
    keyPoints: [
      "2Africa cable represents $1B investment in African connectivity",
      "AWS and Microsoft expanding data center presence",
      "Edge computing reducing latency for African applications",
      "New policies emerging around data localization",
      "5G and IoT infrastructure next priority"
    ]
  },
  "issue-11": {
    id: "issue-11",
    title: "AI Policy & Governance: Lessons from the Continent",
    date: "2024-01-01",
    readTime: "12 min read",
    category: "AI Policy",
    subscribers: "2,400+",
    icon: TrendingUp,
    content: `
      <h2>Introduction</h2>
      <p>As artificial intelligence becomes increasingly central to economic development, African nations are crafting AI policies that balance innovation with ethical considerations and local context.</p>
      
      <h2>Policy Landscape</h2>
      <p>Several African countries have released or are developing national AI strategies. These policies reflect unique African perspectives on AI governance, emphasizing inclusive growth and local capacity building.</p>
      
      <h2>Key Policy Areas</h2>
      <h3>Ethical AI</h3>
      <p>African AI policies emphasize fairness, transparency, and accountability. Many countries are developing frameworks that address bias in AI systems and ensure equitable access to AI benefits.</p>
      
      <h3>Data Governance</h3>
      <p>Data is the fuel of AI, and African countries are developing comprehensive data governance frameworks. These include data protection laws, cross-border data flows, and data sovereignty considerations.</p>
      
      <h3>Skills Development</h3>
      <p>Building local AI talent is a priority across the continent. Policies focus on education, training programs, and creating opportunities for African researchers and practitioners.</p>
      
      <h2>Regional Cooperation</h2>
      <p>African countries are increasingly collaborating on AI policy. The African Union is developing continental guidelines, while regional economic communities are creating harmonized approaches.</p>
      
      <h2>Industry Perspectives</h2>
      <p>Private sector engagement is crucial for effective AI policy. Companies are working with governments to develop practical frameworks that support innovation while addressing societal concerns.</p>
      
      <h2>International Engagement</h2>
      <p>African countries are actively participating in global AI governance discussions, bringing unique perspectives on development, equity, and cultural considerations.</p>
    `,
    keyPoints: [
      "National AI strategies emerging across Africa",
      "Emphasis on ethical AI and local capacity building",
      "Comprehensive data governance frameworks",
      "Regional cooperation through AU and RECs",
      "Active participation in global AI governance"
    ]
  }
};

interface NewsletterIssuePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewsletterIssuePage({ params }: NewsletterIssuePageProps) {
  const { id } = await params;
  const issue = newsletterIssues[id];
  
  if (!issue) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/newsletter">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Newsletter Archive
            </Link>
          </Button>
          
          <div className="flex items-center space-x-2 mb-4">
            <issue.icon className="h-5 w-5 text-primary" />
            <Badge variant="outline">{issue.category}</Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {issue.title}
          </h1>
          
          <div className="flex items-center space-x-6 text-muted-foreground mb-6">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(issue.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {issue.readTime}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {issue.subscribers} subscribers
            </div>
          </div>
        </div>

        {/* Newsletter Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: issue.content }}
            />
          </CardContent>
        </Card>

        {/* Key Points */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Key Takeaways</CardTitle>
            <CardDescription>
              The most important points from this issue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {issue.keyPoints.map((point: string, index: number) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button asChild>
            <Link href="/newsletter/subscribe">
              <Mail className="w-4 h-4 mr-2" />
              Subscribe to Newsletter
            </Link>
          </Button>
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share This Issue
          </Button>
        </div>

        {/* Related Issues */}
        <Card>
          <CardHeader>
            <CardTitle>More from The African Stack</CardTitle>
            <CardDescription>
              Explore other recent issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.values(newsletterIssues)
                .filter(relatedIssue => relatedIssue.id !== issue.id)
                .slice(0, 2)
                .map((relatedIssue) => (
                  <Link
                    key={relatedIssue.id}
                    href={`/newsletter/${relatedIssue.id}`}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <relatedIssue.icon className="h-4 w-4 text-primary" />
                      <Badge variant="outline" className="text-xs">
                        {relatedIssue.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-1">{relatedIssue.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(relatedIssue.date).toLocaleDateString()} • {relatedIssue.readTime}
                    </p>
                  </Link>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
