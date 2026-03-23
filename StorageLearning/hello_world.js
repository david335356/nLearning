const heading = document.querySelector("h1");

const id_demo = document.getElementById("id-demo");
const button = document.getElementById("button-demo");
const storageInput = document.getElementById("storage-input");
const storageType = document.getElementById("storage-type");
const saveStorageButton = document.getElementById("save-storage");
const loadStorageButton = document.getElementById("load-storage");
const clearSelectedStorageButton = document.getElementById("clear-selected-storage");
const clearAllStorageButton = document.getElementById("clear-all-storage");
const storageStatus = document.getElementById("storage-status");
const localPreview = document.getElementById("local-preview");
const sessionPreview = document.getElementById("session-preview");

const STORAGE_KEY = "storage-demo-note";

function setDemoBackgroundColor() {
  if (id_demo) {
    id_demo.style.backgroundColor = "#e00da1";
  }
}

function getSelectedStorage() {
  if (storageType && storageType.value === "session") {
    return sessionStorage;
  }
  return localStorage;
}

function getSelectedStorageName() {
  if (storageType && storageType.value === "session") {
    return "sessionStorage";
  }
  return "localStorage";
}

function updateStoragePreviews() {
  if (localPreview) {
    const localValue = localStorage.getItem(STORAGE_KEY);
    localPreview.textContent =
      "localStorage value: " + (localValue === null ? "(empty)" : localValue);
  }

  if (sessionPreview) {
    const sessionValue = sessionStorage.getItem(STORAGE_KEY);
    sessionPreview.textContent =
      "sessionStorage value: " + (sessionValue === null ? "(empty)" : sessionValue);
  }
}

function setStatus(message) {
  if (storageStatus) {
    storageStatus.textContent = message;
  }
}

function saveToSelectedStorage() {
  if (!storageInput) {
    return;
  }

  const selectedStorage = getSelectedStorage();
  const selectedStorageName = getSelectedStorageName();
  selectedStorage.setItem(STORAGE_KEY, storageInput.value);

  setStatus("Saved to " + selectedStorageName + ".");
  updateStoragePreviews();
}

function loadFromSelectedStorage() {
  if (!storageInput) {
    return;
  }

  const selectedStorage = getSelectedStorage();
  const selectedStorageName = getSelectedStorageName();
  const value = selectedStorage.getItem(STORAGE_KEY);

  if (value === null) {
    setStatus("No value found in " + selectedStorageName + ".");
    return;
  }

  storageInput.value = value;
  setStatus("Loaded value from " + selectedStorageName + ".");
}

function clearSelectedStorage() {
  const selectedStorage = getSelectedStorage();
  const selectedStorageName = getSelectedStorageName();

  selectedStorage.removeItem(STORAGE_KEY);
  setStatus("Cleared value from " + selectedStorageName + ".");
  updateStoragePreviews();
}

function clearBothStorages() {
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);
  setStatus("Cleared value from localStorage and sessionStorage.");
  updateStoragePreviews();
}



if (button) {
  console.log("Button found " + Object.prototype.toString.call(button));
  button.addEventListener("click", setDemoBackgroundColor);
}

if (saveStorageButton) {
  saveStorageButton.addEventListener("click", saveToSelectedStorage);
}

if (loadStorageButton) {
  loadStorageButton.addEventListener("click", loadFromSelectedStorage);
}

if (clearSelectedStorageButton) {
  clearSelectedStorageButton.addEventListener("click", clearSelectedStorage);
}

if (clearAllStorageButton) {
  clearAllStorageButton.addEventListener("click", clearBothStorages);
}

if (storageType) {
  storageType.addEventListener("change", updateStoragePreviews);
}

// if (button) {
//   console.log("Button found " + Object.prototype.toString.call(button));
//   button.addEventListener("click", function() {
//     setDemoBackgroundColor();
//   });
// }

// if (button) {
//   console.log("Button found " + Object.prototype.toString.call(button));
//   button.addEventListener("click", function() {
//     id_demo.style.backgroundColor = "#49e00d";
//   });
// }




if (heading) {
  heading.textContent = "H1 Tag Hello World! (updated by JavaScript)";
}

updateStoragePreviews();