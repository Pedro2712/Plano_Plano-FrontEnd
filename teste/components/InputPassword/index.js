import { useState } from 'react'
import Lottie from 'react-lottie'

import style from './style.module.css'
import animationData from './lottie-eye.json'


export default function InputPassword({label, ...props}) {
  const [showPass, setShowPass] = useState(false)

  function toggleShowPass() {
    setShowPass(!showPass)
  }

  return (
    <div className={style.input_password__input_field}>
      <div className={style.input_password__label}>
        {label}
      </div>

      <input
        className={style.input_password__input}
        type={showPass ? 'text' : 'password'}
        {...props}
      />

      <button onClick={toggleShowPass} className={style.input_password__show_pass_button}>
        <div className={style.input_password__show_pass_button__icon}>
          <Lottie
            options={{
              loop: false,
              autoplay: true,
              animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }}
            speed={2.5}
            width={32}
            height={32}
            direction={showPass ? -1 : 1}
            isStopped={false}
            isPaused={false}
          />
        </div>
      </button>
    </div>
  )
}
