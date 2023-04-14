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
    <!--<div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>-->
  </div>
</template>

<script>import {getProjectplanList} from '@/api/contract/index'
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
        { text: '生产编号', name: 'productionCode' },
        { text: '合同编号', name: 'contractCode'},
        { text: '合同交货期', name: 'deliveryDate' },
        { text: '当前生效的交货日期', name: 'effDeliveryDate'},
        { text: '生产安排日期', name: 'plan'},
        { text: '确认状态', name: 'confirmationStatus'}
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
      getProjectplanList(data, val).then(res => {
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
