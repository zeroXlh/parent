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
import org.zero.user.model.URoleAuth;
import org.zero.user.model.URoleAuthKey;
import org.zero.user.model.URoleAuthVo;
import org.zero.user.service.URoleAuthService;
import org.zero.user.service.mapper.URoleAuthMapper;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class URoleAuthServiceImpl implements URoleAuthService {
	private static Logger logger = LoggerFactory.getLogger(URoleAuthServiceImpl.class);

	@Autowired
	private URoleAuthMapper mapper;

	@Override
	@Transactional
	public int add(URoleAuth roleAuth) throws Exception {
		logger.info("插入角色权限信息，userRole：[{}]", roleAuth);
		Objects.requireNonNull(roleAuth);

		Optional.ofNullable(findByPrimaryKey(roleAuth)).ifPresent((e) -> {
			throw new RuntimeException("角色已授权此权限");
		});

		return mapper.insertSelective(roleAuth);
	}

	@Override
	@Transactional
	public int add(List<URoleAuth> list) throws Exception {
		logger.debug("批量插入角色权限信息，list：[{}]", list);
		// Objects.requireNonNull(roleAuth);

		// Optional.ofNullable(findByPrimaryKey(roleAuth)).ifPresent((e) -> {
		// throw new RuntimeException("角色已授权此权限");
		// });

		return mapper.insertBatch(list);
	}

	@Override
	public URoleAuth findByPrimaryKey(URoleAuthKey roleAuthKey) {
		logger.debug("根据primary key查找角色权限信息，userRoleKey：[{}]", roleAuthKey);
		Objects.requireNonNull(roleAuthKey);
		StringUtils.requireNonEmpty(roleAuthKey.getRoleCode());
		StringUtils.requireNonEmpty(roleAuthKey.getPermissionCode());

		return mapper.selectByPrimaryKey(roleAuthKey);
	}

	@Override
	public int addBatch(List<URoleAuth> roleAuths) throws Exception {
		// TODO Auto-generated method stub
		throw new AssertionError();
	}

	@Override
	public PageInfo<URoleAuthVo> pageAuth(URoleAuthVo roleAuthVo, Integer pageNum, Integer pageSize) {
		logger.debug("分页查找角色授权操作，roleAuthVo：[{}]，pageNum：[{}]，pageSize：[{}]", roleAuthVo, pageNum, pageSize);
		Objects.requireNonNull(roleAuthVo);
		StringUtils.requireNonEmpty(roleAuthVo.getRoleCode());

		PageHelper.startPage(pageNum, pageSize, "permission_code");

		return new PageInfo<>(mapper.selectAuth(roleAuthVo));
	}

	@Override
	public PageInfo<URoleAuthVo> pageNonAuth(URoleAuthVo roleAuthVo, Integer pageNum, Integer pageSize) {
		logger.debug("分页查找角色未授权操作，roleAuthVo：[{}]，pageNum：[{}]，pageSize：[{}]", roleAuthVo, pageNum, pageSize);
		Objects.requireNonNull(roleAuthVo);
		StringUtils.requireNonEmpty(roleAuthVo.getRoleCode());

		PageHelper.startPage(pageNum, pageSize, "permission_code");

		return new PageInfo<>(mapper.selectNonAuth(roleAuthVo));
	}

	@Override
	public PageInfo<URoleAuthVo> pageAuthMenu(URoleAuthVo roleAuthVo, Integer pageNum, Integer pageSize) {
		logger.debug("分页查找角色已授权菜单，roleAuthVo：[{}]，pageNum：[{}]，pageSize：[{}]", roleAuthVo, pageNum, pageSize);
		Objects.requireNonNull(roleAuthVo);
		StringUtils.requireNonEmpty(roleAuthVo.getRoleCode());

		PageHelper.startPage(pageNum, pageSize, "permission_code");

		return new PageInfo<>(mapper.selectAuthMenu(roleAuthVo));
	}

	@Override
	public PageInfo<URoleAuthVo> pageNonAuthMenu(URoleAuthVo roleAuthVo, Integer pageNum, Integer pageSize) {
		logger.debug("分页查找角色未授权菜单，roleAuthVo：[{}]，pageNum：[{}]，pageSize：[{}]", roleAuthVo, pageNum, pageSize);
		Objects.requireNonNull(roleAuthVo);
		StringUtils.requireNonEmpty(roleAuthVo.getRoleCode());

		PageHelper.startPage(pageNum, pageSize, "permission_code ASC");

		return new PageInfo<>(mapper.selectNonAuthMenu(roleAuthVo));
	}

	@Override
	@Transactional
	public int updateByPrimaryKeySelective(URoleAuth roleAuth) throws Exception {
		logger.info("更新角色权限信息，roleAuth：[{}]", roleAuth);
		Objects.requireNonNull(roleAuth);
		StringUtils.requireNonEmpty(roleAuth.getRoleCode());
		StringUtils.requireNonEmpty(roleAuth.getPermissionCode());

		return mapper.updateByPrimaryKeySelective(roleAuth);
	}

}
