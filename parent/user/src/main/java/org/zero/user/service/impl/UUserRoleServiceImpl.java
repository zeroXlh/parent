package org.zero.user.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zero.component.utils.StringUtils;
import org.zero.user.model.UUserRole;
import org.zero.user.model.UUserRoleKey;
import org.zero.user.model.UUserRoleVo;
import org.zero.user.service.UUserRoleService;
import org.zero.user.service.mapper.UUserRoleMapper;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class UUserRoleServiceImpl implements UUserRoleService {
	private static Logger logger = LoggerFactory.getLogger(UUserRoleServiceImpl.class);

	@Autowired
	private UUserRoleMapper mapper;

	@Override
	@Transactional
	public int add(UUserRole userRole) throws Exception {
		logger.info("插入用户角色信息，userRole：[{}]", userRole);
		Objects.requireNonNull(userRole);

		Optional.ofNullable(findByPrimaryKey(userRole)).ifPresent((e) -> {
			throw new RuntimeException("用户已授权此角色");
		});

		return mapper.insertSelective(userRole);
	}

	@Override
	public UUserRole findByPrimaryKey(UUserRoleKey userRoleKey) {
		logger.debug("根据primary key查找用户角色信息，userRoleKey：[{}]", userRoleKey);
		Objects.requireNonNull(userRoleKey);
		Objects.requireNonNull(userRoleKey.getUserId());
		StringUtils.requireNonEmpty(userRoleKey.getRoleCode());

		return mapper.selectByPrimaryKey(userRoleKey);
	}

	@Override
	@Transactional
	public int addBatch(List<UUserRole> userRoles) throws Exception {
		logger.info("批量插入用户角色信息，userRoles：[{}]", userRoles);

		// TODO 怎么前置校验
		// Stream<UUserRole> filter = userRoles.stream().filter(
		// (e) -> e == null ? false : e.getUserId() == null ? false :
		// StringUtils.isEmpty(e.getRoleCode()));
		// if (filter.count() != userRoles.size())
		// throw new RuntimeException("用户角色信息列表存在错误值");

		return mapper.insertBatch(userRoles);
	}

	// @Override
	// public List<UUserRoleVo> findByColumn(UUserRoleVo userRoleVo) {
	// logger.debug("根据column查找用户角色信息，userRoleVo：[{}]", userRoleVo);
	// return mapper.findByColumn(userRoleVo);
	// }

	@Override
	public PageInfo<UUserRoleVo> pageAuth(UUserRoleVo userRoleVo, Integer pageNum, Integer pageSize) {
		logger.debug("分页查找用户授权角色，userRoleVo：[{}]，pageNum：[{}]，pageSize：[{}]", userRoleVo, pageNum, pageSize);
		Objects.requireNonNull(userRoleVo);
		Objects.requireNonNull(userRoleVo.getUserId());

		PageHelper.startPage(pageNum, pageSize, "role_code");

		return new PageInfo<>(mapper.selectAuth(userRoleVo));
	}

	@Override
	public PageInfo<UUserRoleVo> pageNonAuth(UUserRoleVo userRoleVo, Integer pageNum, Integer pageSize) {
		logger.debug("分页查找用户未授权角色，userRoleVo：[{}]，pageNum：[{}]，pageSize：[{}]", userRoleVo, pageNum, pageSize);
		Objects.requireNonNull(userRoleVo);
		Objects.requireNonNull(userRoleVo.getUserId());

		PageHelper.startPage(pageNum, pageSize, "");
		return new PageInfo<>(mapper.selectNonAuth(userRoleVo));
	}

	@Override
	@Transactional
	public int updateByPrimaryKeySelective(UUserRole userRole) throws Exception {
		logger.info("更新用户角色信息，userRole：[{}]", userRole);
		Objects.requireNonNull(userRole);
		Objects.requireNonNull(userRole.getUserId());
		StringUtils.requireNonEmpty(userRole.getRoleCode());

		return mapper.updateByPrimaryKeySelective(userRole);
	}

}
