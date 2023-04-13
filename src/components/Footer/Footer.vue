<template>
  <div class="footer_container">
    <div class="footer_content">
      <div class="footer_logo footer-content-column">
        <div class="logo-container">
          <img src="../../assets/logo.png" alt="" />
          <div class="logo-text">
            <p class="text1">次元视觉</p>
            <p class="text2">
              Mushroom stick contamination identification system
            </p>
          </div>
        </div>
        <h2>© 2020-2021 少年先疯队&nbsp;科技有限公司</h2>
        <!-- <h2>X公网安备 xxxxxxxxxxxxxx号 I ICP备xxxxxxxx号-1</h2> -->
      </div>
      <div class="about_us footer-content-column">
        <h2>关于我们</h2>
        <ul class="about_list">
          <li>
            <router-link to="/about" target="_blank">介绍</router-link>
          </li>
        </ul>
      </div>
      <div class="contact_us footer-content-column">
        <h2>联系我们</h2>
        <ul class="contact_list">
          <li v-for="(item, index) in contactList" :key="index">
            <a :href="'mailto:' + item.email">{{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div class="focus_us footer-content-column">
        <h2>实时动态与招聘信息，扫码关注我们</h2>
        <div class="media"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const contactList = ref([
  {
    name: "媒体问询",
    email: "aerowangue@126.com",
  },
  {
    name: "招聘相关",
    email: "aerowangue@126.com",
  },
  {
    name: "商务合作",
    email: "aerowangue@126.com",
  },
  {
    name: "广告相关",
    email: "aerowangue@126.com",
  },
]);
</script>
<style lang="less" scoped>
.footer_container {
  width: 100%;
  background: #1f2329;
  margin-top: 50px;
  padding-bottom: 60px;
}

.footer_content {
  max-width: 1440px;
  color: #fff;
  margin: 0 auto;
  padding: 69px 0 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  h2 {
    font-size: 14px;
    line-height: 22px;
    margin: 4px 0;
    color: #7b7e81;
  }

  .footer-content-column {
    flex: 1 1;
    color: #d2d3d4;
    position: relative;
    text-align: center;

    h2 {
      margin-bottom: 18px;
      font-size: 16px;
      font-weight: bold;
    }

    .about_list,
    .contact_list {
      text-align: center;
      font-size: 14px;
      line-height: 22px;

      li {
        margin-bottom: 15px;
      }

      a {
        color: #d2d3d4;
      }
    }
  }

  .about_us {
    max-width: 202px;
  }

  .contact_us {
    max-width: 202px;
  }

  .focus_us {
    text-align: left;
    padding-left: 73px;

    .media {
      margin-top: 18px;
      display: flex;
    }

    span {
      margin-right: 18px;
      flex: 0 0 auto;
    }

    img {
      width: 32px;
    }

    .weixin img {
      width: 38px;
      position: relative;
      top: -2px;
    }

    h2 {
      text-align: left;
      font-size: 14px;
      font-weight: normal;
      margin-bottom: 4px;
    }
  }

  .footer_logo {
    margin-left: 96px;
    height: 55px;
    text-align: left;
    max-width: 382px;
    min-width: 350px;

    h2 {
      font-size: 14px;
      font-weight: normal;
      margin-bottom: 4px;
    }

    .logo-container {
      display: flex;
      margin-bottom: 9px;

      img {
        height: 50px;
      }

      .logo-text {
        margin-left: 15px;
        position: relative;
        bottom: -6px;
      }

      .text1 {
        font-size: 21px;
        font-weight: bold;
        margin: 0;
      }

      .text2 {
        font-size: 12px;
        margin: 0;
      }
    }
  }
}

@media only screen and (max-width: 991px) {
  .footer_content {
    flex-direction: column;

    .footer-content-column {
      text-align: center;
      margin: 0 auto 0;

      h2 {
        text-align: center;
      }

      padding-left: 0;
    }

    .focus_us div:last-of-type > span {
      margin-right: 0;
    }

    .media {
      justify-content: center;
    }

    .logo-container {
      justify-content: center;
      text-align: left;
    }
  }
}

.qr_popover {
  width: 100%;
  text-align: center;

  img {
    width: 130px;
    height: 130px;
    margin-bottom: 10px;
  }
}
</style>
