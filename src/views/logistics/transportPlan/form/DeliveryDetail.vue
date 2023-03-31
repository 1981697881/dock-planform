<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="110px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'到货签收id'" prop="select">
            <el-input v-model="form.cn"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'运输计划明细id'" prop="cn">
            <el-input v-model="form.cn"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'验收人'" prop="eur">
            <el-input v-model="form.eur"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'到货时间'" prop="usm">
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
          <el-form-item :label="'到货数量'" prop="usw">
            <el-input v-model="form.usw"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" style="text-align: center">
          <el-form-item :label="'签收附件'">
            <el-upload
              :action="fileUrl"
              list-type="picture-card"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              :headers="headers"
              :limit="1"
              name="imgS"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :class="{hide:hideUpload}"
              :on-preview="handlePictureCardPreview"
              :on-change="handleChange"
              :file-list="fileList"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
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
import {
  getToken
} from '@/utils/auth'
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
      headers: {
        'authorization': getToken('dockrx'),
      },
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      fileUrl: '',
      hideUpload: false,
      goodsList: [{
        id: 0,
        seriesName: '产品',
        children: []
      }
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
    this.fileUrl = `${window.location.origin}/nanwang/file/imgUpload`
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    handleRemove(file, fileList) {
      let array = this.fileList
      let img = file.url
      deleteImg({img: file.url}).then(res => {
        if (res.flag) {
        array.forEach((item, index) => {
          if (item.url == img) {
          array.splice(index, 1)
        }
      })
        this.form.productPhoto = null
        this.hideUpload = false
      }
    })
    },
    handleChange(file, fileList) {
      this.hideUpload = fileList.length >= this.limit
    },
    // 上传失败事件
    uploadError(res) {
      this.$message({
        message: res.msg,
        type: 'warning'
      });
      this.$emit('uploadList')
    },
    uploadSuccess(res, file, fileList) {
      file.name = res.data;
      this.$message({
        message: res.msg,
        type: 'success'
      });
      this.form.productPhoto = res.data
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
</style>
