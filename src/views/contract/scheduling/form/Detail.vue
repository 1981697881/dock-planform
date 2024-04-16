<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'物资名称'" :prop="form.product_plan_array[0].material_name" :rules="{required: true, message: '请输入', trigger: 'blur'}">
            <el-select style="width: 100%" v-model="form.product_plan_array[0].material_name" placeholder="请选择">
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
          <el-form-item :label="'规格'">
            <el-input v-model="form.cn"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'单位'">
            <el-input v-model="form.eur"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'数量'" >
            <el-input-number style="width: 100%;" v-model="form.product_plan_array[0].quantity"
                             :min="1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'生产编号'" :prop="form.product_plan_array[0].production_code" :rules="{required: true, message: '请输入', trigger: 'blur'}">
            <el-input v-model="form.product_plan_array[0].production_code"></el-input>
          </el-form-item>
        </el-col>
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
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'合同交货日期'">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="form.eur"
              type="date"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'当前生效的交货日期'">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="form.eur"
              type="date"
              style="width: 100%"
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
        <el-table :data="form.product_plan_array[0].plan_time_array" border height="250px" ref="multipleTable" @selection-change="handleSelectionChange"
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
      <el-form ref="postform" :model="postform" :size="'mini'" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'顺序号'">
              <el-input v-model="postform.eur"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'节点名称'" prop="name">
              <el-input v-model="postform.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'开始日期'" prop="start_time">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="postform.start_time"
                type="date"
                style="width: 100%"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'结束日期'" prop="end_time">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="postform.end_time"
                type="date"
                style="width: 100%"
                placeholder="选择日期">
              </el-date-picker>
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

<script>import {addProductInfo, getMaterialList, getProjectList} from '@/api/contract/index'
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters(['userInfo'])
  },
  data() {
    return {
      form: {
        contract_code: null,
        operation_type: 'add',
        product_plan_array: [{
          material_id: null,
          material_name: null,
          plan_id: null,
          production_code: null,
          quantity: 1,
          plan_time_array: [],
        }],
      },
      postform: {
        name: null,
        start_time: null,
        end_time: null,
      },
      visible: null,
      list: [],
      contractList: [],
      productList: [],
      multipleSelection: [],
      columns: [
        {text: '顺序号', name: ''},
        {text: '节点名称', name: 'name'},
        {text: '开始日期', name: 'start_time'},
        {text: '结束日期', name: 'end_time'},
      ],
      rules: {
        contract_code: [
          {required: true, message: '请选择', trigger: 'change'}
        ],start_time: [
          {required: true, message: '请选择', trigger: 'change'}
        ],end_time: [
          {required: true, message: '请选择', trigger: 'change'}
        ],name: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
      }
    }
  },
  mounted() {
    this.getContractList()
    this.getProductList()
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
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
    getProductList() {
      const data = {
        pageNum: 1,
        pageSize: 500
      }
      getMaterialList(data, {}).then(res => {
        this.productList = res.data.records
      })
    },
    setRow() {
      this.postform = {
        name: null,
        start_time: null,
        end_time: null,
      }
      this.visible = true
    },
    delRow() {
      if(this.multipleSelection.length>0){
        this.multipleSelection.forEach((item)=>{
          this.form.product_plan_array[0].plan_time_array.splice(item)
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
          const postForm = {...this.postform}
          if(this.form.product_plan_array[0].plan_time_array.findIndex(item =>item.name == postForm.name) == -1){
            this.form.product_plan_array[0].plan_time_array.push(postForm)
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
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          if (this.form.product_plan_array[0].plan_id == null) {
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
          addProductInfo(this.form).then(res => {
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
