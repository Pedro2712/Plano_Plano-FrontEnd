import { useEffect, useState } from 'react'
import Lottie from 'react-lottie'

import style from './style.module.css'
import animationData from './lottie-heart.json'


export default function LikeButton ({className=[], like:_like, onLike, ...props}) {
  const [like, setLike] = useState(_like)

  const animationState = {
    width: 256,
    height: 256,
    isStopped: false,
    isPaused: false,
    direction: like ? 1 : -1,
    options: {
      loop: false,
      autoplay: true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }
  }

  function toggleLike () {
    const value = !like

    setLike(value)
    onLike(value)
  }
  
  return (
    <button className={[style.like_button, ...className]} onClick={toggleLike} {...props}>
      <div className={style.like_button__animation}>
        <Lottie { ...animationState } speed={ like ? 2.5 : 2 }/>
      </div>
    </button>
  )
}
