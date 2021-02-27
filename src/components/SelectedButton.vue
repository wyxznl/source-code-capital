<template>
  <div :class="['con', curIsSelected ? 'selected': '']" @click="changeStatus">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      curIsSelected: this.value
    }
  },
  watch: {
    value (val) {
      this.curIsSelected = val
    }
  },
  methods: {
    changeStatus (val) {
      this.curIsSelected = !this.curIsSelected
      this.$emit('input', this.curIsSelected)
    }
  }
}
</script>

<style lang="css" scoped>
.con{
  display: inline-block;
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  line-height: 1;
  white-space: nowrap;
  text-align: center;
  margin-right: 10px;
  cursor: pointer;
}
.selected{
  background-color: #409eff;
  color: #fff;
}
</style>
