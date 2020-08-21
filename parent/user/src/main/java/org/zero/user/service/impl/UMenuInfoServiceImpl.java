package org.zero.user.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zero.user.model.UMenuInfo;
import org.zero.user.service.UMenuInfoService;
import org.zero.user.service.mapper.UMenuInfoMapper;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class UMenuInfoServiceImpl implements UMenuInfoService {
	private static Logger logger = LoggerFactory.getLogger(UMenuInfoServiceImpl.class);

	@Autowired
	private UMenuInfoMapper mapper;

	@Override
	@Transactional
	public int add(UMenuInfo menuInfo) throws Exception {
		logger.info("插入菜单信息，menuInfo：[{}]", menuInfo);
		Objects.requireNonNull(menuInfo);

		Optional.ofNullable(findByPrimaryKey(menuInfo.getPermissionCode())).ifPresent((e) -> {
			throw new RuntimeException("菜单已存在");
		});

		return mapper.insert(menuInfo);
	}

	@Override
	public UMenuInfo findByPrimaryKey(String permissionCode) {
		logger.debug("根据primary key查找菜单，permissionCode：[{}]", permissionCode);
		Objects.requireNonNull(permissionCode);
		return mapper.selectByPrimaryKey(permissionCode);
	}

	@Override
	public List<UMenuInfo> findByColumn(UMenuInfo menuInfo) {
		logger.debug("根据column查找菜单，menuInfo：[{}]", menuInfo);
		return mapper.selectByColumn(menuInfo);
	}

	@Override
	public List<UMenuInfo> findByUser(Integer userId) {
		logger.debug("根据用户查找菜单，userId：[{}]", userId);
		return mapper.selectByUser(userId);
	}

	@Override
	public PageInfo<UMenuInfo> page(UMenuInfo menuInfo, Integer pageNum, Integer pageSize) {
		logger.debug("分页菜单，menuInfo：[{}]，pageNum：[{}]，pageSize：[{}]", menuInfo, pageNum, pageSize);
		PageHelper.startPage(pageNum, pageSize);

		return new PageInfo<>(findByColumn(menuInfo));
	}

	@Override
	@Transactional
	public int updateByPrimaryKeySelective(String permissionCode, UMenuInfo menuInfo) throws Exception {
		logger.info("根据primary key更新菜单，permissionCode：[{}]，menuInfo：[{}]", permissionCode, menuInfo);
		Objects.requireNonNull(permissionCode);
		Objects.requireNonNull(menuInfo);
		menuInfo.setPermissionCode(permissionCode);

		return mapper.updateByPrimaryKeySelective(menuInfo);
	}

}
