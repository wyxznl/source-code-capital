<template>
  <el-form ref="form" :model="form" label-width="180px">
    <el-form-item label="待选人员" label-position="left">
      <select-people v-model="form.selectedPeople"></select-people>
    </el-form-item>
  </el-form>
</template>
<script>
import SelectPeople from '../components/SelectPeople'
export default {
  components: {
    SelectPeople
  },
  data () {
    return {
      form: {
        selectedPeople: [2, 3, 5, 6] // 初始选中人员id数组
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
