package org.zero.backweb.client.user;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.zero.component.web.ResponseData;
import org.zero.user.model.URoleAuth;
import org.zero.user.model.URoleAuthVo;

import com.github.pagehelper.PageInfo;

@FeignClient(name = "user", contextId = "role-auth-client")
@RequestMapping("/roleAuth")
public interface RoleAuthClient {

	@PostMapping("/pageNonAuthMenu")
	public PageInfo<URoleAuthVo> pageNonAuthMenu(@RequestBody URoleAuthVo roleAuthVo,
			@RequestParam("pageNum") Integer pageNum, @RequestParam("pageSize") Integer pageSize);

	@PostMapping("/pageAuthMenu")
	public PageInfo<URoleAuthVo> pageAuthMenu(@RequestBody URoleAuthVo roleAuthVo,
			@RequestParam("pageNum") Integer pageNum, @RequestParam("pageSize") Integer pageSize);

	@PostMapping("/pageNonAuth")
	public PageInfo<URoleAuthVo> pageNonAuth(@RequestBody URoleAuthVo roleAuthVo,
			@RequestParam("pageNum") Integer pageNum, @RequestParam("pageSize") Integer pageSize);

	@PostMapping("/pageAuth")
	public PageInfo<URoleAuthVo> pageAuth(@RequestBody URoleAuthVo roleAuthVo, @RequestParam("pageNum") Integer pageNum,
			@RequestParam("pageSize") Integer pageSize);

	@PostMapping(value = "/add")
	public ResponseData<String> add(@RequestBody URoleAuth roleAuth);
//	@PostMapping(value = "/addBatch")
//	public ResponseData<String> addBatch(@RequestBody List<URoleAuth> list);

	@PostMapping(value = "/update")
	public ResponseData<String> update(@RequestBody URoleAuth roleAuth);

}
