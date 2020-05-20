<script>
// JSX 语法因为要走编译流程，所以不能直接运行，需要在有Vue编译流程的项目中测试运行
export default {
  name: "Jsx",

  data() {
    return {
      show: true,
      val: "搭嘎好",
      color: "pink",
      list: [1, 2, 3, 4]
    };
  },

  // 动态数据写在代码块{}中
  // render(h) {
  //   return this.show ? <div>{this.val}</div> : "";
  // }

  // Dome
  // render() {
  //   return (
  //     <ol>
  //       <li>哈哈</li>
  //       <li>啦啦</li>
  //     </ol>
  //   );
  // }

  // error1 只允许被一个标签包裹
  // render() {
  //   return (
  //     <div>
  //       <span></span>
  //       <ol>
  //         <li>哈哈</li>
  //         <li>啦啦</li>
  //       </ol>
  //     </div>
  //   );
  // }

  // error2 标签一定要闭合
  // render() {
  //   return (
  //     <ol>
  //       <li>哈哈</li>
  //       <li>啦啦</li>
  //     </ol>
  //   );
  // }

  // errer3 注释
  // render() {
  //   return (
  //     <ol>
  //       {/** 单行注释 */}
  //       <li>哈哈</li>
  //       <li>啦啦</li>
  //     </ol>
  //   );
  // }

  // render() {
  //   return (
  //     <ol>
  //       {
  //         // 单行注释
  //       }
  //       <li>哈哈</li>
  //       <li>啦啦</li>
  //     </ol>
  //   );
  // }

  // render() {
  //   return (
  //     <ol>
  //       {/** 多行注释
  //         1. xxx
  //         2. bbb
  //       */}
  //       <li>哈哈</li>
  //       <li>啦啦</li>
  //     </ol>
  //   );
  // }
  methods: {
    getLi() {
      return (
        <ul>
          {this.list.map(v => (
            <li>{v}</li>
          ))}
        </ul>
      );
    }
  },

  render() {
    return (
      <article>
        <p attrs={{ id: "xxx", class: "a b c" }}>attrs</p>
        <p class={{ a: true, b: this.show }}>class</p>
        <p style={{ color: this.color, fontSize: "20px" }}>style</p>
        <p on={{ click: () => alert("点击事件") }}>on</p>
        {this.getLi()}
      </article>
    );
  }
};
</script>
