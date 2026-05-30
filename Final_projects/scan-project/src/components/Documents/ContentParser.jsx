export default function contentParser(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    const parseError = xmlDoc.getElementsByTagName('parsererror')[0];
    if (parseError) {
        console.error('Ошибка парсинга XML:', parseError.textContent);
        return { text: 'Ошибка загрузки контента', imageUrl: null };
    }

    function extractText(node) {
        let text = '';
        node.childNodes.forEach(child => {
            if (child.nodeType === Node.ELEMENT_NODE) {
                if (child.tagName === 'ENTITY') {
                    text += extractText(child);
                } else if (child.tagName !== 'IMG') {
                    text += extractText(child);
                }
            } else if (child.nodeType === Node.TEXT_NODE) {
                text += child.textContent;
            }
        });
        return text;
    }

    const text = extractText(xmlDoc.documentElement)
        .replace(/\s+/g, ' ')
        .trim();

    const imgElement = xmlDoc.querySelector('img');
    const imageUrl = imgElement ? imgElement.getAttribute('src') : null;

    return { text, imageUrl };
}
