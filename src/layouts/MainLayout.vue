<template>
  <q-layout view="lhr lpR lfr">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer reveal>
      <center>
        Powered by <a href="#">NekoGan</a>
        <br>
        <div class="alert">发现违规内容请及时举报！我们将在第一时间删除相关内容！</div>
      </center>
    </q-footer>
  </q-layout>

</template>

<script setup>
// import { ref } from 'vue'
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
