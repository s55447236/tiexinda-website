# 官网搜索提交与获客准备清单

更新时间：2026-05-14

## 1. 当前官网地址

主域名：

```text
https://bjtxd.cn/
```

站点地图：

```text
https://bjtxd.cn/sitemap.xml
```

robots：

```text
https://bjtxd.cn/robots.txt
```

当前可提交页面：

```text
https://bjtxd.cn/
https://bjtxd.cn/cases.html
https://bjtxd.cn/power-engineering.html
https://bjtxd.cn/railway-crossing.html
https://bjtxd.cn/line-relocation.html
https://bjtxd.cn/crossing-frame.html
https://bjtxd.cn/site-map.html
https://bjtxd.cn/privacy.html
https://bjtxd.cn/terms.html
```

案例详情页：

```text
https://bjtxd.cn/projects/anding-110kv-jinghu-railway-crossing.html
https://bjtxd.cn/projects/rongbai-110kv-jinbao-hsr-protection.html
https://bjtxd.cn/projects/jizhou-10kv-panyang-rail-removal.html
https://bjtxd.cn/projects/datai-10kv-electrified-railway-scaffold.html
https://bjtxd.cn/projects/tongtang-35kv-line-drop-protection.html
https://bjtxd.cn/projects/lingang-catenary-emergency-repair.html
https://bjtxd.cn/projects/wujiapai-10kv-jinji-cable-underground.html
https://bjtxd.cn/projects/liuziying-110kv-substation-jinji-cable-service.html
https://bjtxd.cn/projects/wenfeng-pipeline-caofeidian-railway-underpass.html
https://bjtxd.cn/projects/zhangjiakou-pv-110kv-jingbao-railway-crossing.html
https://bjtxd.cn/projects/tangshan-2025-crossing-service-framework.html
```

## 2. 上传到 COS 的文件

先上传并覆盖这两个文件：

```text
sitemap.xml
robots.txt
```

如果要同步全站 canonical、分享链接和结构化数据，再上传：

```text
index.html
cases.html
privacy.html
terms.html
404.html
```

上传后检查：

```text
https://bjtxd.cn/
https://bjtxd.cn/sitemap.xml
https://bjtxd.cn/robots.txt
```

要求结果：

```text
状态码 200
证书域名匹配 bjtxd.cn
sitemap.xml 中 lastmod 为 2026-05-14
```

## 3. 搜索平台提交

### 百度搜索资源平台

入口：

```text
https://ziyuan.baidu.com/
```

操作：

```text
添加站点：https://bjtxd.cn/
验证站点所有权
提交 sitemap：https://bjtxd.cn/sitemap.xml
```

优先级最高。国内 B2B 搜索、工程单位、采购人员做公司背调时，百度仍然必须覆盖。

### Google Search Console

入口：

```text
https://search.google.com/search-console
```

操作：

```text
添加 URL 前缀资源：https://bjtxd.cn/
验证站点所有权
提交 sitemap：https://bjtxd.cn/sitemap.xml
```

用于覆盖外企、海外工程相关人员、浏览器默认搜索和通用站点健康检查。

### 360 站长平台

入口：

```text
https://zhanzhang.so.com/
```

操作：

```text
添加站点：https://bjtxd.cn/
验证站点所有权
提交 sitemap：https://bjtxd.cn/sitemap.xml
```

用于覆盖部分政企电脑、国产浏览器和 360 安全浏览器默认搜索流量。

### 搜狗站长平台

入口：

```text
https://zhanzhang.sogou.com/
```

操作：

```text
添加站点：https://bjtxd.cn/
验证站点所有权
如有 sitemap 权限，提交：https://bjtxd.cn/sitemap.xml
```

搜狗 sitemap 权限不一定默认开放；如果没有权限，先完成站点验证即可。

## 4. 站点验证记录表

拿到平台给的验证码后填这里，便于追踪。

| 平台 | 验证方式 | 需要上传/添加的内容 | 状态 |
| --- | --- | --- | --- |
| 百度 | HTML 文件 | `baidu_verify_codeva-howQ3k0qYq.html` | 已验证；API 已提交首页、案例页、政策页及 4 个业务专题页；sitemap 页当前配额为 0，后续补交 |
| Google | HTML 文件 | `google5de13516c6c4ed1b.html` | URL 前缀资源已验证；已提交 `/sitemap.xml`；初始显示“无法抓取”时先等待重新抓取 |
| 360 | HTML 文件 | `99a39870414c402afec109b714ff71dc.txt` | 已验证为拥有者；待补交 sitemap 或 URL |
| 搜狗 | HTML 文件 / Meta / DNS | 待填写 | 待验证 |

