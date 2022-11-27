import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import style from './style.module.css'
import AppBar from '../components/AppBar'
import Post from '../components/Post'
import InputText from '../components/InputText'
import DropDown from '../components/DropDown'


export default function Home(props) {
  const router = useRouter()
  const [token, setToken] = useState('')

  const [eficiencia, setEfiiciencia] = useState('')
  const [aproveitamento, setAproveitamento] = useState('')
  // const [teste, setTeste] = useState([])
  let teste = []

  const [nomeTerreno, setNomeTerreno] = useState('')
  const [codigo, setCodigo] = useState()
  const [metragem, setMetragem] = useState('')
  const [quantTorr1, setQuantTorr1] = useState('')
  const [quantAndar, setQuantAndar] = useState('')
  const [numVagas, setNumVagas] = useState('')
  const [quantAndarGaragem, setQuantAndarGaragem] = useState('')
  const [fachada, setFachada] = useState('')
  const [nr, setNr] = useState('')
  const [tipovaga, setTipoVaga] = useState('')

  const [gestor, setGestor] = useState('')
  const [cidade, setCidade] = useState('')
  const [zoneamento, setZoneamento] = useState('')
  const [publico, setPublico] = useState('')
  const [operacaoUrbana, setOperacaoUrbana] = useState('')
  const [tipoTorre, setTipoTorre] = useState('')
  const [quantApartAndar, setQuantApartAndar] = useState('')
  const [garagem, setGaragem] = useState('')


  const setDrop = (valor, label) => {
    if (label == "Gestor") setGestor(valor)
    else if (label == "Cidade") setCidade(valor)
    else if (label == "Zoneamento") setZoneamento(valor)
    else if (label == "Público") setPublico(valor)
    else if (label == "Operação Urbana") setOperacaoUrbana(valor)
    else if (label == "Tipo de Torre") setTipoTorre(valor)
    else if (label == "Quantos Apartamentos por Andar") setQuantApartAndar(valor)
    else if (label == "Garagem") setGaragem(valor)
    else if (label == "NR") setNr(valor)
    else if (label == "Tipo da vaga") setTipoVaga(valor)
  }


  const apaga = () => {
    setNomeTerreno(''); setCodigo(''); setMetragem(''); setQuantTorr1(''); setQuantAndar('');
    setNumVagas(''); setQuantAndarGaragem(''); setFachada(''); setNr('');
  }

  async function adiciona() {
    const response = await fetch('http://localhost:8000/adiciona/terreno/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({
        nomeTerreno: nomeTerreno,
        codigo: parseInt(codigo),
        gestor: gestor,
        cidade: cidade,
        zoneamento: zoneamento,
        metragem: parseFloat(metragem),
        publico: publico,
        operacaoUrbana: operacaoUrbana,
        tipoTorre: tipoTorre,
        quantAndar: parseInt(quantAndar),
        quantApartAndar: quantApartAndar,
        quantTorre1: parseInt(quantTorr1),
        garagem: garagem,
        numVagas: parseInt(numVagas),
        quantAndarGaragem: parseInt(quantAndarGaragem),
        fachada: fachada,
        tipovaga: tipovaga,
        nr: nr,
      })
    })
    const posts = await response.json()

    // console.log(posts)
    setEfiiciencia(posts[0])
    setAproveitamento(posts[1])
    // const _response = await fetch('http://localhost:8000/favorita/', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //     'Authorization': `Token ${token}`
    //   }
    // })
    // const likes = await _response.json()

    // posts.forEach((post) => {
    //   post.likes = likes.some((like) => like.id_card === post.id)
    // })

    // setPosts(posts)
  }


  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token)
      setToken(token)
    else
      router.push('/signin')
  }, [])

  useEffect(() => {
    if (token !== '') adiciona()
  }, [token])

  return (
    <>
      <Head>
        <title>Plano&Plano</title>
      </Head>


      <main className={style.main__container}>
        <AppBar />

        <div className={style.main__content}>
          <div className={style.main__init}>
            {/* <InputText label="Código" tipo={"number"} value={codigo} onInput={({ target }) => setCodigo(target.value)} /> */}
            {/* <InputText label="Nome do Terreno" tipo={"text"} value={nomeTerreno} onInput={({ target }) => setNomeTerreno(target.value)} /> */}
            {/* <DropDown label="Gestor" value={gestor} setDrop={setDrop} /> */}
          </div>

          <div className={style.main__init}>
            {/* <DropDown label="Cidade" value={cidade} setDrop={setDrop} /> */}
            {/* <DropDown label="Zoneamento" value={zoneamento} setDrop={setDrop} /> */}
            {/* <DropDown label="Público" value={publico} setDrop={setDrop} /> */}
            {/* <DropDown label="Operação Urbana" value={operacaoUrbana} setDrop={setDrop} /> */}
            <InputText label="Metragem" tipo={"number"} value={metragem} onInput={({ target }) => setMetragem(target.value)} />
            <DropDown label="Tipo de Torre" value={tipoTorre} setDrop={setDrop} />
            <InputText label="Quantos Andares" tipo={"number"} value={quantAndar} onInput={({ target }) => setQuantAndar(target.value)} />
          </div>

          <div className={style.main__init}>
            <DropDown label="Quantos Apartamentos por Andar" value={quantApartAndar} setDrop={setDrop} />
            <InputText label="Quantidade de torres tipo 1" tipo={"number"} value={quantTorr1} onInput={({ target }) => setQuantTorr1(target.value)} />
            <InputText label="Teste" tipo={"number"} value={teste.key} onInput={({ target }) => teste.push(target)} />
            <DropDown label="Garagem" value={garagem} setDrop={setDrop} />
          </div>

          <div className={style.main__init}>
            <InputText label="Número de vagas" tipo={"number"} value={numVagas} onInput={({ target }) => setNumVagas(target.value)} />
            <InputText label="Quantos Andares na Garegem" tipo={"number"} value={quantAndarGaragem} onInput={({ target }) => setQuantAndarGaragem(target.value)} />
            <InputText label="Fachada Ativa" tipo={"text"} value={fachada} onInput={({ target }) => setFachada(target.value)} />
            <DropDown label="Tipo da vaga" tipo={"text"} value={tipovaga} setDrop={setDrop} />
            {/* <DropDown label="NR" tipo={"text"} value={nr} setDrop={setDrop} /> */}
          </div>

          {/* <div className={style.main__drop}>
            <DropDown label="APP" value={aPP} setDrop={setDrop} />
          </div>

          <InputText label="APP" tipo={"text"} value={app} onInput={({ target }) => setApp(target.value)} /> */}
          {teste.map(element => {
            console.log(element)
            // <button className={style.bnt} onClick={apaga}>Apagar</button>
            })}
          <div className={style.bnt__container}>
            <button className={style.bnt} onClick={apaga}>Apagar</button>
            <button className={style.bnt} onClick={adiciona}>Calcular</button>
          </div>

          {/* {
            posts.map((post) => (
              <Post key={`post_${post.id}`} post={post} />
            ))
          } */}
          <div className={style.result__container}>
            {eficiencia ? <p className={style.result__container__title}>Eficiência: {eficiencia}</p> : null}
            {aproveitamento ? <p className={style.result__container__title}>Coeficiênte de aproveitamento: {aproveitamento}</p> : null}
          </div>
        </div>
      </main>
    </>
  )
}
