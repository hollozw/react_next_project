type Singleton = { val: number };
type SingletonConstructor = new (val: number) => Singleton;

// 通过闭包的方式创建
// const Singleton_fun=
//   (function () {
//     let instance: Singleton | undefined;

//     // 上述参数this只是用于类型注释，会在转换为js时省略
//     const Singleton = function(this: Singleton, val: number) {
//       if (instance) return instance;

//       this.val = val;

//       instance = this;
//     } as unknown as SingletonConstructor

//     return Singleton;
//   })();


class Singleton_fun {
  static instance: Singleton_fun;
  private val: number = 0;
  constructor(val: number) {
    if(Singleton_fun.instance) return Singleton_fun.instance;
    Singleton_fun.instance = this;
    this.val = val;
  }
}

export const a = new Singleton_fun(1);
export const b = new Singleton_fun(2);
