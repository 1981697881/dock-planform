<template>
  <div class="app-list">
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @showNodeDialog="handlerNodeDialog" @exportData="exportData" @del="delivery" @queryBtn="query" @uploadList="upload"  @sync="syncList" @syncCom="syncComList" @syncStatus="syncStatusList"/>
      </div>
      <list ref="list" @uploadList="uploadPage" @showDialog="handlerDialog"/>
    </div>
    <el-dialog
      :visible.sync="visible"
      title="排产信息"
      v-if="visible"
      v-dialogDrag
      :width="'40%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
    </el-dialog>
  <el-dialog
      :visible.sync="visible2"
      title="节点信息"
      v-if="visible2"
      v-dialogDrag
      :width="'40%'"
      destroy-on-close
    >
      <node @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></node>
    </el-dialog>
  </div>
</template>

<script>import { TabsBar, List } from './components'
import { Info,Node } from './form'

export default {
  components: {
    TabsBar,
    List,
    Node,
    Info
  },
  data() {
    return {
      visible: null,
      visible2: null,
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
    syncList() {
      this.$refs.list.syncList()
    },
    syncComList() {
      this.$refs.list.syncComList()
    },
    syncStatusList() {
      this.$refs.list.syncStatusList()
    },
    hideWindow(val) {
      this.visible2 = val
      this.visible = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if (obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible = true
    },handlerNodeDialog(obj) {
      this.listInfo = null
      if (obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible2 = true
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
