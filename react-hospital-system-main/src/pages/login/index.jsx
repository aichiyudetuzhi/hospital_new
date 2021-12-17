import React, {Component} from 'react';
import './login.scss';
import {xhaxios} from "../../utils/xhaxios";
import {setToken} from "../../isLogin";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',//用户名
            passWord: '',//密码
            token:"",
            uid:""
        }
        this.user={
            "email": "string",
            "money": "string",
            "password": "string",
            "uid": "",
            "username": "string"
        }
    }

    textChange(key, event) {
        this.setState({[key]: event.target.value});
        // console.log("this.state   "+this.state.userName);
    }

    getUser=()=>{
        this.user.uid=this.state.uid;
        this.user.password=this.state.passWord;
    }
    //登录
    async doLogin(props) {
        this.getUser();
        let loginCheck =await xhaxios('/user/login',JSON.stringify(this.user));
        loginCheck=JSON.parse(loginCheck); //传过来是Json字符串所以要转对象
        let loginStatus;
        if(loginCheck.data.login===null){
            loginStatus=false;
        }
        else loginStatus=true;
        switch (loginStatus) {
            case true:
                let token=JSON.stringify(loginCheck);
                this.state.token=setToken(token); //这是应该是后端传回来的token值,但是我后端还没写,所以不管
                console.log("登录成功");
                this.props.history.push("/");
                break;
            case false:
                console.log("登录失败")
                alert("登录失败，请检查密码是否正确或者账号不存在!");
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    registerUser=()=>{
        this.props.history.push("/register");
    }
    render() {

        return (
            <section className="login-bg-wrap">
                <div className="login-content">
                    <span className="logo"><img src="http://www.sj-hospital.org/static/images/logo.png" alt=""/></span>
                    <h2>Welcome</h2>
                    <h1>mnnu-Hospital</h1>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <label>
                            <span>手机号</span>
                            <input type="text" value={this.state.user}
                                   onChange={this.textChange.bind(this, 'uid')} />
                        </label>
                        <label>
                            <span className="span-mima">密码</span>
                            <input type="password" value={this.state.passWord}
                                   onChange={this.textChange.bind(this, 'passWord')}/>
                            <i className={this.state.passWordValid === false ? "error" : 'required'}>密码不能为空</i>
                        </label>
                        <button type="submit"
                                className={(("" === this.state.userName) || ("" === this.state.passWord)) ? "disabled" : "login-btn"}
                                onClick={this.doLogin.bind(this)}>登录
                        </button>
                        <a onClick={this.registerUser.bind(this)} id="register">没有用户,那注册一个</a>
                    </form>
                </div>
            </section>
        );
    }
}

export default Login;
