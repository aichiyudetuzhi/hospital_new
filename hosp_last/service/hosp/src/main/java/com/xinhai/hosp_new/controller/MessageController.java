package com.xinhai.hosp_new.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.xinhai.commonutils.R;
import com.xinhai.hosp_new.entity.Phoneverifycode;
import com.xinhai.hosp_new.service.Client;
import com.xinhai.hosp_new.service.PhoneverifycodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
@CrossOrigin(origins = "*",maxAge = 3600)
@RestController("/message")
public class MessageController {
    @Autowired
    private PhoneverifycodeService phoneverifycodeService;
    public HashMap<String,String> map=new HashMap<>();
    @PostMapping("sendMessage/{phoneNumber}")
    public R PostMessage(@PathVariable String phoneNumber){
        Client client = new Client();
        client.setAppId("hw_10749");     //开发者ID，在【设置】-【开发设置】中获取
        client.setSecretKey("41d3220378c5ef5a07bc3b7865c4b029");    //开发者密钥，在【设置】-【开发设置】中获取
        client.setVersion("1.0");
        /**
         *   json格式可在 bejson.com 进行校验
         */

        String baseNumLetter = "123456789";
        Random random=new Random();
        String code="";
        for(int i=0;i<4;i++){
            int index=random.nextInt(8);
            code+=baseNumLetter.charAt(index);
        }
        Integer number=Integer.parseInt(code);
        Client.Request request = new Client.Request();
        request.setBizContent("{\"mobile\":[\""+phoneNumber+"\"]," +
                "\"type\":0,\"template_id\":\"ST_2020101100000005\"," +
                "\"sign\":\"闪速码\",\"send_time\":\"null\"," +
                "\"params\":{\"code\":"+number+"}}");  // 这里是json字符串，send_time 为空时可以为null, params 为空时可以为null,短信签名填写审核后的签名本身，不需要填写签名id
        request.setMethod("sms.message.send");
        System.out.println( client.execute(request) );

        QueryWrapper<Phoneverifycode> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("uid",phoneNumber);
        Phoneverifycode phoneverifycode=phoneverifycodeService.getOne(queryWrapper);

        if(phoneverifycode==null) {
            phoneverifycode = new Phoneverifycode();
            phoneverifycode.setCode(code);
            phoneverifycode.setUid(phoneNumber);
            phoneverifycode.setStartTime(LocalDate.now()); //加30分钟
            LocalDateTime time = LocalDateTime.now();
            time = time.plusMinutes(30);

            phoneverifycode.setEndTime(time.toLocalDate());
            phoneverifycodeService.save(phoneverifycode);
        }
        else{
            phoneverifycode = new Phoneverifycode();
            phoneverifycode.setCode(code);
            phoneverifycode.setUid(phoneNumber);
            phoneverifycode.setStartTime(LocalDate.now()); //加30分钟
            LocalDateTime time = LocalDateTime.now();
            time = time.plusMinutes(30);

            phoneverifycode.setEndTime(time.toLocalDate());
            phoneverifycodeService.update(phoneverifycode,queryWrapper.eq("uid",phoneNumber));
        }
        return  R.ok();
    }
    @PostMapping("checkMessage/{phoneNumber}/{code}")
    public R checkMessage(@PathVariable String phoneNumber,@PathVariable String code){
        System.out.println(phoneNumber);
        QueryWrapper<Phoneverifycode> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("uid",phoneNumber);
        Phoneverifycode phoneverifycode=phoneverifycodeService.getOne(queryWrapper);
        if(phoneverifycode==null) return  R.error();
        if(Objects.equals(phoneverifycode.getCode(), code)){
            return  R.ok();
        }
        else return R.error();
    }
}
