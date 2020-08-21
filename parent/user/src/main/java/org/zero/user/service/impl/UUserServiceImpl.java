package org.zero.user.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zero.user.model.UUser;
import org.zero.user.service.UUserService;
import org.zero.user.service.mapper.UUserMapper;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class UUserServiceImpl implements UUserService {

	private static Logger logger = LoggerFactory.getLogger(UUserServiceImpl.class);
	@Autowired
	private UUserMapper mapper;

	@Override
	@Transactional
	public int add(UUser user) throws Exception {
		logger.info("插入用户，user：[{}]", user);
		Objects.requireNonNull(user);
		Objects.requireNonNull(user.getUserName());

		Optional.ofNullable(findByUserName(user.getUserName())).ifPresent((e) -> {
			throw new RuntimeException("用户已存在: " + e.getUserName());
		});

		return mapper.insertSelective(user);
	}

	@Override
	public UUser findByPrimaryKey(Integer userId) {
		logger.debug("根据primary key查找用户，userId：[{}]", userId);
		Objects.requireNonNull(userId);
		return mapper.selectByPrimaryKey(userId);
	}

	@Override
	public UUser findByUserName(String userName) {
		logger.debug("根据userName查找用户，userName：[{}]", userName);
		Objects.requireNonNull(userName);
		return mapper.selectByUserName(userName);
	}

	@Override
	public List<UUser> findByColumn(UUser user) {
		logger.debug("根据columns查找用户，user：[{}]", user);
		return mapper.selectByColumn(user);
	}

	@Override
	public PageInfo<UUser> page(UUser user, Integer pageNum, Integer pageSize) {

		PageHelper.startPage(pageNum, pageSize);

		return new PageInfo<>(findByColumn(user));
	}

	@Override
	@Transactional
	public int updateByPrimaryKeySelective(Integer userId, UUser user) throws Exception {
		logger.info("根据primary key更新用户，userId：[{}]，user：[{}]", userId, user);
		Objects.requireNonNull(userId);
		Objects.requireNonNull(user);
		user.setUserId(userId);

		return mapper.updateByPrimaryKeySelective(user);
	}

}
