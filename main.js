//unique domains processing
const form = document.querySelector(".unique-form");
const input = document.querySelector(".unique-input");
const submitBtn = document.querySelector(".unique-btn");
const output = document.querySelector(".output-text");
const quantity = document.querySelector(".quantity");
function extractUniqueDomainsAsColumn(text) {
  const domainRegex =
    /\b(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}\b/gi;
  const matches = text.match(domainRegex);
  if (!matches) return "";
  const uniqueDomains = [
    ...new Set(matches.map((domain) => domain.toLowerCase())),
  ];
  return uniqueDomains.join("\n");
}
function processText(event) {
  event.preventDefault();
  const result = extractUniqueDomainsAsColumn(input.value);
  const rowCount = result.split("\n").length;

  output.textContent = result;
  quantity.textContent = `Amount: ${rowCount}`;
  if (result.trim() === "") {
    copyBtn.disabled = true;
  } else {
    copyBtn.disabled = false;
  }
}
form.addEventListener("submit", processText);
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    processText(e);
  }
});

//copy processing
const copyBtn = document.querySelector(".copy-btn");

copyBtn.addEventListener("click", () => {
  const text = output.textContent;

  navigator.clipboard
    .writeText(text)
    .then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy to Clipboard"), 1500);
    })
    .catch((err) => {
      alert("Failed to copy: " + err);
    });
});
