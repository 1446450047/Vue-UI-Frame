const expect = chai.expect;
import Vue from 'vue'
import Input from '../src/input'

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Input', () => {
    it('存在.', () => {
        expect(Input).to.be.ok
    });
    it("接收 placeholder",()=>{
        const Constructor = Vue.extend(Input)
        const vm = new Constructor({
            propsData:{
                placeholder:"1234"
            }
        }).$mount()
        const inputElement = vm.$el.querySelector('input');
        expect(inputElement.placeholder).to.equal("1234")
        vm.$destroy()
    })
    it("接收 disabled",()=>{
        const Constructor = Vue.extend(Input)
        const vm = new Constructor({
            propsData:{
                disabled:true
            }
        }).$mount()
        const inputElement = vm.$el.querySelector('input');
        expect(inputElement.disabled).to.equal(true)
        vm.$destroy()
    })
    it("接收 readonly",()=>{
        const Constructor = Vue.extend(Input)
        const vm = new Constructor({
            propsData:{
                readonly:true
            }
        }).$mount()
        const inputElement = vm.$el.querySelector('input');
        expect(inputElement.readOnly).to.equal(true)
        vm.$destroy()
    })
    it("接收 error",()=>{
        const Constructor = Vue.extend(Input)
        const vm = new Constructor({
            propsData:{
                error:"你错了没？"
            }
        }).$mount()
        const useElement = vm.$el.querySelector('use');
        expect(useElement.getAttribute('xlink:href')).to.equal('#icon-error');
        const errorMessage = vm.$el.querySelector('.error');
        expect(errorMessage.innerText).to.equal("你错了没？")
        vm.$destroy()
    })


    it("支持的 change/input/focus/blur事件",()=>{
        ['change','input','focus','blur'].forEach((eventName)=>{
            const Constructor = Vue.extend(Input)
            const vm = new Constructor({}).$mount()
            const callback = sinon.fake();
            vm.$on(eventName,callback);
            let event = new Event(eventName);
            let inputElement = vm.$el.querySelector('input');
            inputElement.dispatchEvent(event);
            expect(callback).to.have.been.called;
            vm.$destroy()
        })
    })
});