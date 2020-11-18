export const setContext = ({ username, password }) => {
    localStorage.setItem('username', username || '');
    localStorage.setItem('password', password || '');
};
export const getContext = () => {
    if (localStorage.getItem('username')) {
        return { username: localStorage.getItem('username') || '', password: localStorage.getItem('password') || '' };
    }
    return null;
};
export const removeContext = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
};
