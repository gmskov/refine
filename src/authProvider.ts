import { AuthProvider } from "@pankod/refine-core";

const mockUsers = [
  { email: "john@mail.com", roles: ["admin"] },
  { email: "jane@mail.com", roles: ["editor"] },
];

const authProvider: AuthProvider = {
  login: ({ email, password }) => {
    const user = mockUsers.find((item) => item.email === email);

    if (user) {
      localStorage.setItem("auth", JSON.stringify(user));
      return Promise.resolve();
    }

    return Promise.reject();
  },
  checkAuth: () => {
    const user = localStorage.getItem("auth");

    if (user) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  checkError: (error) => {
    if (error.status === 401 || error.status === 403) {
      return Promise.reject();
    }

    return Promise.resolve();
  },
  getPermissions: () => {
    const user = localStorage.getItem("auth");

    if (user) {
      const { roles } = JSON.parse(user);

      return Promise.resolve(roles);
    }

    return Promise.reject();
  },
  getUserIdentity: () => {
    const user = localStorage.getItem("auth");

    if (user) {
      const { email, roles } = JSON.parse(user);

      return Promise.resolve({ email, roles });
    }

    return Promise.reject();
  },
  register: ({ email }) => {
    const user = mockUsers.find((user) => user.email === email);

    if (user) {
      return Promise.reject();
    }

    mockUsers.push({ email, roles: ["user"] });

    return Promise.resolve();
  },
  forgotPassword: ({ email }) => {
    return Promise.resolve();
  },
  updatePassword: ({ password, confirmPassword, token }) => {
    console.log(token); // 123
    return Promise.resolve();
  }
};

export default authProvider;
