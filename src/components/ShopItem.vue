<template>
  <div class="shop-item-page">
    <div class="box-container" @click="handleShop">
      <div class="shop-img">
        <img :src="shop.image" />
      </div>
      <div class="shop-info">
        <div class="title">{{ shop.title }}</div>
        <div class="tag_warp">
          <div class="sdby">
            {{ level_map[shop.level] }}
          </div>
          <div class="sdby">{{ sort_map[shop.sort] }}</div>
        </div>
        <div class="price">
          <span>¥{{ shop.price }}</span>
          <span class="browse-num">浏览量:{{ shop.browse_num }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "shop-item-page",
  props: {
    shop: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters("global", ["sort_map", "level_map"]),
  },
  methods: {
    handleShop() {
      this.$emit("info", { ...this.shop })
    },
  },
}
</script>

<style lang="less" scoped>
.shop-item-page {
  .box-container {
    width: 200px;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      .shop-img {
        img {
          transform: scale(1.2);
        }
      }
    }
    .shop-img {
      height: 220px;
      width: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.5s ease;
        border: none;
      }
    }
    .shop-info {
      box-sizing: border-box;
      width: 100%;
      border: 1px solid #c9c9c9;
      border-top: none;
      .title {
        line-height: 18px;
        padding: 8px 10px 0;
        white-space: nowrap;
        height: 18px;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #666;
      }
      .tag_warp {
        display: flex;
        margin: 8px 10px 0;
        height: 20px;
        .sdby {
          color: #fe7725;
          border: 1px solid #ff6000;
          display: inline;
          margin-right: 2px;
          padding: 0 2px;
        }
      }

      .price {
        display: flex;
        justify-content: space-between;
        margin: 8px 10px 4px;
        font-size: 20px;
        font-family: arial;
        line-height: 20px;
        color: #ff7300;
        overflow: hidden;
        white-space: nowrap;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        .browse-num {
          font-size: 12px;
          color: #c9c9c9;
        }
      }
    }
  }
}
</style>
