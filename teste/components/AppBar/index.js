import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from './style.module.css'


export default function AppBar(props) {
  const router = useRouter()
  const [name, setName] = useState('')

  useEffect(() => {
    setName(localStorage.getItem('user'))
  }, [])
  
  return (
    <header>
        <div className={styles.header__up}>
          <div className={styles.header__logo}>
            📜
          </div>
          <h1>Teste 3deo j3edmp3kd qdm pqd</h1>
          <strong className={styles.header__up__username}>
            @{name}
          </strong>
        </div>

      <div className={styles.header_rigth}>

        <nav className={styles.header__navbar}>
          <Link href='/'>
            <a className={[
              styles.header__navbar__link,
              router.pathname ==='/' ? styles.header__navbar__link_active : ''
            ].join(' ')}>
              <div className={styles.header__navbar__link_indicator} />

              <div className={styles.header__navbar__link__icon}>
                🧭
              </div>

              <div className={styles.header__navbar__link__label}>
                Criar Forms
              </div>
            </a>
          </Link>

          <Link href='/create'>
            <a className={[
              styles.header__navbar__link,
              router.pathname ==='/create' ? styles.header__navbar__link_active : ''
            ].join(' ')}>
              <div className={styles.header__navbar__link_indicator} />

              <div className={styles.header__navbar__link__icon}>
                ✏️
              </div>

              <div className={styles.header__navbar__link__label}>
                Criar postagem
              </div>
            </a>
          </Link>

          <Link href='/favorites'>
            <a className={[
              styles.header__navbar__link,
              router.pathname ==='/favorites' ? styles.header__navbar__link_active : ''
            ].join(' ')}>
              <div className={styles.header__navbar__link_indicator} />

              <div className={styles.header__navbar__link__icon}>
                ❤️
              </div>

              <div className={styles.header__navbar__link__label}>
                Favoritos
              </div>
            </a>
          </Link>

          <Link href='/posts'>
            <a className={[
              styles.header__navbar__link,
              router.pathname ==='/posts' ? styles.header__navbar__link_active : ''
            ].join(' ')}>
              <div className={styles.header__navbar__link_indicator} />

              <div className={styles.header__navbar__link__icon}>
                🗂️
              </div>

              <div className={styles.header__navbar__link__label}>
                Suas postagens
              </div>
            </a>
          </Link>

          <Link href='/signin'>
            <a className={styles.header__navbar__link}>
              <div className={styles.header__navbar__link__icon}>
                📴
              </div>

              <div className={styles.header__navbar__link__label}>
                Sair
              </div>
            </a>
          </Link>
        </nav>
      </div>
    </header>
  )
}
