<template>
  <div id="app">
    <el-header style="padding: 0">
      <h1>
        <img :src="pic1">
        <div>MCHGC Website: Metabolic Classifier for Human Gastric Cancer</div>
      </h1>
    </el-header>
    <el-main><Upload /></el-main>
    <el-footer style="padding: 0">
      <div style="font-weight: bolder">
        <div>Reference: Yuan Q, Deng D, Pan C, Ren J, Wei T, Wu Z, Zhang B, Li S, Yin P, Shang D. Integration of transcriptomics, proteomics, and metabolomics data to reveal HER2-associated metabolic heterogeneity in gastric cancer with response to immunotherapy and neoadjuvant chemotherapy. Front Immunol. 2022 Aug 4;13:951137. doi: 10.3389/fimmu.2022.951137. PMID: 35990657; PMCID: PMC9389544.</div>
        <div>Contact:</div>
        <div>Qihang Yuan, <a href="javascript:void(0)">qihangdy@163.com</a>; Dong Shang, <a href="javascript:void(0)">shangdong@dmu.edu.cn</a>; Peiyuan Yin, <a href="javascript:void(0)">yinperry@126.com</a>; Hong Xiang, <a href="javascript:void(0)">xianghong@dmu.edu.cn</a>.</div>
      </div>
    </el-footer>
  </div>
</template>

<script>
import pic1 from './assets/title.png'
import Upload from './components/Upload.vue'

export default {
  name: 'App',
  components: {
    Upload
  },
  data() {
    return {
      pic1
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* padding: 0 10px; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
h1 {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgb(56, 93, 138);
  border-right: transparent;
  border-left: transparent;
  background: rgb(195, 214, 155);
  margin-top: 0px;
  img {
    width: 80px;
    margin-right: 10px;
  }
}
</style>
