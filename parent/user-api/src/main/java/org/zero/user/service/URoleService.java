package org.zero.user.service;

import java.util.List;
import java.util.Objects;

import org.zero.user.model.URole;

import com.github.pagehelper.PageInfo;

public interface URoleService {
	int add(URole role) throws Exception;

	URole findByPrimaryKey(String roleCode);

	default URole obtainByPrimaryKey(String roleCode) {
		return Objects.requireNonNull(findByPrimaryKey(roleCode), "角色不存在：" + roleCode);
	}

	List<URole> findByColumn(URole role);
	
	List<URole> findRestByUser(Integer userId);

	PageInfo<URole> page(URole role, Integer pageNum, Integer pageSize);

	int updateByPrimaryKeySelective(String roleCode, URole role) throws Exception;
}
