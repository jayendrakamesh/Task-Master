document.addEventListener('DOMContentLoaded', async () => {
  let titles = await window.api.getTitles();
  let menu = document.getElementById("list-select");
  titles.forEach((title) => {
    let option = document.createElement("option");
    option.text = title;
    menu.add(option);
  });
});
