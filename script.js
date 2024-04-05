//Array de criação dos participantes para preenchimento do corpo da tabela
let participantes = [
    {
      nome: "Diego Fernandes",
      email: "diego@gmail.com",
      dataInscricao: new Date(2024, 2, 1, 19, 23),
      dataCheckIn: new Date(2024, 2, 1, 20, 20)
    },
    {
      nome: "Mayk Brito",
      email: "mayk@gmail.com",
      dataInscricao: new Date(2024, 2, 23, 19, 23),
      dataCheckIn: new Date(2024, 2, 25, 20, 20)
    },
    {
      nome: "Ana Souza",
      email: "ana@gmail.com",
      dataInscricao: new Date(2024, 0, 3, 19, 23),
      dataCheckIn: new Date(2024, 0, 4, 20, 20)
    },
    {
      nome: "João Silva",
      email: "joao@gmail.com",
      dataInscricao: new Date(2023, 11, 4, 19, 23),
      dataCheckIn: new Date(2023, 11, 5, 20, 20)
    },
    {
      nome: "Maria Oliveira",
      email: "maria@gmail.com",
      dataInscricao: new Date(2023, 10, 5, 19, 23),
      dataCheckIn: new Date(2023, 10, 6, 20, 20)
    },
    {
      nome: "Pedro Santos",
      email: "pedro@gmail.com",
      dataInscricao: new Date(2023, 9, 6, 19, 23),
      dataCheckIn: new Date(2023, 9, 7, 20, 20)
    },
    {
      nome: "Carla Lima",
      email: "carla@gmail.com",
      dataInscricao: new Date(2023, 8, 7, 19, 23),
      dataCheckIn: new Date(2023, 8, 8, 20, 20)
    },
    {
      nome: "Lucas Sousa",
      email: "lucas@gmail.com",
      dataInscricao: new Date(2023, 7, 8, 19, 23),
      dataCheckIn: new Date(2023, 7, 9, 20, 20)
    },
    {
      nome: "Paula Costa",
      email: "paula@gmail.com",
      dataInscricao: new Date(2023, 6, 9, 19, 23),
      dataCheckIn: new Date(2023, 6, 10, 20, 20)
    },
    {
      nome: "Gabriel Almeida",
      email: "gabriel@gmail.com",
      dataInscricao: new Date(2023, 5, 10, 19, 23),
      dataCheckIn: new Date(2023, 5, 11, 20, 20)
    }
];
  
//função alterar conteúdo das tags do HTML
const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now())
    .to(participante.dataInscricao)
  
    let dataCheckIn = dayjs(Date.now())
    .to(participante.dataCheckIn)

    //condicional para criar botão de confirmar checkin
    if(participante.dataCheckIn == null) {
      dataCheckIn = `
        <button
          data-email="${participante.email}"
          onclick="fazerCheckIn(event)"
        >
          Confirmar check-in
        </button>
      `
    }
    
    return `
      <tr>
        <td>
          <strong>${participante.nome}</strong>
          <br>
          <small>${participante.email}</small>
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
      </tr>
    `
}

//função para subtituir as informarções do corpo da tabela no HTML
const atualizarLista = (participantes) => {
    //estrutura de repetição para criação dos participantes
    let output = ""
    for(let participante of participantes) {
      output = output + criarNovoParticipante(participante)
    }
  
    // substituir informação do HTML
    document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

//Recebimento das informações inseridas pelo participante
const adicionarParticipante = (event) => {
  //impede o envio do formulario
  event.preventDefault()

  //indica de qual formulario voce vai pegar os dados. Adicionamos o "event" que é o nome qeu demos ao formulario no HTML
  const dadosDoFormulario = new FormData(event.target)

  //pegando as informações inseridas nos inputs
  const participante = {
    nome: dadosDoFormulario.get("nome"),
    email: dadosDoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o particpante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  //reeordenar a lista de participantes, ordenando do mais recente
  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""

}
  
// Botão para fazer o check-In
const fazerCheckIn = (event) => {

  //Encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  //Confirmar se quer fazer mesmo o Check-In
  const mensagemConfirmacao = "Tem certeza que deseja fazer o Check-In?"

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  //atualizar o checkIn do participante
  participante.dataCheckIn = new Date()

  // Atualizar a lista de participantes
  atualizarLista(participantes)

}

