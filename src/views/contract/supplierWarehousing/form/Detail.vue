<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'合同编号'" prop="contract_code">
            <el-select style="width: 100%" v-model="form.contract_code" placeholder="请选择">
              <el-option
                v-for="(item, index) in contractList"
                :key="index"
                :label="item.contractName"
                :value="item.contractCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'入库编号'" :prop="form.storage_array[0].storage_code" :rules="{required: true, message: '请输入', trigger: 'blur'}">
            <el-input v-model="form.storage_array[0].storage_code"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'数据库主键'" :prop="form.storage_array[0].storage_id" :rules="{required: true, message: '请输入', trigger: 'blur'}">
            <el-input v-model="form.storage_array[0].storage_id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'入库时间'" :prop="form.storage_array[0].storage_time" :rules="{required: true, message: '请选择', trigger: 'change'}">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="form.storage_array[0].storage_time"
              type="date"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'备注'">
            <el-input v-model="form.storage_array[0].remarks"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" style="text-align: center">
          <el-form-item :label="'附件'">
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
      <el-row :gutter="20">
        <div style="margin-top:20px;margin-bottom: 20px">
          <el-button @click="setRow">增加</el-button>
          <el-button @click="delRow">删除</el-button>
        </div>
        <el-table :data="form.storage_array[0].storage_material" border height="250px" ref="multipleTable" @selection-change="handleSelectionChange"
                  stripe size="mini" :highlight-current-row="true">
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column
            v-for="(t,i) in columns"
            :key="i"
            align="center"
            :prop="t.name"
            :label="t.text"
            :width="'120px'"
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
      <el-form ref="postform" :model="postform" :size="'mini'" :rules="rulest">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'物资名称'"  prop="material_id">
              <el-select style="width: 100%" v-model="postform.material_id" placeholder="请选择" @change="selectProduct">
                <el-option
                  v-for="(item, index) in productList"
                  :key="index"
                  :label="item.materialName"
                  :value="item.materialId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'数量'">
              <el-input-number :min="1" v-model="postform.storage_quantity"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;">
        <el-button type="primary" @click="confirmData('postform')">确定</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {updateStorage, getMaterialList, getProjectList} from '@/api/contract/index'
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters(['userInfo'])
  },
  data() {
    return {
      headers: {
        'authorization': getToken('dockrx'),
      },
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      fileUrl: '',
      hideUpload: false,
      form: {
        contract_code: null,
        operation_type: 'add',
        storage_array: [{
          remarks: null,
          storage_code: null,
          storage_id: null,
          storage_time: null,
          storage_material: [],
        }],
      },
      contractList: [],
      productList: [],
      list: [],
      columns: [
        {text: '物资ID', name: 'material_id'},
        {text: '物资名称', name: 'material_name'},
        {text: '规格', name: 'specification'},
        {text: '单位', name: 'unit'},
        {text: '入库数量', name: 'storage_quantity'},
      ],
      postform: {
        material_id: null,
        storage_quantity: 1,
      },
      visible: null,
      multipleSelection: [],
      rulest: {
        material_id: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
      },
      rules: {
        contract_code: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
      }
    }
  },
  mounted() {
    this.fileUrl = `${window.location.origin}/nanwang/file/imgUpload`
    this.getProductList();
    this.getContractList();
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
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
    setRow() {
      this.postform = {
        material_id: null,
        storage_quantity: 1,
      }
      this.visible = true
    },
    delRow() {
      if(this.multipleSelection.length>0){
        this.multipleSelection.forEach((item)=>{
          this.form.storage_array[0].storage_material.splice(item)
        })
      }else{
        this.$message({
          message: "请选择删除项",
          type: 'error'
        });
      }
    },
    confirmData(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const product = {...this.postform}
          if(this.form.storage_array[0].storage_material.findIndex(item =>item.id == product.id) == -1){
            this.form.storage_array[0].storage_material.push(product)
            this.visible = false
          }else{
            this.$message({
              message: "已存在相同项",
              type: 'error'
            });
          }
        }
      })
    },
    selectProduct(val){
      this.productList.forEach((item)=>{
        if(item.materialId == val){
          this.postform.material_name = item.materialName
          this.postform.id = item.id
          this.postform.specification = item.specification
          this.postform.unit = item.unit
        }
      })
    },
    getProductList() {
      const data = {
        pageNum: 1,
        pageSize: 500
      }
      getMaterialList(data, {}).then(res => {
        this.productList = res.data.records
      })
    },
    getContractList() {
      const data = {
        pageNum: 1,
        pageSize: 500
      }
      getProjectList(data, {}).then(res => {
        this.contractList = res.data.records
      })
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          if (this.form.id == null) {
            this.form.operation_type = 'add'
          } else {
            this.form.operation_type = 'upd'
          }
          let userData = typeof this.userInfo == "string"? JSON.parse(this.userInfo) : this.userInfo
          let params= {
            publicKey: userData.FTargetKey,
            nwUrl: userData.FK3CloudUrl,
            secret: userData.FSessionkey,
            username: userData.FAppkey,
            password: userData.FSecret
          }
          this.form.authPojo = params
          updateStorage(this.form).then(res => {
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
