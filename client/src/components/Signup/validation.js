 
const validateUsername = (username) => {
    return /^[a-zA-Z]+$/.test(username) ? "" : "Username should contain only letters";
};

const validatePassword = (password) => {
    return password.length >= 5 ? "" : "Password should contain at least 5 characters";
};

const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone) ? "" : "Phone number should contain exactly 10 digits";
};

export { validateUsername, validatePassword, validatePhone };
