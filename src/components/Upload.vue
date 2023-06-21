<!-- eslint-disable no-unused-vars -->
<template>
  <div class="hello">
    <div class="container">
      <p>MCHGC is a comprehensive resource for systematical analysis of metabolic subtype in patients with gastric cancer. Based on expression profiles of metabolism-related genes, patients with gastric cancer can be clearly stratified into four metabolic subtypes: quiescent subtype, glycolysis/gluconeogenesis subtype, alanine-aspartate-glutamate subtype, and mixed subtype. Previous study has suggested that the glycolysis/gluconeogenesis subtype was characterised by a lower level of ERBB2 expression, a higher proportion of the inflammatory phenotype and the worst prognosis, whereas, the alanine-aspartate-glutamate subtype was accompanied by favorable clinical outcomes. 
      </p>
        <el-row :gutter="20">
          <el-col :span="6" class="step">
            <h3 class="title">
              <img :src="pic2" />
              <div>0. Instructions for Use</div>
            </h3>
            <div>1. Users should prepare the expression profiles as required, ensure that row-name is the gene name and column-name is the sample name. Upload it to the "Upload Expression Profile" module (Note: this website is only applicable to RNAseq data).</div>
            <div>2. Users should compile corresponding clinical information, including age, gender, tumor stage, and histological grade. Uploaded it to the "Upload Clinical Information" module. </div>
            <div>3. After uploading expression profile and clinical information, the users can run the background program through clicking “Run after Uploading!” button.
            </div>
          </el-col>
          <el-col :span="6" class="step">
            <h3 class="title">
              <img :src="pic2" />
              <div>1. Upload Expression Profile</div>
            </h3>
            <div>Prediction of Metabolic Subtypes (First Step): Please input the expression matrix separated by tab and ended with ".txt", rownames of the file must be gene symbol (see <a href="http://xiyoucloud.pro:15245/img/input.csv" download="input.csv">Example</a>). Please rename this file as “input.txt” before uploading.
            </div>
            <h4>Data Type</h4>
            <div>RNAseq</div>
            <h4>File Upload</h4>
            <el-upload
              action="#"
              accept=".txt,.csv"
              :on-remove="removeFile1"
              :on-change="handleChange1"
              :auto-upload="false"
              :file-list="fileList1"
              :on-exceed="handleExceed"
              :limit="1"
            >
              <el-button slot="trigger" size="small" type="primary" style="background-color: rgb(195, 214, 155); border: 2px solid rgb(155, 187, 85)">Browse</el-button>
            </el-upload>
          </el-col>
          <el-col :span="6" class="step">
            <h3 class="title">
              <img :src="pic2" />
              <div>2. Upload Clinical Information</div>
            </h3>
            <div>Prediction of Clinical Outcomes (Second Step): Please upload clinical information in "csv" format, which consists of age, gender, tumor stage, and histological grade. Please rename this file as “input.csv” before uploading. <a href="http://xiyoucloud.pro:15245/img/input.txt" download="input.txt">Example</a></div>
            <h4>File Upload</h4>
            <el-upload
              action="#"
              accept=".txt,.csv"
              :on-remove="removeFile2"
              :on-change="handleChange2"
              :auto-upload="false"
              :file-list="fileList2"
              :on-exceed="handleExceed"
              :limit="1"
            >
              <el-button slot="trigger" size="small" type="primary" style="background-color: rgb(195, 214, 155); border: 2px solid rgb(155, 187, 85)">Browse</el-button>
            </el-upload>
          </el-col>
          <el-col :span="6" class="step">
            <h3 class="title">
              <img :src="pic2" />
              <div>3. Treatment Strategies</div>
            </h3>
            <div>
              Prediction of Treatment Response (Third Step): Patients with glycolysis/gluconeogenesis subtype are extremely sensitive to following drugs: ponatinib, bexarotene, dimethyloxalylglycine, pictilisib, imatinib, pazopanib, PD173074, crizotinib and sunitinib. Patients with the mixed subtype are more sensitive to cisplatin, doxorubicin, epothilone B, gemcitabine, obatoclax mesylate and tipifarnib. Patients with alanine-aspartate-glutamate subtype and quiescent subtype can be benefit from immunotherapy strategies, such as PD-1 blockage.
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin: 20px 0;">
          <el-col style="width: 350px">
            <h3 class="title" @click="confirm">
              <img :src="pic3" />
              <div>Run and Get Predicted Results!</div>
            </h3>
          </el-col>
        </el-row>
        <template>
          <el-tabs v-model="activeName" type="card" class="tabs">
            <el-tab-pane name="first">
              <div slot="label" class="label"><img :src="pic4" /><span>a. Results of Metabolic Subtypes</span></div>
              <el-button v-if="status" style="background-color: rgb(195, 214, 155); border: 2px solid rgb(155, 187, 85)" size="small" type="primary" @click="exportImg(1)">Click here to output all the files</el-button><br/>
              <ul v-if="status">
                <li v-for="(item, index) in lists1" :key="index">
                  <img v-if="item.imgBol" :src="item.src" class="img">
                  <div v-if="!item.imgBol">
                    <i class="el-icon-document"></i>
                    <span>{{item.src.split('/img/')[1]}}</span>
                  </div>
                </li> 
              </ul>
            </el-tab-pane>
            <el-tab-pane label="b. Results  of Clinical Outcomes" name="second">
              <div slot="label" class="label"><img :src="pic4" /><span>b. Results  of Clinical Outcomes</span></div>
              <el-button v-if="status" style="background-color: rgb(195, 214, 155); border: 2px solid rgb(155, 187, 85)" size="small" type="primary" @click="exportImg(2)">Click here to output all the files</el-button>
              <ul v-if="status">
                <li v-for="(item, index) in lists2" :key="index">
                  <img v-if="item.imgBol" :src="item.src" class="img">
                  <div v-if="!item.imgBol">
                    <i class="el-icon-document"></i>
                    {{item.src.split('/img/')[1]}}
                  </div>
                </li> 
              </ul>
            </el-tab-pane>
            <el-tab-pane label="c. Results of Treatment Response" name="third">
              <div slot="label" class="label"><img :src="pic4" /><span>c. Results of Treatment Response</span></div>
              <el-button v-if="status" style="background-color: rgb(195, 214, 155); border: 2px solid rgb(155, 187, 85)" size="small" type="primary" @click="exportImg(3)">Click here to output all the files</el-button>
              <ul v-if="status">
                <li v-for="(item, index) in lists3" :key="index">
                  <img :src="item" class="img">
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import service from './../api'
import pic2 from './../assets/arrow_up.png'
import pic3 from './../assets/arrow_right.png'
import pic4 from './../assets/arrow_down.png'

