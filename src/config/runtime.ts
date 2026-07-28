const DEFAULT_CONTACT_FORM_HANDLER_URL = "https://contact-form-handler.jeffstienstra.workers.dev/";

function normalizeUrl(value: string | undefined, fallback: string): string {
	const raw = (value || "").trim();
	if(!raw) return fallback;
	return raw.endsWith("/") ? raw : `${raw}/`;
}

export const runtimeConfig = {
	contactFormHandlerUrl: normalizeUrl(
		import.meta.env.PUBLIC_CONTACT_FORM_HANDLER_URL,
		DEFAULT_CONTACT_FORM_HANDLER_URL
	),
	envLabel: import.meta.env.PUBLIC_ENV_LABEL || (import.meta.env.DEV ? "local" : "prod")
};
