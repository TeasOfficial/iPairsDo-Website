<template>
  <q-page class="flex flex-center m-bg">
    <center class="mainbox">
      <h3>漂流瓶 - Drift bottle</h3>
      <hr>
      <div>当前有 {{ totalOfBottle }} 只瓶子孤独地漂浮在海洋之上...</div>
      <div>
        但是呢！你有拯救他们的力量！
        <q-tooltip transition-show="flip-right" transition-hide="flip-left"
          style="font-size: 16px; background-color: white; color: black;" anchor="center middle" self="center middle">
          你是异世界勇者，为了战胜其他人的内心垃圾而存在()
        </q-tooltip>
      </div>
      <div>点击下方按钮捞一个 <span>
          “漂流瓶”
          <q-tooltip transition-show="flip-right" transition-hide="flip-left"
            style="font-size: 16px; background-color: white; color: black;" anchor="center middle" self="center middle">
            别人的垃圾桶
          </q-tooltip>
        </span> 试试吧~</div>
      <div class="q-pa-md q-gutter-sm">
        <q-btn push rounded color="primary" label="捞一个！" @click="catchABottle()" />
        <q-btn push rounded color="primary" label="精准打击！" @click="catchbottlewithid = true" />
        <q-btn push rounded color="primary" label="丢一个！" @click="throwbottle = true" />
      </div>
      <div class="q-gutter-sm">
        <q-btn flat style="color: #FF0080" label="感谢名单" @click="spthanks = true" />
        <q-btn flat style="color: #FF0800" label="更新履历" @click="showUpdate()" />
        <q-btn flat style="color: #0080FF" label="GitHub" href="https://github.com/TeasOfficial/iPairsDo-Website"
          target="_blank" />
      </div>
    </center>
  </q-page>

  <q-dialog v-model="spthanks" position="top">
    <q-card>
      <q-card-section>
        <center>
          <h5>iPairsDo - 感谢名单</h5>
          <div style="font-size: 16px;">
            感谢以下小伙伴的支持，没有他们就不会有这个网站啦~
          </div>
          <div style="font-size: 12px;">
            按照赞助金额进行排序
          </div>
        </center>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div v-for="(k) in donator" :key="k">
          <nav>{{ k.name }} - <span>{{ k.value }} 元</span></nav>
          <nav style="font-size: 16px;" v-if="k.commit !== ''"><b>留言：{{ k.commit }}</b></nav>
          <nav style="font-size: 16px;" v-else><b>这位猪鼻懒死了，连留言都不愿意给我留！</b></nav>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="throwbottle" position="top">
    <q-card>
      <q-card-section>
        <h5>扔一个新的漂流瓶</h5>
        <div style="font-size: 16px;">
          目前仅支持文字漂流瓶
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input outlined v-model="author" label="用户名" input-style="font-size: 16px;" />
        <br>
        <div style="font-size: 14px;">输入你想要写入瓶内的悄悄话：</div>
        <q-input v-model="text" filled autogrow input-style="font-size: 16px;" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="取消" color="red" v-close-popup />
        <q-btn flat label="发呀的轰！" color="primary" @click="throwbottletosea" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="catchbottlewithid" position="top">
    <q-card>
      <q-card-section>
        <h5>捞指定的漂流瓶</h5>
        <div style="font-size: 16px;">
          我从商店购买到了一个高精度捞网，黑心老板收了我十万块钱（bushi
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input outlined v-model="bid" label="瓶子id" input-style="font-size: 16px;" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="取消" color="red" v-close-popup />
        <q-btn flat label="抓！" color="primary" @click="catchABottleById()" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="catchbottle" position="top">
    <q-card>
      <q-card-section>
        <h5>捞到了编号为 {{ catched.bid }} 的漂流瓶~</h5>
        <div style="font-size: 16px;">
          这个瓶子的主人是：<i>{{ catched.author }}</i>
        </div>
        <div style="font-size: 12px;">
          瓶子上刻着一行小字 <i>生产日期：{{ catched.time }}</i>
        </div>
      </q-card-section>
      <hr>
      <q-card-section class="q-pt-none" style="white-space: pre-line;">
        {{ catched.text }}
      </q-card-section>
      <hr>
      <q-card-actions align="right">
        <q-btn flat label="给你扔回去！" v-close-popup />
        <q-btn flat label="再捞一个！" color="purple" v-close-popup @click="catchABottle()" />
        <q-btn flat label="我也要扔！" color="primary" v-close-popup @click="throwbottle = true" />
      </q-card-actions>
    </q-card>
  </q-dialog>
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

.q-input {
  font-size: 16px;
}
</style>
<script>
import { laThSolid } from '@quasar/extras/line-awesome';
import { Notify } from 'quasar'
import { api } from 'src/boot/axios';
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      spthanks: ref(false),
      donator: [],
      throwbottle: ref(false),
      catchbottle: ref(false),
      catchbottlewithid: ref(false),
      author: ref("一位不愿透漏姓名的小可爱"),
      text: ref(""),
      totalOfBottle: "",
      catched: [],
      bid: ref("")
    }
  },
  methods: {
    throwbottletosea() {
      // console.log("===TEXT===", this.text)
      this.$api.post("/services/floatbottle/throw/", {
        "author": this.author,
        "text": this.text
      }).then(
        res => {
          if (res.data.code == 200) {
            Notify.create({
              message: "你的漂流瓶已经飘向了远方<br>期待有缘人将其打捞起...<br><br>你的漂流瓶ID是：" + res.data.bottleid,
              html: true,
              position: 'top-right',
              color: "blue-grey"
            })
            this.text = ""
            this.throwbottle = false
            this.refreshBottles()
          } else {
            Notify.create({
              position: 'top-right',
              type: 'negative',
              message: res.data.msg
            })
          }
        }
      ).catch(
        err => {
          Notify.create({
            position: 'top-right',
            type: 'negative',
            message: err
          })
        }
      )
    },
    refreshBottles() {
      this.$api.get("/services/getcolumn/").then(
        res => {
          res = res.data
          this.totalOfBottle = res.msg
        }
      )
    },
    catchABottle() {
      this.catchbottle = false
      this.$api.get("/services/floatbottle/catch/?rand=" + this.totalOfBottle).then(
        res => {
          // console.log(res)
          this.catched = res.data
          this.catchbottle = true
        }
      )
    },
    catchABottleById() {
      if (this.bid == "") {
        return Notify.create({
          position: 'top-right',
          type: 'negative',
          message: "不是哥们？我给你抓两条鱼吧？"
        })
      }
      if (isNaN(Number(this.bid))) {
        return Notify.create({
          position: 'top-right',
          type: 'negative',
          message: "不是哥们？我给你摘个星星吧？"
        })
      }
      if (!(Number(this.bid) % 1 === 0)) {
        return Notify.create({
          position: 'top-right',
          type: 'negative',
          message: "请输入整数！"
        })
      }
      this.catchbottlewithid = false
      this.$api.get("/services/floatbottle/catch/byId?rand=" + this.bid).then(
        res => {
          this.catched = res.data
          this.catchbottle = true
        }
      )
    },
    showUpdate() {
      Notify.create({
        message: "<div>2024-11-21 更新日志</div>" /
          "",
        html: true,
        position: 'top-right',
        color: "blue-grey"
      })
    }
  },
  mounted() {
    this.$api.get("/services/donators/donator.json").then(
      (res) => {
        res = res.data
        this.donator = res
      }
    )
    this.refreshBottles()
  }
});
</script>
