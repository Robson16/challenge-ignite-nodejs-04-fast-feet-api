# Desafio RocketSeat Ignite 2023 - NodeJs: Fast Feet API

Nesse desafio foi desenvolvido uma API para controle de encomendas de uma transportadora fictícia, a FastFeet.

### Regras da aplicação

- [X] CRUD de **Usuário**:
  - [X] Create;
    - [X] A aplicação deve ter os tipos de usuário: 
          Administrador, Entregador e Destinatário;
    - [X] Deve ser possível registrar um novo usuário
  - [ ] Read;
    - [X] Deve ser possível realizar login com CPF e Senha
    - [ ] Deve ser possível listar as entregas de um usuário
  - [X] Update;
    - [X] Deve ser possível alterar a senha de um usuário
  - [ ] Delete;

- [ ] CRUD de **Encomendas**:
  - [X] Create;
  - [ ] Read;
     - [ ] Deve ser possível listar as encomendas com endereços de entrega 
           próximo ao local do entregador;
  - [ ] Update;
     - [ ] Deve ser possível marcar uma encomenda como Entregue;
     - [ ] Deve ser possível marcar uma encomenda como Devolvida;
     - [ ] Deve ser possível marcar uma encomenda como Aguardando Retirada;
     - [ ] Deve ser possível marcar uma encomenda como Retirada;
     - [ ] Deve ser possível notificar o destinatário a cada 
           alteração no status da encomenda;
  - [ ] Delete;

- [ ] CRUD de **Destinos**:
  - [X] Create;
  - [ ] Read;
  - [ ] Update;
  - [ ] Delete;

### Regras de negócio

- [ ] Somente usuário do tipo Administrador pode realizar 
  operações de CRUD dos Usuários
- [ ] Somente o Administrador pode alterar a senha de um Usuário
- [ ] Somente usuário do tipo Administrador e Entregador pode realizar 
  operações de CRUD nas Encomendas
- [ ] Somente usuário do tipo Administrador pode realizar
  operações de CRUD dos Destinos
- [ ] Para marcar uma encomenda como entregue é obrigatório o envio de uma foto
- [ ] Somente o Entregador que retirou a Encomenda pode marcar ela como Entregue
- [ ] Não deve ser possível um Entregador listar as Encomendas de outro Entregador

### Contexto da aplicação

Para ajudar a imaginar como esses dados vão estar sendo utilizados pelo cliente web e/ou mobile. 

Abaixo o link para o layout da aplicação que utilizaria essa API.

https://www.figma.com/file/hn0qGhnSHDVst7oaY3PF72/FastFeet?type=design&node-id=0-1&mode=design