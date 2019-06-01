<style lang="scss">
.el-notification.right {
  .el-notification__title {
    text-align: left;
  }
  .el-notification__content {
    text-align: left;
  }
}
.d2-daily-extension-content--dialog {
  .el-dialog {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    text-align: left;
  }
}
.d2-daily-extension-content {
  text-align: left;
  .el-form-item {
    text-align: left;
    .el-checkbox {
      margin-right: 0px;
    }
  }
}
</style>


<template>
  <el-dialog
    title="提交到 D2Daily"
    :visible.sync="dialogVisible"
    width="400px"
    top="0px"
    :append-to-body="true"
    :close-on-click-modal="false"
    :show-close="false"
    class="d2-daily-extension-content--dialog">
    <el-form
      ref="form"
      label-position="top"
      :rules="rules"
      :model="form"
      size="default"
      class="d2-daily-extension-content"
      style="display: block!important;">
      <el-form-item prop="title" label="标题">
        <el-input type="text" v-model="form.title" placeholder="标题"/>
      </el-form-item>
      <el-form-item prop="description" label="介绍">
        <el-input type="textarea" :rows="3" v-model="form.description" placeholder="介绍"/>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.isChinese" border>中文</el-checkbox>
        <el-checkbox v-model="form.video" border>视频类型</el-checkbox>
        <el-checkbox v-model="form.vpn" border>网络不便</el-checkbox>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Notification } from 'element-ui'
import crawler from './utils/crawler'
import service from './plugin/axios'

export default {
  name: 'app',
  data () {
    return {
      dialogVisible: false,
      // 表单
      form: {
        title: '',
        description: '',
        isChinese: false,
        video: false,
        vpn: false
      },
      // 校验
      rules: {
        title: [
          { required: true, message: '请输入邮箱', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入介绍', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    /**
     * 关闭弹框
     */
    close () {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    /**
     * @description 提交登录信息
     */
    submit () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          service({
            url: '/api/v1/project/recommend/',
            method: 'post',
            data: this.form
          })
            .then(res => {
              this.close()
              Notification.success({
                title: '提交成功',
                message: '您的提交最早将会出现在明天的日报中'
              })
            })
            .catch(err => {
              Notification.error({
                title: '提交失败',
                message: err.message
              })
            })
        } else {
          Notification.error({
            title: '表单校验失败'
          })
        }
      })
    },
    /**
     * 接收消息
     */
    onMessage ({ action, category }) {
      const data = {
        // 页面信息
        ...crawler(),
        // 类型
        category,
        // api 需要
        source: 'd2',
        device: 'chrome'
      }

      this.form = data

      this.dialogVisible = true
    }
  }
}
</script>
