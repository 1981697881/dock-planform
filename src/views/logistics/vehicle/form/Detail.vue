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
          <el-form-item :label="'车牌号'" prop="carNumber">
            <el-input v-model="form.carNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'车辆类型'" prop="vehicleType">
            <el-input v-model="form.vehicleType"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'核定载货量（吨）'">
            <el-input v-model="form.nuclearMass	"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'装载长度（厘米）'">
            <el-input v-model="form.loadingLength"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'装载宽度（厘米）'">
            <el-input v-model="form.loadingWidth"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'装载高度（厘米）'">
            <el-input v-model="form.loadingHeight"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'年审时间'">
            <el-input v-model="form.annualReviewTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'年审有效期'">
            <el-input v-model="form.inspectAnnuallyLifespan"></el-input>
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

<script>import {addVehicleInformation} from '@/api/logistics/index'

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
        logisticsProvidersName: null,
        logisticsProvidersNumber: null,
        carNumber: null,
        vehicleType: null,
        nuclearMass: null,
        loadingLength: null,
        loadingWidth: null,
        loadingHeight: null,
        annualReviewTime: null,
        inspectAnnuallyLifespan: null,
        remark: null,
      },
      rules: {
        logisticsProvidersName: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], logisticsProvidersNumber: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], carNumber: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], vehicleType: [
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
          addVehicleInformation(this.form).then(res => {
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
