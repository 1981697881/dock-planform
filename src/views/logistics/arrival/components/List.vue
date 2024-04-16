<template>
  <div>
    <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      type
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @row-click="rowClick"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getEntryList, deleteSizeColor, synchronizationEntry } from '@/api/logistics/index'
import List from '@/components/List'

export default {
  components: {
    List
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  data() {
    return {
      loading: false,
      visible: false,
      list: {},
      fid: null,
      type: null,
      columns: [
        { text: '入库单id', name: 'entryId' },
        { text: '入库单号', name: 'entryCode' },
        { text: '物资名称', name: 'materialName' },
        { text: '规格', name: 'specification' },
        { text: '单位', name: 'unit' },
        { text: '数量', name: 'quantity' },
        { text: '金额', name: 'amountMoney' },
        { text: '税额', name: 'amountTax' },
        { text: '价税合计', name: 'amountTotal' },
        { text: '冲红价税合计', name: 'writeoffTotal' },
        { text: '入库单类型', name: 'entryType' },
      ]
    }
  },
  methods: {
    ExportData() {
      import('@/vendor/Export2Excel').then(excel => {
        // 表格的表头列表
        const columns = this.columns
        const tHeader = []
        // 与表头相对应的数据里边的字段
        const filterVal = []
        columns.forEach((item, index) => {
          tHeader.push(item.text)
          filterVal.push(item.name)
        })
        const list = this.list.records
        const data = this.formatJson(filterVal, list);
        // 这里还是使用export_json_to_excel方法比较好，方便操作数据
        excel.export_json_to_excel(tHeader,data,'产品信息')
      })
    },
    formatJson(filter, jsonDate){
      return jsonDate.map(v =>
        filter.map(j => {
          return v[j]
        })
      )
    },
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.$emit('uploadList')
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val
      this.$emit('uploadList')
    },
    Delivery(val) {
      deleteSizeColor(val).then(res => {
        if(res.flag) {
          this.$store.dispatch('list/setClickData', '');
          this.$emit('uploadList')
        }
      });
    },
    uploadPr(val) {
      this.fetchData(val, {
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    dblclick(obj) {
      this.$emit('showDialog', obj.row)
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch('list/setClickData', obj.row)
    },
    syncList(){
      this.loading = true
      let userData = typeof this.userInfo == "string"? JSON.parse(this.userInfo) : this.userInfo
      let params= {
        publicKey: userData.FTargetKey,
        nwUrl: userData.FK3CloudUrl,
        secret: userData.FSessionkey,
        username: userData.FAppkey,
        password: userData.FSecret
      }
      synchronizationEntry(params).then(res => {
        if(res.flag){
          this.$emit('uploadList')
        }
        this.loading = false
      })
    },
    fetchData(val, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true
      getEntryList(data, val).then(res => {
        this.loading = false
        this.list = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 250px);
}
</style>
