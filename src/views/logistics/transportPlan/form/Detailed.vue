<template>
  <div style="padding-bottom: 50px">
    <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      @handle-size="handleSize"
      @handle-current="handleCurrent"
    />
  </div>
</template>

<script>import {getMaterialList} from '@/api/contract/index'
import List from '@/components/List'
export default {
  components: {
    List
  },
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      columns: [
        { text: '配送任务单明细id', name: 'gpName' },
        { text: '配送单id', name: 'gpLevel'},
        { text: '单项工程id', name: 'isDel' },
        { text: '单项工程名称', name: 'gpId'},
        { text: '项目id', name: 'gpId'},
        { text: '项目名称', name: 'gpId'},
        { text: '项目编号', name: 'gpId'},
        { text: '物质品类编号', name: 'gpId'},
        { text: '物质名称', name: 'gpId'},
        { text: '规格型号', name: 'gpId'},
        { text: '计量单位', name: 'gpId'},
        { text: '计量单位名称', name: 'gpId'},
        { text: '配送数量', name: 'gpId'},
        { text: '长（厘米）', name: 'gpId'},
        { text: '宽（厘米）', name: 'gpId'},
        { text: '高（厘米）', name: 'gpId'},
        { text: '重量（kg）', name: 'gpId'},
        { text: '地市局（厂）', name: 'gpId'},
        { text: '备注', name: 'gpId'},
      ],
    }
  },
  mounted() {
    /*this.fetchData()*/
  },
  methods: {
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.fetchData()
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val
      this.fetchData()
    },
    fetchData(val={}, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true
      getMaterialList(data, val).then(res => {
        this.loading = false
        this.list = res.data
      })
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          createSizeColor(this.form).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .list-main {
    height: calc(100vh/3);
  }
</style>
