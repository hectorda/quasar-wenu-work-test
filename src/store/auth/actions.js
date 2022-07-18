import axios from "axios";
const api_url = process.env.API_URL;

export const newUser = async ({ commit }, payload) => {
    await axios
    .post(api_url + "/api/user/register/", payload)
    .then((response) => {
        commit("setToken", response.data.token);
        commit("setUser", response.data.user);
    });
};

export const doLogin = async ({ commit }, payload) => {
    console.log(commit)
  await axios.post(api_url + "/api/user/login/", payload).then((response) => {
    console.log(response);
    commit("setToken", response.data.token);
    commit("setUser", response.data.user);
  });
};

export const signOut = ({ commit }) => {
  commit("removeToken");
};