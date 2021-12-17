package com.xinhai.hosp_new.controller;

import com.xinhai.commonutils.R;
import com.xinhai.hosp_new.service.VerifyCode;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Objects;

@RestController
@RequestMapping("/verifyCode")
public class VerifyCodeController {

    String randomText = null;
    @RequestMapping("/{params}")
    public void getVerificationCode(HttpServletResponse response, HttpServletRequest request) {
        try {
            int width=200;
            int height=69;
            BufferedImage verifyImg=new BufferedImage(width,height,BufferedImage.TYPE_INT_RGB);
            //生成对应宽高的初始图片
            randomText = VerifyCode.drawRandomText(width,height,verifyImg);
            //单独的一个类方法，出于代码复用考虑，进行了封装。
            //功能是生成验证码字符并加上噪点，干扰线，返回值为验证码字符
            request.getSession().setAttribute("verifyCode", randomText);
            response.setContentType("image/png");//必须设置响应内容类型为图片，否则前台不识别
            OutputStream os = null; //获取文件输出流

            try {
                os = response.getOutputStream();
            } catch (IOException e) {
                e.printStackTrace();
                System.out.println();
            }
            ImageIO.write(verifyImg,"png",os);//输出图片流
            os.flush();
            os.close();//关闭流
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @PostMapping("/check/{params}")
    public R checkVerfiCode(@PathVariable String params){
        if(Objects.equals(params, randomText)){
            return R.ok();
        }
        else return R.error();
    }
}
