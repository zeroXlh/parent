package org.zero.backweb.controller.user;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zero.backweb.client.user.DepartmentClient;
import org.zero.component.web.ResponseCode;
import org.zero.component.web.ResponseData;
import org.zero.user.model.UDepartment;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/hoper/backweb/department")
public class DepartmentController {
	private static Logger logger = LoggerFactory.getLogger(DepartmentController.class);

	@Autowired
	private DepartmentClient departmentClient;

	@GetMapping(value = "/page")
	public ResponseData<PageInfo<UDepartment>> page(UDepartment department, Integer pageNum, Integer pageSize) {
		logger.info("分页部门，参数：[{}]，[{}]，[{}]", department, pageNum, pageSize);
		ResponseData<PageInfo<UDepartment>> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			PageInfo<UDepartment> info = departmentClient.page(department, pageNum, pageSize);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
			resp.setData(info);

		} catch (Exception e) {
			logger.error("分页部门失败，参数：[{}]，[{}]，[{}]", department, pageNum, pageSize, e);
			resp.setMsg("分页部门失败：" + e.getMessage());
		}
		return resp;
	}

	@GetMapping(value = "/fetchByPrimary")
	public ResponseData<UDepartment> fetchByPrimary(String deptCode) {
		logger.info("根据primary获取部门，参数：[{}]", deptCode);
		ResponseData<UDepartment> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			UDepartment department = departmentClient.fetchByPrimary(deptCode);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
			resp.setData(department);
		} catch (Exception e) {
			logger.error("根据primary获取部门失败，参数：[{}]", deptCode, e);
			resp.setMsg("根据primary获取部门失败失败：" + e.getMessage());
		}
		return resp;
	}

	@GetMapping(value = "/valid")
	public ResponseData<List<UDepartment>> validList() {
		logger.info("获取有效部门列表");
		ResponseData<List<UDepartment>> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			UDepartment department = new UDepartment();
			department.setEnabled(true);
			List<UDepartment> list = departmentClient.list(department);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
			resp.setData(list);
		} catch (Exception e) {
			logger.error("获取有效部门列表失败", e);
			resp.setMsg("获取有效部门列表失败：" + e.getMessage());
		}
		return resp;
	}

	@PostMapping(value = "/add")
	public ResponseData<String> add(UDepartment department) {
		logger.info("新增部门，参数：[{}]", department);
		ResponseData<String> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			departmentClient.add(department);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
		} catch (Exception e) {
			logger.error("新增部门失败，参数：[{}]", department, e);
			resp.setMsg("新增部门失败：" + e.getMessage());
		}
		return resp;
	}

	@PostMapping(value = "/update")
	public ResponseData<String> update(UDepartment department) {
		logger.info("更新部门，参数：[{}]", department);
		ResponseData<String> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			departmentClient.update(department);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
		} catch (Exception e) {
			logger.error("更新部门失败，参数：[{}]", department, e);
			resp.setMsg("更新部门失败：" + e.getMessage());
		}
		return resp;
	}

//	@PostMapping(value = "/enableOrDisable")
//	public ResponseData<String> enableOrDisable(UDepartment department) {
//		logger.info("启用/禁用部门，参数：[{}]", department);
//		ResponseData<String> resp = new ResponseData<>(ResponseCode.FAIL);
//		try {
//			departmentClient.update(department);
//
//			resp.setCode(ResponseCode.SUCC);
//			resp.setMsg("SUCC");
//		} catch (Exception e) {
//			logger.error("启用/禁用部门失败，参数：[{}]", department, e);
//			resp.setMsg("启用/禁用部门失败：" + e.getMessage());
//		}
//		return resp;
//	}

}
