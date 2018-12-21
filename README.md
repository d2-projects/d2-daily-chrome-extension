# 日报提交助手

将你感兴趣的内容分享到 [D2 日报](https://awesome.fairyever.com/daily/)，如果是 github 开源项目还会同步分享到 [HelloGitHub](https://github.com/521xueweihan/HelloGitHub) 月刊

## 详细介绍

* [掘金《为你准备一份人人奉献，完全开源的日报》](https://juejin.im/post/5c1baa4a6fb9a049ca37516a)

## 安装

### 在线安装

目前日报提交助手已经在 Chrome 上架。您可以前往 [chrome 网上应用店](https://chrome.google.com/webstore/detail/d2-日报提交助手/afhhlfojfpchajfpjefojlojfgmmdbbc) 下载。（商店版本会比 Github 下载的最新版本旧一些，因为更新版本审核时间较长）

![](https://qiniucdn.fairyever.com/20181220210544.png)

![](https://qiniucdn.fairyever.com/20181220210600.png)

### 本地安装

如果您希望使用最新版本的浏览器扩展（Chrome版本发布需要审核时间）或者不方便进入 [chrome 网上应用店](https://chrome.google.com/webstore/detail/d2-日报提交助手/afhhlfojfpchajfpjefojlojfgmmdbbc) 也可以前往 [releases](https://github.com/d2-projects/d2-awesome-daily-submit-chrome-extension/releases) 选择最新版本的 **install-x.x.x.zip** 下载，打开 Chrome 扩展程序的开发者模式后选择“加载已解压的扩展程序”加载本地插件（请先确保您已经将插件文件放在了您不经常移动的目录）。

进入 Chrome 扩展程序页面：

![](https://qiniucdn.fairyever.com/20181220221705.png)

打开开发者模式：

![](https://qiniucdn.fairyever.com/20181220221845.png)

点击“加载已解压的扩展程序”加载扩展资源：

![](https://qiniucdn.fairyever.com/20181220221920.png)

完成：

![](https://qiniucdn.fairyever.com/20181220222202.png)

## 如何使用

扩展安装完成之后，打开您喜欢的网页，右键按图示选择分类之后即可提交给我们：

> 如果是安装插件之前就打开的页面，请刷新一遍

![](https://qiniucdn.fairyever.com/20181220222358.png)

1.1.0 版本之后还支持在分享之前自定义分享介绍：

![](https://qiniucdn.fairyever.com/20181220222506.png)

![](https://qiniucdn.fairyever.com/20181220222741.png)

提交成功之后您的分享将出现在第二天的 [D2 Daily](https://awesome.fairyever.com/daily/) 中。

## API 数据字段

| 名称 | 含义 | 值类型 | 是否必含 | 为何值时不输出到 md |
| --- | --- | --- | --- | --- |
| category | 分类 | String | ✅ | 永远输出 |
| title | 标题 | String | ✅ | 永远输出 |
| description | 介绍 | String | ✅ | 永远输出 |
| url | 地址 | String | ✅ | 永远输出 |
| lang | 编程语言 | String | ❌ | 空字符串 |
| langPrimary | 主要编程语言 | String | ❌ | 永远不出现在 md |
| watch | 仓库 watch | Number | ❌ | null |
| star | 仓库 star | Number | ❌ | null |
| fork | 仓库 fork | Number | ❌ | null |
| vpn | 需要科学上网 | Boolean | ❌ | false |
| video | 是视频内容 | Boolean | ❌ | false |
| device | 提交设备 | String | ✅ | 永远不出现在 md |
| source | 提交来源 | String | ✅ | 永远不出现在 md |

发送数据示例 1：

``` json
{
  "title": "为你准备一份人人奉献，完全开源的日报",
  "description": "掘金",
  "url": "https://juejin.im/post/5c1baa4a6fb9a049ca37516a",
  "lang": [],
  "watch": "",
  "star": "",
  "fork": "",
  "category": "分享",
  "source": "d2",
  "device": "chrome",
  "vpn": false,
  "video": false
}
```

这时输出的 markdown 内容应该为：

```
- name: 分享
  list:
  - name: 为你准备一份人人奉献，完全开源的日报
    note: 掘金
    url: https://juejin.im/post/5c1baa4a6fb9a049ca37516a
```

发送数据示例 2：

``` json
{
  "title": "d2-projects/d2-awesome",
  "description": "Awesome Frontend Developer And Designer",
  "url": "https://github.com/d2-projects/d2-awesome",
  "lang": [
    "Vue",
    "JavaScript",
    "CSS"
  ],
  "watch": "4",
  "star": "17",
  "fork": "3",
  "category": "开源项目",
  "source": "d2",
  "device": "chrome",
  "vpn": true,
  "video": false
}
```

这时输出的 markdown 内容应该为：

```
- name: 开源项目
  list:
  - name: d2-projects/d2-awesome
    note: Awesome Frontend Developer And Designer
    url: https://github.com/d2-projects/d2-awesome
    lang: Vue,JavaScript,CSS
    watch: 4,
    star: 17,
    fork: 3,
    vpn: true
```