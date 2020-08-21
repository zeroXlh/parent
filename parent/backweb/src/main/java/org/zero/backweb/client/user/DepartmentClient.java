package org.zero.backweb.client.user;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.zero.user.model.UDepartment;

import com.github.pagehelper.PageInfo;

@FeignClient(name = "user", contextId = "departmentClient")
@RequestMapping("/department")
public interface DepartmentClient {
	@PostMapping(value = "/page")
	public PageInfo<UDepartment> page(@RequestBody UDepartment department, @RequestParam("pageNum") Integer pageNum,
			@RequestParam("pageSize") Integer pageSize);

	@GetMapping(value = "/fetchByPrimary")
	public UDepartment fetchByPrimary(@RequestParam("deptCode") String deptCode);

	@PostMapping(value = "/list")
	public List<UDepartment> list(@RequestBody UDepartment department);

	@PostMapping(value = "/add")
	public int add(@RequestBody UDepartment department);

	@PostMapping(value = "/update")
	public int update(@RequestBody UDepartment department);
}
