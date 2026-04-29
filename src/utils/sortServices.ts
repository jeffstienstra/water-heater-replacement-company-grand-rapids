import type {ServiceEntry} from '../data/businessServices';

export function sortServicesByPageContext(
    services: ServiceEntry[],
    pageTitle: string,
    pageUrl: string
    ): ServiceEntry[] {
    const normalize = (str: string) => str.toLowerCase().replace(/\/$/, '');
    const title = normalize(pageTitle);
    const url = normalize(pageUrl);

    return [...services].sort((a, b) => {
        return score(b, title, url) - score(a, title, url);
    });
    }

    function score(service: ServiceEntry, title: string, url: string): number {
    const keyword = service.matchKey.toLowerCase();
    return title.includes(keyword) || url.includes(keyword) ? 1 : 0;
}
