import { EnumType } from "typescript"

export interface Directory {
    id : string,
    userId : string,
    type : string,
    title : string,
    content : string,
    updateDate: Date
}
export interface NewUser {    
    name: string,
    email: string,
    password: string,
    directories : Directory[]
}

export interface User {
    id : string ,
    name: string,
    email: string,
    emailVerified: Date
    directories : Directory[]
}

export interface Type {
    NOTE : EnumType
    JOURNAL : EnumType
    CONFESSION : EnumType
    LETTER : EnumType
    PERSONAL : EnumType
    BUSINESS : EnumType
}