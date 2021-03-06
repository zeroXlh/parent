package org.zero.customer.service.mapper;

import org.zero.customer.model.CCustAccount;

public interface CCustAccountMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_cust_account
     *
     * @mbg.generated Mon Jun 15 18:01:06 CST 2020
     */
    int deleteByPrimaryKey(Integer accountId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_cust_account
     *
     * @mbg.generated Mon Jun 15 18:01:06 CST 2020
     */
    int insert(CCustAccount record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_cust_account
     *
     * @mbg.generated Mon Jun 15 18:01:06 CST 2020
     */
    int insertSelective(CCustAccount record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_cust_account
     *
     * @mbg.generated Mon Jun 15 18:01:06 CST 2020
     */
    CCustAccount selectByPrimaryKey(Integer accountId);
    
    CCustAccount selectByPhone(String phoneNo);
    
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_cust_account
     *
     * @mbg.generated Mon Jun 15 18:01:06 CST 2020
     */
    int updateByPrimaryKeySelective(CCustAccount record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table c_cust_account
     *
     * @mbg.generated Mon Jun 15 18:01:06 CST 2020
     */
    int updateByPrimaryKey(CCustAccount record);
}