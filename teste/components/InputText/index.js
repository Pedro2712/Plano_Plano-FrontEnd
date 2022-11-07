import style from './style.module.css'
import { useForm } from 'react-hook-form'


export default function InputText({label, tipo, required, ...props}) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  return (
    <div className={style.input_text__input_field}>
      <div className={style.input_text__label}>
        {label}
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
