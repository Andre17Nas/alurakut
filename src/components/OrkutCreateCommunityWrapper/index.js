import React from 'react'
import Box from '../Box'


function OrkutCreateCommunityWrapper(p){


    return(
        <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e){
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                //console.log('titulo: ', dadosDoForm.get('title'));
                //console.log('imagem: ', dadosDoForm.get('image'));

                const comunidade = {
                  title: dadosDoForm.get('title'),
                  imageurl: `https://picsum.photos/300/300?`+ dadosDoForm.get('image'),
                  communityurl: dadosDoForm.get('link'),
                }

                fetch('/api/community/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(comunidade)

                }).then(async (response)=>{
                     const dados = await response.json();
                     //console.log("dados aqui", dados)
                     const comunidade = dados.registed;
                     const comunidadesAtualizadas = [...p.baseCommunity, comunidade];
                     p.setCommunity(comunidadesAtualizadas)
                })   


                
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                  />
              </div>
              <div>
                <input
                  placeholder="Digite um Id aleatorio para a capa"
                  name="image"
                  aria-label="Digite um Id aleatorio para a capa"
                  type='number'
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma Link da sua comunidade na web"
                  name="link"
                  aria-label="Coloque uma Link da sua comunidade na web"
                  type="text"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
    )
}

export default OrkutCreateCommunityWrapper