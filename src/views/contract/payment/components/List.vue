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
import { getPaymentList, updatePayment, synchronizationPayment } from '@/api/contract/index'
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
        { text: '合同款项id', name: 'cn' },
        { text: '款项名称', name: 'eur' },
        { text: '款项类型', name: 'usn' },
        { text: '金额', name: 'usw' },
        { text: '税额', name: 'usw' },
        { text: '价税合计', name: 'usw' },
        { text: '状态', name: 'usw' },
        { text: '实际付款比例', name: 'usw' },
        { text: '实际付款金额', name: 'usw' },
        { text: '票据号码', name: 'usw' },
        { text: '票据类型', name: 'usw' },
        { text: '开户行', name: 'usw' },
        { text: '开户行账号', name: 'usw' },
        { text: '开票单位', name: 'usw' },
        { text: '开票日期', name: 'usw' },
        { text: '入库物资id', name: 'usw' },
        { text: '入库单id', name: 'usw' },
        { text: '票据扫描附件', name: 'usw' },
        { text: '证明材料附件', name: 'usw' },
        { text: '其它附件', name: 'usw' },
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
      val.operation_type = 'del'
      updatePayment(val).then(res => {
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
        publicKey: userData.FSessionkey,
        secret: userData.FTargetKey,
        username: userData.FAppkey,
        password: userData.FSecret
      }
      synchronizationPayment(params).then(res => {
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
      getPaymentList(data, val).then(res => {
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
