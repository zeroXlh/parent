package org.zero.user.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zero.user.model.UDepartment;
import org.zero.user.service.UDepartmentService;
import org.zero.user.service.mapper.UDepartmentMapper;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class UDepartmentServiceImpl implements UDepartmentService {
	private static Logger logger = LoggerFactory.getLogger(UDepartmentServiceImpl.class);

	@Autowired
	private UDepartmentMapper mapper;

	@Override
	@Transactional
	public int add(UDepartment department) throws Exception {
		logger.info("插入部门信息，department：[{}]", department);
		Objects.requireNonNull(department);

		if (Objects.nonNull(findByPrimaryKey(department.getDeptCode())))
			throw new RuntimeException("部门已存在" + department.getDeptCode());
		// Optional.ofNullable(findByPrimaryKey(department.getDeptCode())).ifPresent((e)->{
		// throw new RuntimeException("部门已存在" + e.getDeptCode());
		// });

		return mapper.insert(department);
	}

	@Override
	public UDepartment findByPrimaryKey(String deptCode) {
		logger.debug("根据primary key查找部门，deptCode：[{}]", deptCode);
		Objects.requireNonNull(deptCode);
		return mapper.selectByPrimaryKey(deptCode);
	}

	@Override
	public List<UDepartment> findByColumn(UDepartment department) {
		logger.debug("根据column查找部门，department：[{}]", department);
		return mapper.selectByColumn(department);
	}

	@Override
	public PageInfo<UDepartment> page(UDepartment department, Integer pageNum, Integer pageSize) {
		logger.debug("分页部门，department：[{}]，pageNum：[{}]，pageSize：[{}]", department, pageNum, pageSize);
		PageHelper.startPage(pageNum, pageSize);

		return new PageInfo<>(findByColumn(department));
	}

	@Override
	@Transactional
	public int updateByPrimaryKeySelective(String deptCode, UDepartment department) throws Exception {
		logger.info("根据primary key更新部门，deptCode：[{}]，department：[{}]", deptCode, department);
		Objects.requireNonNull(deptCode);
		Objects.requireNonNull(department);
		department.setDeptCode(deptCode);

		return mapper.updateByPrimaryKeySelective(department);
	}

}
