export const setContext = ({ user, pass }) => {
  localStorage.setItem('user', user);
  localStorage.setItem('pass', pass);
};

export const getContext = () => {
  if (localStorage.getItem('user')) {
    return { username: localStorage.getItem('user'), password: localStorage.getItem('pass') };
  }
  return null;
};

export const removeContext = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('pass');
}
