<template>
  <div class="formgrid grid justify-content-around" id="info-cliente">
    <div class="field grid col-4 mt-2">
      <label for="nome">Nome</label>
      <InputText disabled type="text" id="nome" v-model="cliente.nome" />
    </div>

    <div class="field grid col-4 mt-2">
      <label for="email">E-mail</label>
      <InputText disabled id="email" type="text" v-model="cliente.email" />
    </div>

    <div class="field grid col-4 mt-2">
      <label for="cpf">CPF</label>
      <InputMask
        disabled
        id="cpf"
        type="text"
        v-model="cliente.cpf"
        mask="999.999.999-99"
      />
    </div>

    <div class="field grid col-4 mt-2">
      <label for="cep">CEP</label>
      <InputMask
        disabled
        id="cep"
        type="text"
        v-model="cliente.cep"
        mask="99999-99"
      />
    </div>

    <div class="field grid col-4 mt-2">
      <label for="rua">Rua</label>
      <InputText disabled id="rua" type="text" v-model="cliente.rua" />
    </div>

    <div class="field grid col-4 mt-2">
      <label for="numero">Número</label>
      <InputText disabled id="numero" type="text" v-model="cliente.numero" />
    </div>

    <div class="field grid col-4 mt-2">
      <label for="complemento">Complemento</label>
      <InputText
        disabled
        id="complemento"
        type="text"
        v-model="cliente.complemento"
      />
    </div>

    <div class="field grid col-4 mt-2">
      <label for="bairro">Bairro</label>
      <InputText disabled id="bairro" type="text" v-model="cliente.bairro" />
    </div>

    <div class="field grid col-4 mt-2">
      <label for="cidade">Cidade</label>
      <InputText disabled id="cidade" type="text" v-model="cliente.cidade" />
    </div>

    <div class="field grid col-4 mt-2">
      <label for="estado">Estado</label>
      <InputText disabled id="estado" type="text" v-model="cliente.estado" />
    </div>

    <div class="field grid col-4 mt-2">
      <label for="tel">Telefone</label>
      <InputMask
        disabled
        id="tel"
        type="text"
        v-model="cliente.telefone"
        mask="(99) 9999-9999"
      />
    </div>

    <div class="field grid col-4 mt-2">
      <label for="cel">Celular</label>
      <InputMask
        disabled
        id="cel"
        type="text"
        v-model="cliente.celular"
        mask="(99) 99999-9999"
      />
    </div>

    <div class="field grid col-4 mt-2">
      <label for="nascimento">Nascimento</label>
      <Calendar disabled id="nascimento" v-model="cliente.nascimento" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoCliente',
  props: {
    cliente: {
      nome: String,
      email: String,
      cpf: String,
      cep: String,
      rua: String,
      numero: Number,
      complemento: String,
      bairro: String,
      cidade: String,
      estado: String,
      telefone: String,
      celular: String,
      nascimento: String,
    },
  },
};
</script>

<style scoped></style>
