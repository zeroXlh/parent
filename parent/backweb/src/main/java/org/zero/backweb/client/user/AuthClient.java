package org.zero.backweb.client.user;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.zero.user.model.UOperatePermission;

import com.github.pagehelper.PageInfo;

@FeignClient(name = "user", contextId = "auth-client")
@RequestMapping("/auth")
public interface AuthClient {

	@GetMapping(value = "/page")
	public PageInfo<UOperatePermission> page(@RequestParam("operatePermission") UOperatePermission operatePermission,
			@RequestParam("pageNum") Integer pageNum, @RequestParam("pageSize") Integer pageSize);

	@GetMapping(value = "/fetchByPrimaryKey")
	public UOperatePermission fetchByPrimaryKey(@RequestParam("permissionCode") String permissionCode);

	@PostMapping(value = "/add")
	public int add(@RequestBody UOperatePermission operatePermission);

	@PostMapping(value = "/update")
	public int update(@RequestBody UOperatePermission operatePermission);

}
