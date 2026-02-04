import RSS from 'rss';
import { blogPosts } from './blog';
import fs from 'fs';
import path from 'path';

export function generateRssFeed() {
    const site_url = 'https://usevibestack.com';

    const feedOptions = {
        title: 'VibeStack Blog - AI Productivity Lab',
        description: 'Latest research and trends in AI productivity tools.',
        site_url: site_url,
        feed_url: `${site_url}/rss.xml`,
        image_url: `${site_url}/logo.png`,
        pubDate: new Date(),
        copyright: `All rights reserved ${new Date().getFullYear()}, VibeStack`,
    };

    const feed = new RSS(feedOptions);

    blogPosts.forEach((post) => {
        feed.item({
            title: post.title,
            description: post.excerpt,
            url: `${site_url}/blog/${post.slug}`,
            guid: post.slug,
            date: post.date,
        });
    });

    const publicPath = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath);
    }

    fs.writeFileSync(path.join(publicPath, 'rss.xml'), feed.xml({ indent: true }));
    console.log('RSS feed generated successfully!');
}
