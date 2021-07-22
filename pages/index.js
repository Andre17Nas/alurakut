import React, {useState, useEffect} from 'react'
import MainGrid from '../src/components/MainGrid'
import OrkutCreateCommunityWrapper from '../src/components/OrkutCreateCommunityWrapper'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault  } from '../src/components/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelationsBoxWrapper'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'

function ProfileSidebar(propriedades) {

  //console.log(propriedades);
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

export default function Home(props) {

  const [comunidades, setComunidades] = useState([ ])

  const usuarioAleatorio = props.githubUser;
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  const [post, setPost] = useState([ ])

  useEffect(function(){

    //
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '60d1b9c13679d73ba2f38719b58590',
          'Content-Type':'application/json',
          'Accept':'application/json'
      }, 
      body: JSON.stringify({
        "query": `query
        {
          allPosts{
            message
          }
        }
        `
      })
    }).then(async (r)=>{
      return await r.json();
      //console.log(resposta)
      
    }).then((ready=>{
      const dataResponse = ready.data.allPosts;
      setPost(dataResponse)
    }))


      //API GRAPHQL    
      fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Authorization': '60d1b9c13679d73ba2f38719b58590',
          'Content-Type':'application/json',
          'Accept':'application/json'
        }, 
        body: JSON.stringify({"query": `query
        {
          allCommunities {
            id
            title
            imageurl
            communityurl
          }
        }
        `})
      }).then(async (response)=>{
          return await response.json(); 

      }).then((respostaCompleta)=>{
        const communityFromDato = respostaCompleta.data.allCommunities;
        setComunidades(communityFromDato)
      })

        


  }, [])

  return(
    <>
      <AlurakutMenu githubUser={usuarioAleatorio}/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
            <h1 className="title">
              Bem vindo(a) 
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          {
            //<OrkutCreateCommunityWrapper baseCommunity={comunidades} setCommunity={setComunidades}/>
          }

          <Box>
            <h1 className="title">Deixe sua mensagem {'<3'} </h1>
            <form onSubmit={function handlepost(e){
              e.preventDefault();

              const dados = new FormData(e.target);

              const postme = {
                message: dados.get('message'),
              }

              fetch('/api/post/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(postme)

              }).then(async (m)=>{
                const dados = await m.json();

                const posts = dados.dados;
                //console.log(posts)
                const postAtualizado = [...post, posts];
                setPost(postAtualizado)
              })


            }}>
              <input placeholder="Digite Aqui ..." type="text" name="message"/>
              <button>
                Enviar
              </button>
            </form>
          </Box>

          <div>
            <ul>
              {post.map((item)=>(
                <li>{'"'} {item.message} {'"'}</li>
              ))}
            </ul>
          </div>

        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={itemAtual.communityurl} target="__blank">
                      <img src={itemAtual.imageurl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}



export async function getServerSideProps(context){

  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
  //console.log("meu token: ", githubUser)
  const { isAuthenticated } = await fetch("https://alurakut.vercel.app/api/auth", {
    headers: {
      Authorization: token
    },
  }).then(async (response)=> response.json())

    if(!isAuthenticated){
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        }
      }
    }
  
  const { githubUser } = jwt.decode(token)

  return{
    props: {
      //nome da variavel é o mesmo nome da chave 
      //githubUser: githubUser
      //então: 
      githubUser
    },
  }
}


export async function getStaticPaths(){
  return {
    paths: [
      {
        params: {
          id: 'andrenas'
        }
      }
    ]
  }
}