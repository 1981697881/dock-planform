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
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="syncNodeList()">获取</el-button>
    </div>
  </div>
</template>

<script>import { mapGetters } from 'vuex'
import List from '@/components/List'
export default {
  components: {
    List
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      list: [],
      columns: [
        {text: '节点定义id', name: 'id'},
        {text: '节点类型名称', name: 'type'},
        {text: '顺序号', name: 'sequence'},
      ],
    }
  },
  mounted() {
      this.list = this.listInfo
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
  }
}
</script>
<style lang="scss" scoped>
  .list-main {
    height: calc(100vh/3);
  }
</style>
