package org.zero.user.service;

import java.util.List;

import org.zero.user.model.URoleAuth;
import org.zero.user.model.URoleAuthKey;
import org.zero.user.model.URoleAuthVo;

import com.github.pagehelper.PageInfo;

public interface URoleAuthService {
	int add(URoleAuth roleAuth) throws Exception;
	
	int add(List<URoleAuth> list) throws Exception;

	URoleAuth findByPrimaryKey(URoleAuthKey roleAuthKey);

	int addBatch(List<URoleAuth> roleAuths) throws Exception;

	PageInfo<URoleAuthVo> pageAuth(URoleAuthVo roleAuthVo, Integer pageNum, Integer pageSize);

	PageInfo<URoleAuthVo> pageNonAuth(URoleAuthVo roleAuthVo, Integer pageNum, Integer pageSize);

	PageInfo<URoleAuthVo> pageAuthMenu(URoleAuthVo roleAuthVo, Integer pageNum, Integer pageSize);

	PageInfo<URoleAuthVo> pageNonAuthMenu(URoleAuthVo roleAuthVo, Integer pageNum, Integer pageSize);

	int updateByPrimaryKeySelective(URoleAuth roleAuth) throws Exception;
}
