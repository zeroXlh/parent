package org.zero.customer.service.impl;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.zero.customer.model.CCustInfo;
import org.zero.customer.model.CCustInfoVo;
import org.zero.customer.service.CCustInfoService;
import org.zero.customer.service.mapper.CCustInfoMapper;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class CCustInfoServiceImpl implements CCustInfoService {
	@Autowired
	private CCustInfoMapper mapper;

	@Override
	@Transactional
	public int add(CCustInfo custInfo) throws Exception {
		Objects.requireNonNull(custInfo);

		if (Objects.nonNull(custInfo.getCertNo()))
			throw new RuntimeException("证件号已注册：" + custInfo.getCertNo());

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
	public PageInfo<CCustInfoVo> page(CCustInfoVo cCustInfoVo, Integer pageNum, Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		// PageHelper.startPage(pageNum, pageSize,"");

		List<CCustInfoVo> list = mapper.selectExtendByColumn(cCustInfoVo);

		return new PageInfo<>(list);
	}

	@Override
	@Transactional
	public int updateByPrimaryKeySelective(Integer custId, CCustInfo custInfo) throws Exception {
		Objects.requireNonNull(custId);
		Objects.requireNonNull(custInfo);
		custInfo.setCustId(custId);

		// Optional.ofNullable(custInfo.getCertNo()).ifPresent((c) -> {
		// Optional.ofNullable(findByCertNo(c)).orElseThrow(() -> new
		// RuntimeException("证件号已注册"));
		// });

		return mapper.updateByPrimaryKeySelective(custInfo);
	}

}
