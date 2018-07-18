# Weex
- 参照文档<http://weex.apache.org/cn/references/index.html>

#### 准备工作
- 一台android设备，通过数据线连接到电脑，并`启用USB调试`模式
- 运行`npm install weex-toolkit -g`命令安装`weex-toolkit`脚手架工具来辅助开发和调试，依赖很多可能比较慢

#### 打包
1. 运行`weex create project-name`命令初始化一个Weex项目
2. 运行`cd project-name`命令进入项目根目录
3. 运行`weex platform add android`命令安装android模板，需要联网安装可能比较慢
4. 运行`weex run android`命令打包部署到模拟器或开发机中