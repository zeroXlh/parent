package org.zero.backweb.client.user;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.zero.component.web.ResponseData;
import org.zero.user.model.UMenuInfo;
import org.zero.user.model.UOperatePermission;
import org.zero.user.model.UUser;

import com.github.pagehelper.PageInfo;

@FeignClient(name = "user", contextId = "userClient")
@RequestMapping("/user")
public interface UserClient {

	@GetMapping("/fetchUserByUserName1")
	UUser fetchUserByUserName1(@RequestParam("userName") String userName);

	@GetMapping("/fetchUserByUserName/{userName}")
	UUser fetchUserByUserName(@PathVariable("userName") String userName);

	@GetMapping("/fetchMenu/{userId}")
	List<UMenuInfo> fetchMenu(@PathVariable("userId") Integer userId);

	@GetMapping("/fetchOperates/{userId}")
	List<UOperatePermission> fetchOperates(@PathVariable("userId") Integer userId);

	@PostMapping("/page")
	PageInfo<UUser> page(@RequestBody UUser user, @RequestParam("pageNum") Integer pageNum,
			@RequestParam("pageSize") Integer pageSize);

	@GetMapping(value = "/findByPrimary")
	public UUser findByPrimary(@RequestParam("userId") Integer userId);

	@PostMapping(value = "/add")
	public ResponseData<String> add(@RequestBody UUser user);

	@PostMapping(value = "/update")
	public ResponseData<String> update(@RequestBody UUser user);
}
