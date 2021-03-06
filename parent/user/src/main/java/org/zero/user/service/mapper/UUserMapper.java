package org.zero.user.service.mapper;

import java.util.List;

import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Select;
import org.zero.user.model.UUser;

public interface UUserMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table u_user
     *
     * @mbg.generated Mon Jun 29 15:26:25 CST 2020
     */
    int deleteByPrimaryKey(Integer userId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table u_user
     *
     * @mbg.generated Mon Jun 29 15:26:25 CST 2020
     */
    int insert(UUser record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table u_user
     *
     * @mbg.generated Mon Jun 29 15:26:25 CST 2020
     */
    int insertSelective(UUser record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table u_user
     *
     * @mbg.generated Mon Jun 29 15:26:25 CST 2020
     */
    UUser selectByPrimaryKey(Integer userId);
    
    UUser selectByUserName(String userName);
    
    List<UUser> selectByColumn(UUser record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table u_user
     *
     * @mbg.generated Mon Jun 29 15:26:25 CST 2020
     */
    int updateByPrimaryKeySelective(UUser record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table u_user
     *
     * @mbg.generated Mon Jun 29 15:26:25 CST 2020
     */
    int updateByPrimaryKey(UUser record);
}