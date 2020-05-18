package org.zero.customer.service;

import java.util.List;
import java.util.Objects;

import org.zero.customer.model.Customer;

public interface CustomerService {
	int add(Customer customer);

	Customer selectByPrimary(Integer custId);
	
	List<Customer> selectByBean(Customer customer);

	default Customer obtainByprimary(Integer custId) {
		return Objects.requireNonNull(selectByPrimary(custId), "根据primary获取客户信息为空");
	}

	int updateByPrimary(Integer custId, Customer customer);
}
