package org.zero.customer.service;

import java.util.List;
import java.util.Objects;

import org.zero.customer.model.CCustBank;
import org.zero.customer.model.CCustBankVo;

import com.github.pagehelper.PageInfo;

public interface CCustBankService {
	int add(CCustBank custBank) throws Exception;

	CCustBank findByPrimaryKey(Integer bankId);

	default CCustBank obtainByPrimaryKey(Integer bankId) {
		return Objects.requireNonNull(findByPrimaryKey(bankId));
	}
	
	List<CCustBankVo> findVoByColumn(CCustBankVo custBankVo);

	PageInfo<CCustBankVo> page(CCustBankVo custBankVo, Integer pageNum, Integer pageSize);

	int updateByPrimaryKeySelective(Integer bankId,CCustBank custBank) throws Exception;
}
