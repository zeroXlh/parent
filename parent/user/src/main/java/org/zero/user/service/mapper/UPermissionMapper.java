package org.zero.user.service.mapper;

import org.zero.user.model.UPermission;

public interface UPermissionMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table u_permission
     *
     * @mbg.generated Mon Jun 29 15:29:42 CST 2020
     */
    int deleteByPrimaryKey(String permissionCode);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table u_permission
     *
     * @mbg.generated Mon Jun 29 15:29:42 CST 2020
     */
    int insert(UPermission record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table u_permission
     *
     * @mbg.generated Mon Jun 29 15:29:42 CST 2020
     */
    int insertSelective(UPermission record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table u_permission
     *
     * @mbg.generated Mon Jun 29 15:29:42 CST 2020
     */
    UPermission selectByPrimaryKey(String permissionCode);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table u_permission
     *
     * @mbg.generated Mon Jun 29 15:29:42 CST 2020
     */
    int updateByPrimaryKeySelective(UPermission record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table u_permission
     *
     * @mbg.generated Mon Jun 29 15:29:42 CST 2020
     */
    int updateByPrimaryKey(UPermission record);
}