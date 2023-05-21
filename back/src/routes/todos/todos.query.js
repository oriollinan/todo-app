
const getTodos = async (db, id) => {
    try {
        const [rows] = await db.promise().query("SELECT * FROM todo WHERE user_id = ?", [id])
        return (rows);
    } catch (e) {
        console.error(e);
        return (null);
    }
}

const postTodo = async (db, body) => {
    const {title, description, due_time, user_id, status} = body;
    try {
        const [insert] = await db.promise().query("INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)", [title, description, due_time, user_id, status]);
        const [rows] = await db.promise().query("SELECT * FROM todo WHERE id = ?", [insert.insertId]);
        return (rows[0]);
    } catch (e) {
        console.error(e)
        return (null);
    }
}

const getTodo = async (db, id) => {
    try {
        const [rows] = await db.promise().query("SELECT * FROM todo WHERE id = ?", [id]);
        return (rows[0]);
    } catch (e) {
        console.error(e);
        return (null);
    }
}

const putTodo = async (db, body, id) => {
    const {title, description, due_time, user_id, status} = body;
    try {
        await db.promise().query("UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?", [title, description, due_time, user_id, status, id]);
        const [rows] = await db.promise().query("SELECT * FROM todo WHERE id = ?", [id]);
        return (rows[0]);
    } catch (e) {
        console.error(e);
        return (null);
    }
}

const deleteTodo = async (db, id, callback) => {
    try {
        await db.promise().query("DELETE FROM todo WHERE id = ?", [id]);
        return callback(true);
    } catch (e) {
        console.error(e);
        return callback(false);
    }
}

module.exports = {getTodos, postTodo, getTodo, putTodo, deleteTodo};
