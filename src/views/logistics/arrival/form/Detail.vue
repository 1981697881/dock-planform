<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="110px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'物流商编码'" prop="cn">
            <el-input v-model="form.cn"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'物流商名称'" prop="cn">
            <el-input v-model="form.cn"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'姓名'" prop="eur">
            <el-input v-model="form.eur"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'性别'" prop="usm">
            <el-input v-model="form.usm"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'出生日期'" prop="usw">
          <el-input v-model="form.usw"></el-input>
        </el-form-item>
        </el-col><el-col :span="12">
          <el-form-item :label="'年龄'" prop="usw">
          <el-input v-model="form.usw"></el-input>
        </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'身份证号码'" prop="usw">
          <el-input v-model="form.usw"></el-input>
        </el-form-item>
        </el-col><el-col :span="12">
          <el-form-item :label="'电话号码'" prop="usw">
          <el-input v-model="form.usw"></el-input>
        </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'驾驶证类型'" prop="usw">
          <el-input v-model="form.usw"></el-input>
        </el-form-item>
        </el-col><el-col :span="12">
          <el-form-item :label="'部门名称'" prop="usw">
          <el-input v-model="form.usw"></el-input>
        </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'备注'" prop="usw">
          <el-input v-model="form.usw"></el-input>
        </el-form-item>
        </el-col>
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
