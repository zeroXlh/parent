package org.zero.user.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.zero.user.model.UDepartment;
import org.zero.user.service.UDepartmentService;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/department")
public class DepartmentClientController {
	private static Logger logger = LoggerFactory.getLogger(DepartmentClientController.class);

	@Autowired
	private UDepartmentService uDepartmentService;

	@PostMapping(value = "/page")
	public PageInfo<UDepartment> page(@RequestBody UDepartment department, Integer pageNum, Integer pageSize) {
		logger.info("分页部门，参数：[{}]，[{}]，[{}]", department, pageNum, pageSize);

		return uDepartmentService.page(department, pageNum, pageSize);
	}

	@GetMapping(value = "/fetchByPrimary")
	public UDepartment fetchByPrimary(@RequestParam("deptCode") String deptCode) {
		logger.info("根据primary获取部门，参数：[{}]", deptCode);
		return uDepartmentService.findByPrimaryKey(deptCode);
	}

	@PostMapping(value = "/list")
	public List<UDepartment> list(@RequestBody UDepartment department) {
		logger.info("获取部门列表，参数：[{}]", department);

		return uDepartmentService.findByColumn(department);
	}

	@PostMapping(value = "/add")
	public int add(@RequestBody UDepartment department) throws Exception {
		logger.info("新增部门，参数：[{}]", department);
		return uDepartmentService.add(department);
		// try {
		// } catch (Exception e) {
		// logger.info("新增部门失败，参数：[{}]", department, e);
		// }
		// return 0;
	}

	@PostMapping(value = "/update")
	public int update(@RequestBody UDepartment department) {
		logger.info("更新部门，参数：[{}]", department);
		try {
			return uDepartmentService.updateByPrimaryKeySelective(department.getDeptCode(), department);
		} catch (Exception e) {
			logger.info("更新部门失败，参数：[{}]", department, e);
		}
		return 0;
	}
}
