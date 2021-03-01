<template>
  <div class="con">
    <div class="left">
      <el-tag
        class="tag"
        v-for="(item, index) in selectedPeopleList"
        :key="index"
        closable
        @close="delTag(index)">
        {{item.name}}
      </el-tag>
    </div>
    <div class="right">
      <el-popover
        placement="top"
        width="600"
        v-model="visible">
        <el-input
          class="search"
          placeholder="搜索"
          prefix-icon="el-icon-search"
          v-model="searchContent"
          @change="searchList"
          clearable>
        </el-input>
        <div style="display: flex;" v-if="curPeopleList.length">
          <SelectedButton v-model="item.selected" v-for="(item, index) in curPeopleList" :key="index">
            {{item.name}}
          </SelectedButton>
        </div>
        <div v-else>
          <span>暂无搜索结果，换个搜索词试试呢~</span>
        </div>
        <div style="text-align: right; margin: 0">
          <el-button type="primary" size="mini" @click="confirm">确定</el-button>
        </div>
        <el-button type="primary" slot="reference" icon="el-icon-edit" size="small" circle></el-button>
      </el-popover>
    </div>
  </div>
</template>

<script>
import SelectedButton from '../components/SelectedButton'
export default {
  name: '',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  components: {
    SelectedButton
  },
  watch: {
    visible (val) {
      if (val) {
        this.searchContent = '' // 打开弹窗，清空搜索词
        this.searchList() // 重新搜索列表
      }
    }
  },
  data () {
    return {
      allPeopleList: [], // 全部待选人员
      selectedPeopleList: [], // 已选人员列表
      curPeopleList: [], // 当前展示的人员列表
      visible: false, // popover是否展示
      searchContent: ''// 搜索内容
    }
  },
  created () {
    this.getAllPeopleList() // 获取全部待选人员
  },
  methods: {
    getAllPeopleList () {
      this.$http.get('/api/allpeople')
        .then((res) => {
          const {
            code,
            data
          } = res
          if (code === 0) {
          // 获取所有待选人员列表 和 搜索前展示的人员列表
            this.allPeopleList = this.curPeopleList = data.list.map(i => {
              return {
                ...i,
                selected: false
              }
            })
            // 筛选父组件传入的已选人员列表
            this.allPeopleList.map(i => {
              if (this.value.indexOf(i.id) > -1) {
                this.selectedPeopleList.push(i)
                i.selected = true
              }
            })
            console.log(this.selectedPeopleList, this.allPeopleList)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 删除标签
    delTag (index) {
      const curDeleteItem = this.selectedPeopleList.splice(index, 1)[0]
      this.$set(curDeleteItem, 'selected', false)
      this.sendSelectedId(this.selectedPeopleList) // 向父组件发送当前的已选id列表
    },
    // 确认当前选择的标签
    confirm () {
      this.visible = false
      this.selectedPeopleList = this.allPeopleList.filter(i => i.selected)
      this.sendSelectedId(this.selectedPeopleList)
    },
    // 发送当前选中的id
    sendSelectedId (list) {
      const selectedPeopleId = list.map(i => i.id)
      this.$emit('input', selectedPeopleId)
    },
    // 搜索后要展示的列表
    searchList (val) {
      if (val) {
        this.curPeopleList = this.allPeopleList.filter(i => {
          return i.name.includes(val)
        })
        return
      }
      this.curPeopleList = this.allPeopleList
    }
  }
}
</script>

<style lang="css" scoped>
.con{
  display: flex;
}
.tag{
  margin-right: 10px;
}
.right{
    margin-left: 20px;
  }
.search{
  margin-bottom: 20px;
}
</style>
