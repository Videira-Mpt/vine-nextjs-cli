/* eslint-disable react/display-name */
import React, { useState } from "react";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from '../../components/elements/section-title/index';
import Widget from '../../components/elements/widget/index';
import FormValidation from './../../components/elements/forms/validation';

import Repository, { baseUrl } from "../../services/repository";


export default function PatientNew() {

  const router = useRouter(); //vai buscar o router

  const onSubmit = async (data) => {
    console.log(baseUrl);
    console.log(data);
    await Repository.post(`${baseUrl}/candidates`, {data:data})
      .then((resp) => {
        router.push("/candidates");
      }
      ).catch(function (error) {
        console.log(error);
        alert("Ocorreu um erro durante a gravação")
      });
  }

  let items = [
    {
      label: 'Nome',
      error: { required: 'Introduza o nome' },
      name: 'name',
      type: 'text',
      placeholder: 'Introduza o Nome'
    },
    {
      label: 'Morada',
      name: 'address',
      type: 'text',
      placeholder: 'Introduza a Morada'
    },
    {
      label: 'Contacto',
      name: 'contact',
      type: 'text',
      placeholder: 'Introduza o Contacto'
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Introduza o Email'
    },
    {
      label: 'Lider',
      name: 'leader',
      type: 'text',
      placeholder: 'Introduza o Nome do Lider'
    },
    {
      label: 'Curso',
      error: {
        required: 'Selecção do curso é obrigatorio'
      },
      name: 'course',
      type: 'radio',
      options: [
        { value: 'Maturidade', label: 'Maturidade No Espirito' },
        { value: 'CTL', label: 'Curso Treinamento para Lideres' }
      ]
    },
  ]

  return (
    <>
      <SectionTitle title="ESCOLA VIDEIRA DE MINISTÉRIOS" subtitle="Formulário de Inscrição" />

      <Widget
        title=""
        description=""
        right=""
      >
        <FormValidation items={items} onSubmit={onSubmit} />
      </Widget>


    </>)
}
