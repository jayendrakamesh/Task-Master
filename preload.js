const getQuery = require("./getquery.js");
const {contextBridge} = require("electron")

const getTitles = () => {
	return getQuery.getTitles();
}

contextBridge.exposeInMainWorld("api",{
	getTitles: getTitles

})