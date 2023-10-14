const container = document.querySelector(".container");

const toggleMode = document.getElementById("toggle");
const submitTxt = document.getElementById("submit");
const deleteTxt = document.getElementById("delete");
const closeTxt = document.getElementById("close");
const txtArea = document.querySelector("textarea");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

const contentDiv = document.getElementById("content");

const addText = (note) => {
  return `
      <div class="container" data-id=${note?.id}>
    <div class="buttons">
      <button class="submit" id="submit">➕</button>
      <button class="delete" id="delete">🗑️</button>
      <button class="close" id="close">❌</button>
    </div>
    <textarea
      name="txtArea"
      id="txtArea"
      cols="40"
      rows="8"
      placeholder="Enter Here"
    >
      ${note?.text}
    </textarea>
    </div>
  `
};
// localStorage.removeItem("notes");
//fill note from local storage and add new note
const noteAdd = ()=>{
 let noteHTML =  notes.map((note)=>{
    return addText(note);
  }).join(" ")
  contentDiv.innerHTML = noteHTML
}
const navBar = document.querySelector("nav");
let darkMode = false;

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
  let notetext = txtArea.value;
  let note = { id: notes.length + 1, text: notetext };
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
  txtArea.value = "";
  noteAdd()
});

contentDiv.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
  } else if (target.classList.contains("close")) {
    const id = Number(event.target.parentElement.parentElement.dataset.id)
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === id) {
          notes.splice(i, 1);
          break;
      }
  }
   localStorage.setItem("notes", JSON.stringify(notes));
    noteAdd()
  } else if (target.classList.contains("submit")) {
    const id = Number(event.target.parentElement.parentElement.dataset.id)
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === id) {
        notes[i].text = target.parentElement.parentElement.querySelector("textarea").value;
        localStorage.setItem("notes", JSON.stringify(notes));
        break;
      }
    }
  }
});

noteAdd()