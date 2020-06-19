package org.zero.customer.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.zero.customer.model.CCustInfo;
import org.zero.customer.service.CCustInfoService;
import org.zero.customer.service.mapper.CCustInfoMapper;

@Service
public class CCustInfoServiceImpl implements CCustInfoService {
	@Autowired
	private CCustInfoMapper mapper;

	@Override
	public int add(CCustInfo custInfo) throws Exception {
		Objects.requireNonNull(custInfo);

		Optional.ofNullable(findByCertNo(custInfo.getCertNo())).orElseThrow(() -> new RuntimeException("证件号已注册"));

		return mapper.insert(custInfo);
	}

	@Override
	public CCustInfo findByPrimaryKey(Integer custId) {
		return mapper.selectByPrimaryKey(custId);
	}

	@Override
	public CCustInfo findByCertNo(String certNo) {
		if (StringUtils.isEmpty(certNo))
			throw new NullPointerException("certNo为空");

		return mapper.selectByCert(certNo);
	}

	@Override
	public List<CCustInfo> findByColumn(CCustInfo custInfo) {
		return mapper.selectByColumn(custInfo);
	}

	@Override
	public int updateByPrimaryKeySelective(Integer custId, CCustInfo custInfo) throws Exception {
		Objects.requireNonNull(custId);
		Objects.requireNonNull(custInfo);
		custInfo.setCustId(custId);

		Optional.ofNullable(custInfo.getCertNo()).ifPresent((c) -> {
			Optional.ofNullable(findByCertNo(c)).orElseThrow(() -> new RuntimeException("证件号已注册"));
		});

		return mapper.updateByPrimaryKeySelective(custInfo);
	}

}
