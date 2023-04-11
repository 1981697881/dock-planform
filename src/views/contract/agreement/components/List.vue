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
import { getProjectList, synchronizationProject } from '@/api/contract/index'
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
        { text: '合同id', name: 'contractId' },
        { text: '合同名称', name: 'contractName' },
        { text: '合同编号', name: 'contractCode' },
        { text: '甲方单位名称', name: 'unitName' },
        { text: '甲方单位联系人', name: 'contactsName' },
        { text: '甲方单位联系电话', name: 'contactsPhone' },
        { text: '合同类别', name: 'contractType' },
        { text: '项目编号', name: 'projectCode' },
        { text: '项目名称', name: 'projectName' },
        { text: '合同金额', name: 'contractAmount' },
        { text: '预付款支付比例', name: 'prepaymentRatio' },
        { text: '入库成品库存支付比例', name: 'prepaymentRatio' },
        { text: '到货款支付比例', name: 'paymentArrivalRatio' },
        { text: '质保金支付比例', name: 'bondRatio' },
        { text: '采购单号', name: 'purchaseId' },
        { text: '供应期限', name: 'supplyDuration' },
        { text: '中标比例', name: 'biddingProportion' },
        { text: '定额分配量', name: 'quotaAllocation' },
        { text: '技术协议号', name: 'technicalAgreementNumber' },
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
      let userData = JSON.parse(this.userInfo)
      let params= {
        publicKey: userData.FSessionkey,
        secret: userData.FTargetKey,
        username: userData.FAppkey,
        password: userData.FSecret
      }
      synchronizationProject(params).then(res => {
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
      getProjectList(data, val).then(res => {
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
