<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'运输计划编号'" prop="cn">
            <el-input v-model="form.cn"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'车辆类型'" prop="cn">
            <el-input v-model="form.cn"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'车牌号'" prop="eur">
            <el-select style="width: 100%" v-model="form.eur" placeholder="请选择">
              <el-option
                v-for="(item, index) in carList"
                :key="index"
                :label="item.carNumber"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'司机编号'" prop="usm">
            <el-select style="width: 100%" v-model="form.eur" placeholder="请选择">
              <el-option
                v-for="(item, index) in driverList"
                :key="index"
                :label="item.moniker"
                :value="item.personId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'副司机编号'" prop="usw">
            <el-select style="width: 100%" v-model="form.eur" placeholder="请选择">
              <el-option
                v-for="(item, index) in driverList"
                :key="index"
                :label="item.moniker"
                :value="item.personId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'计划发货时间'" prop="usw">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="form.eur"
              type="datetime"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'运输里程'" prop="usw">
            <el-input v-model="form.usw"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'地市局（厂）'" prop="usw">
            <el-input v-model="form.usw"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'数据区域'" prop="usw">
            <el-input v-model="form.usw"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'备注'" prop="usw">
            <el-input v-model="form.usw"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'发货仓库名称'" prop="usw">
            <el-select style="width: 100%" v-model="form.eur" placeholder="请选择">
              <el-option
                v-for="(item, index) in wareList"
                :key="index"
                :label="item.storehouseName"
                :value="item.storehouseId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'规划线路数量'" prop="usw">
            <el-input v-model="form.usw"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <div style="margin-top:20px;margin-bottom: 20px">
          <el-button @click="setRow">增加</el-button>
          <el-button @click="delRow">删除</el-button>
        </div>
        <el-table :data="list" border height="250px" ref="multipleTable"
                  stripe size="mini" :highlight-current-row="true">
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column
            v-for="(t,i) in columns"
            :key="i"
            align="center"
            :prop="t.name"
            :label="t.text"
            :width="'120px'"
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
      <el-form ref="postform" :size="'mini'" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'配送任务单id'">
              <el-input v-model="postform.eur"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'配送顺序编号'">
              <el-input v-model="postform.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'运输计划编号'">
              <el-input v-model="postform.eur"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'仓库名称'">
              <el-input v-model="postform.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'仓库地址'">
              <el-input v-model="postform.eur"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'仓库经纬度'">
              <el-input v-model="postform.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'收货地址'">
              <el-input v-model="postform.eur"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'收货仓库'">
              <el-input v-model="postform.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'收货仓库经纬度'">
              <el-input v-model="postform.eur"></el-input>
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
<script>import {createSizeColor, getDriverList, getVehicleInformationList} from '@/api/logistics/index'
import {getStorehouseList} from '@/api/contract/index'

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
      visible: null,
      list: [],
      wareList: [],
      carList: [],
      driverList: [],
      columns: [
        {text: '配送任务单id', name: 'gpName'},
        {text: '配送顺序编号', name: 'gpLevel'},
        {text: '运输计划编号', name: 'isDel'},
        {text: '仓库名称', name: 'isDel'},
        {text: '仓库地址', name: 'isDel'},
        {text: '仓库经纬度', name: 'isDel'},
        {text: '收货地址', name: 'isDel'},
        {text: '收货仓库', name: 'isDel'},
        {text: '经纬度', name: 'isDel'},
      ],
      postform: {
        name: null,
        start_time: null,
        end_time: null,
      },
      rules: {
        cn: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], eur: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], usm: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], usw: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        select: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
      }
    }
  },
  mounted() {
    this.getDriList()
    this.getWareList()
    this.getCarList()
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    getDriList() {
      const data = {
        pageNum: 1,
        pageSize: 500
      }
      getDriverList(data, {}).then(res => {
        this.driverList = res.data.records
      })
    }, getWareList() {
      const data = {
        pageNum: 1,
        pageSize: 500
      }
      getStorehouseList(data, {}).then(res => {
        this.wareList = res.data.records
      })
    }, getCarList() {
      const data = {
        pageNum: 1,
        pageSize: 500
      }
      getVehicleInformationList(data, {}).then(res => {
        this.carList = res.data.records
      })
    },
    setRow() {
      this.visible = true
    },
    delRow() {

    },
    confirmData(form) {
      /* this.$refs[form].validate((valid) => {
         if (valid) {*/
      // this.form.product_plan_array[0].plan_time_array.push(this.postform)
      this.visible = false
      /* }
     })*/
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
