// promise 三个状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(excutor) {
    let that = this; // 缓存当前promise实例对象
    that.status = PENDING; // 初始状态
    that.value = undefined; // fulfilled 状态时，返回的信息
    that.reason = undefined; // rejected状态时，拒绝的原因
    that.onFulfilledCallback = []; // 存储fulfilled状态对应的onFulfilled函数
    that.onRejectedCallbacks = []; // 存储rejected状态对应的onRejected的函数

    function  resolve() { // value成功是接受的终值
        if(value instanceof Promise ) {
            return value.then(resolve,reject)
        }

        setTimeout( ()=>{
            if( that.status === PENDING ) {
                that.status = FULFILLED;
    
            }
        })
    }

    function reject(reason) {
        setTimeout( ()=>{
            if(that.status === PENDING ) {
                that.status = REJECTED;
                that.reason = reason;
                that.onRejectedCallbacks.forEach(cb => cb(that.reason));
            }
        })
    }

   
}
