package org.zero.user.service;

import java.util.List;
import java.util.Objects;

import org.zero.user.model.UDepartment;

import com.github.pagehelper.PageInfo;

public interface UDepartmentService {
	int add(UDepartment department) throws Exception;

	UDepartment findByPrimaryKey(String deptCode);

	default UDepartment obtainByPrimaryKey(String deptCode) {
		return Objects.requireNonNull(findByPrimaryKey(deptCode), "部门不存在：" + deptCode);
	}

	List<UDepartment> findByColumn(UDepartment department);

	PageInfo<UDepartment> page(UDepartment department, Integer pageNum, Integer pageSize);

	int updateByPrimaryKeySelective(String deptCode, UDepartment department) throws Exception;
}
