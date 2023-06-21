import Vue from "vue";
import App from "./App.vue";
import {
  Upload,
  Button,
  Message,
  Loading,
  Row,
  Col,
  Tabs,
  TabPane,
  Footer,
  Main,
  Header,
} from "element-ui";

Vue.config.productionTip = false;
Vue.component(Upload.name, Upload);
Vue.component(Button.name, Button);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);
Vue.component(Footer.name, Footer);
Vue.component(Main.name, Main);
Vue.component(Header.name, Header);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
