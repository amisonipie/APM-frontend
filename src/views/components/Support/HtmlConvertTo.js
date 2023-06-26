export const HtmlStringConvert = (content) => {
  const result = content?.replace("div {font-size: 12pt;}", "");
  const resultFinal = result?.replace("div {font-size: 14pt;}", "");
  const div = document.createElement("div");
  div.innerHTML = resultFinal || "";
  const text = div.textContent || div.innerText || "";
  return text;
};
