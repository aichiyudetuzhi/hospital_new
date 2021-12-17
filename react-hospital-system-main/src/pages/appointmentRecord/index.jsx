import React, {Component, useEffect} from 'react'
import {  List } from 'antd-mobile'
import {xhaxios} from "../../utils/xhaxios";
import {Pagination} from "antd-mobile";

export  default  class appointmentRecord extends Component{

    constructor(props) {
        super(props);
        this.state={
            "current":1,
            "limit":5,
            "total":0
        }
        this.appointList=[];

        this.getRegisters();
    }
    async getRegisters(){
        let userData=JSON.parse(localStorage.getItem("user_token"));
        let uid=userData.data.login.uid;
        let appointData=await xhaxios(`http://localhost:8001/register/pageRegister/${this.state.current}/${this.state.limit}/${uid}`,null);
        appointData=JSON.parse(appointData);
        this.setState({
            total: appointData.data.total
        })
        this.appointList=appointData.data.row;
       // this.appointList=eval(JSON.stringify(this.appointList); //数组里面还是JSON对象
         this.forceUpdate();   //这个问题很大
                                //写到这这里才发现我结构写的有些问题,这一块需要重构
    }
    gotoPage=(current)=>{

    }
    render(){

        return (
            <div>
                <List>
                    {
                        this.appointList.map(appoint=>(
                            <List.Item
                            >
                            门诊: {appoint.department} <br/>
                            医生:{appoint.doctor} <br/>
                            诊断类型:{appoint.type}<br/>
                            诊断时间:{appoint.registerTime}<br/>
                            支付状态:{appoint.payStatus}
                            </List.Item>
                        ))}
                </List>
                <Pagination  total={this.state.total} current={this.state.current} onChange={ async  (current)=>{ await this.setState({"current":current});  await this.getRegisters()} }/>

            </div>
        )
    }
}
