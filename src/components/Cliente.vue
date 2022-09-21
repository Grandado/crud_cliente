<template>
  <div id="tabela">
    <Panel header="Clientes">
      <template #icons>
        <Button
          id="btn-cadastro"
          label="Cadastrar"
          class="p-button-rounded"
          icon="pi pi-user-plus"
          @click="openNovo"
        />
      </template>
      <div class="card">
        <DataTable
          class="p-datatable-sm"
          :value="clientes"
          responsiveLayout="stack"
          breakpoint="960px"
          :paginator="true"
          :rows="10"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          currentPageReportTemplate="Usuários {first} até {last} de {totalRecords}"
        >
          <Column field="nome" header="Nome" :sortable="true"></Column>
          <Column field="cpf" header="CPF" :sortable="true"
            ><template #body="slotProps">
              {{ formatCPF(slotProps.data.cpf) }}
            </template></Column
          >
          <Column field="email" header="E-mail" :sortable="true"></Column>

          <Column :exportable="false">
            <template #body="slotProps">
              <Button
                icon="pi pi-info"
                class="p-button-rounded p-button-primary p-button-sm mr-1"
                v-tooltip.top="'Informações'"
                @click="infoCliente(slotProps.data)"
              />
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success p-button-sm mr-1"
                v-tooltip.top="'Editar'"
                @click="editarCliente(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-danger p-button-sm"
                v-tooltip.top="'Excluir'"
                @click="confirmarExcluirCliente(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </Panel>
    <Dialog
      header="Novo Cliente"
      v-model:visible="clienteModal"
      :breakpoints="{ '960px': '90vw', '640px': '100vw' }"
      :style="{ width: '75vw' }"
      :modal="true"
      :dismissableMask="true"
    >
      <!-- <Formulario :dados="cliente" /> -->
      <form @submit.prevent="handleSubmit(!v$.$invalid)">
        <div class="p-fluid formgrid grid tabela-cadastro">
          <div class="field col-12">
            <label
              for="input-nome"
              :class="{ 'p-error': v$.cliente.nome.$invalid && submitted }"
              >Nome*</label
            >
            <InputText
              id="input-nome"
              v-model="v$.cliente.nome.$model"
              :class="{ 'p-invalid': v$.cliente.nome.$invalid && submitted }"
            />
          </div>

          <div class="field col-12 md:col-6">
            <label
              for="email"
              :class="{ 'p-error': v$.cliente.email.$invalid && submitted }"
              >E-mail*</label
            >
            <span class="p-input-icon-right">
              <i class="pi pi-envelope" />
              <InputText
                id="email"
                v-model="v$.cliente.email.$model"
                :class="{ 'p-invalid': v$.cliente.email.$invalid && submitted }"
                aria-describedby="email-error"
                placeholder="email@endereco.com"
              />
            </span>
          </div>

          <div class="field col-6 md:col-3">
            <label
              :class="{ 'p-error': v$.cliente.telefone.$invalid && submitted }"
              >Telefone*</label
            >
            <span class="p-input-icon-right">
              <i class="pi pi-phone" />
              <InputMask
                mask="(99) 9999-9999"
                placeholder="(__) ____-____"
                v-model="v$.cliente.telefone.$model"
                unmask
                :class="{
                  'p-invalid': v$.cliente.telefone.$invalid && submitted,
                }"
              />
            </span>
          </div>

          <div class="field col-6 md:col-3 sm:col-4">
            <label
              :class="{ 'p-error': v$.cliente.celular.$invalid && submitted }"
              >Celular*</label
            >
            <span class="p-input-icon-right">
              <i class="pi pi-mobile" />
              <InputMask
                mask="(99) 99999-9999"
                placeholder="(__) _____-____"
                v-model="v$.cliente.celular.$model"
                :class="{
                  'p-invalid': v$.cliente.celular.$invalid && submitted,
                }"
                unmask
              />
            </span>
          </div>

          <div class="field col-6 md:col-3 sm:col-4">
            <label :class="{ 'p-error': v$.cliente.cpf.$invalid && submitted }"
              >CPF*</label
            >
            <InputMask
              mask="999.999.999-99"
              placeholder="___.___.___-__"
              v-model="v$.cliente.cpf.$model"
              :class="{
                'p-invalid': v$.cliente.cpf.$invalid && submitted,
              }"
              unmask
              autoClear
            />
          </div>

          <div class="field col-6 md:col-3">
            <label :class="{ 'p-error': v$.cliente.cep.$invalid && submitted }"
              >CEP*</label
            >
            <InputMask
              mask="99999-999"
              placeholder="_____-___"
              unmask
              v-model="v$.cliente.cep.$model"
              :class="{
                'p-invalid': v$.cliente.cep.$invalid && submitted,
              }"
            />
          </div>

          <div class="field col-12 md:col-4">
            <label :class="{ 'p-error': v$.cliente.rua.$invalid && submitted }"
              >Endereço*</label
            >
            <InputText
              v-model="v$.cliente.rua.$model"
              :class="{
                'p-invalid': v$.cliente.rua.$invalid && submitted,
              }"
            />
          </div>

          <div class="field col-3 md:col-2">
            <label>Numero</label>
            <InputNumber v-model="cliente.numero" />
          </div>

          <div class="field col-9 md:col-3">
            <label>Complemento</label>
            <InputText
              v-model="cliente.complemento"
              placeholder="Ap, Bloco..."
            />
          </div>

          <div class="field col-12 md:col-3">
            <label
              :class="{ 'p-error': v$.cliente.bairro.$invalid && submitted }"
              >Bairro*</label
            >
            <InputText
              v-model="v$.cliente.bairro.$model"
              :class="{
                'p-invalid': v$.cliente.bairro.$invalid && submitted,
              }"
            />
          </div>

          <div class="field col-6 md:col-3">
            <label
              :class="{ 'p-error': v$.cliente.estado.$invalid && submitted }"
              >Estado*</label
            >
            <Dropdown
              v-model="v$.cliente.estado.$model"
              :class="{
                'p-invalid': v$.cliente.estado.$invalid && submitted,
              }"
              :options="estados"
              placeholder="Selecione o Estado"
              optionLabel="name"
              optionValue="code"
              @change="preencherCidades($event.value)"
            />
          </div>

          <div class="field col-6 md:col-3">
            <label
              :class="{ 'p-error': v$.cliente.cidade.$invalid && submitted }"
              >Cidade*</label
            >
            <Dropdown
              v-model="v$.cliente.cidade.$model"
              :class="{
                'p-invalid': v$.cliente.cidade.$invalid && submitted,
              }"
              :options="cidades"
              placeholder="Selecione a Cidade"
              optionLabel="name"
              optionValue="name"
            />
          </div>

          <div class="field col-12 md:col-6">
            <label
              :class="{
                'p-error': v$.cliente.nascimento.$invalid && submitted,
              }"
              >Data de Nascimento*</label
            >
            <Calendar
              v-model="v$.cliente.nascimento.$model"
              :class="{
                'p-invalid': v$.cliente.nascimento.$invalid && submitted,
              }"
              :showIcon="true"
            />
          </div>
        </div>
      </form>
      <template #footer>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          class="p-button-raised p-button-danger"
          @click="fecharModal"
        />
        <Button
          label="Salvar"
          type="submit"
          icon="pi pi-check"
          class="p-button-raised p-button-success"
          @click="salvarCliente(!v$.$invalid)"
        />
      </template>
    </Dialog>

    <Dialog
      header="Informações"
      v-model:visible="infoModal"
      :breakpoints="{ '960px': '90vw', '640px': '100vw' }"
      :style="{ width: '50vw' }"
      :modal="true"
      :dismissableMask="true"
      @hide="infoModal = false"
    >
      <InfoCliente :cliente="infoDados" />
    </Dialog>

    <Dialog
      v-model:visible="excluirClienteModal"
      :style="{ width: '450px' }"
      header="Confirmação"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="cliente"
          >Deseja realmente excluir o cliente <b>{{ cliente.nome }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="Não"
          icon="pi pi-times"
          class="p-button-text"
          @click="excluirClienteModal = false"
        />
        <Button
          label="Sim"
          icon="pi pi-check"
          class="p-button-text"
          @click="excluirCliente"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { email, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

import ClienteService from '../service/ClienteService';
import EstadosService from '../service/EstadosService';
import CidadesService from '../service/CidadesService';

import InfoCliente from './ClienteInfo.vue';

export default {
  name: 'Home',
  estadosService: null,
  clienteService: null,
  cidadesService: null,
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      productDialog: false,
      clientes: null,
      cliente: {
        id: '',
        nome: '',
        email: '',
        cpf: '',
        cep: '',
        rua: '',
        numero: null,
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        telefone: '',
        celular: '',
        nascimento: '',
      },
      clienteModal: false,
      excluirClienteModal: false,
      infoModal: false,
      infoDados: {},
      submitted: false,
      editar: false,
      estados: null,
      cidades: null,
    };
  },

  components: { InfoCliente },

  validations() {
    return {
      cliente: {
        nome: {
          required,
        },
        email: {
          required,
          email,
        },
        telefone: {
          required,
        },
        celular: {
          required,
        },
        cpf: {
          required,
        },
        cep: {
          required,
        },
        rua: {
          required,
        },
        bairro: {
          required,
        },
        estado: {
          required,
        },
        cidade: {
          required,
        },
        nascimento: {
          required,
        },
      },
    };
  },

  created() {
    ClienteService.getClientes().then((res) => (this.clientes = res.data));
    this.estadosService = new EstadosService();
    this.cidadesService = new CidadesService();
  },

  mounted() {
    this.estadosService.getEstados().then((data) => (this.estados = data));
  },

  methods: {
    openNovo() {
      this.limparFormulario();
      this.submitted = false;
      this.clienteModal = true;
    },

    infoCliente(dados) {
      this.infoModal = true;
      dados.nascimento = new Date(dados.nascimento);
      this.infoDados = dados;
    },

    fecharModal() {
      this.clienteModal = false;
      this.submitted = false;
      this.limparFormulario();
    },

    editarCliente(cliente) {
      this.preencherCidades(cliente.estado);
      cliente.nascimento = new Date(cliente.nascimento);
      this.cliente = { ...cliente };
      this.clienteModal = true;
      this.editar = true;
    },

    confirmarExcluirCliente(cliente) {
      this.cliente = cliente;
      this.excluirClienteModal = true;
    },

    excluirCliente() {
      this.excluirClienteModal = false;
      ClienteService.excluirCliente({ id: this.cliente.id }).then(() => {
        this.limparFormulario();
        this.fecharModal();
        this.refreshClientes();
      });
    },

    salvarCliente(isFormValid) {
      this.submitted = true;
      if (!isFormValid) {
        return;
      }

      if (this.editar) {
        ClienteService.alterCliente(this.cliente)
          .then(() => {
            this.limparFormulario();
            this.fecharModal();
            this.refreshClientes();
          })
          .catch(console.log);
      } else {
        ClienteService.setCliente(this.cliente).then(() => {
          this.limparFormulario();
          this.fecharModal();
          this.refreshClientes();
        });
      }
    },

    formatCPF(valor) {
      return valor.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, '$1.$2.$3-$4');
    },

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

    limparFormulario() {
      this.cliente = {
        nome: '',
        email: '',
        cpf: '',
        cep: '',
        rua: '',
        numero: null,
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        telefone: '',
        celular: '',
        nascimento: '',
      };
      this.submitted = false;
    },

    refreshClientes() {
      ClienteService.getClientes().then((res) => (this.clientes = res.data));
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#btn-cadastro {
  background-color: #9e9e9e;
}
#btn-cadastro:hover {
  background-color: #757575;
}
.p-button.p-button-icon-only {
  width: 2rem;
  height: 2rem;
}
.card {
  padding-top: 1rem;
}
</style>
