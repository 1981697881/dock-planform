<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
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
            <el-select style="width: 100%" v-model="form.sex" placeholder="请选择">
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'出生日期'">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="form.birthday"
              type="date"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
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
        <el-col :span="24">
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
      options: [{
        label: '男',
        value: '男',
      },{
        label: '女',
        value: '女',
      }],
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
