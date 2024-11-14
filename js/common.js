export const getAccessToken = () =>{
    return localStorage.getItem('access_token')
}

export const getRefreshToken = () =>{
    return localStorage.getItem('access_token')
}

export const setToken = (token) =>{
    localStorage.setItem('access_token',token.access_token)
    localStorage.setItem('refresh_token',token.refresh_token)
}