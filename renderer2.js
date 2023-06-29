//for delete-list.html
document.addEventListener('DOMContentLoaded', async () => {
  let titles = await window.api.getTitles();
  let menu = document.getElementById("list-title-select");
  titles.forEach((title) => {
    let option = document.createElement("option");
    option.text = title;
    menu.add(option);
  });

  let deleteButton = document.getElementById("delete-submit");
  deleteButton.addEventListener("click", () => {
  	let listTitleSelect = document.getElementById("list-title-select");
  	let title = listTitleSelect.value.trim();
 	window.api.deleteList(title)

  });

});


