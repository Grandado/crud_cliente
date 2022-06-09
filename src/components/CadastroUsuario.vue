<template>
  <!-- <Dialog
    v-model:visible="display"
    :style="{ width: '450px' }"
    :modal="true"
    class="p-fluid"
  >
  </Dialog> -->
  <Formulario :dados="cliente" />
</template>

<script>
import Formulario from './forms/Fomulario.vue';
export default {
  components: { Formulario },
  data() {
    return {
      display: false,
      dados: {
        nome: '',
        email: '',
        cpf: null,
        cep: null,
        rua: '',
        numero: null,
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        telefone: null,
        celular: null,
        nascimento: '',
      },
    };
  },
};
</script>
