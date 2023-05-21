const verifyToken = require("../../middleware/notFound");
const {getUser, getTodos, getUserByEmail, putUser, deleteUser} = require("./user.query");

module.exports = ((app, db) => {
    app.get("/user", (req, res) => {
        verifyToken(req, res, async (id) => {
            const user = await getUser(db, id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(500).json({msg: "Internal server error"});
            }
        })
    });
    
    app.get("/user/todos", (req, res) => {
        verifyToken(req, res, async (id) => {
            const todos = await getTodos(db, id);
            if (todos) {
                res.status(200).json(todos);
            } else {
                res.status(500).json({msg: "Internal server error"});
            }
        });
    });
    
    app.get("/user/:email", (req, res) => {
        verifyToken(req, res, async (id) => {
            if (!req.params.email) {
                res.status(400).json({msg: "Information is not complete"});
                return;
            }
            const user = await getUserByEmail(db, req.params.email);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(500).json({msg: "Internal server error"});
            }

        })
    });
    
    app.route("/user/:id")
        .get((req, res) => {
            verifyToken(req, res, async (id) => {
                if (!req.params.id) {
                    res.status(400).json({msg: "Information is not complete"});
                    return;
                }
                const user = await getUser(db, req.params.id);
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(500).json({msg: "Internal server error"});
                }
    
            })
        })
        .put((req, res) => {
            verifyToken(req, res, async (id) => {
                const {email, password, created_at, firstname, name} = req.body;
                if (!email || !password || !created_at || !firstname || !name || !req.params.id) {
                    res.status(400).json({msg: "Information is not complete"});
                    return;
                }
                const user = await putUser(db, req.body, req.params.id);
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
                    return;
                }
                await deleteUser(db, req.params.id, (success) => {
                    if (success) {
                        res.status(200).json({msg: `succesfully deleted record number: ${req.params.id}`});
                    } else {
                        res.status(500).json({msg: "Internal server error"});
                    }
                });
            })
        })
})
