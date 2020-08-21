package org.zero.user.service;

import java.util.List;

import org.zero.user.model.UMenuInfo;

import com.github.pagehelper.PageInfo;

public interface UMenuInfoService {
	int add(UMenuInfo menuInfo) throws Exception;

	UMenuInfo findByPrimaryKey(String permissionCode);

	List<UMenuInfo> findByColumn(UMenuInfo menuInfo);
	
	List<UMenuInfo> findByUser(Integer userId);
	
	PageInfo<UMenuInfo> page(UMenuInfo menuInfo, Integer pageNum, Integer pageSize);

	int updateByPrimaryKeySelective(String permissionCode, UMenuInfo menuInfo) throws Exception;

}
