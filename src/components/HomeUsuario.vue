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
                @click="excluirCliente(slotProps.data)"
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
      <div class="p-fluid formgrid grid tabela-cadastro">
        <div class="field col-12">
          <label>Nome</label>
          <InputText v-model="cliente.nome" />
        </div>

        <div class="field col-12 md:col-6">
          <label for="email">E-mail</label>
          <span class="p-input-icon-right">
            <i class="pi pi-envelope" />
            <InputText
              id="email"
              v-model="cliente.email"
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
              v-model="cliente.telefone"
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
              v-model="cliente.celular"
              unmask
            />
          </span>
        </div>

        <div class="field col-6 md:col-3 sm:col-4">
          <label>CPF</label>
          <InputMask
            mask="999.999.999-99"
            placeholder="___.___.___-__"
            v-model="cliente.cpf"
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
            v-model="cliente.cep"
          />
        </div>

        <div class="field col-12 md:col-4">
          <label>Endereço</label>
          <InputText v-model="cliente.rua" />
        </div>

        <div class="field col-3 md:col-2">
          <label>Numero</label>
          <InputNumber v-model="cliente.numero" />
        </div>

        <div class="field col-9 md:col-3">
          <label>Complemento</label>
          <InputText v-model="cliente.complemento" placeholder="Ap, Bloco..." />
        </div>

        <div class="field col-12 md:col-3">
          <label>Bairro</label>
          <InputText v-model="cliente.bairro" />
        </div>

        <div class="field col-6 md:col-3">
          <label>Estado</label>
          <Dropdown
            v-model="cliente.estado"
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
            v-model="cliente.cidade"
            :options="cidades"
            placeholder="Selecione a Cidade"
            optionLabel="name"
            optionValue="name"
          />
        </div>

        <div class="field col-12 md:col-6">
          <label>Data de Nascimento</label>
          <Calendar v-model="cliente.nascimento" :showIcon="true" />
        </div>

        <!-- <div class="field col-3">
          <Button
            label="Salvar"
            class="p-button-raised p-button-success mt-4"
          />
        </div>
        <div class="field col-3">
          <Button
            label="Limpar"
            class="p-button-raised p-button-warning mt-4"
            @click="limparFormulario"
          />
        </div> -->
      </div>
      <template #footer>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          class="p-button-raised p-button-danger"
          @click="fecharModal"
        />
        <Button
          label="Salvar"
          icon="pi pi-check"
          autofocus
          class="p-button-raised p-button-success"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import ClienteService from '../service/ClienteService';
import EstadosService from '../service/EstadosService';
import CidadesService from '../service/CidadesService';
/* import Formulario from './forms/Fomulario.vue'; */

export default {
  name: 'Home',
  /* components: { Formulario }, */
  estadosService: null,
  clienteService: null,
  cidadesService: null,
  data() {
    return {
      productDialog: false,
      clientes: null,
      cliente: {},
      clienteModal: false,
      submitted: false,
      estados: null,
      cidades: null,
    };
  },

  created() {
    this.clienteService = new ClienteService();
    this.estadosService = new EstadosService();
    this.cidadesService = new CidadesService();
  },

  mounted() {
    this.clienteService.getClientes().then((data) => (this.clientes = data));
    this.estadosService.getEstados().then((data) => (this.estados = data));
  },

  methods: {
    openNovo() {
      this.cliente = {};
      this.submitted = false;
      this.clienteModal = true;
    },
    fecharModal() {
      this.clienteModal = false;
      this.submitted = false;
    },
    editarCliente(cliente) {
      this.cliente = { ...cliente };
      this.clienteModal = true;
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
      this.cliente = {};
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
