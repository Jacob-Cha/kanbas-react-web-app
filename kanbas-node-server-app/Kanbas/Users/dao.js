import db from "../Database/index.js";
let { users } = db;
export const createUser = (user) => {
 const newUser = { ...user, _id: Date.now().toString() };
 users = [...users, newUser];
 return newUser;
};

export const findAllUsers = () => users;
export const findUserById = (userId) => users.find((user) => user._id === userId);
export const findUserByUsername = (username) => users.find((user) => user.username === username);
export const findUserByCredentials = (username, password) =>
  users.find( (user) => user.username === username && user.password === password );
  export const updateUser = (userId, userUpdates) => {
    console.log("Searching for user with ID:", userId);

    const user = users.find((u) => u._id === userId);

    if (!user) {
        console.error("User not found with ID:", userId);
        return null;
    }

    console.log("User before update:", user);

    Object.assign(user, userUpdates);

    console.log("User after update:", user);

    return user;
};


export const deleteUser = (userId) => (users = users.filter((u) => u._id !== userId));
