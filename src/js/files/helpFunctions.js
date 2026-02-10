export function createScript(url, type) {
  if (!url) return;

  return new Promise((resolve, reject) => {
    const script = document.querySelector(`script[src="${url}"]`);

    if (script) {
      resolve(script);
    } else {
      const htmlScript = document.createElement("script");
      htmlScript.src = url;

      if (type) {
        htmlScript.type = type;
      }

      htmlScript.onload = () => {
        resolve(htmlScript);
      };
      htmlScript.onerror = () => {
        reject(new Error(`Не удалось загрузить скрипт: ${url}`));
      };

      document.head.appendChild(htmlScript);
    }
  });
}
