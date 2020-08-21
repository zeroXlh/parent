package org.zero.backweb.client.user;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.zero.component.web.ResponseData;
import org.zero.user.model.URole;

import com.github.pagehelper.PageInfo;

@FeignClient(name = "user", contextId = "role-client")
@RequestMapping("/role")
public interface RoleClient {

	@PostMapping("/page")
	public PageInfo<URole> page(@RequestBody URole role, @RequestParam("pageNum") Integer pageNum,
			@RequestParam("pageSize") Integer pageSize);

	@GetMapping(value = "/fetchByPrimaryKey")
	public URole fetchByPrimaryKey(@RequestParam("roleCode") String roleCode);

	@PostMapping(value = "/add")
	public ResponseData<String> add(@RequestBody URole role);

	@PostMapping(value = "/update")
	public ResponseData<String> update(@RequestBody URole role);

}
