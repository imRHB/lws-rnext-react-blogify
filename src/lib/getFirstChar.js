export default function getFirstChar(name) {
    const trimmed = !!name && name.trim();

    if (trimmed.length > 0) return trimmed.charAt(0).toUpperCase();

    return "";
}
