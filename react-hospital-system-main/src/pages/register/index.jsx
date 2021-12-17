import React,{Component,useState, useRef} from 'react'
import "./index.scss"
import {xhaxios} from "../../utils/xhaxios"
import {Button,Modal, Space, Toast, Divider } from 'antd-mobile'
export default class register extends Component{
    constructor(props) {
        super(props);   //不要直接把state当Json对象去传,这样只能传一个值给后端
        this.state={
            "email": "",
            "money": "string",
            "password": "",
            "uid": "",
            "username": "",
            "verifyCode":"",
            "phoneCode":""
        }
       this.user={
           "email": "",
           "money": "string",
           "password": "",
           "uid": "",
           "username": ""
       }

    }
    handleSubmit(event){
        event.preventDefault();
    }
    //登录
    getUser=()=>{
        this.user.uid=this.state.uid;
        this.user.password=this.state.password;
        this.user.email=this.state.email;
        this.user.username=this.state.username;
    }
    getCode() {
        document.getElementById("img").src = 'http://localhost:8001/verifyCode/' + Math.random();
    }
    async checkVerifyCode(){
        let verifyCode=await xhaxios(`/verifyCode/check/${this.state.verifyCode}`,null);
        verifyCode=JSON.parse(verifyCode);
        if(verifyCode.message!=="成功"){
            alert("验证码输入错误!!!");
        }
        else{
            let phoneCode=await xhaxios(` /sendMessage/${this.state.uid}`,null);
            this.state.correctCode=JSON.parse(phoneCode);   //这里有个业务要处理,但我赶时间
            alert("短信已经发送");
        }
    }
    async doRegister() {

        let checkPhone=await xhaxios(`/checkMessage/${this.state.uid}/${this.state.phoneCode}`,null);
        checkPhone=JSON.parse(checkPhone);
        if(checkPhone.message!=="成功"){
            alert("手机验证码输出错误");
        }
        else {

            this.getUser();
            //发送请求给后台判断用户名是否重名
            if(this.state.uid!=="") {
                alert("sb")
                let resultCheck = await xhaxios(`/user/getUser/${this.state.uid}`, null);
                resultCheck=JSON.parse(resultCheck);
                if (resultCheck.data.getUser!=null) {        //在这里判断用户名是否重复
                    alert("该用户已经被注册");
                } else {
                    let registerCheck = await xhaxios('/user/addRegister', this.user);
                    registerCheck = JSON.parse(registerCheck); //传过来是Json字符串所以要转对象
                    let registerStatus = registerCheck.success;
                    switch (registerStatus) {
                        case true:
                            console.log("注册成功");
                            alert("登录成功,欢迎用户" + this.state.userName);
                            this.props.history.push("/login");
                            break;
                        case false:
                            console.log("注册失败")
                            alert("注册失败");
                            break;
                    }
                }
            }
        }
    }
     textChange(key,event){
       this.setState({[key]:event.target.value});
    }
    doLogin=()=>{
        this.props.history.push("/login")
    }
    render() {
        return (
            <div>
                    <section className="register">
                   <div className="register-content">
                       {/*<span className=></span>*/}
                       <h2 className="register-header">Register</h2>
                       <form onSubmit={this.handleSubmit.bind(this)}>
                           <label>
                               <span>手机号</span>
                               <input type="text" value={this.state.uid}  onChange={this.textChange.bind(this,"uid")}   />
                               <i className="required" id="userNameValid" >该手机号码已经被注册</i>
                           </label>
                           <label>
                               <span>用户名</span>
                               <input type="text" value={this.state.username}  onChange={this.textChange.bind(this,'username')}   />
                           </label>
                           <label>
                               <span>密码</span>
                               <input type="text" value={this.state.password} onChange={this.textChange.bind(this,'password')}/>
                           </label>
                           <label>
                               <span>email</span>
                               <input type="text" value={this.state.email} onChange={this.textChange.bind(this,'email')}/>
                           </label>



                           <div className="verifyCode">

                               <img id="img" style={{height:50,width:100}} src='../../static/image/VerifyCode' onClick={this.getCode.bind(this)} alt="验证码" />
                              <Button onClick={this.getCode.bind(this)} id="verifyCodeBtn"  id="verifyCodeBtn" value="点击刷新验证码"  >点击按钮刷新验证码</Button>
                               <label>
                                 <input type="text" value={this.verifyCode} onChange={this.textChange.bind(this,'verifyCode')}/>
                                 </label>
                               <Button  id="verifyCodeBtn" onClick={this.checkVerifyCode.bind(this)} id="verifyCodeBtn"   >获取手机验证码</Button>
                          </div>
                        <div>
                              <label>
                                  <span>手机验证码:</span>
                                  <input type="text" value={this.state.phoneCode} onChange={this.textChange.bind(this,'phoneCode')} />
                              </label>
                        </div>

                           <div>
                                   <a onClick={this.doLogin.bind(this)} id="login">已有账户,登录</a>
                                   <button type="submit"  className="register-btn" onClick={this.doRegister.bind(this)} id="register-btn">登录</button>
                       </div>
                       </form>
                   </div>
                </section>
            </div>
        );
    }
}


