package com.xinhai.hosp_new.service.impl;

import com.xinhai.hosp_new.entity.User;
import com.xinhai.hosp_new.mapper.UserMapper;
import com.xinhai.hosp_new.service.UserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinhai
 * @since 2021-12-11
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

}
