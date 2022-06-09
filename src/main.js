import 'primeflex/primeflex.css';
import 'primevue/resources/themes/md-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import StyleClass from 'primevue/styleclass';
import Menubar from 'primevue/menubar';

import TabMenu from 'primevue/tabmenu';
import Paginator from 'primevue/paginator';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import InputMask from 'primevue/inputmask';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';
import Tooltip from 'primevue/tooltip';
import Panel from 'primevue/panel';
import Card from 'primevue/card';

const app = createApp(App);

app.use(PrimeVue, {
  locale: {
    dayNames: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    monthNamesShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    today: 'Hoje',
    firstDayOfWeek: 0,
    dateFormat: 'dd/mm/yy',
    emptyFilterMessage: 'Nenhum resultado encontrado!',
    emptyMessage: 'Opções indisponiveis!',
  },
});
app.use(router);

app.directive('styleclass', StyleClass);
app.directive('tooltip', Tooltip);

app.component('Card', Card);
app.component('Panel', Panel);
app.component('TabMenu', TabMenu);
app.component('Menubar', Menubar);
app.component('Dialog', Dialog);
app.component('Paginator', Paginator);
app.component('Calendar', Calendar);
app.component('InputText', InputText);
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('InputMask', InputMask);
app.component('Dropdown', Dropdown);
app.component('InputNumber', InputNumber);

app.mount('#app');
