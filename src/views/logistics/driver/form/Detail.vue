<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="110px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'物流商编码'" prop="logisticsProvidersNumber">
            <el-input v-model="form.logisticsProvidersNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'物流商名称'" prop="logisticsProvidersName">
            <el-input v-model="form.logisticsProvidersName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'姓名'" prop="moniker">
            <el-input v-model="form.moniker"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'性别'">
            <el-input v-model="form.sex"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'出生日期'">
            <el-input v-model="form.birthday"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'年龄'">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'身份证号码'">
            <el-input v-model="form.idCard"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'电话号码'">
            <el-input v-model="form.telephone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'驾驶证类型'">
            <el-input v-model="form.driveType"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'部门名称'">
            <el-input v-model="form.deptName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'备注'">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addDriver} from '@/api/logistics/index'

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
        logisticsProvidersNumber: null,
        logisticsProvidersName: null,
        moniker: null,
        sex: null,
        birthday: null,
        age: null,
        idCard: null,
        telephone: null,
        driveType: null,
        deptName: null,
        remark: null,
      },
      rules: {
        logisticsProvidersNumber: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], logisticsProvidersName: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], moniker: [
          {required: true, message: '请输入', trigger: 'blur'}
        ]
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
          addDriver(this.form).then(res => {
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
