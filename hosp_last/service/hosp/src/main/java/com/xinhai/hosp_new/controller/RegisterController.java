package com.xinhai.hosp_new.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xinhai.commonutils.R;
import com.xinhai.hosp_new.entity.Register;
import com.xinhai.hosp_new.service.RegisterService;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.List;
@CrossOrigin(origins = "*",maxAge = 3600)
@RestController
@RequestMapping("/register")
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    @GetMapping("registerfind")
    public R findAllRegister(){
        List<Register> list = registerService.list(null);
        return R.ok().data("register",list);
    }
    @DeleteMapping("{id}")
    public R removeRegister(@ApiParam(name="id",value = "预约id",required = true) @PathVariable String id){
        boolean flag =registerService.removeById(id);
        if(flag) return R.ok();
        else return R.error();
    }

    @PostMapping("pageRegister/{current}/{limit}/{uid}")
    public R pageListRegister(@PathVariable long current,@PathVariable long limit,@PathVariable String uid)
    {
        QueryWrapper<Register> registerQueryWrapper=new QueryWrapper<>();
        registerQueryWrapper.eq("uid",uid);
        Page<Register> pagelist=new Page<>(current,limit);
        registerService.page(pagelist,registerQueryWrapper);

        long total = pagelist.getTotal();
        List<Register> records = pagelist.getRecords();
        return R.ok().data("total",total).data("row",records);
    }
    @PostMapping("addRegister")
    public R addRegister(@RequestBody Register register){
        System.out.println(register);
        boolean save=registerService.save(register);
        if(save) return R.ok();
        else return R.error();
    }
    @GetMapping("{id}")
    public R getRegister(@PathVariable String id){
        Register register= registerService.getById(id);
        return R.ok().data("register",register);
    }
    @PostMapping("updateRegister")
    public R updateRegister(@RequestBody Register register){
        boolean flag=registerService.updateById(register);
        if(flag) return R.ok();
        else return R.error();
    }
}
