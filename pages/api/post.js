require('dotenv').config()
import { SiteClient } from 'datocms-client'

export default function handlePost(req, res){
    if(req.method === 'POST'){
        const TOKEN = process.env.DATOCMS_TOKEN
        const client = new SiteClient(TOKEN)

        const registerPost = client.items.create({
            itemType: process.env.POST_CREATE_ID,
            ...req.body,
        })

        res.json({
            message: 'Dados gravados',
            dados: registerPost,
        })
        return;
    } //

    res.status(400).json({
        message: 'nenhum dado encontrado'
    })
}