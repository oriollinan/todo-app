
const getUser = async (db, id) => {
    try {
        const [rows] = await db.promise().query("SELECT * FROM user WHERE id = ?", [id]);
        return (rows[0]);
    } catch (e) {
        console.error(e);
        return (null);
    }
}

const getTodos = async (db, id) => {
    try {
        const [rows] = await db.promise().query("SELECT * FROM todo WHERE user_id = ?", [id]);
        return (rows);
    } catch (e) {
        console.error(e);
        return (null);
    }
}

const getUserByEmail = async (db, email) => {
    try {
        const [rows] = await db.promise().query("SELECT * FROM user WHERE email = ?", [email]);
        return (rows[0]);
    } catch (e) {
        console.error(e);
        return (null);
    }
}

const putUser = async (db, body, id) => {
    const {email, password, created_at, firstname, name} = body;
    try {
        await db.promise().query("UPDATE user SET email = ?, password = ?, created_at = ?, firstname = ?, name = ? WHERE id = ?", [email, password, created_at, firstname, name, id]);
        const [rows] = await db.promise().query("SELECT * FROM user WHERE id = ?", [id]);
        return (rows[0]);
    } catch (e) {
        console.error(e);
        return (null);
    }
}

const deleteUser = async (db, id, callback) => {
    try {
        await db.promise().query("DELETE FROM user WHERE id = ?", [id]);
        return callback(true);
    } catch (e) {
        console.error(e);
        return callback(false);
    }
}

module.exports = {getUser, getTodos, getUserByEmail, putUser, deleteUser};
