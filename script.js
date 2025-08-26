// Génère un caractère aléatoire alphanumérique
const pick = () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random()*36)];

// Génère un code selon un motif (X = alphanumérique)
function generateCode(pattern){
  return pattern.replace(/X/g, pick);
}

function renderCodes(codes){
  const container = document.getElementById("codes");
  container.innerHTML = "";
  codes.forEach(code => {
    const row = document.createElement("div");
    row.className = "code";
    row.innerHTML = `<strong>${code}</strong><span class="pill">FAUX</span>`;
    container.appendChild(row);
  });
}

function generateList(){
  const count = Math.min(100, Math.max(1, parseInt(document.getElementById("count").value,10)||1));
  const pattern = document.getElementById("pattern").value;
  const bar = document.getElementById("bar");
  const status = document.getElementById("status");

  status.textContent = "Génération…";
  bar.style.width = "0%";

  // Petite animation de progression
  let progress = 0;
  const step = setInterval(() => {
    progress = Math.min(95, progress + 7);
    bar.style.width = progress + "%";
  }, 60);

  // Génération synchrone simple
  const codes = [];
  for(let i=0;i<count;i++) codes.push(generateCode(pattern));

  clearInterval(step);
  bar.style.width = "100%";
  renderCodes(codes);
  status.textContent = `${count} codes générés.`;

  return codes;
}

function copyList(){
  const codes = [...document.querySelectorAll(".code strong")].map(n => n.textContent).join("\n");
  if(!codes){ document.getElementById("status").textContent = "Rien à copier."; return; }
  navigator.clipboard.writeText(codes).then(()=>{
    document.getElementById("status").textContent = "Liste copiée dans le presse-papiers.";
  });
}

function downloadList(){
  const codes = [...document.querySelectorAll(".code strong")].map(n => n.textContent).join("\n");
  if(!codes){ document.getElementById("status").textContent = "Rien à télécharger."; return; }
  const blob = new Blob([codes], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "codes_fake_robux.txt";
  a.click();
  URL.revokeObjectURL(a.href);
}

function clearList(){
  document.getElementById("codes").innerHTML = "";
  document.getElementById("bar").style.width = "0%";
  document.getElementById("status").textContent = "Liste vidée.";
}

// Simulation d’un bouton “Redeem” (retours pédagogiques)
function redeemSim(){
  const input = document.getElementById("sim-in");
  const out = document.getElementById("sim-out");
  const val = (input.value || "").trim().toUpperCase();

  if(!val){
    out.textContent = "Entre un code pour tester.";
    out.className = "redeem-msg";
    return;
  }

  // Simple validation locale : forme reconnue = message explicite, mais jamais “valide”
  const patterns = [
    /^RBLX-(?:[A-Z0-9]{4}-){2}[A-Z0-9]{4}$/,
    /^RBX-(?:[A-Z0-9]{5}-){2}[A-Z0-9]{5}$/,
    /^(?:[A-Z0-9]{4}-){2}[A-Z0-9]{4}$/
  ];

  const looksLikeCode = patterns.some(rx => rx.test(val));

  if(looksLikeCode){
    out.textContent = "Format correct… mais ceci est une démo : aucun code n’est utilisable.";
    out.className = "redeem-msg err";
  }else{
    out.textContent = "Format non reconnu. Essaie d’abord de générer un code, puis colle-le ici.";
    out.className = "redeem-msg";
  }
}

// Hooks UI
document.getElementById("btn-generate").addEventListener("click", generateList);
document.getElementById("btn-copy").addEventListener("click", copyList);
document.getElementById("btn-download").addEventListener("click", downloadList);
document.getElementById("btn-clear").addEventListener("click", clearList);
document.getElementById("btn-redeem").addEventListener("click", redeemSim);

// Accessibilité : Enter pour valider dans le champ
document.getElementById("sim-in").addEventListener("keydown", (e)=>{
  if(e.key === "Enter"){ redeemSim(); }
});

