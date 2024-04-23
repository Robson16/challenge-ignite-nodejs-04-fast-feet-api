# Desafio RocketSeat Ignite 2023 - NodeJs: Fast Feet API

Nesse desafio foi desenvolvido uma API para controle de encomendas de uma transportadora fictícia, a FastFeet.

### Regras da aplicação

- [X] A aplicação deve ter dois tipos de usuário, entregador e/ou admin
- [X] Deve ser possível realizar login com CPF e Senha
- [X] Deve ser possível alterar a senha de um usuário
- [ ] Deve ser possível realizar o CRUD dos entregadores
- [ ] Deve ser possível realizar o CRUD das encomendas
- [ ] Deve ser possível realizar o CRUD dos destinatários
- [ ] Deve ser possível marcar uma encomenda como aguardando (Disponível para retirada)
- [ ] Deve ser possível marcar uma encomenda como entregue
- [ ] Deve ser possível marcar uma encomenda como devolvida
- [ ] Deve ser possível retirar uma encomenda
- [ ] Deve ser possível listar as encomendas com endereços de entrega próximo ao local do entregador
- [ ] Deve ser possível listar as entregas de um usuário
- [ ] Deve ser possível notificar o destinatário a cada alteração no status da encomenda

### Regras de negócio

- Somente usuário do tipo admin pode realizar operações de CRUD nas encomendas
- Somente usuário do tipo admin pode realizar operações de CRUD dos entregadores
- Somente usuário do tipo admin pode realizar operações de CRUD dos destinatários
- Para marcar uma encomenda como entregue é obrigatório o envio de uma foto
- Somente o entregador que retirou a encomenda pode marcar ela como entregue
- Somente o admin pode alterar a senha de um usuário
- Não deve ser possível um entregador listar as encomendas de outro entregador

### Contexto da aplicação

Para ajudar a imaginar como esses dados vão estar sendo utilizados pelo cliente web e/ou mobile. 

Abaixo o link para o layout da aplicação que utilizaria essa API.

https://www.figma.com/file/hn0qGhnSHDVst7oaY3PF72/FastFeet?type=design&node-id=0-1&mode=design