// Raskite modalą
var modal = document.getElementById("nuskaiciavimoModal");

// Raskite mygtuką, kuris atidaro modalą
var nuskaiciuotiButton = document.getElementById("nuskaiciuotiButton");

// Raskite span elementą, kuris uždaro modalą
var span = document.getElementsByClassName("close")[0];

// Atidarykite modalą, kai spaudžiamas mygtukas
nuskaiciuotiButton.onclick = function() {
  modal.style.display = "block";
}

// Uždarykite modalą, kai spaudžiama (x)
span.onclick = function() {
  modal.style.display = "none";
}

// Raskite nuskaičiuoti mygtuką ir pridėkite jo veiksmą
var nuskaiciuoti = document.getElementById("nuskaiciuoti");
nuskaiciuoti.onclick = function() {
  var suma = document.getElementById("suma").value;
  // Čia galite įterpti kodą, kuris atliks nuskaičiavimo veiksmą su įvesta suma
  modal.style.display = "none"; // Uždarykite modalą po nuskaičiavimo
}
