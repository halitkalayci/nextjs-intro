"use client"

import { useEffect } from "react"

// props -> properties
// 
export default function Example(props:any) {
    useEffect(() =>  {
        console.log(props);
    } , [])

    return <div>Merhaba, {props.name} {props.surname}</div>
}