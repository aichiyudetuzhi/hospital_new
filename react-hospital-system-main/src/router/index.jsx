import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Home from "../pages/home";
import Info from "../pages/info";
import Login from "../pages/login";
import User from "../pages/user";
import News from "../pages/news";
import MyResult from "../pages/result";
import KeShi from "../pages/keshi";
import LinChuang from "../pages/linchuang";
import ZhongXin from "../pages/zhongxin";
import Order from "../pages/order";
import Register from "../pages/register"
import appointmentRecord from "../pages/appointmentRecord";
import {isLogin} from "../isLogin";

function RouterMap() {
    return (

        isLogin()?<Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/info' component={Info}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/user' component={User}></Route>
            <Route path='/news' component={News}/>
            <Route path='/result' component={MyResult}/>
            <Route path='/keshi' component={KeShi}/>
            <Route path='/linchuang' component={LinChuang}/>
            <Route path='/zhongxin' component={ZhongXin}/>
            <Route path='/order' component={Order}/>
            <Route path='/orderform' component={appointmentRecord}/>
            <Route path='/appointmentRecord' component={appointmentRecord}/>
            <Route path='/register' component={Register}/>
    </Switch>:
            <Switch>
                 <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}/>
            </Switch>)
}

export default RouterMap;
