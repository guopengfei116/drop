# Socket

Java 提供了用于表示 IP 地址的 InetAddress 类；用于数据传输基于 UDP 协议的 DatagramPacket 数据包类、DatagramSocket 数据传输类；用于数据传输 基于 TCP 协议的 Socket 客户端类、ServerSocket 服务端类。

## IP - InetAddress

java.net.InetAddress 类表示互联网中的 IP 地址，是一个单例。

| 静态 | 返回值 | 方法名与参数 |
|    -    |     -     |           -          |
| static | InetAddress | getByName(String host) |
| static | InetAddress | getLocalHost() |
|          | String | getHostName |
|          | String | getHostAddress |

### **静态方法**

- static InetAddress  getLocalHost()

```java
//  获取本地主机 InetAddress 实例
InetAddress locaInet = InetAddress.getLocalHost();
```

- static InetAddress getByName(String hostName)

```java
//  获取其他主机 InetAddress 实例
InetAddress inet = InetAddress.getByName("192.168.1.100");
```

### **实例方法**

- String getHostAddress()

```java
//  获取主机 IP 地址
String ip = inet.getHostAddress();
```

- String getHostName()

```java
//  获取主机名
String hostName = inet.getHostName();
```

- String toString()

```java
//  获取主机名 和 IP地址
String hostNameIP = inet.toString();
```

- - -

## UDP 传输

一种面向无连接的通信协议，通信时数据的发送端和接收端不用建立连接，计算机之间可以任意地发送数据。<br />
UDP 通信的过程类似于收发快递，但是快递比较特殊，一旦投递无法退回重发。<br />
收发快递需要两个角色，接收者于发送者；接收者需要有一个稳定的住所接收快递；发送者需要对物品进行打包，注明收获地址于收获人，然后进行投递。<br />
UDP 协议传送快递是有风险的，如果收货人更换住所，或者发货人写错地址，都会导致货物丢失。

### **相关类** - UDP

java.net.DatagramSocket 类用于创建发送者和接收者。<br />
java.net.DatagramPacket 类用于数据打包存储。

#### 数据包 - DatagramPacket

| 静态 | 返回值 | 方法名与参数 |
|    -    |     -     |           -          |
|          |  InetAddress  |  getAddress()  |
|          |  int                 |  getPort()  |
|          |  byte[]            |  getData()  |
|          |  int                 |  getLength  |

#### 数据包网络收发 - DatagramSocket

| 静态 | 返回值 | 方法名与参数 |
|    -    |     -     |           -          |
|          |  void  |  receive(DatagramPacket p)  |
|          |  void  |  send(DatagramPacket p)  |

### **接收数据** - UDP

1. 创建 DatagraSocket 对象，并指定端口号；相当于有了收获地址和联系人
2. 创建 DatagramPacket 对象；相当于有了存放快递的地方
3. 接收数据，并存储到 DatagramPacket 对象中；相当于接收并置放快递
4. 读取数据内容；相当于拆快递
5. 释放资源；相当于停止接收业务

```java
// 接收数据
DatagramSocket receiver = new DatagramSocket(6666);
DatagramPacket receivePacket = new DatagramPacket(new byte[1024], 1024);
receiver.receive(receivePacket);

// 获取发送者 IP地址 和  主机名
InetAddress inet = receivePacket.getAddress();
String inetIP = inet.getHostAddress();
String inetName = inet.getHostName();

// 获取数据 和 数据量
byte[] data = receivePacket.getData();
int dataLen = receivePacket.getLength();

receiver.close();
```

### **发送数据** - UDP

1. 创建 DatagramSocket 对象；相当于有了发送者
2. 准备发送数据；相当于备货
3. 创建 DatagramPacket 对象，并封装数据；相当于对货物打包，并贴上收获地址和联系人
4. 发送数据；相当于发送快递
5. 释放资源；相当于停止发送业务

```java
DatagramSocket addresser = new DatagramSocket();

// 发送数据
byte[] sendData = "联系K900".getBytes();
DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length, InetAddress.getByName("192.168.1.100"), 6666);
addresser.send(sendPacket);

addersser.close();
```

### **注意事项** - UDP

创建接收端的 DatagramSocket 对象时，必须指定一个端口号，这样就可以监听指定端口，等待接收发送端传送过来的数据。<br />
创建发送端的 DatagramPacket 对象时，必须指定接收端 IP 地址和端口号，这样才能知道数据要发送到哪。

- - -

## TCP

一种面向连接的通信协议，严格区分客户端于服务器端，通信时，必须先由客户端去连接服务器端才能实现通信，服务器端不可以主动连接客户端。<br />
TCP 在通信时，客户端会先对服务端进行试探，如果服务端进行了响应，那么客户端才会开发进行数据传输，这被称为 TCP 的三次握手。<br />
TCP 是安全的，因为在连接前先做了测试，测试通过后才开始发送数据；并且在之后发送数据后都会等待服务端的响应，以确保数据发送成功。<br />
相比 UDP 协议，TCP 虽然安全，但是增强了通信过程，所以速度会降低。

### **相关类** - TCP

java.net.ServerSocket 类用于创建服务器端。<br />
java.net.Socket 类用于创建客户端。

#### 服务器端 - ServerSocket

ServerSocket 对象负责监听某台计算机的某个端口号。
在创建实例后，需要调用实例的 accept 方法接收客户端的请求。
当执行 accept 方法后，服务器端会发生阻塞，直到客户端发送连接请求，
方法才会返回一个 Socket 对象用于和客户端实现通信。

| 静态 | 返回值 | 方法名与参数 |
|    -    |     -     |           -          |
|          |  Socket          |  accept()  |
|          |  InetAddress  |  getInetAddress()  |

