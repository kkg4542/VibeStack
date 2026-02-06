/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://usevibestack.com',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    exclude: ['/admin/*', '/api/*', '/auth/*'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/api', '/auth'],
            },
        ],
        additionalSitemaps: [
            'https://usevibestack.com/sitemap.xml',
        ],
    },
    transform: async (config, path) => {
        //Custom priority based on page type
        let priority = 0.7;
        let changefreq = 'weekly';

        if (path === '/') {
            priority = 1.0;
            changefreq = 'daily';
        } else if (path.startsWith('/tools') || path === '/tools') {
            priority = 0.9;
            changefreq = 'daily';
        } else if (path.startsWith('/tool/')) {
            priority = 0.8;
            changefreq = 'weekly';
        } else if (path.startsWith('/blog/')) {
            priority = 0.7;
            changefreq = 'monthly';
        } else if (path.startsWith('/stack/')) {
            priority = 0.6;
            changefreq = 'weekly';
        }

        return {
            loc: path,
            changefreq,
            priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        };
    },
};
