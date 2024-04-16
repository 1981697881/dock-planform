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
          <el-form-item :label="'入供应商成品清单'"  :prop="form.payment.storage_material_ids" :rules="{required: true, message: '请选择', trigger: 'change'}">
            <el-select style="width: 100%" multiple v-model="form.payment.storage_material_ids" placeholder="请选择">
              <el-option
                v-for="(item, index) in turnoffList"
                multiple
                collapse-tags
                :key="index"
                :label="item.storageCode"
                :value="item.storageId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'入库单清单'" :prop="form.payment.entry_ids" :rules="{required: true, message: '请选择', trigger: 'change'}">
            <el-select style="width: 100%" multiple v-model="form.payment.entry_ids" placeholder="请选择">
              <el-option
                v-for="(item, index) in orderLists"
                multiple
                collapse-tags
                :key="index"
                :label="item.entryCode"
                :value="item.entryId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'款项类型'" prop="payment_type">
            <el-input v-model="form.payment.payment_type"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'款项id'">
            <el-input v-model="form.payment.payment_id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'款项名称'" prop="payment_name">
            <el-input v-model="form.payment.payment_name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'票据号码'">
            <el-input v-model="form.payment.bill_number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'票据类型'">
            <el-input v-model="form.payment.bill_type"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'金额'">
            <el-input-number style="width: 100%" v-model="form.payment.amount_money"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'税额'">
            <el-input-number style="width: 100%" v-model="form.payment.amount_tax"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'价税合计'">
            <el-input-number style="width: 100%" v-model="form.payment.amount_total"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'开票单位'">
            <el-input v-model="form.payment.invoicer"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'开户行'">
            <el-input v-model="form.payment.bank"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'开户行账号'">
            <el-input v-model="form.payment.bank_account"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'发票日期'">
            <el-input v-model="form.payment.invoice_date"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'支付比例'">
            <el-input v-model="form.payment.payment_ratio"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" style="text-align: center">
          <el-form-item :label="'票据扫描附件'">
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
        <el-col :span="24" style="text-align: center">
          <el-form-item :label="'证明材料附件'">
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
        <el-col :span="24" style="text-align: center">
          <el-form-item :label="'其它附件'">
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

<script>import {deleteImg} from '@/api/basic/index'
import {updatePayment, getStorageList, getProjectList} from '@/api/contract/index'
import {getEntryList} from '@/api/logistics/index'
import {
  getToken
} from '@/utils/auth'
import { mapGetters } from 'vuex'
export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      computed: {
        ...mapGetters(['userInfo'])
      },
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
        payment: {
          payment_type: null,
          payment_id: null,
          payment_name: null,
          bill_number: null,
          bill_type: null,
          amount_money: null,
          amount_tax: null,
          amount_total: null,
          invoicer: null,
          bank: null,
          bank_account: null,
          invoice_date: null,
          payment_ratio: null,
        }
      },
      contractList: [],
      turnoffList: [],
      orderLists: [],
      rules: {
        operation_type: [
          {required: true, message: '请选择', trigger: 'change'}
        ], payment_type: [
          {required: true, message: '请选择', trigger: 'change'}
        ], payment_id: [
          {required: true, message: '请选择', trigger: 'change'}
        ], contract_code: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
      }
    }
  },
  mounted() {
    this.fileUrl = `${window.location.origin}/nanwang/file/imgUpload`
    this.getContractList();
    this.getTurnoffList();
    this.getOrderLists();
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    getContractList() {
      const data = {
        pageNum: 1,
        pageSize: 1000
      }
      getProjectList(data, {}).then(res => {
        this.contractList = res.data.records
      })
    },
    getTurnoffList() {
      const data = {
        pageNum: 1,
        pageSize: 1000
      }
      getEntryList(data, {}).then(res => {
        this.turnoffList = res.data.records
      })
    },
    getOrderLists() {
      const data = {
        pageNum: 1,
        pageSize: 1000
      }
      getStorageList(data, {}).then(res => {
        this.orderLists = res.data.records
      })
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
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          if (this.form.payment.payment_id == null) {
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
          updatePayment(this.form).then(res => {
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
