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
        { text: '物资id', name: 'materialId' },
        { text: '项目名称', name: 'projectName'},
        { text: '项目编号', name: 'projectCode'},
        { text: '物资类型', name: ''},
        { text: '物资名称', name: 'materialName'},
        { text: '规格', name: 'specification'},
        { text: '单位', name: 'unit'},
        { text: '本次配送数量', name: ''},
      ],
    }
  },
  mounted() {
     this.fetchData()
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
