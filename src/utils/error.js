const color = {
	ok: "36",
	error: "31",
	warn: "33",
}

function alert(message, state = color.ok) {
	if (state === "error") {
		return `\x1b[${color.error}mError: ${message}\x1b[0m\n`
	} else if (state === "warn") {
		return `\x1b[${color.warn}mWarn: ${message}\x1b[0m\n`
	}

	return `\x1b[${color.ok}mOk: ${message}\x1b[0m\n`
}

module.exports = alert
