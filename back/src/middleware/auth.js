const bcrypt = require("bcryptjs");

const registerComplete = (email, name, firstname, password) => {
  if (!email || !name || !firstname || !password) {
    return false;
  }
  return true;
};

const isEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
};

const isPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return passwordRegex.test(password);
};

const canRegister = (res, db, email, name, firstname, password, callback) => {
  if (!registerComplete(email, name, firstname, password)) {
    res.status(400).json({ msg: "Information is not complete" });
    return callback(false);
  }
  if (!isEmail(email)) {
    res.status(400).json({ msg: "Invalid email" });
    return callback(false);
  }
  if (!isPassword(password)) {
    res.status(400).json({ msg: "Invalid password" });
    return callback(false);
  }
  db.query("SELECT email FROM user WHERE email = ?", [email], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
      return callback(false);
    }
    if (results && results.length > 0) {
      res.status(409).json({ msg: "account already exists" });
      return callback(false);
    }
    return callback(true);
  });
};

const loginComplete = (email, password) => {
  if (!email || !password) {
    return false;
  }
  return true;
};

const canLogin = (res, db, email, password, callback) => {
    if (!loginComplete(email, password)) {
        res.status(400).json({ msg: "Information is not complete" });
        return callback(false);
    }
    db.query("SELECT password FROM user WHERE email = ?", [email], async (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).json({ msg: "Internal server error" });
            return callback(false);
        }
        if (!results || results.length === 0) {
            res.status(403).json({ msg: "Account not created" });
            return callback(false);
        }
        const hashedPassword = results[0].password;
        if (await bcrypt.compare(password, hashedPassword)) {
            return callback(true);
        }
        res.status(401).json({ msg: "Invalid Credentials" });
        return callback(false);
    });
};

module.exports = { canRegister, canLogin };
