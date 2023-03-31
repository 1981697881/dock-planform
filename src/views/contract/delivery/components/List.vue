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
import { getDistributionList, deleteSizeColor, synchronizationDistribution } from '@/api/contract/index'
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
        { text: '配送单ID', name: 'distributionId' },
        { text: '配送来源单', name: 'distributionCode' },
        { text: '单据类型', name: 'distributionType' },
        { text: '制单时间/生成配送单时间', name: 'generationTime' },
        { text: '状态', name: 'distributionStatus' },
        { text: '收货联系人', name: 'receiver' },
        { text: '收货联系人电话', name: 'receiverNumber' },
        { text: '收货地址', name: 'receiverAddress' },
        { text: '发货联系人', name: 'sender' },
        { text: '发货联系电话', name: 'senderNumber' },
        { text: '发货地址', name: 'senderAddress' },
        { text: '承运单位名称', name: 'carrier' },
        { text: '运输车型', name: 'vehicleType' },
        { text: '运输车辆车牌号码', name: 'vehicleNumber' },
        { text: '运输车辆状况', name: 'vehicleStatus' },
        { text: '运输司机联系方式', name: 'driverNumber' },
        { text: '运输司机姓名', name: 'driverName' },
        { text: '承运商装运人员数量', name: 'loaderNum' },
        { text: '车次', name: 'departure' },
        { text: '发货时间', name: 'sendTime' },
        { text: '到货日期', name: 'arrivalTime' },
        { text: '备注', name: 'remarks' },
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
      let params= {
        publicKey: this.userInfo.FSessionkey,
        secret: this.userInfo.FTargetKey,
        username: this.userInfo.FAppkey,
        password: this.userInfo.FSecret
      }
      synchronizationDistribution(params).then(res => {
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
      getDistributionList(data, val).then(res => {
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
