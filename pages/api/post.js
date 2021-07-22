import { SiteClient } from 'datocms-client'

export default function handlePost(req, res){
    if(req.method === 'POST'){
        const TOKEN = "60d1b9c13679d73ba2f38719b58590"
        const client = new SiteClient(TOKEN)

        const registerPost = client.items.create({
            itemType: "4666805",
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