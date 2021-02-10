<style lang="scss">
.search-input {
  display: flex;
  height: 30px;
}

.opt-search {
  display: flex;
  justify-content: flex-start;
  border: 1px rgb(165, 123, 212) solid;
  border-right: transparent;
  border-radius: 5px 0 0 5px;
  padding: 2px;

  .opt-svg {
    width: 24px;
    height: 24px;
  }

  .opt-input {
    border: transparent;
    cursor: auto;
  }
}

.opt-s-btn {
  margin-right: 25px;
  border: transparent;
  color: #fff;
  background-color: rgb(165, 123, 212);
  padding: 0 24px;
  border-radius: 0 5px 5px 0;
  width: 80px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(135, 68, 212);
  }
}
</style>
<template>
  <div class="search-input">
    <div class="opt-search">
      <div class="opt-svg">
        <svg
          t="1596014097934"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2198"
        >
          <path
            d="M863.38 825.09L714.17 675.88c48.01-57.12 74.18-128.58 74.18-204.08 0-84.89-33.06-164.7-93.08-224.72C635.24 187.05 555.44 154 470.55 154c-84.89 0-164.7 33.06-224.72 93.08s-93.08 139.83-93.08 224.72 33.06 164.7 93.08 224.72 139.83 93.08 224.72 93.08c76.22 0 148.33-26.67 205.72-75.56l149.08 149.08a26.805 26.805 0 0 0 19.01 7.88c6.88 0 13.76-2.63 19.01-7.88a26.805 26.805 0 0 0 7.88-19.01c0-6.89-2.62-13.77-7.87-19.02zM206.53 471.8c0-145.58 118.44-264.02 264.02-264.02 145.58 0 264.02 118.44 264.02 264.02S616.13 735.82 470.55 735.82c-145.58 0-264.02-118.44-264.02-264.02z"
            fill="#333333"
            p-id="2199"
          ></path>
        </svg>
      </div>
      <input
        class="opt-input"
        type="text"
        :placeholder="placeholder"
        v-model="value"
      />
    </div>
    <input class="opt-s-btn" type="button" value="搜索" @click="search" />
  </div>
</template>
<script>
export default {
  name: "Searchinput",
  props: ["placeholder"],
  data() {
    return {
      value: "",
    };
  },
  methods: {
    search() {
      this.$emit("toDad", this.value);
    },
  },
};
</script>