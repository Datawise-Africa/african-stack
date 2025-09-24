import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  author?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
}

const SEO = ({
  title = 'African Stack - A place to read and write',
  description = 'A place to read, write, and deepen your understanding.',
  keywords = 'blog, articles, writing, reading, african stack',
  author = 'African Stack Team',
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
}: SEOProps) => {
  const location = useLocation()
  
  useEffect(() => {
    // Update document title
    document.title = title
    
    // Update meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: author },
      { property: 'og:title', content: ogTitle || title },
      { property: 'og:description', content: ogDescription || description },
      { property: 'og:image', content: ogImage || '' },
      { property: 'og:url', content: ogUrl || window.location.origin + location.pathname },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: ogTitle || title },
      { name: 'twitter:description', content: ogDescription || description },
      { name: 'twitter:image', content: ogImage || '' },
    ]
    
    metaTags.forEach(tag => {
      let element = document.querySelector(`meta[name="${tag.name}"]`) || 
                   document.querySelector(`meta[property="${tag.property}"]`)
      
      if (!element) {
        element = document.createElement('meta')
        if (tag.name) {
          element.setAttribute('name', tag.name)
        } else if (tag.property) {
          element.setAttribute('property', tag.property)
        }
        document.head.appendChild(element)
      }
      
      element.setAttribute('content', tag.content)
    })
  }, [title, description, keywords, author, ogTitle, ogDescription, ogImage, ogUrl, location])
  
  return null
}

export default SEO