#### 客户通信 - Socket

Socket 对象负责实现通信，既可以作为客户端请求数据，又可以作为发送端响应数码。

| 静态 | 返回值 | 方法名与参数 |
|    -    |     -     |           -          |
|          |  int                    |  getPort()  |
|          |  InetAddress     |  getLocalAddress()  |
|          |  InputStream     |  getInputStream  |
|          |  OutputStream  |  getOutputStream  |
|          |  void                  |  close()  |

### **服务端** - TCP

1. 创建服务器 ServerSocket 对象
2. 监听端口，等待客户端连接
3. 拿到客户端 Socket 对象，通过输入流读取数据，输出流响应数据
4. 释放资源

```java
ServerSokcet serverSocket = new ServerSocket(6666);
Socket socket = serverSocket.accept();

// 获取数据并响应
InputStream inStream = socket.getInputStream();
OutputStream outStream = socket.getOutputStream();
outStream.write("拜拜".getBytes());

// 释放IO流，中断连接
inStream.close();
outStream.close();
socket.close();
```

### **客户端** - TCP

1. 创建 Socket 对象，指定服务端 IP 地址和端口号，连接服务端
2. 通过输出流发送数据，输入流接收数据
3. 释放资源

```java
Socket socket = new Socket("192.168.1.100", 6666);

// 获取数据
OutputStream outStream = socket.getOutputStream();
outStream.write("hello".getBytes());
InputStream inStream = socket.getInputStream();

//  释放IO流，中断连接
inStream.close();
socket.close();
```

- - -

## 文件上传

为保证上传的文件数据完整性，所以需使用 TCP 协议实现。

### **服务端**

```java
public static void main(String[] args) {
  try {
    // 1. 启动服务
    ServerSocket serverSocket = new ServerSocket(6666);

    // 2. 等待客户端连接，支持多客户同连
    while (true) {
      final Socket socket = serverSocket.accept();

      // 3. 每来一个客户，开启新线程进行处理
      new Thread() {
        public void run() {
          InputStream socketIn = null;
          OutputStream socketOut = null;
          BufferedOutputStream  fileOut = null;

          try {
            // 4. 打印客户端信息
            InetAddress inet = socket.getInetAddress();
            System.out.println(inet.getHostName() + ":" + inet.getHostAddress() + "已经连入服务");

            // 5. 获取Socket输入输出流
            socketIn = socket.getInputStream();
            socketOut = socket.getOutputStream();

            // 6. 从Socket输入流中读数据，写入到文件输出流
            fileOut = new BufferedOutputStream(new FileOutputStream("test.jpg"));
            byte[] tempBuffer = new byte[1024];
            int tempLen = -1;
            while ((tempLen = socketIn.read(tempBuffer)) != -1) { // read方法会阻塞程序，只有收到客户端数据或传输结束消息时才会继续执行
              fileOut.write(tempBuffer, 0, tempLen);
              System.out.println("写入" + tempLen + "字节数据");
            }

            // 7. 文件写完后，使用Socket输出流响应客户端信息
            socketOut.write("上传成功!".getBytes());

            // 8. 释放资源
            fileOut.close();
            socketOut.close();
            socketIn.close();
            socket.close();
          } catch (Exception e) {
            e.printStackTrace();
          }
        }
      }.start();
    }

  } catch (IOException e) {
    e.printStackTrace();
  }
}
```

### **客户端**

```java
public static void main(String[] args) {
  Socket socket = null;
  InputStream socketIn = null;
  OutputStream socketOut = null;
  BufferedInputStream fileIn = null;
  String imgPath = "C:\\Users\\62613\\Desktop\\xxx.jpg";

  try {
    // 1. 连接服务端
    socket = new Socket("127.0.0.1", 6666);

    // 2. 获取Socket输入输出流
    socketIn = socket.getInputStream();
    socketOut = socket.getOutputStream();

    // 3. 读取文件字节流，使用Socket输出流发送给服务端
    fileIn = new BufferedInputStream(new FileInputStream(imgPath));
    byte[] tempBuffer = new byte[1024];
    int tempLen = -1;
    while((tempLen = fileIn.read(tempBuffer)) != -1) {
      socketOut.write(tempBuffer, 0, tempLen);
    }

    // 4. 告知服务端数据传送完毕，如果不调用，服务端会一直等待客户端数据传送
    socket.shutdownOutput();

    // 5. 接收服务端响应并打印
    StringBuilder result = new StringBuilder();
    while((tempLen = socketIn.read(tempBuffer)) != -1) {
      result.append(new String(tempBuffer, 0, tempLen));
    }
    System.out.println("服务端响应：" + result.toString());

    // 6. 释放资源
    fileIn.close();
    socketOut.close();
    socketIn.close();
    socket.close();
  } catch (IOException e) {
    e.printStackTrace();
  }
}
```

- - -

## 总结·

### **UDP 交互**

#### 发送端

1. 创建 DatagramSocket 对象
2. 准备待发送数据
3. 创建 DatagramPacket 对象，封装数据
4. 发送数据
5. 释放资源

#### 接收端

1. 创建 DatagramSocket 对象
2. 创建 DatagramPacket 对象
3. 接收数据存储到 DatagramPacket 对象
4. 获取数据
5. 释放资源

### **TCP 交互**

#### 服务端

1. 创建 ServerSocket 对象，指定端口
2. 启动服务，监听端口，等待客户端连接
3. 拿到客户端 Socket 对象，通过输入流读取数据，输出流响应数据
4. 释放资源

#### 客户端

1. 创建 Socket 对象，指定服务端 IP 地址和端口号，连接服务端
2. 通过输出流发送数据，输入流接收数据
3. 释放资源
