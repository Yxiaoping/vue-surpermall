import Toast from './Toast' // 将toast组件导入进来，好添加组件中的元素
const obj = {}
obj.install = function(Vue){
    // 直接添加toast组件中的元素不行
    // document.body.appendChild(Toast.$el)
    // 1.创建组件构造器
    const toastConstructor = Vue.extend(Toast)
    // 2.用new的方式，根据组件构造器，可以创建一个组件对象
    const toast = new toastConstructor()
    // 3.将组件对象手动地挂载到某一个元素上
    toast.$mount(document.createElement('div')) // 将toast组件对象挂载到div上
    // 4.挂载完之后，toast.$el对应的就是div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast // 将toast组件对象放在vue原型上，使得其他任意组件都可使用$toast方法使用toast组件对象
}
export default obj