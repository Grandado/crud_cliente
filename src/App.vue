<template>
  <div>
    <Menubar :model="items">
      <template #start>
        <img src="img/primevue-logo-light.svg" alt="" />
      </template>
    </Menubar>
    <div id="view">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          to: '/',
        },
        /* {
          label: 'Cadastrar',
          icon: 'pi pi-fw pi-user-plus',
          to: '/cadastro',
        }, */
      ],
    };
  },
};
</script>

<style>
body {
  background-color: #eff3f8;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.p-menubar {
  background-color: #0b4064;
  border-radius: 0;
  border: 0;
}

.p-menubar
  .p-menubar-root-list
  > .p-menuitem
  > .p-menuitem-link
  .p-menuitem-text,
.p-menubar
  .p-menubar-root-list
  > .p-menuitem
  > .p-menuitem-link
  .p-menuitem-icon {
  color: #ffffff;
}

.p-calendar .p-inputtext,
span.p-dropdown-label.p-inputtext.p-placeholder,
span.p-dropdown-label.p-inputtext,
.p-inputnumber-input {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.p-tabmenu {
  padding: 0 0;
}

#view {
  padding: 30px;
}

.p-tabmenu-nav {
  place-content: space-evenly;
}

.p-panel .p-panel-header {
  font-weight: 600;
  font-size: large;
  background: #f8f9fa;
  color: #343a40;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}

.p-dialog .p-dialog-header {
  color: var(--gray-800);
  background-color: var(--surface-ground);
  padding: 0.5rem 1.5rem;
  border-bottom: solid 1px var(--surface-300);
}

.p-dialog .tabela-cadastro {
  padding-top: 1rem;
}

.p-dialog label {
  font-weight: bold;
  color: #3f51b5;
}
.p-dialog .p-inputtext {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 0.75rem;
}
</style>
