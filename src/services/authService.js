export const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(u => u.email === email && u.password === btoa(password));
  };