import { useEffect, useState } from 'react'

import LikeButton from '../LikeButton'
import TrashButton from '../TrashButton'
import style from './style.module.css'


export default function Post ({ post, onDelete=null }) {
  const [token, setToken] = useState('')
  const [likesNuber, setLikesNuber] = useState(post.likesNuber)
  const [video, setVideo] = useState(false)

  moment.locale('pt-br')

  async function updateLike (value) {
    value ? setLikesNuber(likesNuber+1) : setLikesNuber(likesNuber-1);
    const response = await fetch('http://localhost:8000/favorita/', {
      method: value ? 'POST' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({
        id_card: post.id,
      })
    })
  }

  const sleep = (time) => new Promise(resolve => setTimeout(resolve, time))

  async function barra (event) {
    setVideo(true)
    await sleep(2000)
    setVideo(false)
  }

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  return (
    <article className={style.post}>
      <div className={style.post__header}>
        <div className={style.post__header__user}>
          <span className={style.post__header__user__name}>@{post.username}</span> ({moment(post.time).fromNow()})
        </div>

        <h2 className={style.post__header__title}>
          {post.content + ' '}
        </h2>
      </div>

      { post.photo_url && !post.photo_url.endsWith('null') ? post.photo_url.endsWith('.mp4') ? (
        <div onMouseMove={barra}>
          <video
            src={post.photo_url}
            className={style.post__image}
            controls={video ? ( true ) : ( false )}
            loop={false}
            muted={true}
          />
        </div>
      ) : ( 
          <img src={post.photo_url} alt='photo_test' className={style.post__image}/>
      ) : (
        <></>
      )}

      <div className={style.post__footer}>
        <LikeButton like={post.likes} onLike={updateLike} />
        <AnimatedNumber
          value={likesNuber}
          formatValue={n=>n.toFixed(0)}
          frameStyle={percentage=>percentage>20 && percentage<80 ? { opacity:0.5 } : { opacity:1 }}
          duration={300}
          />

        { onDelete !== null ? (
          <TrashButton post={post} onDelete={onDelete}/>
        ) : (
          <></>
        ) }
      </div>
    </article>
  )
}
