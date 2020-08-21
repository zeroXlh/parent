package org.zero.customer.service.impl;

import java.util.List;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zero.component.utils.StringUtils;
import org.zero.customer.model.CCustBank;
import org.zero.customer.model.CCustBankVo;
import org.zero.customer.service.CCustBankService;
import org.zero.customer.service.mapper.CCustBankMapper;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class CCustBankServiceImpl implements CCustBankService {

	private static Logger logger = LoggerFactory.getLogger(CCustBankServiceImpl.class);

	@Autowired
	private CCustBankMapper mapper;

	@Override
	@Transactional
	public int add(CCustBank custBank) throws Exception {
		logger.info("插入客户银行卡信息，custBank：[{}]", custBank);

		Objects.requireNonNull(custBank);

		if (Objects.nonNull(findByUnique(custBank.getCustId(), custBank.getBankCode())))
			throw new RuntimeException("客户银行卡已存在");

		return mapper.insertSelective(custBank);
	}

	public CCustBank findByUnique(Integer custId, String bankCode) {
		logger.debug("根据unique查找客户银行卡信息，custId：[{}]，bankCode：[{}]", custId, bankCode);
		Objects.requireNonNull(custId);
		StringUtils.requireNonEmpty(bankCode);

		return mapper.selectByUnique(custId, bankCode);
	}

	@Override
	public CCustBank findByPrimaryKey(Integer bankId) {
		logger.debug("根据primary key查找客户银行卡信息，bankId：[{}]", bankId);
		Objects.requireNonNull(bankId);
		return mapper.selectByPrimaryKey(bankId);
	}

	@Override
	public List<CCustBankVo> findVoByColumn(CCustBankVo custBankVo) {
		logger.debug("根据column查找客户银行卡信息，custBankVo：[{}]", custBankVo);
		return mapper.selectVoByColumn(custBankVo);
	}

	@Override
	public PageInfo<CCustBankVo> page(CCustBankVo custBankVo, Integer pageNum, Integer pageSize) {
		logger.debug("根据column分页查找客户银行卡信息，custBankVo：[{}]，pageNum：[{}]，pageSize：[{}]", custBankVo, pageNum, pageSize);

		PageHelper.startPage(pageNum, pageSize, "");
		return new PageInfo<>(findVoByColumn(custBankVo));
	}

	@Override
	@Transactional
	public int updateByPrimaryKeySelective(Integer bankId, CCustBank custBank) throws Exception {
		logger.info("根据primary key更新客户银行卡信息，bankId：[{}]，custBank：[{}]", bankId, custBank);
		Objects.requireNonNull(bankId);
		Objects.requireNonNull(custBank);
		custBank.setBankId(bankId);

		return mapper.updateByPrimaryKeySelective(custBank);
	}

}
