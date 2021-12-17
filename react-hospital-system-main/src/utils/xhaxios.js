import axios from 'axios'
//这个封装axios是传递带有Json格式的url的,如果要传具体的参数名和变量那我重写一个
export async function xhaxios(url,params){
    let result={};
    // console.log(params) //这一步应该交给传的变量来判断
    await axios.post(url,
       params
    ,{
        headers:{
            'Content-Type':'application/json;charset=UTF-8'

        }
    }).then(
        response=>{
           console.log(response.data.data);

           result = JSON.stringify(response.data);

           // 这是因为我springboot设置的全局处理变量R里面带了Data
        },
        error =>{
            result=error;
        }
    )

    console.log(result);
    return result;
}
export async function xhaxiosParams(url,paramsNameList,paramsList){
    let result={};
    let paramString="{";
    console.log(paramsNameList.length); //用length
    for(let i=0;i<paramsNameList.length;i++){

        paramString=paramString+"\""+paramsNameList[i]+"\": "+"\""+paramsList[i]+"\"";
        if(i!==paramsList.length-1){
            paramString=paramString+",";
        }
    }
    paramString+="}";
    console.log(paramsNameList);
    console.log(paramsList);
    console.log(paramString);
    await axios.post(url,paramString,{
        headers:{
            'Content-Type':'application/json;charset=UTF-8'
        }
    }).then(
        response=>{
            result=JSON.stringify(response.data.data);

        },
        error=>{
            result=error;
        }
    )
    return result;

}
