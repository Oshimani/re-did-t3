// format date time to string using intl api, use the browser's locale
export function formatDateTime(date: Date) {
	return new Intl.DateTimeFormat(undefined, {
		dateStyle: "short",
		timeStyle: "short"
	}).format(date)
}
