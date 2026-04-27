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

//aliases creation
const aliasesForm = document.querySelector(".aliases-form");
const aliasesOutput = document.querySelector(".aliases-output");
const aliasesEmails = document.querySelector(".aliases-emails");

function pad(num, width = 4) {
  return String(num).padStart(width, "0");
}

function generateEmails(startNumber, domain, total = 31, width = 4) {
  let emails = [];
  for (let i = startNumber + 1; i < startNumber + total; i++) {
    emails.push(`seo${pad(i, width)}@${domain}`);
  }
  return emails;
}

function generateNames(startNumber, total = 31, width = 4) {
  let names = [];
  for (let i = startNumber; i < startNumber + total; i++) {
    names.push(`SEO ${pad(i, width)}`);
  }
  return names;
}

aliasesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  aliasesOutput.innerHTML = "";

  const numberRaw = event.target.elements[0].value.trim(); // сохраняем как строку
  const domain = event.target.elements[1].value.trim();
  const admin = event.target.elements[2].value.trim();

  const number = Number(numberRaw);
  const width = numberRaw.length || 4; // например 0020 -> width 4

  const emails = generateEmails(number, domain, 31, width);
  const names = generateNames(number, 31, width);

  let html = "";
  for (let i = 0; i < 30; i++) {
    html += `
      <tr>
        <td>${emails[i]}</td>
        <td>${names[i + 1]}</td>
        <td></td>
        <td></td>
        <td>Admin ${admin}</td>
      </tr>
    `;
  }

  aliasesOutput.innerHTML = `
    <table border="1">
      <thead>
        <tr>
          <th>Group XXX [NAME]</th>
          <th>Cloudflare Account Name</th>
          <th>NS</th>
          <th>Domain</th>
          <th>Access</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>seo${pad(number, width)}-${pad(number + 30, width)}@${domain}</td>
          <td>${names[0]}</td>
          <td></td>
          <td></td>
          <td>Admin ${admin}</td>
        </tr>
        ${html}
      </tbody>
    </table>
  `;

  aliasesEmails.textContent = emails.join("\n");
});