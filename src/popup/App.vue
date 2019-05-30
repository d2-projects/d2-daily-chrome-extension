<template>
  <el-card shadow="never" class="box-card">
    <template slot="header">D2 Daily 日报提交工具</template>
    <img src="@/assets/image/wx@2x.png"/>
  </el-card>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">
body {
  margin: 0px;
}
.box-card {
  width: 300px;
  border-radius: 0px;
  border: none;
  .el-card__body {
    padding: 0px;
    img {
      width: 100%;
      display: block;
    }
  }
}
</style>
