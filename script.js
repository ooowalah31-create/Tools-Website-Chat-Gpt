function changeTool() {
  const tool = document.getElementById("toolSelect").value;
  const area = document.getElementById("toolArea");

  if (tool === "qr") {
    area.innerHTML = `
      <input id="qrText" placeholder="Masukkan teks">
      <button onclick="generateQR()">Generate QR</button>
      <div id="qrResult"></div>
    `;
  }

  if (tool === "password") {
    area.innerHTML = `
      <input type="number" id="passLength" placeholder="Panjang password (8-32)">
      <button onclick="generatePassword()">Generate</button>
      <div class="output" id="passResult"></div>
    `;
  }

  if (tool === "base64") {
    area.innerHTML = `
      <textarea id="baseInput" placeholder="Masukkan teks"></textarea>
      <button onclick="encodeBase64()">Encode</button>
      <button onclick="decodeBase64()">Decode</button>
      <div class="output" id="baseResult"></div>
    `;
  }

  if (tool === "json") {
    area.innerHTML = `
      <textarea id="jsonInput" placeholder='{"nama":"contoh"}'></textarea>
      <button onclick="formatJSON()">Format JSON</button>
      <div class="output" id="jsonResult"></div>
    `;
  }

  if (tool === "hash") {
    area.innerHTML = `
      <textarea id="hashInput" placeholder="Masukkan teks"></textarea>
      <button onclick="generateHash()">Generate SHA-256</button>
      <div class="output" id="hashResult"></div>
    `;
  }

  if (tool === "uuid") {
    area.innerHTML = `
      <button onclick="generateUUID()">Generate UUID</button>
      <div class="output" id="uuidResult"></div>
    `;
  }
}

function generateQR() {
  const text = document.getElementById("qrText").value;
  document.getElementById("qrResult").innerHTML =
    `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}">`;
}

function generatePassword() {
  const length = parseInt(document.getElementById("passLength").value);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
  let pass = "";
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById("passResult").innerText = pass;
}

function encodeBase64() {
  const input = document.getElementById("baseInput").value;
  document.getElementById("baseResult").innerText = btoa(input);
}

function decodeBase64() {
  const input = document.getElementById("baseInput").value;
  document.getElementById("baseResult").innerText = atob(input);
}

function formatJSON() {
  try {
    const input = document.getElementById("jsonInput").value;
    const formatted = JSON.stringify(JSON.parse(input), null, 2);
    document.getElementById("jsonResult").innerText = formatted;
  } catch {
    document.getElementById("jsonResult").innerText = "JSON tidak valid!";
  }
}

async function generateHash() {
  const text = document.getElementById("hashInput").value;
  const buffer = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  document.getElementById("hashResult").innerText = hashHex;
}

function generateUUID() {
  document.getElementById("uuidResult").innerText = crypto.randomUUID();
}

changeTool();
