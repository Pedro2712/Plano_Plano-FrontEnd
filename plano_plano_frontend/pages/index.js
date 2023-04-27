import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import style from './style.module.css'
import AppBar from '../components/AppBar'
import Post from '../components/Post'
import InputText from '../components/InputText'
import DropDown from '../components/DropDown'
import { Alert } from '@mui/material';

import explain from '../explanation.json'


export default function Home(props) {
  const [alerta, setAlerta] = useState(0)
  
  const router = useRouter()
  const [token, setToken] = useState('')
  
  const [gestor, setGestor] = useState('')
  const [codigo, setCodigo] = useState()
  const [nomeTerreno, setNomeTerreno] = useState('')
  const [metragem, setMetragem] = useState('')
  const [zoneamento, setZoneamento] = useState('')
  const [publico, setPublico] = useState('')
  const [tipoFachadaAtiva, settipoFachadaAtiva] = useState('')
  const [garagem, setGaragem] = useState('')
  const [numVagas, setNumVagas] = useState('')
  const [andarGaragem, setAndarGaragem] = useState('')
  const [tipoVaga, setTipoVaga] = useState('')
  const [fachadaAtiva, setFachadaAtiva] = useState('')
  
  
  const [numApartamentos, setNumApartamentos] = useState('1')

  const [tipoTorre, setTipoTorre] = useState([])
  const [quantAndar, setQuantAndar] = useState([])
  const [apartAndar, setApartAndar] = useState([])
  const [quantTorre, setQuantTorre] = useState([])
  
  const [eficiencia, setEficiencia] = useState(null)
  const [aproveitamento, setAproveitamento] = useState(null)

  const mudaNumApartamentos = (valor) => {
    if (valor != '' || valor > 1) {
      if (valor > 12) 
        setNumApartamentos(12)
      else 
        setNumApartamentos(valor)
    } else
      setNumApartamentos(1)
  }

  const incrementaLista = (lista, valor, id) => {
    let num = lista.length
    let listaNova = lista
    if (num < id) {
      for (let i = num; i < id + 1; i++) {
        listaNova.push(NaN)
      }
    } else {
      listaNova.splice(numApartamentos, num)
    }
    listaNova.splice(id, 1, valor)

    console.log(listaNova)
    return listaNova
  }

  const setDrop = (valor, label, id) => {
    console.log(valor)
    if (label == "Gestor") setGestor(valor)
    else if (label == "Cidade") setCidade(valor)
    else if (label == "Zoneamento") setZoneamento(valor)
    else if (label == "Público") setPublico(valor)
    else if (label == "Tipo fachada ativa") settipoFachadaAtiva(valor)
    else if (label == "Tipo de Torre") setTipoTorre(incrementaLista(tipoTorre, valor, id))
    else if (label == "Apartamentos por Andar") setApartAndar(incrementaLista(apartAndar, valor, id))
    else if (label == "Garagem") setGaragem(valor)
    else if (label == "Tipo da vaga") setTipoVaga(valor)
    else if (label == "Andares na Garegem") setAndarGaragem(valor)
  }

  const desativaAlerta = () => {
    setAlerta(0)
    console.log("desativou")
  }

  const verificaLista = (lista) => {
    let num = lista.length
    lista.splice(numApartamentos, num)
    if (num < numApartamentos)
      return 0

    for (let i = 0; i < numApartamentos; i++) {
      if (isNaN(lista[i]) && typeof lista[i] != "string") {
        return 0
      }
    }

    return 1
  }  

  const verifica = () => {
    const listasValidas = verificaLista(tipoTorre) && verificaLista(apartAndar) && verificaLista(quantTorre) && verificaLista(quantAndar);
    const camposPreenchidos = metragem !== '' && fachadaAtiva !== '' && garagem !== '' && numVagas !== '' && tipoVaga !== '';
  
    // Verifica se todas as listas são válidas e se todos os campos estão preenchidos
    if (listasValidas && camposPreenchidos) {
      return 1;
    } else {
      return 0;
    }
    return 1;
  }


  const envia = () => {

    if (verifica()) {
      adiciona()
    } else {
      // alert("Preencha todos os campos")
      setAlerta(1)
      setTimeout(desativaAlerta, 1000 * 10)
    }
  }

  async function adiciona() {
    console.log(tipoFachadaAtiva);
    const response = await fetch('http://localhost:8000/adiciona/terreno/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({
        gestor: gestor,
        codigo: codigo,
        nomeTerreno: nomeTerreno,
        metragem: parseInt(metragem),
        zoneamento: zoneamento,
        publico: publico,
        tipoFachadaAtiva: tipoFachadaAtiva,
        garagem: garagem,
        numVagas: parseInt(numVagas),
        andarGaragem: parseInt(andarGaragem),
        tipoVaga: tipoVaga,
        fachadaAtiva: parseInt(fachadaAtiva),
        tipoTorre: tipoTorre,
        quantAndar: quantAndar,
        apartAndar: apartAndar,
        quantTorre: quantTorre,
      })
    })
    const posts = await response.json()

    console.log(posts)
    setEficiencia(posts[0])
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

      <main className={style.main}>
        <AppBar />
        {alerta ? 
          <div className={style.main__alerta}><Alert severity="warning">Selecione Todos os campos!</Alert></div>
        : null}

        <div className={style.main__container}>

          <div className={style.main__init}>
            <DropDown inter={explain.Gestor} label="Gestor" setDrop={setDrop} />
            <InputText inter={explain.Codigo} label="Código" tipo={"number"} onInput={({ target }) => setCodigo(target.value)} />
            <InputText inter={explain.Nome_do_Terreno} label="Nome do Terreno" tipo={"text"} onInput={({ target }) => setNomeTerreno(target.value)} />
          </div>

          <div className={style.main__init}>
            <InputText inter={explain.Metragem} label="Metragem" tipo={"number"} onInput={({ target }) => setMetragem(target.value)} />
            <DropDown inter={explain.Zoneamento} label="Zoneamento" setDrop={setDrop} />
            <DropDown inter={explain.Publico} label="Público" setDrop={setDrop} />
            <DropDown inter={explain.tipoFachadaAtiva} label="Tipo fachada ativa" tipo={"text"} setDrop={setDrop} />
          </div>

          <div className={style.main__init}>
            <DropDown inter={explain.Garagem} label="Garagem" setDrop={setDrop} />
            <InputText inter={explain.Numero_de_vagas} label="Número de vagas" tipo={"number"} onInput={({ target }) => setNumVagas(target.value)} />
            <DropDown inter={explain.Quantos_Andares_na_Garegem} label="Andares na Garegem" setDrop={setDrop} />
            <DropDown inter={explain.Tipo_da_vaga} label="Tipo da vaga" tipo={"text"} setDrop={setDrop} />
            <InputText inter={explain.Fachada_Ativa} label="Fachada Ativa (m²)" tipo={"text"} onInput={({ target }) => setFachadaAtiva(target.value)} />
          </div>

          <div className={style.main__content}>
            <div className={style.main__init}>
              <InputText inter={explain.Quantos_tipos_de_torres} label="Selecione quantos tipos de torres" tipo={"number"} onInput={({ target }) => { mudaNumApartamentos(target.value) }} />
            </div>

            <div>
              {[...Array(parseInt(numApartamentos))].map((x, i) =>
                <div className={style.main__init}>
                  <DropDown inter={explain.Tipo_de_Torre} label={"Tipo de Torre"} id={i} setDrop={setDrop} />
                  <InputText inter={explain.Quantos_Andares} label={"Quantos Andares"} id={i} tipo={"number"} onInput={({ target }) => setQuantAndar(incrementaLista(quantAndar, parseInt(target.value), i))} />
                  <DropDown inter={explain.Quantos_Apartamentos_por_Andar} label={"Apartamentos por Andar"} id={i} setDrop={setDrop} />
                  <InputText inter={explain.Quantidade_de_torres_tipo} label={"Quantidade de torres"} id={i} tipo={"number"} onInput={({ target }) => setQuantTorre(incrementaLista(quantTorre, parseInt(target.value), i))} />
                </div>
              )}
            </div>

            <div className={style.bnt__container}>
              <button className={style.bnt} onClick={envia}>Calcular</button>
            </div>

            <div className={style.result__container}>
              {eficiencia != null ? <p className={style.result__container__title}>Eficiência: {eficiencia}</p> : null}
              {aproveitamento != null ? <p className={style.result__container__title}>Coeficiênte de aproveitamento: {aproveitamento}</p> : null}
            </div>

          </div>
        </div>
      </main>
    </>
  )
}
