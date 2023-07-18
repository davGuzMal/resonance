export interface Directory {
    id : string,
    userId : string,
    type : string,
    title : string,
    content : string
}
export interface NewUser {    
    name: string,
    email: string,
    password: string,
    directories : Directory[]
}

export interface User {
    id : string,
    name: string,
    email: string,
    directories : Directory[]
}