package org.zero.user.service;

import java.util.List;

import org.zero.user.model.UOperatePermission;

import com.github.pagehelper.PageInfo;

public interface UOperatePermissionService {
	int add(UOperatePermission operatePermission) throws Exception;

	UOperatePermission findByPrimaryKey(String permissionCode);

	List<UOperatePermission> findByColumn(UOperatePermission operatePermission);
	
	List<UOperatePermission> findByUser(Integer userId);
	
	PageInfo<UOperatePermission> page(UOperatePermission operatePermission, Integer pageNum, Integer pageSize);

	int updateByPrimaryKeySelective(String permissionCode, UOperatePermission operatePermission) throws Exception;

}
