export const setContext = ({ user, pass }) => {
  localStorage.setItem('user', user);
  localStorage.setItem('pass', pass);
};

export const getContext = () => {
  if (localStorage.getItem('user')) {
    return { user: localStorage.getItem('user'), pass: localStorage.getItem('pass') };
  }
  return undefined;
};

export const removeContext = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('pass');
}
