import { useArticlesQuery } from "~/queries/articles/query";
import { useCategoriesQuery } from "~/queries/categories/query";

export function ArticlesCategoriesTest() {
  const { articlesQuery, featuredArticlesQuery, recentArticlesQuery } = useArticlesQuery();
  const { categoriesQuery } = useCategoriesQuery();
  
  const isLoading = 
    articlesQuery.isLoading || 
    featuredArticlesQuery.isLoading || 
    recentArticlesQuery.isLoading || 
    categoriesQuery.isLoading;
  
  if (isLoading) {
    return <div>Loading data...</div>;
  }
  
  return (
    <div>
      <h2>Categories ({categoriesQuery.data.length})</h2>
      <ul>
        {categoriesQuery.data.map((category) => (
          <li key={category.id}>
            {category.name} - {category.slug}
            {category.description && <p>{category.description}</p>}
          </li>
        ))}
      </ul>
      
      <h2>Featured Articles ({featuredArticlesQuery.data.length})</h2>
      <ul>
        {featuredArticlesQuery.data.map((article) => (
          <li key={article.id}>
            <strong>{article.title}</strong> - {article.category} - {article.readTime}
            <p>{article.excerpt}</p>
          </li>
        ))}
      </ul>
      
      <h2>Recent Articles ({recentArticlesQuery.data.length})</h2>
      <ul>
        {recentArticlesQuery.data.map((article) => (
          <li key={article.id}>
            <strong>{article.title}</strong> - {article.category} - {article.readTime}
            <p>{article.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
