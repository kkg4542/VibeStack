export function ToolSEO({ tool }: { tool: any }) {
  return (
            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "SoftwareApplication",
                            "name": tool.title,
                            "description": tool.description,
                            "applicationCategory": tool.category + "Application",
                            "operatingSystem": "Web, Cloud",
                            "url": `https://usevibestack.com/tool/${tool.slug}`,
                            "offers": {
                                "@type": "Offer",
                                "price": tool.pricing === "Free" ? "0" : "Varies",
                                "priceCurrency": "USD",
                                "availability": "https://schema.org/InStock"
                            },
                            "aggregateRating": tool.review ? {
                                "@type": "AggregateRating",
                                "ratingValue": tool.review.rating,
                                "reviewCount": "1",
                                "bestRating": "5",
                                "worstRating": "1"
                            } : undefined,
                            "publisher": {
                                "@type": "Organization",
                                "name": "VibeStack"
                            }
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://usevibestack.com"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Tools",
                                    "item": "https://usevibestack.com/tools"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": tool.category,
                                    "item": `https://usevibestack.com/tools?category=${encodeURIComponent(tool.category)}`
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": tool.title,
                                    "item": `https://usevibestack.com/tool/${tool.slug}`
                                }
                            ]
                        }
                    ])
                }}
            />
  );
}
