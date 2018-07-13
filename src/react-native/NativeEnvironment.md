# NativeEnvironment

凡是安装开发环境，都需要注意以下几点，防止意外错误的发生：

- 安装的软件目录中不要出现**中文**与**特殊字符**，尤其是**空格**
- 计算机名称`(控制面板\所有控制面板项\系统中设置)`不要**中文**，改成**英文**，也不要**特殊字符**
- 因为这些环境都依赖我们的操作系统，如果系统是被优化阉割的版本可能会安装失败

### 环境预览
- 参照文档 <http://reactnative.cn/docs/0.42/getting-started.html>
![预览](img/environment_config.png)

## Node环境

- - - - - -

nvm
---

nvm是NodeJS的版本管理工具，使用它可以在本地安装多个不同版本的NodeJS，并根据需要动态切换。安装nvm之前，需要先卸载之前单独安装过的NodeJS，在控制面板中进行卸载即可。

下载

- mac下载地址: https://github.com/creationix/nvm/releases
- [点击预览](https://github.com/creationix/nvm/releases)

- windows下载地址：https://github.com/coreybutler/nvm-windows/releases
- [点击预览](https://github.com/coreybutler/nvm-windows/releases)

安装说明

windows用户下载一键安装版本`nvm-setup.zip`, 解压后傻瓜式安装即可。<br />
安装过后，在命令行窗口运行`nvm version`命令进行检测，如果显示安装的版本号，即成功。<br />

- [参考文档]<https://www.jianshu.com/p/1d80cf35abd2>

配置淘宝镜像

为了提高nvm在国内的下载速度，最好修改源镜像下载地址。首先找到nvm的安装目录，编辑settings.txt文件，添加如下配置，含义是使用淘宝镜像下载64位的node或npm，如果是32位操作系统，那么arch设为32。<br />

- [参考文档]<https://www.jianshu.com/p/253cb9003411>

```txt
arch: 64
node_mirror: http://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

nvm常用命令

- nvm install      # 安装指定版本
- nvm uninstall    # 卸载指定版本
- nvm list         # 列出已安装的版本
- nvm use          # 版本切换
- nvm on           # 启用nvm
- nvm off          # 关闭nvm
- nvm root         # nvm安装路径

node
---

nvm安装配置成功后，接下来安装node只需一条命令即可。安装完毕后，通过use命令切换到指定版本的node，最好是官方推荐的稳定版本。然后运行`node -v`命令进行检测，只要显示出你刚刚切换的node版本，就大功告成了。<br />

- [nvm安装参考文档]<https://www.jianshu.com/p/28bca6529150>
- [node官方版本查阅]<https://nodejs.org/zh-cn/>

```shell
# 安装官方推荐的稳定版本
nvm install 8.11.3
# 安装最新版本，体验新特性
nvm install stable
```

npm淘宝镜像配置

node安装后，npm就跟着一起被安装了，为了提供国内的下载速度，同样把npm的源镜像地址改为淘宝的，在命令行窗口中运行如下命令进行配置。<br />

- [参考文档]<https://www.jianshu.com/p/253cb9003411>

```shell
npm config set registry https://registry.npm.taobao.org
```

#### **Python环境**
- 安装 `2.×` 的版本的 `python`, 安装时注意勾选安装界面上的 `Add Python to path`, 自动将Python添加到`环境变量`
- 安装完毕后, 在命令行中键入 `python --version` 进行测试，显示出版本号即成功
![预览](img/python.png)

#### **Java环境**
- 下载1.8版本JDK, <http://www.oracle.com/technetwork/java/javase/overview/index.html>
- 安装完毕后, 需要手动配置环境变量<http://jingyan.baidu.com/article/f96699bb8b38e0894e3c1bef.html>
    1. 系统环境变量中新增 `JAVA_HOME` 变量，值为 `C:\Program Files\Java\jdk1.8.0_112`, 即 jdk 的`安装`根路径
    2. 修改系统环境变量 `Path`, 在 Path 之后新增 `%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin`
    3. 新增 `CLASSPATH` 变量, 值为 `.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar`
    4. 配置完毕后保存并退出, 在命令行中分别键入`java` 与 `javac` 进行测试, 出现命令选项即配置成功