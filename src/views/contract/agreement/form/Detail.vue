<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="110px" :size="'mini'">
      <el-table :data="list" border height="250px" ref="multipleTable" @selection-change="handleSelectionChange"
      stripe size="mini" :highlight-current-row="true">
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column
        v-for="(t,i) in columns"
        :key="i"
        align="center"
        :prop="t.name"
        :label="t.text"
        :width="t.width?t.width:(selfAdaption?'':'120px')"
        v-if="t.default!=undefined?t.default:true"
      ></el-table-column>
    </el-table>
    </el-form>
    <!--<div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>-->
  </div>
</template>

<script>import {createSizeColor} from '@/api/commodity/index'

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        type: 1,
        cn: null,
        eur: null,
        usm: null,
        usw: null,
        select: []
      },
      list: [],
      columns: [
        { text: '生产编号', name: 'gpName' },
        { text: '合同编号', name: 'gpLevel'},
        { text: '合同交货期', name: 'isDel' },
        { text: '当前生效的交货日期', name: 'gpId'},
        { text: '生产安排日期', name: 'gpId'},
        { text: '确认状态', name: 'gpId'}
      ],
      rules: {
        cn: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],eur: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],usm: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],usw: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        select: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
      }
    }
  },
  mounted() {
    this.formatList()
    if (this.listInfo) {
      this.form = this.listInfo
      console.log(this.form)
      this.form.select = this.listInfo.parentIdList.split(',')
      this.form.select = this.form.select.map(item => {
        return +item
      })
    }
  },
  methods: {
    formatList() {
      specificationForm({id: null}).then(res => {
        if (res.flag) {
          this.goodsList[0].children = res.data
        }
      })
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          this.form.parentId = this.form.select[this.form.select.length-1]
          this.form.parentIdList = this.form.select.join(',')
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
