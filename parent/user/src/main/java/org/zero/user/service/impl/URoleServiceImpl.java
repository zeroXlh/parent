package org.zero.user.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zero.user.model.URole;
import org.zero.user.service.URoleService;
import org.zero.user.service.mapper.URoleMapper;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class URoleServiceImpl implements URoleService {
	private static Logger logger = LoggerFactory.getLogger(URoleServiceImpl.class);

	@Autowired
	private URoleMapper mapper;

	@Override
	@Transactional
	public int add(URole role) throws Exception {
		logger.info("插入角色信息，role：[{}]", role);
		Objects.requireNonNull(role);

		Optional.ofNullable(findByPrimaryKey(role.getRoleCode())).ifPresent((e) -> {
			throw new RuntimeException(e.getRoleCode() + " 角色已存在");
		});

		return mapper.insert(role);
	}

	@Override
	public URole findByPrimaryKey(String roleCode) {
		logger.debug("根据primary key查找角色，roleCode：[{}]", roleCode);
		Objects.requireNonNull(roleCode);
		return mapper.selectByPrimaryKey(roleCode);
	}

	@Override
	public List<URole> findByColumn(URole role) {
		logger.debug("根据column查找角色，role：[{}]", role);
		return mapper.selectByColumn(role);
	}

	@Override
	public List<URole> findRestByUser(Integer userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PageInfo<URole> page(URole role, Integer pageNum, Integer pageSize) {
		logger.debug("分页角色，role：[{}]，pageNum：[{}]，pageSize：[{}]", role, pageNum, pageSize);
		PageHelper.startPage(pageNum, pageSize);

		return new PageInfo<>(findByColumn(role));
	}

	@Override
	@Transactional
	public int updateByPrimaryKeySelective(String roleCode, URole role) throws Exception {
		logger.info("根据primary key更新角色，roleCode：[{}]，role：[{}]", roleCode, role);
		Objects.requireNonNull(roleCode);
		Objects.requireNonNull(role);
		role.setRoleCode(roleCode);

		return mapper.updateByPrimaryKeySelective(role);
	}

}
