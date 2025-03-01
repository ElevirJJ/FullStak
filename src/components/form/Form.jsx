import { useEffect, useState, useRef } from 'react'

import './Form.css'

import api from '../../services/api'
const Form = () => {
  const [medicos, setMedicos] = useState([])

  const inputNome = useRef()
  const inputEmail = useRef()
  const inputTelefone = useRef()
  const inputCRM = useRef()
  const inputEndereco = useRef()
  const inputBairro = useRef()
  const inputCidade = useRef()
  const inputCEP = useRef()
  const inputUF = useRef()
  const inputComplemento = useRef()
  const inputEspecialidade = useRef()



  async function getMedicos() {
    const medicosFromApi = await api.get('/medicos')
    setMedicos(medicosFromApi.data.content)

  }

  async function createMedicos() {
    await api.post('/medicos', {
      nome: inputNome.current.value,
      email: inputEmail.current.value,
      telefone: inputTelefone.current.value,
      crm: inputCRM.current.value,
      especialidade: inputEspecialidade.current.value,
      endereco: {
        logradouro: inputEndereco.current.value,
        bairro: inputBairro.current.value,
        cidade: inputCidade.current.value,
        numero: "1",
        uf: inputUF.current.value.toUpperCase(),
        cep: inputCEP.current.value.replace("-", ""),
        complemento: inputComplemento.current.value
      },
    })

  }

  async function apagarMedico (id) {
    await api.delete(`/medicos/${id}`)
    getMedicos()
  }

  async function atualizarMedico(id) {
    await api.put(`/medicos/${id}`, { 
      id: id,
      nome: inputNome.current.value,
      email: inputEmail.current.value,
      telefone: inputTelefone.current.value,
      crm: inputCRM.current.value,
      especialidade: inputEspecialidade.current.value,
      endereco: {
        logradouro: inputEndereco.current.value,
        bairro: inputBairro.current.value,
        cidade: inputCidade.current.value,
        numero: '1',
        uf: inputUF.current.value.toUpperCase(),
        cep: inputCEP.current.value.replace('-', ''),
        complemento: inputComplemento.current.value,
      },
    });
  }
  
  

  useEffect(() => {
    getMedicos()
  }, [])




  return (
    <div className="container">
      <div className="formulario">
        <form>
          <label>Nome</label>
          <input type="text" name="nome" ref={inputNome} />

          <label>email</label>
          <input type="text" ref={inputEmail} />

          <label>telefone</label>
          <input type="number" ref={inputTelefone} />

          <label>CRM</label>
          <input type="number" ref={inputCRM} />

          <label>endereço</label>
          <input type="text" ref={inputEndereco} />

          <label>bairro</label>
          <input type="text" ref={inputBairro} />

          <label>cidade</label>
          <input type="text" ref={inputCidade} />

          <label>complemento</label>
          <input type="text" ref={inputComplemento} />

          <label>CEP</label>
          <input type="text" ref={inputCEP} />


          <label>UF</label>
          <input type="text" ref={inputUF} />

          <label>especialidade</label>
          <select ref={inputEspecialidade} >
            <option value="CARDIOLOGIA">CARDIOLOGIA</option>
            <option value="DERMATOLOGIA">DERMATOLOGIA</option>
            <option value="NEUROLOGIA">NEUROLOGIA</option>
            <option value="ORTOPEDIA">ORTOPEDIA</option>
          </select>

          <button type='button' onClick={createMedicos} >cadastrar</button>
        </form>

        <div className="grid-container">
          {medicos.map((doutor) => (
            <div className="lista" key={doutor.id}>
              <p>nome: {doutor.nome}</p>
              <p>email: {doutor.email}</p>
              <p>telefone: {doutor.telefone}</p>
              <p>CRM: {doutor.crm}</p>
              <p>especialidade: {doutor.especialidade}</p>
              <p>endereço: {doutor.endereco.logradouro}</p>
              <p>bairro: {doutor.endereco.bairro}</p>
              <p>cidade: {doutor.endereco.cidade}</p>
              <p>UF: {doutor.endereco.uf}</p>
              <button onClick={() => apagarMedico(doutor.id)}>deletar</button>
              <button onClick={() => atualizarMedico(doutor.id)}>atualizar</button>
            </div>
          ))}
        </div>

      </div>
    </div>

  )
}

export default Form
