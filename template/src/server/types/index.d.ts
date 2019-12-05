import Vue from "vue";
import { moduleDemo } from "./demo";
interface api extends moduleDemo {}
declare module "vue/types/vue" {
  interface Vue {
    /** 接口请求方法集合 */
    $api: api;
  }
}
