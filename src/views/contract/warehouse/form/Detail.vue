<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="110px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'仓库编码'" prop="storehouseCode">
            <el-input v-model="form.storehouseCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'仓库名称'" prop="storehouseName">
            <el-input v-model="form.storehouseName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'仓库经纬度'">
            <el-input v-model="form.storehouseSeat"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'地址'">
            <el-input v-model="form.storehouseAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'联系人'">
            <el-input v-model="form.contacts"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'联系人电话'">
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

<script>import {addStorehouse} from '@/api/contract/index'

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
        storehouseCode: null,
        storehouseName: null,
        storehouseSeat: null,
        storehouseAddress: null,
        contacts: null
      },
      rules: {
        storehouseCode: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], storehouseName: [
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
          addStorehouse(this.form).then(res => {
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