export default {
  // eslint-disable-next-line
  name: 'Upload',
  data() {
    return {
      fileList1: [],
      fileList2: [],
      lists1: ['/img/output1.txt', '/img/output2.jpg', '/img/output2.txt', '/img/output3.jpg'],
      lists2: ['/img/output1.jpg', '/img/output3.csv', '/img/output3.txt', '/img/output4.csv', '/img/output4.jpg', '/img/output5.jpg'],
      lists3: ['/img/treatment.jpg'],
      status: false,
      pic2,
      pic3,
      pic4,
      activeName: 'first'
    }
  },
  created() {
    this.lists1 = this.lists1.map(item => {
      let arrTemp = item.split('.')
      if (arrTemp[1] !== 'jpg') {
        return {imgBol: false, src: item}
      } else {
        return { imgBol: true, src: item}
      }
    })
    this.lists2 = this.lists2.map(item => {
      let arrTemp = item.split('.')
      if (arrTemp[1] !== 'jpg') {
        return {imgBol: false, src: item}
      } else {
        return { imgBol: true, src: item}
      }
    })
  },
  methods: {
    handleChange1(file, fileList) { // 文件数量改变
      this.fileList1 = fileList
    },
    handleChange2(file, fileList) { // 文件数量改变
      this.fileList2 = fileList
    },
    // 文件删除的钩子
    removeFile1(file, fileList) {
      this.fileList1 = fileList
    },
    removeFile2(file, fileList) {
      this.fileList2 = fileList
    },
    handleExceed() {
      this.$message.warning('please delete the current file before uploading');
    },
    // 点击确定按钮 上传文件
    confirm() {
      const loading = this.$loading({
        lock: true,
        text: 'Running',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var param = new FormData();
      this.fileList1.forEach((val) => {
        param.append('files', val.raw)
      })
      this.fileList2.forEach((val) => {
        param.append('files', val.raw)
      })
      axios({
        url: service.upload(),
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        method: 'post',
        timeout: 100 * 60 * 1000,
        data: param
        }).then((res) => {
          if (res.data === 'success') {
            this.status = true
          } else {
            this.status = false
          }
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        loading.close()
      })
    },
    exportImg(type) {
      switch(type) {
        case 1: 
          for(let i = 0; i < this.lists1.length; i++) {
            const url = this.lists1[i].src
            const a = document.createElement('a')
            const event = new MouseEvent('click')
            a.download =  this.lists1[i].src.split('/img/')[0]
            a.href = url
            a.dispatchEvent(event)
          }
          break
        case 2:
          for(let i = 0; i < this.lists2.length; i++) {
            const url = this.lists2[i].src
            const a = document.createElement('a')
            const event = new MouseEvent('click')
            a.download =  this.lists2[i].src.split('/img/')[0]
            a.href = url
            a.dispatchEvent(event)
          }
          break
        case 3:
          {
            const url = this.lists3[0]
            const a = document.createElement('a')
            const event = new MouseEvent('click')
            a.download =  this.lists3[0].split('/img/')[0]
            a.href = url
            a.dispatchEvent(event)
          }
          break
      }
    }
  }
}
</script>

<style lang="less">
.container {
  padding: 0 14px;
  .step {
    .title {
      display: flex;
      justify-content: left;
      align-items: center;
      border: 2px solid rgb(56, 93, 138);
      background: rgb(195, 214, 155);
      margin: 0 0 10px 0;
      padding: 10px 5px;
      img {
        width: 25px;
        margin-right: 5px;
      }
    }
  }
}
.title {
  display: flex;
  justify-content: left;
  align-items: center;
  border: 2px solid rgb(56, 93, 138);
  background: rgb(195, 214, 155);
  margin: 0 0 10px 0;
  padding: 10px 5px;
  img {
    width: 25px;
    margin-right: 5px;
  }
}
.upload_container {
  width: 500px;
}
.el-tabs__header .el-tabs__item.is-active {
  background: rgb(195, 214, 155) !important;
  color: black !important;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item {
  color: black !important;
}
.el-tabs__item:hover {
  color: black !important;
}
.label {
  img {
    width: 20px;
    position: absolute;
    top: 10px;
  }
  span {
    margin: 0px 0px 0px 25px;
  }
}
.tabs {
  list-style-type: none;
  margin-bottom: 50px;
  li {
    display: inline-block;
    margin: 0 10px;
  }
  .img {
    width: 200px;
    height: 200px;
  }
}
</style>
