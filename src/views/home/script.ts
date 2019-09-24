import { Component, Vue, Prop } from "vue-property-decorator"

@Component({})
export default class Home extends Vue {
  @Prop({ default: "" }) public tableName: string
}
