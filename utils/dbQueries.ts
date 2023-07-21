import { Directory, NewUser, User } from '@/utils/interfaces';


export const createDirectory = async (data: Directory) => {
    
    const options = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    }
    const newDirectory = await fetch('/api/directories/', options)
    .then(res => res.json())
    // await axios.post('')

    return newDirectory
}

export const createUser = async (data: NewUser) => {
    
    const options = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    }
    const newUser = await fetch('/api/user/', options)
    .then(res => res.json())
    // await axios.post('')

    return newUser
}

export const getDirectories = async (id: string ='all', email: string='') => {
    
    // const options = {
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     method: "GET",
    //     body: id
    // }        
    const directories : Directory[] = await fetch('/api/directories?id='+id+'&email='+email)
    .then(res => res.json())
    .then (resp => resp.directories)     
    
    return directories
}

export const getUser = async (email: String) => {    
    
    const path = '/api/user/'+email
    const user : User = await fetch(path)
    .then(res => res.json())
    .then (resp => resp.user)
    // .then (data => console.log(data))    
    
    return user
}
export const getAllUsers = async () => {    
    
    const path = '/api/user/'
    const users : User[] = await fetch(path)
    .then(res => res.json())
    .then (resp => resp.users)
    // .then (data => console.log(data))    
    
    return users
}