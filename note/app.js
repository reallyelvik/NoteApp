const container = document.querySelector(".container");
const toggleMode = document.getElementById("toggle");
const submitTxt = document.getElementById("submit");
const deleteTxt = document.getElementById("delete");
const closeTxt = document.getElementById("close");
const txtArea = document.querySelector("textarea");
const contentDiv = document.getElementById("content");
const navBar = document.querySelector("nav");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let darkMode = false;

const addText = (note) => `
  <div class="container" data-id="${note?.id}">
    <div class="buttons">
      <button class="submit" id="submit">➕</button>
      <button class="close" id="close">❌</button>
    </div>
    <textarea name="txtArea" id="txtArea" cols="40" rows="8" placeholder="Enter Here">
      ${note?.text}
    </textarea>
  </div>`;

const noteAdd = () => {
  const noteHTML = notes.map((note) => addText(note)).join(" ");
  contentDiv.innerHTML = noteHTML;
};

toggleMode.addEventListener("click", () => {
  navBar.classList.toggle("nav-dark");
  toggleMode.classList.toggle("btn-light");
  document.body.classList.toggle("body-dark");
  txtArea.classList.toggle("nav-dark");
});

deleteTxt.addEventListener("click", () => {
  txtArea.value = "";
});

closeTxt.addEventListener("click", () => {
  container.remove();
});

submitTxt.addEventListener("click", () => {
  const notetext = txtArea.value;
  const note = { id: notes.length + 1, text: notetext };
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
  txtArea.value = "";
  noteAdd();
});

contentDiv.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
  } else if (target.classList.contains("close")) {
    const id = Number(target.parentElement.parentElement.dataset.id);
    notes = notes.filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(notes));
    noteAdd();
  } else if (target.classList.contains("submit")) {
    const id = Number(target.parentElement.parentElement.dataset.id);
    const noteToUpdate = notes.find((note) => note.id === id);
    if (noteToUpdate) {
      noteToUpdate.text = target.parentElement.parentElement.querySelector("textarea").value;
      localStorage.setItem("notes", JSON.stringify(notes));
      target.innerHTML = `
        <p style='padding:0 4px; position:relative; color:gray;font-weight: bold'>✔</p>
        <p style="position: absolute; top:-25px; right: 20; font-weight:bold; color:gray;">Updated</p>`;
      setTimeout(() => {
        target.innerHTML = "➕";
      }, 1000);
    }
  }
});

noteAdd();
