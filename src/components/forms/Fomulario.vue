<template>
  <form>
    <div class="p-fluid formgrid grid">
      <div class="field col-12">
        <label>Nome</label>
        <InputText v-model="dados.nome" />
      </div>

      <div class="field col-12 md:col-6">
        <label for="email">E-mail</label>
        <span class="p-input-icon-right">
          <i class="pi pi-envelope" />
          <InputText
            id="email"
            v-model="dados.email"
            placeholder="email@endereco.com"
          />
        </span>
      </div>

      <div class="field col-6 md:col-3">
        <label>Telefone</label>
        <span class="p-input-icon-right">
          <i class="pi pi-phone" />
          <InputMask
            mask="(99) 9999-9999"
            placeholder="(__) ____-____"
            v-model="dados.telefone"
            unmask
          />
        </span>
      </div>

      <div class="field col-6 md:col-3 sm:col-4">
        <label>Celular</label>
        <span class="p-input-icon-right">
          <i class="pi pi-mobile" />
          <InputMask
            mask="(99) 99999-9999"
            placeholder="(__) _____-____"
            v-model="dados.celular"
            unmask
          />
        </span>
      </div>

      <div class="field col-6 md:col-3 sm:col-4">
        <label>CPF</label>
        <InputMask
          mask="999.999.999-99"
          placeholder="___.___.___-__"
          v-model="dados.cpf"
          unmask
          autoClear
        />
      </div>

      <div class="field col-6 md:col-3">
        <label>CEP</label>
        <InputMask
          mask="99999-999"
          placeholder="_____-___"
          unmask
          v-model="dados.cep"
        />
      </div>

      <div class="field col-12 md:col-4">
        <label>Endereço</label>
        <InputText v-model="dados.rua" />
      </div>

      <div class="field col-3 md:col-2">
        <label>Numero</label>
        <InputNumber v-model="dados.numero" />
      </div>

      <div class="field col-9 md:col-3">
        <label>Complemento</label>
        <InputText v-model="dados.complemento" placeholder="Ap, Bloco..." />
      </div>

      <div class="field col-12 md:col-3">
        <label>Bairro</label>
        <InputText v-model="dados.bairro" />
      </div>

      <div class="field col-6 md:col-3">
        <label>Estado</label>
        <Dropdown
          v-model="dados.estado"
          :options="estados"
          placeholder="Selecione o Estado"
          optionLabel="name"
          optionValue="code"
          @change="preencherCidades($event.value)"
        />
      </div>

      <div class="field col-6 md:col-3">
        <label>Cidade</label>
        <Dropdown
          v-model="dados.cidade"
          :options="cidades"
          placeholder="Selecione a Cidade"
          optionLabel="name"
          optionValue="name"
        />
      </div>

      <div class="field col-12 md:col-6">
        <label>Data de Nascimento</label>
        <Calendar v-model="dados.nascimento" :showIcon="true" />
      </div>

      <div class="field col-3">
        <Button label="Salvar" class="p-button-raised p-button-success mt-4" />
      </div>
      <div class="field col-3">
        <Button
          label="Limpar"
          class="p-button-raised p-button-warning mt-4"
          @click="limparFormulario"
        />
      </div>
      <pre>{{ dados }}</pre>
    </div>
  </form>
</template>

<script>
import EstadosService from '../../service/EstadosService';
import CidadesService from '../../service/CidadesService';

export default {
  name: 'Formulario',
  props: {
    dados: {
      nome: String,
      email: String,
      cpf: Number,
      cep: Number,
      rua: String,
      numero: Number,
      complemento: String,
      bairro: String,
      cidade: String,
      estado: String,
      telefone: Number,
      celular: Number,
      nascimento: Date,
    },
  },
  estadosService: null,
  cidadesService: null,
  data() {
    return {
      estados: null,
      cidades: null,
    };
  },
  created() {
    this.estadosService = new EstadosService();
    this.cidadesService = new CidadesService();
  },
  mounted() {
    this.estadosService.getEstados().then((data) => (this.estados = data));
  },
  methods: {
    preencherCidades(id) {
      const id_estado = JSON.parse(JSON.stringify(this.estados)).filter((e) => {
        return e.code == id;
      })[0].id;

      this.cidadesService
        .getCidades()
        .then(
          (data) => (this.cidades = data.filter((e) => e.code == id_estado))
        );
    },
    limparFormulario() {},
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
  color: #3f51b5;
}
.p-inputtext {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 0.75rem;
}
</style>
