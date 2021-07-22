require('dotenv').config()
import { SiteClient } from 'datocms-client'

export default function receiveRequest(req, res){
    if(req.method === 'POST'){
        const TOKEN = process.env.DATOCMS_TOKEN
        const client = new SiteClient(TOKEN)

        const registerCreated = client.items.create({
            itemType: process.env.COMMUNITY_CREATE_ID,
            ...req.body,
        })

        res.json({
            dados: 'registrado :)',
            registed: registerCreated,
        })
        return;
    }

    res.status(404).json({
        message: 'Nenhum registro foi feito ainda! :('
    })
}