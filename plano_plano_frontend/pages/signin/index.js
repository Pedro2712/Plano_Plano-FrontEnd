import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
import Head from 'next/head'
import Link from 'next/link'

import style from './style.module.css'
import HelloIcon from '../../components/HelloIcon'
import InputText from '../../components/InputText'
import InputPassword from '../../components/InputPassword'


export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState('isabella.andrade')
  const [pass, setPass] = useState('plano10')

    async function submit() {      
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          username: user,
          password: pass
        })
      })
      const { token } = await response.json()

      if (token != 'Não tem acesso') {
        localStorage.setItem('token', token)
        localStorage.setItem('user', user)
        router.push('/')
      } else {
        alert('Senha ou usuário incorretos')
      }
  }

  return (
    <>
      <Head>
        <title>Poster - Entrar</title>
      </Head>

      <main className={style.container}>
        <div className={style.hello_animation__wrapper}>
          <HelloIcon />

          <h1 className={style.page_title}>
            Fazer Login
          </h1>
        </div>

        <div className={style.login_form__wrapper}>
          <div className={style.login_form__input_field}>
            <InputText label="Usuário" value={user} onInput={({target}) => setUser(target.value)} />
            <InputPassword label="Senha" value={pass} onInput={({target}) => setPass(target.value)} />
          </div>

          <div className={style.login_form__submit_row}>
            <Link href="/signup">
              <button className={style.login_form__button}>Cadastrar</button>
            </Link>

            <button className={[style.login_form__button, style.login_form__button_primary].join(' ')} onClick={submit} type="submit" >Entrar</button>
          </div>
        </div>
      </main>
    </>
  )
}
