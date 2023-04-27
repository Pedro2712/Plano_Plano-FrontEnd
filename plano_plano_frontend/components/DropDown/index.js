import Select from 'react-select';
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import interrogacao from "../img/interrogacao.png"

import style from './style.module.css'

export default function DropDown({label, setDrop, id = "", inter = 0, ...props}) {
  let i = id == "" ? "" : " " + (id + 1)
  
  const data = require('./drop_value.json');
  const options = {
    Gestor: data.Gestor,
    Cidade: data.Cidade,
    Zoneamento: data.Zoneamento,
    Público: data.Público,
    Tipo_fachada_ativa: data.Tipo_fachada_ativa,
    Tipo_de_Torre: data.Tipo_de_Torre,
    Apartamentos_por_Andar: data.Apartamentos_por_Andar,
    aragem: data.aragem,
    NR: data.NR,
    Tipo_da_vaga: data.Tipo_da_vaga,
    Garagem: data.Garagem,
    Andares_na_Garegem: data.Andares_na_Garegem,
  };
  
  const seleciona=(event) => {
    const lista= event.target.id.split("-");
    const select= options[label.replaceAll(' ', '_')][lista[lista.length-1]];
    if (select){
      setDrop(select.value, label, id);
    }
  }

  
  return (

    <div className={style.input_text__input_field}>
      <div className={style.input_text__label}>
        {label + (i)}
        {inter ? 
          <div>
            <div className={style.input_image}>
              <Image src={interrogacao} alt="interrogacao"/>
              <text className={style.input_text__explanation}>{inter}</text>
            </div>
          </div>
        : null}
      </div>


      <form onClick={seleciona} className={style.input_drop__label}>
          <Select
            isSingle
            name="colors"
            options={options[label.replaceAll(' ', '_')]}
            className="basic-multi-select"
            classNamePrefix="select"
          />
      </form>
  </div>
  )
}


