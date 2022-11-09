import { useEffect, useState } from 'react'
import Lottie from 'react-lottie'

import style from './style.module.css'
import animationData from './lottie-trash.json'


const sleep = (time) => new Promise(resolve => setTimeout(resolve, time))

export default function TrashButton ({className=[], onDelete, post, ...props}) {
  const [trash, setTrash] = useState(false)

  const animationState = {
    width: 42,
    height: 42,
    isStopped: false,
    isPaused: false,
    direction: trash ? 1 : -1,
    options: {
      loop: false,
      autoplay: false,
      animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }
  }

  async function doDelete () {
    setTrash(true)
    await sleep(1000)
    onDelete(post)
  }

  return (
    <button className={[style.trash_button, ...className]} onClick={doDelete} {...props}>
      <div className={style.trash_button__animation}>
        <Lottie { ...animationState } speed={2}/>
      </div>
    </button>
  )
}
