<template>
  <div>
    <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @row-click="rowClick"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMaterialList, synchronization} from '@/api/contract/index'
import List from '@/components/List'
import Cookies from 'js-cookie'
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
        { text: '物资id', name: 'materialId' },
        { text: '物资编码', name: 'materialCode' },
        { text: '物资名称', name: 'materialName' },
        { text: '规格', name: 'specification' },
        { text: '单价', name: 'unitPrice' },
        { text: '金额', name: 'amountMoney' },
        { text: '税额', name: 'amountTax' },
        { text: '价税合计', name: 'amountTotal' },
        { text: '数量', name: 'quantity' },
        { text: '单位', name: 'unit' },
        { text: '合同交货期', name: 'deliveryDate' },
        { text: '项目编号', name: 'projectCode' },
        { text: '项目名称', name: 'projectName' },
        { text: '生效数量', name: 'effQuantity' },
        { text: '当前生效的交货日期', name: 'effDeliveryDate' },
        { text: '品类编号', name: 'categoryCode' },
        { text: '框架协议号', name: 'framworkNumber' },
        { text: '技术协议号', name: 'technicalNumber' },
        { text: '已排产数量', name: 'yetProductNumber' },
        { text: '已入库数量', name: 'yetStorageNumber' },
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
        publicKey: userData.FSessionkey,
        secret: userData.FTargetKey,
        username: userData.FAppkey,
        password: userData.FSecret
      }
      synchronization(params).then(res => {
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
      getMaterialList(data, val).then(res => {
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
