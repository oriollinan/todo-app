const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {canRegister, canLogin} = require("../../middleware/auth");

module.exports = ((app, db) => {
    app.post("/register", async (req, res) => {
        const { email, name, firstname, password } = req.body;
        canRegister(res, db, email, name, firstname, password, async (isValid) => {
            if (isValid) {
                const hashedPassword = await bcrypt.hash(password, 8);
                try {
                    const [rows] = await db.promise().query("INSERT INTO user (email, name, firstname, password) VALUES (?, ?, ?, ?)", [email, name, firstname, hashedPassword]);
                    const token = jwt.sign(
                        {user_id: rows.insertId, email},
                        process.env.SECRET,
                        {expiresIn: "2h"}
                    );
                    res.status(200).json({token: token})
                } catch (e) {
                    console.error(e);
                    res.status(500).json({msg: "Internal server error"})
                }
            }
        });
    });
    
    app.post("/login", (req, res) => {
        const { email, password } = req.body;
        canLogin(res, db, email, password, async (isValid) => {
            if (isValid) {
                try {
                    const [rows] = await db.promise().query("SELECT id FROM user WHERE email = ?", [email]);
                    const token = jwt.sign(
                        {user_id: rows[0].id, email},
                        process.env.SECRET,
                        {expiresIn: "2h"}
                    );
                    res.status(200).json({ token: token });
                } catch (e) {
                    console.error(e);
                    res.status(500).json({msg: "Internal server error"});
                }
            }
        });
    });
});
