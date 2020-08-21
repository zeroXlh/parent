package org.zero.backweb.client.user;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.zero.component.web.ResponseData;
import org.zero.user.model.UUserRole;
import org.zero.user.model.UUserRoleVo;

import com.github.pagehelper.PageInfo;

@FeignClient(name = "user", contextId = "user-role-client")
@RequestMapping("/userRole")
public interface UserRoleClient {

	@PostMapping("/pageNonAuth")
	public PageInfo<UUserRoleVo> pageNonAuth(@RequestBody UUserRole userRole, @RequestParam("pageNum") Integer pageNum,
			@RequestParam("pageSize") Integer pageSize);

	@PostMapping("/pageAuth")
	public PageInfo<UUserRoleVo> pageAuth(@RequestBody UUserRole userRole, @RequestParam("pageNum") Integer pageNum,
			@RequestParam("pageSize") Integer pageSize);

	@PostMapping(value = "/add")
	public ResponseData<String> add(@RequestBody UUserRole userRole);

	@PostMapping(value = "/update")
	public ResponseData<String> update(@RequestBody UUserRole userRole);

}
