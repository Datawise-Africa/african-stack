import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  TrendingUp, 
  Star, 
  MessageCircle, 
  BookOpen, 
  Zap,
  ArrowRight,
  Users,
  Calendar
} from "lucide-react";

const categories = [
  {
    id: "ai",
    slug: "artificial-intelligence",
    name: "Artificial Intelligence",
    description: "Explore the latest developments in AI research, applications, and innovations from across Africa.",
    icon: Globe,
    articleCount: 120,
    color: "bg-blue-500",
    recentArticles: [
      {
        title: "Building AI Solutions in Africa: Challenges and Opportunities",
        author: "Dr. Sarah Johnson",
        publishedAt: "2024-01-15",
        readTime: 8
      },
      {
        title: "Natural Language Processing for African Languages",
        author: "Prof. Kwame Asante",
        publishedAt: "2024-01-12",
        readTime: 6
      }
    ]
  },
  {
    id: "ml",
    slug: "machine-learning",
    name: "Machine Learning",
    description: "Dive deep into machine learning algorithms, models, and real-world applications in African contexts.",
    icon: TrendingUp,
    articleCount: 85,
    color: "bg-green-500",
    recentArticles: [
      {
        title: "Machine Learning in Healthcare: African Perspectives",
        author: "Dr. Michael Chen",
        publishedAt: "2024-01-10",
        readTime: 6
      },
      {
        title: "Predictive Analytics for Agricultural Yield",
        author: "Dr. Fatima Al-Hassan",
        publishedAt: "2024-01-08",
        readTime: 7
      }
    ]
  },
  {
    id: "ds",
    slug: "data-science",
    name: "Data Science",
    description: "Learn about data analysis, visualization, and insights that drive decision-making in African organizations.",
    icon: Star,
    articleCount: 95,
    color: "bg-purple-500",
    recentArticles: [
      {
        title: "Data Science Startups: The African Advantage",
        author: "Aisha Okafor",
        publishedAt: "2024-01-08",
        readTime: 7
      },
      {
        title: "Big Data Analytics in African Financial Services",
        author: "Dr. James Mwangi",
        publishedAt: "2024-01-05",
        readTime: 5
      }
    ]
  },
  {
    id: "startups",
    slug: "startup-stories",
    name: "Startup Stories",
    description: "Inspiring stories of African entrepreneurs building innovative tech companies and solving local problems.",
    icon: MessageCircle,
    articleCount: 60,
    color: "bg-orange-500",
    recentArticles: [
      {
        title: "From Lagos to Silicon Valley: A Startup Journey",
        author: "Tunde Adebayo",
        publishedAt: "2024-01-14",
        readTime: 9
      },
      {
        title: "Building a Fintech Empire in Kenya",
        author: "Grace Wanjiku",
        publishedAt: "2024-01-11",
        readTime: 8
      }
    ]
  },
  {
    id: "policy",
    slug: "tech-policy",
    name: "Tech Policy",
    description: "Analysis of technology policies, regulations, and their impact on innovation across African countries.",
    icon: BookOpen,
    articleCount: 40,
    color: "bg-red-500",
    recentArticles: [
      {
        title: "Digital Rights and Privacy in Africa",
        author: "Dr. Ngozi Okonjo-Iweala",
        publishedAt: "2024-01-13",
        readTime: 10
      },
      {
        title: "Regulating AI: A Pan-African Approach",
        author: "Prof. Thabo Mbeki",
        publishedAt: "2024-01-09",
        readTime: 7
      }
    ]
  },
  {
    id: "innovation",
    slug: "innovation",
    name: "Innovation",
    description: "Cutting-edge innovations, breakthrough technologies, and creative solutions emerging from Africa.",
    icon: Zap,
    articleCount: 100,
    color: "bg-yellow-500",
    recentArticles: [
      {
        title: "Solar-Powered Internet for Rural Communities",
        author: "Dr. Amina Jallow",
        publishedAt: "2024-01-16",
        readTime: 6
      },
      {
        title: "Blockchain for Supply Chain Transparency",
        author: "Chinedu Eze",
        publishedAt: "2024-01-07",
        readTime: 8
      }
    ]
  }
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore by Category</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover articles organized by topic. Find content that matches your interests and expertise level.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-background border rounded-lg p-6 hover:shadow-lg transition-shadow group"
          >
            {/* Category Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-1" />
                    {category.articleCount} articles
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {category.description}
            </p>

            {/* Recent Articles */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Recent Articles</h4>
              <div className="space-y-2">
                {category.recentArticles.map((article, index) => (
                  <div key={index} className="text-sm">
                    <Link
                      href={`/articles/${article.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="font-medium hover:text-primary transition-colors line-clamp-2"
                    >
                      {article.title}
                    </Link>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <span>{article.author}</span>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {article.publishedAt}
                      </div>
                      <span className="mx-2">•</span>
                      <span>{article.readTime} min read</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* View Category Button */}
            <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
              <Link href={`/categories/${category.slug}`}>
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center bg-muted/30 rounded-2xl p-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Can&apos;t Find What You&apos;re Looking For?
        </h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          We&apos;re always adding new categories and content. Suggest a topic or contribute an article to help grow our community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/contribute">
              Suggest a Topic
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/register">
              Start Writing
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
