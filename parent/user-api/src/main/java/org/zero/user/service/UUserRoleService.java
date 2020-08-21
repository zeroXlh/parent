package org.zero.user.service;

import java.util.List;

import org.zero.user.model.UUserRole;
import org.zero.user.model.UUserRoleKey;
import org.zero.user.model.UUserRoleVo;

import com.github.pagehelper.PageInfo;

public interface UUserRoleService {
	int add(UUserRole userRole) throws Exception;
	
	UUserRole findByPrimaryKey(UUserRoleKey userRoleKey);
	
	int addBatch(List<UUserRole> userRoles)  throws Exception;
	
//	List<UUserRoleVo> findByColumn(UUserRoleVo userRoleVo);
	
	PageInfo<UUserRoleVo> pageAuth(UUserRoleVo userRoleVo,  Integer pageNum,
			 Integer pageSize);
	
	PageInfo<UUserRoleVo> pageNonAuth(UUserRoleVo userRoleVo,  Integer pageNum,
			Integer pageSize);
	
	int updateByPrimaryKeySelective(UUserRole userRole) throws Exception;
}
