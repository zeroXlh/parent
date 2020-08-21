package org.zero.customer.service;

import java.util.List;
import java.util.Objects;

import org.zero.customer.model.CCustInfo;
import org.zero.customer.model.CCustInfoVo;

import com.github.pagehelper.PageInfo;

public interface CCustInfoService {
	int add(CCustInfo custInfo) throws Exception;

	CCustInfo findByPrimaryKey(Integer custId);

	default CCustInfo obtainByPrimaryKey(Integer custId) {
		return Objects.requireNonNull(findByPrimaryKey(custId), "客户信息不存在：" + custId);
	}

	CCustInfo findByCertNo(String certNo);

	default CCustInfo obtainByCertNo(String certNo) {
		return Objects.requireNonNull(findByCertNo(certNo), "客户信息不存在：" + certNo);
	}

	List<CCustInfo> findByColumn(CCustInfo custInfo);

	PageInfo<CCustInfoVo> page(CCustInfoVo cCustInfoVo, Integer pageNum, Integer pageSize);

	int updateByPrimaryKeySelective(Integer custId, CCustInfo custInfo) throws Exception;

}