建议优先选 HTML 文件验证：平台会给一个文件，上传到 COS 根目录即可，不需要改代码。

## 5. 收录观察记录

| 日期 | 平台 | 操作 | 结果 |
| --- | --- | --- | --- |
| 2026-05-14 | 百度 | 验证站点并通过 API 提交首页、案例页、隐私页、条款页 | API 返回成功 4 条，剩余 6 条；搜索结果尚未出现属正常等待期 |
| 2026-05-14 | 百度 | 通过 API 提交 4 个业务专题页：电力工程、铁路跨越、线路迁改、跨越架 | API 返回成功 4 条，剩余 2 条 |
| 2026-05-14 | Google | HTML 文件验证通过并提交 `/sitemap.xml` | Search Console 初始显示“无法抓取”，线上 sitemap 实测 200，等待 Google 重新抓取 |
| 2026-05-15 | 360 | HTML 文件验证站点 `bjtxd.cn` | 站点权限显示“拥有者”，待提交 sitemap 或 URL |

## 6. 面向电网、国企和总包的获客渠道

不要只依赖百度。官网 SEO 的作用是“让对方背调时能搜到、看起来可信”，但电网、国企、总包的项目机会通常还来自这些渠道：

```text
国家电网电子商务平台
南方电网供应链统一服务平台
全国公共资源交易平台
中国招标投标公共服务平台
各省/市公共资源交易中心
总包单位供应商库
业主或设计院推荐
已有项目案例背书
```

建议每周固定检索关键词：

```text
铁路跨越
跨越防护
线路迁改
输电线路迁改
跨越架
涉铁施工
电力线路迁改
架空改电缆
下穿铁路
```

## 7. 官网下一步内容建设

已新增 4 个业务专题页，用于承接品牌词和业务关键词：

```text
power-engineering.html     电力工程 / 电力工程施工 / 铁鑫达电力工程
railway-crossing.html      铁路跨越工程 / 涉铁施工 / 铁路跨越防护
line-relocation.html       输电线路迁改 / 电力线路迁改 / 架空改电缆入地
crossing-frame.html        跨越架搭拆 / 跨越架工程 / 电气化铁路跨越
```

每页结构：

```text
业务场景
服务范围
实施流程
需要客户提供的资料
典型案例
资质与安全能力
联系方式
```

这些页面比首页更容易命中长尾搜索词，也更适合客户转发给内部评审。

## 8. 搜索曝光提升计划

### 第一优先级：让品牌词尽快可搜到

目标关键词：

```text
铁鑫达
北京铁鑫达
北京铁鑫达电力工程有限公司
bjtxd
```

动作：

```text
保持首页 title、H1、logo alt、页脚版权中出现完整公司名称
在百度、Google、360、搜狗完成站点验证和链接提交
在企业信用、招投标、供应商库、地图、行业目录等公开页面统一使用官网链接
```

### 第二优先级：覆盖项目型长尾词

目标关键词：

```text
输电线路迁改
电力线路迁改
铁路跨越工程
涉铁施工防护
跨越架搭拆
架空改电缆入地
电气化铁路跨越防护
```

动作：

```text
每个业务专题页继续补充 800-1500 字专业内容
每个典型案例拆成独立案例详情页
案例详情页标题包含工程类型、线路等级、跨越对象和服务内容
```

### 第三优先级：提升专业可信度

建议新增页面：

```text
qualification.html     资质与安全能力
projects/              典型案例详情目录
news/                  工程知识或项目动态目录
contact.html           联系我们独立页
```

内容重点：

```text
资质证书名称、许可范围、安全生产能力
服务过的项目类型、甲方类型、线路等级、跨越对象
现场照片的清晰 alt 文案
真实联系方式、公司地址、备案号、统一社会信用代码
```

### 已补充的低风险 SEO 项

```text
site-map.html          HTML 站点地图，汇总官网核心页面
sitemap.xml           已加入 https://bjtxd.cn/site-map.html
首页 / 案例页页脚      已增加“站点地图”入口
```
