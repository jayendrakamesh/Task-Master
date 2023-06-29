const dbOperations = require("./dboperations.js");
const { contextBridge, ipcRenderer } = require("electron");

const getTitles = () => {
  return dbOperations.getTitles();
};

const finalFun = (title, taskName, category, priority) => {
  return dbOperations.finalFun(title, taskName, category, priority);
};

const deleteList = async (title) => {
  dbOperations.deleteList(title)
  	.then(() => {
    	ipcRenderer.send("list-deleted");
     })
    .catch((error) => {
        console.error(error);
     });
};

const handleDelete = async (taskName) => {
  dbOperations.handleDelete(taskName)
};

const editList = async (title) => {
  return dbOperations.editList(title); 
};

const createList = async (title) => {
  const titles = await getTitles();
  console.log(titles);
  let temp = 0;
  
  titles.forEach((x) => { 
    if (title === x)
      temp = temp + 1;
  });

  if (title === "" || temp !== 0) {
    ipcRenderer.send("list-not-created");
  } else {
    dbOperations.createList(title)
      .then(() => {
        ipcRenderer.send("list-created");
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

contextBridge.exposeInMainWorld(
  "api",
  {
    getTitles: getTitles,
    createList: createList,
    deleteList: deleteList,
    editList: editList,
    handleDelete: handleDelete,
    finalFun: finalFun,
  }
);






