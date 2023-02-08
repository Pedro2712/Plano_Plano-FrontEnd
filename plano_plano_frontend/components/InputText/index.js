import style from './style.module.css'
import { useForm } from 'react-hook-form'
import Image from 'next/image'

import interrogacao from "../img/interrogacao.png"


export default function InputText({label, tipo, id = "", inter = 0, required, ...props}) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  let i = id == "" ? "" : " " + (id + 1)
  
  return (
    <div className={style.input_text__input_field}>
      <div className={style.input_text__label}>
        {label + (i)}
        {inter ?
          <div>
            <div className={style.input_image}>
              <Image src={interrogacao} alt="interrogacao"/>
              <text className={style.input_explanation}>{inter}</text>
            </div>
          </div>
        : null}
      </div>

      <input
        className={style.input_text__input}
        type={tipo}
        min={0}
        {...register(label, { required: required })}
        {...props}
      />
    </div>
  )
}
