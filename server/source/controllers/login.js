const { User } = require("../database");
const bcrypt = require("bcrypt");

const login = async (email, password) => {
    
    const user = await User.findOne({ where: { email }});
    if (!user) {
        throw Error("The user is not registered");
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw Error("The password is not valid")
    }

    return user;
};

module.exports = login;