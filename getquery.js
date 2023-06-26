var dbmgr = require("./dbmgr.js");
var db = dbmgr.db;

exports.getTitles = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT title FROM list_titles";
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }

      // Extract titles from the result rows
      const titles = rows.map(row => row.title);
      resolve(titles);
    });
  });
};
