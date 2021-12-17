export const isLogin=()=>{

    if(localStorage.getItem("user_token")){
        return true;
    }
    else return false;
}
export function setToken(token){

    return localStorage.setItem('user_token',token);
}
