package com.xinhai.hosp_new.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.xinhai.commonutils.R;
import com.xinhai.hosp_new.entity.User;
import com.xinhai.hosp_new.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*",maxAge = 3600)
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("addRegister")
    public R addUser(@RequestBody User user){
        boolean save=userService.save(user);
        if(save) return R.ok();
        else return R.error();
    }
    @PostMapping("getUser/{uid}")
    public R getRegister(@PathVariable String uid){
        QueryWrapper<User> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("uid",uid);
        User user=userService.getOne(queryWrapper);
        return R.ok().data("getUser",user);
    }
    @PostMapping("updateUser")
    public R updateRegister(@RequestBody User user){
        boolean flag=userService.updateById(user);
        if(flag) return R.ok();
        else return R.error();
    }
    @PostMapping("login")
    public R userLogin(@RequestBody User user){
        System.out.println(user);
        QueryWrapper<User> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("uid",user.getUid()).eq("password",user.getPassword());
        User result=userService.getOne(queryWrapper);
        return R.ok().data("login",result);
    }
}
