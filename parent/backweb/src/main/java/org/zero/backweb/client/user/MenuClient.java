package org.zero.backweb.client.user;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.zero.component.web.ResponseData;
import org.zero.user.model.UMenuInfo;

import com.github.pagehelper.PageInfo;

@FeignClient(name = "user", contextId = "menu-client")
@RequestMapping("/menu")
public interface MenuClient {
	@PostMapping(value = "/page")
	public PageInfo<UMenuInfo> page(@RequestBody UMenuInfo menuInfo,
			@RequestParam("pageNum") Integer pageNum, @RequestParam("pageSize") Integer pageSize);

	@GetMapping(value = "/fetchByPrimaryKey")
	public UMenuInfo fetchByPrimaryKey(@RequestParam("permissionCode") String permissionCode);

	@PostMapping(value = "/add")
	public ResponseData<String> add(@RequestBody UMenuInfo menuInfo);

	@PostMapping(value = "/update")
	public ResponseData<String> update(@RequestBody UMenuInfo menuInfo);
}
