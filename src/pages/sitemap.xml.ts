import type { APIRoute } from 'astro';
import { cities } from '../data/cities';

const baseUrl = 'https://waterheaterreplacementcompany.com';

export const GET: APIRoute = () => {
    const lastmod = new Date().toISOString().replace(/\.\d{3}Z$/, '+00:00');

    const staticUrls: { loc: string; priority: string }[] = [
        { loc: `${baseUrl}/`,                                                priority: '1.00' },
        { loc: `${baseUrl}/instant-quote/`,                                  priority: '0.90' },
        { loc: `${baseUrl}/services/`,                                       priority: '0.85' },
        { loc: `${baseUrl}/services/water-heater-replacement/`,              priority: '0.90' },
        { loc: `${baseUrl}/services/water-heater-repair/`,                   priority: '0.85' },
        { loc: `${baseUrl}/services/leaking-water-heater-emergency/`,        priority: '0.85' },
        { loc: `${baseUrl}/why-us/`,                                         priority: '0.80' },
        { loc: `${baseUrl}/service-area/`,                                   priority: '0.85' },
        { loc: `${baseUrl}/resources/tank-vs-tankless-water-heaters/`,       priority: '0.80' },
        { loc: `${baseUrl}/resources/tank-water-heaters/`,                   priority: '0.80' },
        { loc: `${baseUrl}/resources/tankless-water-heaters/`,               priority: '0.80' },
        { loc: `${baseUrl}/resources/how-to-stop-a-water-leak/`,             priority: '0.70' },
        { loc: `${baseUrl}/resources/common-water-heater-problems-west-michigan/`, priority: '0.75' },
        { loc: `${baseUrl}/resources/water-heater-installation-process-jenison-mi/`, priority: '0.75' },
        { loc: `${baseUrl}/resources/water-heater-replacement-cost-jenison-mi/`,     priority: '0.75' },
    ];

    const cityUrls = cities.map((city) => ({
        loc: `${baseUrl}/service-area/${city.slug}/`,
        priority: '0.75',
    }));

    const allUrls = [...staticUrls, ...cityUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrls.map(({ loc, priority }) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`).join('')}
</urlset>`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    });
};
