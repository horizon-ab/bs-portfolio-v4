import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://baysalt.dev',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1
        },
        {
            url: 'https://baysalt.dev/work',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5
        },
        {
            url: 'https://baysalt.dev/projects',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5
        },
        {
            url: 'https://baysalt.dev/fun',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5
        },
        {
            url: 'https://baysalt.dev/contact',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8
        },
    ]
}