package org.zero.user.service;

import java.util.List;
import java.util.Objects;

import org.zero.user.model.UUser;

import com.github.pagehelper.PageInfo;

public interface UUserService {
	int add(UUser user) throws Exception;

	UUser findByPrimaryKey(Integer userId);

	UUser findByUserName(String userName);

	default UUser obtainByPrimaryKey(Integer userId) {
		return Objects.requireNonNull(findByPrimaryKey(userId), "用户不存在：" + userId);
	}

	default UUser obtainByUserName(String userName) {
		return Objects.requireNonNull(findByUserName(userName), "用户不存在：" + userName);
	}

	List<UUser> findByColumn(UUser user);
	
	PageInfo<UUser> page(UUser user, Integer pageNum, Integer pageSize);

	int updateByPrimaryKeySelective(Integer userId, UUser user) throws Exception;
}
