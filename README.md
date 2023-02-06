<!-- # Programming Challenge -->
## Desafio VR Software - Frontend

---
### Inicialização da Aplicação
#### Instalação de dependências

1. clone o repositório.
2. Caso tenha o docker instalado em sua máquina
  2.1 basta executar o comando ```docker-compose up -d```.

2. Caso não possui o docker instalado
    2.1 Execute o comando ```npm install```.
    2.2 Após a instalação dos pacotes, execute o comando ```npm start```.
---
### Executação da Aplicação
Importante que a api backend esteja sendo executada em _localhost:3000_
1. Para iniciar a aplicação, basta executar o comando ```docker-compose up -d``` ou ```npm start```.
1. Abrir seu navegador e acessar a [página inicial da aplicação](http://localhost:4200) (http://localhost:4200)
---
#### Desafios encontrados durante a realização do desafio
- **Angular** - utilizar um framework que não possuo tanta afinidade e não estudava há algum tempo foi bem desafiador. Mas como todo programador que almeja sucesso em sua carreira, decidi encarar o desafio e confesso que estou satisfeito com meu desempenho.
Apesar de não conhecer muito das boas práticas do Angular/frontend, gosto muito de estudar e foi uma experiência muito interessante estudar ao mesmo tempo que aplicava em algo concetro o que eu havia estudado

- **Docker + Nginx** - Ainda não havia tido a oportunidade de utilizar o nginx, tive algumas dificuldades de fazer a imagem funcionar da maneira esperada, mas o problema foi solucionado com sucesso

#### Telas Desenvolvidas
- **Listagem de cursos** - *GET http://localhost:4200/courses*
- **Criação de cursos** - *POST http://localhost:4200/courses*
- **Edição de cursos** - *PUT http://localhost:4200/courses/1*

- **Listagem de alunos** - *GET http://localhost:4200/students*
- **Criação de alunos** - *POST http://localhost:4200/students*
- **Edição de alunos** - *PUT http://localhost:4200/students/1*

- **Listagem de matrículas** - *GET http://localhost:4200/enrollments*
- **Criação de matrículas** - *POST http://localhost:4200/enrollments*
- **Edição de matrículas** - *PUT http://localhost:4200/enrollments/1*
