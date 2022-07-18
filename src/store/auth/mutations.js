export const setToken = (state, token) => {
  state.token = token; 
  state.isAuthenticated= true
};

export const setUser = (state, user) => {
  state.user = user; 
  state.isAuthenticated= true
};

export const removeToken = (state) => {
  state.token = ""; 
  state.user = {}
  state.isAuthenticated= false
};

