

export function getJwt() {
    window.localStorage.getItem('jwt');
};

export function setJwt(jwt) {
    window.localStorage.setItem('jwt',jwt);
}

export function removeJwt() {
    window.localStorage.removeItem('jwt');
}

export function config(Content) {
    const content = Content ? Content : 'application/json';
    const config = {
        headers: {
        'Authorization': `Bearer ${getJwt()}`,
        'Content-Type': content
    }}
    return config;
}