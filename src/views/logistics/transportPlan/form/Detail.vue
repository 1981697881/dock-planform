<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="110px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'运输计划编号'" prop="cn">
            <el-input v-model="form.cn"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'车辆类型'" prop="cn">
            <el-input v-model="form.cn"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'车牌号'" prop="eur">
            <el-input v-model="form.eur"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'司机编号'" prop="usm">
            <el-input v-model="form.usm"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'副司机编号'" prop="usw">
          <el-input v-model="form.usw"></el-input>
        </el-form-item>
        </el-col><el-col :span="12">
          <el-form-item :label="'计划发货时间'" prop="usw">
            <el-date-picker
              v-model="form.eur"
              type="datetime"
              style="width: auto"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'运输里程'" prop="usw">
          <el-input v-model="form.usw"></el-input>
        </el-form-item>
        </el-col><el-col :span="12">
      <el-form-item :label="'地市局（厂）'" prop="usw">
        <el-input v-model="form.usw"></el-input>
      </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'数据区域'" prop="usw">
          <el-input v-model="form.usw"></el-input>
        </el-form-item>
        </el-col><el-col :span="12">
      <el-form-item :label="'备注'" prop="usw">
        <el-input v-model="form.usw"></el-input>
      </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'发货仓库名称'" prop="usw">
          <el-input v-model="form.usw"></el-input>
        </el-form-item>
        </el-col><el-col :span="12">
      <el-form-item :label="'规划线路数量'" prop="usw">
        <el-input v-model="form.usw"></el-input>
      </el-form-item>
        </el-col>
      </el-row>
    <el-row :gutter="20">
      <div style="margin-top:20px;margin-bottom: 20px">
        <el-button @click="setRow">增加</el-button>
      <el-button @click="delRow">删除</el-button>
  </div>
  <el-table :data="list" border height="250px" ref="multipleTable"
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
</el-row>
    </el-form>

    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {createSizeColor, specificationForm} from '@/api/basic/index'

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
      visible: null,
      list: [],
      columns: [
        { text: '配送任务单id', name: 'gpName' },
        { text: '配送顺序编号', name: 'gpLevel'},
        { text: '运输计划编号', name: 'isDel' },
        { text: '仓库名称', name: 'isDel' },
        { text: '仓库地址', name: 'isDel' },
        { text: '仓库经纬度', name: 'isDel' },
        { text: '收货地址', name: 'isDel' },
        { text: '收货仓库', name: 'isDel' },
        { text: '经纬度', name: 'isDel' },
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
    setRow(){
      this.visible = true
    },
    delRow(){

    },
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
