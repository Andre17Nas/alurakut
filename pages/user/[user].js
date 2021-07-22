//Esta é uma página dinamica para chamar o perfil dos usuarios do alurakut
import React from 'react'
import { useRouter } from 'next/router'

export default function UserPage(){

    const router = useRouter()
    const { user } = router.query

    return(
        <h1>bem vindo: { user }</h1>
    )
}
