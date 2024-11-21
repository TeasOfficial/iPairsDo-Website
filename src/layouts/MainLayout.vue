<template>
  <q-layout view="lhr lpR lfr">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer reveal>
      <center>
        Powered by <a @click="cocacola">NekoGan</a> - v{{ $version }}
        <br>
        <div class="alert">发现违规内容请及时举报，避免网站被封禁（举报QQ：25709143）</div>
      </center>
    </q-footer>
  </q-layout>

</template>

<script>
import { Notify } from 'quasar'
import { defineComponent } from 'vue'

export default defineComponent({
  name: "MainLayout",
  methods: {
    cocacola() {
      Notify.create({
        message: '<video src="https://pan.nekogan.com/13271450" autoplay/>',
        html: true,
        position: 'top-right',
        color: "blue-grey",
        timeout: 2500
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.q-footer {
  background: #3922aa;
  color: white;
}

a {
  color: white;
  text-decoration: none;
  font-style: oblique 5deg;
}

.alert {
  font-size: 14px;
}
</style>
