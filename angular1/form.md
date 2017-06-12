# form

## 指令

#### 必用指令

###### ng-model
- 作用：表单与scope数据的双向绑定

###### ng-submit
- 作用：监听form提交事件

#### 样式指令

###### ng-class
- 作用：控制class属性是否生效

###### ng-disabled
- 作用：表单元素是否禁用

#### 效验指令

###### ng-pattern
- 作用：利用正则效验，最灵活

###### ng-required
- 作用：必填项
- 可选值：true false

###### ng-type
- 作用：限制数据类型
- 可选值：number url

###### ng-minlength
- 作用：限制最小长度

###### ng-maxlength
- 作用：限制最大长度

#### 效验结果

###### $valid
- 作用：满足效验条件

###### $invalid
- 作用：不满足效验条件

###### $touched
- 作用：被选中过

###### $untouched
- 作用：未选中过

###### $pristine
- 作用：当前为默认值

###### $drity
- 作用：值被修改过