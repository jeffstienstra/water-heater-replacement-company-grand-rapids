/*
    Matches multiple slashes after any character except a colon (:)
    This avoids touching https://

    Replaces // with / only where appropriate
    Used because of how urls are built in Schema.astro, which concatenates
    the baseUrl with the service page path, which can lead to double slashes
*/

export function sanitizeUrl(raw: string): string {
	return raw.replace(/([^:]\/)\/+/g, '$1');
}
