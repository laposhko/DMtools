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

function generateEmails(number, domain) {
  let emails = [];
  for (let i = number +1; i < number + 31; i++) {
    emails.push(`seo${i<1000? '0'+i: i}@${domain}`);
  }
  return emails;
}
function generateNames(number) {
  let names = [];
  for (let i = number; i < number + 31; i++) {
    names.push(`SEO ${i<1000? '0'+i: i}`);
  }
  return names;
}
aliasesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  aliasesOutput.innerHTML = "";
  const domain = event.target.elements[1].value;
  const number = Number(event.target.elements[0].value);
  const admin = event.target.elements[2].value;
  const emails = generateEmails(number, domain); 
  const names = generateNames(number);
  const newParagraph = document.createElement("p");
  newParagraph.textContent = "Appended paragraph";
  let html = '';
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
   aliasesOutput.insertAdjacentHTML(   "beforeend",
    `<pre><code>
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
      <td>seo${number< 1000? '0'+number: number}-${(number+30)< 1000? '0'+(number+30): (number+30)}@${domain}</td>
      <td>${names[0]}</td>
      <td></td>
      <td></td>
      <td>Admin ${admin}</td>
    </tr>
    ${html}
  </tbody>
</code></pre>
</table>`
)
  aliasesEmails.innerHTML = `<br/>${emails.join('\n')}`;
});
