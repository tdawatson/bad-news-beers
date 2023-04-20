import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import {AddToCalendarButton} from 'add-to-calendar-button';

const app = createApp(App).use(router);

app.component('AddToCalendarButton', AddToCalendarButton);

app.mount('#app');
