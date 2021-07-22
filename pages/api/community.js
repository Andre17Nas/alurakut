import { SiteClient } from 'datocms-client'

export default function receiveRequest(req, res){
    if(req.method === 'POST'){
        const TOKEN = '60d1b9c13679d73ba2f38719b58590'
        const client = new SiteClient(TOKEN)

        const registerCreated = client.items.create({
            itemType: "968452",
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