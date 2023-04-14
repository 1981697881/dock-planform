<template>
  <div class="app-list">
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @showDeliveryDialog="handlerDeliveryDialog" @showDetailedDialog="handlerDetailedDialog" @exportData="exportData" @del="delivery" @queryBtn="query" @uploadList="upload"/>
      </div>
      <list ref="list" @uploadList="uploadPage" @showDialog="handlerDialog"/>
    </div>
    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-if="visible"
      v-dialogDrag
      :width="'40%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
    </el-dialog>
  <el-dialog
      :visible.sync="visible2"
      title="配送明细"
      v-if="visible2"
      v-dialogDrag
      :width="'40%'"
      destroy-on-close
    >
      <detailed @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></detailed>
    </el-dialog>
<el-dialog
      :visible.sync="visible3"
      title="配送信息"
      v-if="visible3"
      v-dialogDrag
      :width="'40%'"
      destroy-on-close
    >
      <delivery @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></delivery>
    </el-dialog>
  </div>
</template>

<script>import { TabsBar, List } from './components'
import { Info,Detailed, Delivery } from './form'

export default {
  components: {
    TabsBar,
    List,
    Detailed,
    Delivery,
    Info
  },
  data() {
    return {
      visible: null,
      visible2: null,
      visible3: null,
      rid: null,
      listInfo: null,
      floorId: null
    }
  },
  mounted() {
    this.$refs.list.fetchData(this.$refs.tabs.qFilter())
  },
  methods: {
    exportData() {
      this.$refs.list.ExportData()
    },
    delivery(obj) {
      if (obj) {
        this.$refs.list.Delivery(obj)
      }
    },
    hideWindow(val) {
      this.visible = val
      this.visible2 = val
      this.visible3 = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if (obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible = true
    },handlerDetailedDialog(obj) {
      this.listInfo = null
      if (obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible2 = true
    },handlerDeliveryDialog(obj) {
      this.listInfo = null
      if (obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible3 = true
    },
    // 更新列表
    upload() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    uploadPage(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 查询
    query() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
