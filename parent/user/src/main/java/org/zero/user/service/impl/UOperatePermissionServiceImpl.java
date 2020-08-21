package org.zero.user.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zero.user.model.UOperatePermission;
import org.zero.user.service.UOperatePermissionService;
import org.zero.user.service.mapper.UOperatePermissionMapper;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class UOperatePermissionServiceImpl implements UOperatePermissionService {
	private static Logger logger = LoggerFactory.getLogger(UOperatePermissionServiceImpl.class);

	@Autowired
	private UOperatePermissionMapper mapper;

	@Override
	@Transactional
	public int add(UOperatePermission operatePermission) throws Exception {
		logger.info("插入操作权限信息，operatePermission：[{}]", operatePermission);
		Objects.requireNonNull(operatePermission);

		Optional.ofNullable(findByPrimaryKey(operatePermission.getPermissionCode())).ifPresent((e) -> {
			throw new RuntimeException("权限已存在");
		});
		// .orElseThrow(() -> new RuntimeException("权限已存在"));

		return mapper.insert(operatePermission);
	}

	@Override
	public UOperatePermission findByPrimaryKey(String permissionCode) {
		logger.debug("根据primary key查找操作权限，permissionCode：[{}]", permissionCode);
		Objects.requireNonNull(permissionCode);
		return mapper.selectByPrimaryKey(permissionCode);
	}

	@Override
	public List<UOperatePermission> findByColumn(UOperatePermission operatePermission) {
		logger.debug("根据column查找操作权限，operatePermission：[{}]", operatePermission);
		return mapper.selectByColumn(operatePermission);
	}

	@Override
	public List<UOperatePermission> findByUser(Integer userId) {
		logger.debug("根据用户查找菜单权限，userId：[{}]", userId);

		return mapper.selectByUser(userId);
	}

	@Override
	public PageInfo<UOperatePermission> page(UOperatePermission operatePermission, Integer pageNum, Integer pageSize) {
		logger.debug("分页操作权限，operatePermission：[{}]，pageNum：[{}]，pageSize：[{}]", operatePermission, pageNum, pageSize);
		PageHelper.startPage(pageNum, pageSize);

		return new PageInfo<>(findByColumn(operatePermission));
	}

	@Override
	@Transactional
	public int updateByPrimaryKeySelective(String permissionCode, UOperatePermission operatePermission)
			throws Exception {
		logger.info("根据primary key更新操作权限，permissionCode：[{}]，operatePermission：[{}]", permissionCode,
				operatePermission);
		Objects.requireNonNull(permissionCode);
		Objects.requireNonNull(operatePermission);
		operatePermission.setPermissionCode(permissionCode);

		return mapper.updateByPrimaryKeySelective(operatePermission);
	}

}
