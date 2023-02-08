import Select from 'react-select';
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import interrogacao from "../img/interrogacao.png"

import style from './style.module.css'


export default function DropDown({label, setDrop, id = "", inter = 0, ...props}) {
  let i = id == "" ? "" : " " + (id + 1)
  
  const Gestor= [{value: 'Adriano Engel', label: 'Adriano Engel'}, {value: 'Luís Fernando', label: 'Luís Fernando'},
                 {value: 'Marcelo Amirati', label: 'Marcelo Amirati'},]

  const Cidade= [{value: 'São Paulo', label: 'São Paulo'}, {value: 'Guarulhos', label: 'Guarulhos'},
                 {value: 'Barueri', label: 'Barueri'}, {value: 'Campinas', label: 'Campinas'},
                 {value: 'Diadema', label: 'Diadema'}, {value: 'São Bernado', label: 'São Bernado'},]
                 
  const Zoneamento= [{value: 'ZEU', label: 'ZEU'}, {value: 'ZEUP', label: 'ZEUP'}, {value: 'ZC', label: 'ZC'}, 
                     {value: 'ZM', label: 'ZM'}, {value: 'ZPI-1', label: 'ZPI-1'}, {value: 'ZPI-2', label: 'ZPI-2'},
                     {value: 'ZEIS-1', label: 'ZEIS-1'}, {value: 'ZEIS-2', label: 'ZEIS-2'}, {value: 'ZEIS-3', label: 'ZEIS-3'},
                     {value: 'ZEIS-4', label: 'ZEIS-4'}, {value: 'ZEIS-5', label: 'ZEIS-5'},]
                     
  const Público= [{value: 'HIS', label: 'HIS'}, {value: 'HMP', label: 'HMP'}, {value: 'R2V', label: 'R2V'},]
  
  const Tipo_de_Torre= [{value: 'Eng 1', label: 'Eng 1'}, {value: 'Eng 1 Plus', label: 'Eng 1 Plus'}, {value: 'ODS 1', label: 'ODS 1'},
                        {value: 'ODS 2', label: 'ODS 2'}, {value: 'ODS 2 Plus', label: 'ODS 2 Plus'}, {value: 'ODS 4', label: 'ODS 4'},
                        {value: 'ODS 4 Plus', label: 'ODS 4 Plus'}, {value: 'ODS 6 ', label: 'ODS 6'},]
                        
  const Quantos_Apartamentos_por_Andar= [{value: 8, label: 8}, {value: 9, label: 9}, {value: 10, label: 10}, {value: 11, label: 11},
                                         {value: 12, label: 12},]
                                         
  const NR= [{value: 'Sim', label: 'Sim'}, {value: 'Não', label: 'Não'},]
  
  const Garagem= [{value: 'Edifício Garagem', label: 'Edifício Garagem'}, {value: 'Sobressolo', label: 'Sobressolo'}, {value: 'Subsolo', label: 'Subsolo'},
                  {value: 'Não Há', label: 'Não Há'},]
  
  const Operação_Urbana= [{value: 'Não tem', label: 'Não tem'}, {value: 'Operação Urbana Água Branca', label: 'Operação Urbana Água Branca'}, {value: 'Operação Urbana Centro', label: 'Operação Urbana Centro'}, {value: 'Operação Urbana Faria Lima', label: 'Operação Urbana Faria Lima'},
                          {value: 'Operação Urbana Água Espraiada', label: 'Operação Urbana Água Espraiada'}, {value: 'Operação Urbana Bairros do Tamanduateí', label: 'Operação Urbana Bairros do Tamanduateí'},]

  const Tipo_da_vaga= [{value: 'Vaga Simples', label: 'Vaga Simples'}, {value: 'Vaga Dupla', label: 'Vaga Dupla'}, {value: 'Vaga Tripla', label: 'Vaga Tripla'}, {value: 'Vaga Simples e Dupla', label: 'Vaga Simples e Dupla'},
                  {value: 'Vaga Dupla e Tripla', label: 'Vaga Dupla e Tripla'}, {value: 'Não Há', label: 'Não Há'},]


  // const APP= [{value: 'APP', label: 'APP'},]

  const options = {Gestor, Cidade, Zoneamento, Público, Operação_Urbana, Tipo_de_Torre, 
                  Quantos_Apartamentos_por_Andar, Garagem, NR, Tipo_da_vaga}
  
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


