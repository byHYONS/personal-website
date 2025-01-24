// importo il metodo reactive:
import { reactive } from "vue";

export const store = reactive({
  text: "Hello World!",

  state: {
    overlayClass: "",
  },

  // setOvelayClass(newClass) {
  //   this.state.overlayClass = newClass;
  // },
});
