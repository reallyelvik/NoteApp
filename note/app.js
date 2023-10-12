const container = document.querySelector(".container");

const toggleMode = document.getElementById("toggle");
const submitTxt = document.getElementById("submit");
const deleteTxt = document.getElementById("delete");
const closeTxt = document.getElementById("close");
const txtArea = document.querySelector("textarea");

const notes = JSON.parse(localStorage.getItem("notes")) || [];

const contentDiv = document.getElementById("content");

const addText = (note) => {
  return `
      <div class="container">
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
      ${note.text}
    </textarea>
    </div>;
  `;
};

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
  // contentDiv.insertAdjacentHTML("beforeend", addText);
  let notetext = txtArea.value;
  let note = { id: notes.length + 1, text: notetext };
  notes.push(note);
  console.log(notes);
  localStorage.setItem("notes", JSON.stringify(notes));
  addText(note);
});

contentDiv.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
  } else if (target.classList.contains("close")) {
    target.parentElement.parentElement.remove();
  } else if (target.classList.contains("submit")) {
    contentDiv.insertAdjacentHTML("beforeend", addText);
  }
});
