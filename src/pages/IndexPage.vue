<template>
  <q-page class="flex flex-center m-bg">
    <center class="mainbox">
      <h3>还没想好</h3>
      <hr>
      <div>不仅没想好，也没做完！</div>
      <div>但是呢！</div>
      <div>点击下方按钮捞一个 <span>
          “漂流瓶”
          <q-tooltip transition-show="flip-right" transition-hide="flip-left"
            style="font-size: 16px; background-color: white; color: black;" anchor="center middle" self="center middle">
            读作：提示框
          </q-tooltip>
        </span> 试试吧~</div>
      <div class="q-pa-md q-gutter-sm">
        <q-btn push rounded color="primary" label="捞一个！" @click="showNotif" />
        <q-btn push rounded color="primary" label="丢一个！" @click="showNotif" />
      </div>
    </center>
  </q-page>
</template>
<style lang="scss" scoped>
.mainbox {
  padding: 20px;
  background-color: white;
  color: black;
  border-radius: 32px;
  max-width: 75vw;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  padding: 0;
  margin: 0;
}
</style>
<script>
import { Notify } from 'quasar'
import { defineComponent } from 'vue'
export default defineComponent({
  name: "IndexPage",
  data() {
    return {

    }
  },
  methods: {
    showNotif() {
      Notify.create({
        message: '还没做后端呢 >.<',
        html: true,
        position: 'top-right',
        color: "blue-grey"
      })
    }
  }
});
</script>
