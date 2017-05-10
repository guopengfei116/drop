# shell
- shell单词有壳的意思。


# git学习预备知识

## shell

#### 什么是shell
> 在计算机科学中，Shell俗称壳，用来区别于Kernel（核），是指“提供使用者使用界面”的软件（命令解析器）。
它类似于DOS下的command和后来的cmd.exe。它接收用户命令，然后调用相应的应用程序。

#### 图形界面shell
> 图形界面shell：通过提供友好的可视化界面，调用相应应用程序；
比如windows系列操作系统，Linux系统上的图形化应用程序GNOME、KDE等。

#### 命令行shell
> 通过键盘输入特定命令的方式，调用相应的应用程序；
如windows系统的cmd.exe、Windows PowerShell，
Linux系统的Bourne shell (sh)、Bourne Again shell (bash)等。

## bash
> bash是shell的一种，Linux系统中各个shell的功能都差不多，
目前大多数版本的Linux都默认使用bash ，所以我们主要学习bash的使用。

#### bash命令格式：
命令 [-options || --options] [参数]，如：tar -zxvf dome.tar.gz

#### 选项备注：
-后面跟着的是单词的简写形式；--后面跟着的是单词的全面。

#### 自动补全功能：
按tab键会自动尝试补全命令，连按两次会将所有匹配的内容显式出来。

#### 常见命令：
- pwd(Print Working Directory) 查看当前目录
- cd(Change Directory) 切换目录，如 cd/etc
- ls(List) 查看当前目录下内容，如 ls -al
- mkdir(Make Directory) 创建目录
- touch 创建文件
- cat(Concatenate and print files) 在监控器上查看文件全部内容
- less 按页查看文件
- rm(Remove) 删除文件或文件夹，如 rm index.html、rm -rf dir
- mv(Move) 移动文件或重命名，如 mv index.html ./dome/index.html
- cp(Copy) 复制文件，如 mv index.html ./dome/index.html
- \>和>>重定向，如 echo hellow world! > index.text，> 覆盖，>> 追加。

## vi编辑器
> 如同Windows下的记事本，vi编辑器是Linux下的标配，通过它我们可以创建、编辑文件。
它是一个随系统一起安装的文本编辑软件。

#### 三种模式
> vi编辑器提供了3种模式，分别是命令模式、输入模式、末行模式，
每种模式下用户所能进行的操作是不一样的。

###### 命令模式 ==> 执行命令
默认模式，在该模式中，可以输入命令来执行许多功能。
在其它两种模式下可通过esc切换至该模式。

###### 输入模式 ==> 输入文本
在该模式中，可以进行文本输入与编辑。
在命令模式中输入i、a、o切换至该模式。

###### 末行模式 ==> 执行待定命令
该模式类似命令模式，有些特殊命令需要在该模式下运行，比如文件的保存与退出。

###### 三种模式切换示意图
![vi三模式切换](./vi.jpg)</br>
通过上图我们发现，输入模式是不能直接切换到末行模式的，必须要先切回到命令模式（按ESC键）。

#### 常见命令
> 打开/创建文件：vi 文件路径

命令模式：
- ZZ：保存并退出
- u：撤销操作，可多次使用
- x：删除
- dd：删除当前行
- yy：复制当前行
- p：粘贴内容
- ctrl+f：向前翻页
- ctrl+b：向后翻页
- i：进入编辑模式，当前光标处插入
- I：进入编辑模式，光标移动到行首
- a：进入编辑模式，当前光标后插入
- A：进入编辑模式，光标移动到行尾
- o：进入编辑模式，当前行下面插入新行
- O：进入编辑模式，当前行上面插入新行
- .：重复执行命令

末行模式：
- w [filename]：保存或另存为
- q：退出
- wq：保存并退出
- e!：撤销更改，返回到上一次保存的状态
- q!：不保存强制退出
- set nu：设置行号

编辑模式：
和我们在window编辑器的使用相似。
