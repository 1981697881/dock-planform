<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
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

<script>import {createSizeColor} from '@/api/basic/index'

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
        { text: '物资id', name: 'gpName' },
        { text: '项目名称', name: 'gpLevel'},
        { text: '项目编号', name: 'gpLevel'},
        { text: '物资类型', name: 'gpLevel'},
        { text: '物资名称', name: 'gpLevel'},
        { text: '规格', name: 'gpLevel'},
        { text: '单位', name: 'gpLevel'},
        { text: '本次配送数量', name: 'gpLevel'},
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
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
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
