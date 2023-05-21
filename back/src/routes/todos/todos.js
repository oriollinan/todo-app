const verifyToken = require("../../middleware/notFound");
const {getTodos, postTodo, getTodo, putTodo, deleteTodo} = require("./todos.query");

module.exports = ((app, db) => {
    app.route("/todo")
        .get((req, res) => {
            verifyToken(req, res, async (id) => {
                const todos = await getTodos(db, id);
                if (todos) {
                    res.status(200).json(todos);
                } else {
                    res.status(500).json({msg: "Internal server error"});
                }
            })
        })
        .post((req, res) => {
            verifyToken(req, res, async (id) => {
                const {title, description, due_time, user_id, status} = req.body;
                if (!title || !description || !due_time || !user_id || !status) {
                    res.status(400).json({msg: "Information is not complete"});
                    return;
                }
                const todo = await postTodo(db, req.body);
                if (todo) {
                    res.status(200).json(todo);
                } else {
                    res.status(500).json({msg: "Internal server error"});
                }
            })
        })
    
    app.route("/todo/:id")
        .get((req, res) => {
            verifyToken(req, res, async (id) => {
                if (!req.params.id) {
                    res.status(400).json({msg: "Information is not complete"});
                    return;
                }
                const todo = await getTodo(db, req.params.id);
                if (todo) {
                    res.status(200).json(todo);
                } else {
                    res.status(500).json({msg: "Internal server error"});
                }
            })
        })
        .put((req, res) => {
            verifyToken(req, res, async (id) => {
                const {title, description, due_time, user_id, status} = req.body;
                if (!title || !description || !due_time || !user_id || !status || !req.params.id) {
                    res.status(400).json({msg: "Information is not complete"});
                    return;
                }
                const user = await putTodo(db, req.body, req.params.id);
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(500).json({msg: "Internal server error"});
                }

            });
        })
        .delete((req, res) => {
            verifyToken(req, res, async (id) => {
                if (!req.params.id) {
                    res.status(400).json({msg: "Information is not complete"});
                }
                await deleteTodo(db, req.params.id, async (success) => {
                    if (success) {
                        res.status(200).json({msg: `succesfully deleted record number: ${req.params.id}`});
                    } else {
                        res.status(500).json({msg: "Internal server error"});
                    }
                });
            })
        })
})
