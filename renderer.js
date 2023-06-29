//for create-list.html
let createButton = document.getElementById("create-submit");
createButton.addEventListener("click", () => {
  let listTitleInput = document.getElementById("list-title-input");
  let title = listTitleInput.value.trim();
  window.api.createList(title)
});

