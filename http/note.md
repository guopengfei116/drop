# cookie
> 这是存储在客户端的一小段数据，数据格式为字符串。

## cookie作用

- 后端在客户端中记录一些信息

- 前端自己通过cookie在本地存储一些数据，但是现在支持H5的都改用localstorage
	+ 添加或者修改cookie
        - 对于前端来说，可以通过document.cookie获取当前域名当前路径下的所有cookie
        - 可以通过document.cookie = 'key=value'的方式添加或修改cookie，没有删除一说
    
    + 删除cookie
        - 在设置cookie时，通过;号可以添加额外的属性配置
        - 有一个expires属性可以设置cookie的过期时间，如果设置这个时间为当前之前，那么就删除了cookie
        - 没有设置expires属性的cookie，默认过期时间为一个会话结束

    + 不同的域名下可以拥有相同名字的cookie，但是它们只作用与自己对应的域名下
    
    + 相同域名，不同路径下也可以拥有相同名字的cookie，但是它们只作用与自己对应的路径下
        + 上级路径的cookie，作用范围包含子路径
        + 如果对于一个子路径来说，即有自己路径的cookie，上级目录也有对应cookie，优先得到自己路径下的cookie值

# session
> 这是存储在服务端的数据，这个数据通常对应着cookie数据。

## session作用

- 配合cookie进行状态的保存，防止cookie造假
