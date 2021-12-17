package com.xinhai.hosp_new.entity;

import com.xinhai.hosp_new.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 *
 * </p>
 *
 * @author xinhai
 * @since 2021-12-11
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
public class User extends BaseEntity {


    private String uid;

    private String username;

    private String email;

    private String password;

    private String money;


}
