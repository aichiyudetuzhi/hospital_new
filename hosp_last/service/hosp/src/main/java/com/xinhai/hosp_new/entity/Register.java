package com.xinhai.hosp_new.entity;

import com.xinhai.hosp_new.entity.BaseEntity;

import java.io.Serializable;
import java.time.LocalDate;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 *
 * </p>
 *
 * @author xinhai
 * @since 2021-12-10
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
public class Register extends BaseEntity implements Serializable {

    private static final long serialVersionUID=1L;

    private Long  id;

    private String department;

    private LocalDate registerDate;

    private String type;

    private String doctor;

    private String money;

    private LocalDate registerTime;

    private String payStatus; //不能写成pay_status

    private String uid;

}
