package org.zero.user.service.mapper;

import java.util.List;

import org.zero.user.model.UOperatePermission;

public interface UOperatePermissionMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table u_operate_permission
     *
     * @mbg.generated Tue Jun 30 11:36:56 CST 2020
     */
    int deleteByPrimaryKey(String permissionCode);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table u_operate_permission
     *
     * @mbg.generated Tue Jun 30 11:36:56 CST 2020
     */
    int insert(UOperatePermission record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table u_operate_permission
     *
     * @mbg.generated Tue Jun 30 11:36:56 CST 2020
     */
    int insertSelective(UOperatePermission record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table u_operate_permission
     *
     * @mbg.generated Tue Jun 30 11:36:56 CST 2020
     */
    UOperatePermission selectByPrimaryKey(String permissionCode);
    
    List<UOperatePermission> selectByColumn(UOperatePermission record);
    
    List<UOperatePermission> selectByUser(Integer userId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table u_operate_permission
     *
     * @mbg.generated Tue Jun 30 11:36:56 CST 2020
     */
    int updateByPrimaryKeySelective(UOperatePermission record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table u_operate_permission
     *
     * @mbg.generated Tue Jun 30 11:36:56 CST 2020
     */
    int updateByPrimaryKey(UOperatePermission record);
}