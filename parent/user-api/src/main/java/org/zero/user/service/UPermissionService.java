package org.zero.user.service;

import java.util.List;
import java.util.Objects;

import org.zero.user.model.UPermission;

import com.github.pagehelper.PageInfo;

public interface UPermissionService {
	int add(UPermission permission) throws Exception;

	UPermission findByPrimaryKey(String permissionCode);

	default UPermission obtainByPrimaryKey(String permissionCode) {
		return Objects.requireNonNull(findByPrimaryKey(permissionCode), "权限不存在：" + permissionCode);
	}

	List<UPermission> findByColumn(UPermission permission);

	PageInfo<UPermission> page(UPermission department, Integer pageNum, Integer pageSize);

	int updateByPrimaryKeySelective(String permissionCode, UPermission permission) throws Exception;
}
