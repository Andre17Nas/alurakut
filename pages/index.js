import React, {useState} from 'react'
import MainGrid from '../src/components/MainGrid'
import OrkutCreateCommunityWrapper from '../src/components/OrkutCreateCommunityWrapper'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault  } from '../src/components/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelationsBoxWrapper'

function ProfileSidebar(propriedades) {

  console.log(propriedades);
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

export default function Home() {

  const [comunidades, setComunidades] = useState([
    {
    id: '00000',
    title: `Eu odeio o "World"!!!!!`,
    imageUrl: 'data:image/png;base64,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',
    link: "https://docs.google.com/document/d/1Lu7N9_vGgwXR-6XUKZ4bbnX6MrivSc5irYt4ySxdiuo/edit"
    },
    {
      id: '11111',
      title: 'ReactJS Brasil',
      imageUrl: 'https://scontent.frec7-1.fna.fbcdn.net/v/t1.6435-9/s960x960/61427848_2704334539608012_8400023945763356672_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=8631f5&_nc_ohc=QxpbCxBtFD8AX8Ii4b2&tn=XOWfmRyZ3sP1vHl_&_nc_ht=scontent.frec7-1.fna&oh=f4faad21fb23e5dba4cbead9920aae9a&oe=60F29516',
      link: 'https://www.facebook.com/groups/reactjsbrasil/?multi_permalinks=1937255279777860&notif_id=1625768780295080&notif_t=group_highlights&ref=notif'
      },
      {
        id: '2222',
        title: 'League of Legends - Brasil',
        imageUrl: 'https://scontent.ffor11-1.fna.fbcdn.net/v/t1.6435-9/203845890_4164402373675858_5119940466742726411_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=G2HXxk5wEUwAX9Yks47&_nc_ht=scontent.ffor11-1.fna&oh=05772e8e9c94373f469bd59717771e14&oe=60F4AA54',
        link: 'https://www.facebook.com/LeagueofLegendsBrasil'
        }

])

  const usuarioAleatorio = 'andre17nas';
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  return(
    <>
      <AlurakutMenu githubUser={usuarioAleatorio}/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div lassName="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
            <h1 className="title">
              Bem vindo(a) 
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <OrkutCreateCommunityWrapper baseCommunity={comunidades} setCommunity={setComunidades}/>

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
                    <a href={itemAtual.link} target="__blank">
                      <img src={itemAtual.imageUrl} />
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
