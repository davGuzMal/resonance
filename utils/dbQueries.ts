import axios from 'axios'
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

    return 'Post de ' + newDirectory + ' creado'
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

export const getDirectories = async (id: string) => {
    
    const options = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "GET",
        body: id
    }
    const directories : Directory[] = await fetch('/api/directories/', options)
    .then(res => res.json())
    .then (resp => resp.directories)    
    
    console.log(directories)
    return directories
}

export const getUser = async (id: String) => {
    
    // const options = {
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     method: "GET",
    //     body: JSON.stringify(id)
    // }
    const user : User = await fetch('/api/user/'+id)
    .then(res => res.json())
    .then (resp => resp.user)    
    
    return user
}