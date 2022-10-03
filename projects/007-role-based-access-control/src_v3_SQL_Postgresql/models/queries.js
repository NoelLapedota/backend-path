const getUsers = "SELECT * FROM users";
const checkEmailExist = "SELECT s FROM users s WHERE s.email = $1";
const addUser = "INSERT INTO users (name, email, role) VALUES ($1, $2, $3)";
const deleteUser = "DELETE  FROM users WHERE ID = $1";
const updateUser = "UPDATE users SET name = $1 WHERE name = $2";
const checkRole = "SELECT s FROM users s WHERE s.role = $1 AND s.name = $2";

module.exports = {
    getUsers,
    checkEmailExist,
    addUser,
    deleteUser,
    updateUser,
    checkRole
}