<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'商品'" prop="select">
            <el-cascader
              placeholder="请选择"
              v-model="form.select"
              :options="goodsList"
              :props="{value:'id',label:'seriesName' }"
              clearable></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'款号'" prop="itemNo">
            <el-input v-model="form.itemNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import { addCommodity, specificationForm} from '@/api/commodity/index'

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
        level: '1',
        itemNo: null,
        parentId: 0,
        select: []
      },
      goodsList: [
      ],
      rules: {
        itemNo: [
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
          this.goodsList= res.data
        }
      })
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          this.form.parentId = this.form.select[this.form.select.length-1]
          this.form.parentIdList = this.form.select.join(',')
          addCommodity(this.form).then(res => {
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
