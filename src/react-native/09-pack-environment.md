# Package and Express

## Android

Android要求所有应用都要有一个数字签名才会被允许安装在用户手机上，因此在把应用发布到应用商店之前，需要对生成的APK包进行签名。

### 生成签名文件

接下来我们需要使用`keytool`工具生成签名文件，这是`Java`提供的密钥和证书管理工具。

[keytool说明文档]<https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/keytool.html>

keytool全部工具列表[OPTIONS]

```
 -certreq            生成证书请求
 -changealias        更改条目的别名
 -delete             删除条目
 -exportcert         导出证书
 -genkeypair         生成密钥对
 -genseckey          生成密钥
 -gencert            根据证书请求生成证书
 -importcert         导入证书或证书链
 -importpass         导入口令
 -importkeystore     从其他密钥库导入一个或所有条目
 -keypasswd          更改条目的密钥口令 -list               列出密钥库中的条目
 -printcert          打印证书内容
 -printcertreq       打印证书请求的内容
 -printcrl           打印 CRL 文件的内容
 -storepasswd        更改密钥库的存储口令
```

genkeypair工具选项[OPTIONS]

```
-alias <alias>                  要处理的条目的别名
-keyalg <keyalg>                密钥算法名称
-keysize <keysize>              密钥位大小
-sigalg <sigalg>                签名算法名称
-destalias <destalias>          目标别名
-dname <dname>                  唯一判别名
-startdate <startdate>          证书有效期开始日期/时间
-ext <value>                    X.509 扩展
-validity <valDays>             有效天数
-keypass <arg>                  密钥口令
-keystore <keystore>            密钥库名称
-storepass <arg>                密钥库口令
-storetype <storetype>          密钥库类型
-providername <providername>    提供方名称
-providerclass <providerclass>  提供方类名
-providerarg <arg>              提供方参数
-providerpath <pathlist>        提供方类路径
-v                              详细输出
-protected                      通过受保护的机制的口令
```

进入`项目/android/app`目录，然后运行下面的命令，在此目录下生成签名证书。

```shell
# 参数根据自己的需求进行填写
keytool -genkeypair -v -keyalg RSA -keysize 2048 -validity 365  -keystore my-store-release-key.keystore -alias my-store -keypass 123456789 -storepass 123456789
```

### 修改Gradle构建工具配置

#### gradle属性文件

修改`项目/android/gradle.properties`文件，增加如下配置

```properties
MY_STORE_RELEASE_STORE_FILE=my-store-release-key.keystore
MY_STORE_RELEASE_KEY_ALIAS=my-store
MY_STORE_RELEASE_STORE_PASSWORD=123456789
MY_STORE_RELEASE_KEY_PASSWORD=123456789
```

#### gradle构建配置

修改`项目/android/app/build.gradle`文件，增加`signingConfigs`配置，修改`buildTypes.release`配置。

```gradle
// 未作改动...

android {
  // 未作改动...

  // 增加配置项，这里使用的常量就是刚才在properties属性文件里配置的东东。
  signingConfigs {
    release {
      storeFile file(MY_STORE_RELEASE_STORE_FILE)
      keyAlias MY_STORE_RELEASE_KEY_ALIAS
      storePassword MY_STORE_RELEASE_STORE_PASSWORD
      keyPassword MY_STORE_RELEASE_KEY_PASSWORD
    }
  }
  buildTypes { 
    release {
      // 未作改动...
      // 增加配置项
      signingConfig signingConfigs.release 
    }
  }

  // 未作改动...
}

// 未作改动...
```

### 修改App名称和图标

在项目下有个`android/app/src/main/AndroidManifest.xml`描述文件，里面配置了App的各种信息，从里面我们可以得知，App的名称使用了`@string/app_name`，Icon使用了`@mipmap/ic_launcher`。

修改App名称，需要打开`android/app/src/main/res/valuse/strings.xml`配置文件，修改标签里面的值就可以修改App名称。

修改App图标，需要替换`android/app/src/main/res/mipmap–xxx`目录下的图片，分为mdpi(48*48)、hdpi(72*72)、xhdpi(96*96)、xxhdpi(144*144)、xxxhdpi(192*192)五种大小，每种大小都有圆形和方形两种图标。

### 打包

进入`项目/android`目录下，执行目录下的构建脚本。

如果出现错误：`BUILD FAILED`，下面会有一些提示，记得仔细核查是不是配置的属性或者名称写错了，或者网上查阅资料解决。

如果构建成功：`BUILD SUCCESSFUL`，那么在`项目/android/app/build/outputs/apk/release`文件夹中找到可以发布的`app-release.apk`文件。

```shell
gradlew assembleRelease
```

### 应用商店发布

完成应用打包后，就可以将应用发布到应用商店，众所周知，除了官方的Google Play商店，国内也有很多Android应用商店，通常我们需要到每个商店注册应用信息，按照对方的流程进行发布。

- 腾讯应用宝：http://sj.qq.com
- 百度手机助手：http://shouji.baidu.com
- 360手机助手：http://sj.360.com
- 华为应用市场：http://app.hicloud.com
- 小米商店：http://app.mi.com
- OPPO商店：http://store.oppomobile.com
- 豌豆荚：http://www.wandoujia.com

当然，还有一些可以一键发布到N多市场的平台，比如[酷传]<http://www.kuchuan.com/>，这样就可以节省Android应用发布的时间和精力。
