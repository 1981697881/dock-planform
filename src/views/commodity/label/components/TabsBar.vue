<template>
  <div class="list-header">
    <div class="printClass" v-for="(item,index) in selections" :key="index">
      <div class="scan" v-if="!item.labelVOS" :ref="'lessonTableImg'+index">
        <table>
          <tr>
            <td colspan="5" rowspan="5" class="img-scan"><!--:logoSrc="require(`@/assets/img/logo.png`)"-->
              <vue-qr
                class="scanImg"
                :text="'http://nw.gzfzdev.com:50070/nanwang/redirect/scanResult?qrCode=' + item.labelId"
                :margin="0"
                :logoScale="0.2"
              >
              </vue-qr>
            </td>
          </tr>
          <tr>
            <td style="text-align: left">CN(2.5)</td>
            <td style="font-size: 18px;font-weight: 700">{{item.cnSize}}</td>
          </tr>
          <tr>
            <td style="text-align: left">EUR</td>
            <td style="font-size: 18px;font-weight: 700">{{item.eurSize}}</td>
          </tr>
          <tr>
            <td style="text-align: left">US(M's)</td>
            <td style="font-size: 18px;font-weight: 700">{{item.usmSize}}</td>
          </tr>
          <tr>
            <td style="text-align: left">US(W's)</td>
            <td style="font-size: 18px;font-weight: 700">{{item.uswSize}}</td>
          </tr>
          <tr>
            <td colspan="5">
              <span style="padding: 0 2px 0 2px;font-size: 18px; font-weight: 700" :style="'color: '+ item.labelColors[items].col" v-for="(items,index) in 4" :key="index"
              >{{item.labelColors[items-1].num}}</span>
            </td>
            <td colspan="2"  style="vertical-align: bottom;font-size: 12px">{{item.productName}}</td>
          </tr>
          <tr>
            <td colspan="5">
              <span style="padding: 0 2px 0 2px;font-size: 18px;font-weight: 700" :style="'color: '+ item.labelColors[items+3].col" v-for="(items,index) in 4" :key="index"
              >{{item.labelColors[items+3].num}}</span>
            </td>
            <td colspan="2" style="font-size: 12px">{{item.itemNo.split('/')[0]}}</td>
          </tr>
          <tr>
            <td colspan="5">
              <span style="padding: 0 2px 0 2px;font-size: 18px;font-weight: 700" :style="'color: '+ item.labelColors[items+7].col" v-for="(items,index) in 4" :key="index"
              >{{item.labelColors[items+7].num}}</span>
            </td>
            <td colspan="2" style="vertical-align: top;font-size: 12px">{{item.itemNo.split('/')[1]}}</td>
          </tr>
          <tr>
            <td colspan="5">MADE IN CHINA</td>
            <td colspan="2">{{item.batchNo}}</td>
          </tr>
        </table>
      </div>
    </div>
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="'?????????'">
            <el-input v-model="search.name" placeholder="??????"/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">??????</el-button>
        </el-col>
        <el-button-group style="float:right">
          <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary"
                     :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}
          </el-button>
          <!--<el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleAdd">??????</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">??????</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="Delivery">??????</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-error" @click="disable" >??????</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-success" @click="enable" >??????</el-button>-->
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">??????</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>import {mapGetters} from 'vuex'
import {alterClerk} from '@/api/basic/index'
import {getByUserAndPrId} from '@/api/system/index'
import html2Canvas from 'html2canvas'
import Canvas2Image from 'Canvas2Image'
import vueQr from 'vue-qr'

export default {
  components: {
    vueQr
  },
  computed: {
    ...mapGetters(['node', 'clickData', 'selections'])
  },
  data() {
    return {
      btnList: [],
      search: {
        name: null
      }
    };
  },
  mounted() {
    let path = this.$route.meta.id
    getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate();
    });
  },
  methods: {
    // ???????????????devicePixelRatio
    getPixelRatio(context) {
      let backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
      return (window.devicePixelRatio || 1) / backingStore;
    },
    convertCanvasToImage(canvas) {
      var image = new Image();
      image.src = canvas.toDataURL("image/jpg");
      document.body.appendChild(image);
      this.downloadImage(image.src)
      return image;
    },
    // ??????????????????????????????????????????
    downloadImage(imgsrc, name) {
      let that = this
      var image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = function () {
        var canvas = document.createElement('canvas')
        let w = image.width;
        let h = image.height;
        var context = canvas.getContext('2d')
        var ratio = that.getPixelRatio(context);
        canvas.width = w * ratio;
        canvas.height = h * ratio;
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        context.scale(ratio, ratio);
        var url = Canvas2Image.convertToJPEG(canvas, w, h).src// ???????????????base64????????????
        var a = document.createElement('a') // ????????????a??????
        var event = new MouseEvent('click') // ????????????????????????
        a.download = name || 'photo' // ??????????????????
        a.href = url // ????????????URL?????????a.href??????
        a.dispatchEvent(event) // ??????a???????????????
      }
      image.src = imgsrc
    },
    onFun(method) {
      console.log(method)
      this[method]()
    },
    export() {
      if (this.selections.length > 0) {
        let number = 0
        this.selections.forEach((item, index) => {
          if (!item.labelVOS) {
            number++;
            html2Canvas(this.$refs['lessonTableImg' + index][0], {
              dpi: window.devicePixelRatio * 4,
              useCORS: true // ??????????????????????????????
            }).then((canvas) => {
              this.convertCanvasToImage(canvas);
            })
          }
        })
        if (number == 0) {
          this.$message({
            message: '???????????????',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '????????????',
          type: 'warning'
        })
      }
    },
    Delivery() {
      if (this.clickData.id) {
        this.$confirm('???????????????' + this.clickData.labelId + '???????????????????????????????', '??????', {
          confirmButtonText: '??????',
          cancelButtonText: '??????',
          type: 'warning'
        }).then(() => {
          this.$emit('delList', {
            id: this.clickData.id
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '???????????????'
          });
        });
      } else {
        this.$message({
          message: '????????????',
          type: 'warning'
        })
      }
    },
    handlerAlter() {
      if (this.clickData.id) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: '????????????',
          type: 'warning'
        })
      }
    },
    disable() {
      if (this.clickData.eid) {
        this.clickData.disable = true
        alterClerk(this.clickData).then(res => {
          if (res.flag) {
            this.$emit('uploadList')
          }
        });
      } else {
        this.$message({
          message: '????????????',
          type: 'warning'
        });
      }
    },
    enable() {
      if (this.clickData.eid) {
        this.clickData.disable = false
        alterClerk(this.clickData).then(res => {
          if (res.flag) {
            this.$emit('uploadList')
          }
        })
      } else {
        this.$message({
          message: '????????????',
          type: 'warning'
        });
      }
    },
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    upload() {
      this.search.name = ''
      this.$emit('uploadList')
    },
    // ??????????????????
    qFilter() {
      let obj = {}
      this.search.name != null && this.search.name != '' ? obj.name = this.search.name : null
      return obj
    },
    handlerAdd() {
      this.$emit('showDialog')
    }
  }
}
</script>

<style>
  .printClass {
     width: 0;
     height: 0;
     overflow: hidden;
  }
  .scan {
    width: 60mm;
    padding: 1mm;
    font-weight: 500;
    font-size: 14px;
  }

  .scan table {
    border-collapse: collapse;
  }

  .scan table, th, td {
    text-align: center;
  }

  .img-scan {
    width: 100px;
    height: 70px;
  }

  .scanImg {
    height: 22mm;
    width: 22mm;
  }
</style>
