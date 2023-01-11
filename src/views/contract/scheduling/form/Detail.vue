<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="110px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'物资名称'" prop="select">
            <el-select style="width: 100%" v-model="form.cnSize" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'规格'" prop="cn">
            <el-input v-model="form.cn"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'单位'" prop="eur">
            <el-input v-model="form.eur"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'数量'" prop="usm">
            <el-input v-model="form.usm"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'生产编号'" prop="usw">
          <el-input v-model="form.usw"></el-input>
        </el-form-item>
        </el-col><el-col :span="12">
        <el-form-item :label="'合同编号'" prop="select">
          <el-select style="width: 100%" v-model="form.cnSize" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
      </el-row>
    <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'合同交货日期'" prop="usw">
            <el-date-picker
              v-model="form.eur"
              type="date"
              style="width: auto"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        </el-col><el-col :span="12">
          <el-form-item :label="'当前生效的交货日期'" prop="usw">
            <el-date-picker
              v-model="form.eur"
              type="date"
              style="width: auto"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        </el-col>
      </el-row>
    <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'排产状态'">
          <el-input v-model="form.usw" readOnly></el-input>
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
<el-dialog
:visible.sync="visible"
title="编辑"
v-if="visible"
:width="'20%'"
destroy-on-close
append-to-body
>
<el-form ref="postform" label-width="80px" :size="'mini'">
  <el-row :gutter="20">
    <el-col :span="12">
      <el-form-item :label="'顺序号'">
        <el-input v-model="postform.eur" ></el-input>
      </el-form-item>
    </el-col><el-col :span="12">
      <el-form-item :label="'节点名称'">
        <el-input v-model="postform.eur" ></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-form-item :label="'开始日期'">
        <el-date-picker
          v-model="postform.eur"
          type="date"
          style="width: auto"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
    </el-col><el-col :span="12">
    <el-form-item :label="'结束日期'">
      <el-date-picker
        v-model="postform.eur"
        type="date"
        style="width: auto"
        placeholder="选择日期">
      </el-date-picker>
    </el-form-item>
  </el-col>
  </el-row>
</el-row>
  </el-form>
<div slot="footer" style="text-align:center;">
<el-button type="primary" @click="saveData('form')">确定</el-button>
  </div>
  </el-dialog>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {createSizeColor, specificationForm} from '@/api/commodity/index'

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    },
    // 是否自适应宽度，不自适应宽度默认为120px
    selfAdaption: {
      type: Boolean,
      default: true
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
      postform: {
        eur: null
      },
      visible: null,
      list: [],
      columns: [
        { text: '顺序号', name: 'gpName' },
        { text: '节点名称', name: 'gpLevel'},
        { text: '开始日期', name: 'isDel' },
        { text: '结束日期', name: 'isDel' },
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
