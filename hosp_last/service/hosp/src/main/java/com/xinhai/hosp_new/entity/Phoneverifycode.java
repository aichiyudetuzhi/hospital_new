package com.xinhai.hosp_new.entity;

import com.xinhai.hosp_new.entity.BaseEntity;
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
 * @since 2021-12-17
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
public class Phoneverifycode extends BaseEntity {

    private static final long serialVersionUID = 1L;

    private String uid;

    private String code;

    private LocalDate endTime;

    private LocalDate startTime;


}
