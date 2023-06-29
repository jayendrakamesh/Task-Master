const dbmgr = require("./dbmgr.js");
const db = dbmgr.db;

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
      const titles = rows.map((row) => row.title);
      resolve(titles);
    });
  });
};

exports.createList = (title) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO list_titles (title) VALUES (?)";
    db.run(sql, [title], function (err) {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve();
    });
  });
};

exports.deleteList = (title) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM list_titles WHERE title = ?";
    db.run(sql, [title], function (err) {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve();
    });
  });
};

exports.editList = (title) => {
  return new Promise((resolve, reject) => {
    const getTitleIdQuery = "SELECT id FROM list_titles WHERE title = ?";
    db.get(getTitleIdQuery, [title], (err, row) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      
      if (!row) {
        resolve([]); // Return empty array if title not found
        return;
      }

      const listItemIdQuery = "SELECT * FROM list_items WHERE list_title_id = ?";
      db.all(listItemIdQuery, [row.id], (err, rows) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        console.log(rows);
        resolve(rows);
      });
    });
  });
};

exports.handleDelete = (taskName) => {
  return new Promise((resolve, reject) => {
    const deleteQuery = "DELETE FROM list_items WHERE task_name = ?";
    db.run(deleteQuery, [taskName], function (err) {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve();
    });
  });
};


exports.finalFun = (title, taskName, category, priority) => {
  console.log(title, taskName, category, priority)
  return new Promise((resolve, reject) => {
    const getTitleIdQuery = "SELECT id FROM list_titles WHERE title = ?";
    db.get(getTitleIdQuery, [title], (err, row) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }

      if (!row) {
        reject(new Error("Title not found"));
        return;
      }

      const insertItemQuery =
        "INSERT INTO list_items (task_name, category, priority, list_title_id) VALUES (?, ?, ?, ?)";
      db.run(
        insertItemQuery,
        [taskName, category, priority, row.id],
        function (err) {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
          resolve();
        }
      );
    });
  });
};
