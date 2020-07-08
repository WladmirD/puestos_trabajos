

export function getJwt() {
    return window.localStorage.getItem('jwt');
};

export function setJwt(jwt) {
    window.localStorage.setItem('jwt',jwt);
}

export function removeJwt() {
    window.localStorage.removeItem('jwt');
}

export function config(Content) {
    const content = Content ? Content : 'application/json';
    const jwt = getJwt();
    const config = {
        headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': content
    }}
    return config;
}