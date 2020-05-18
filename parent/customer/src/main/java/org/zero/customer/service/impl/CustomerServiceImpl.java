package org.zero.customer.service.impl;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zero.customer.model.Customer;
import org.zero.customer.service.CustomerService;
import org.zero.customer.service.mapper.CustomerMapper;

@Service
public class CustomerServiceImpl implements CustomerService {
	@Autowired
	private CustomerMapper mapper;

	@Override
	@Transactional
	public int add(Customer customer) {
		return mapper.insert(customer);
	}

	@Override
	public Customer selectByPrimary(Integer custId) {
		return mapper.selectByPrimaryKey(custId);
	}

	@Override
	public List<Customer> selectByBean(Customer customer) {
		return null;
	}

	@Override
	@Transactional
	public int updateByPrimary(Integer custId, Customer customer) {
		Objects.requireNonNull(custId);
		Objects.requireNonNull(customer);
		customer.setCustId(custId);
		
		return mapper.updateByPrimaryKeySelective(customer);
	}

}
