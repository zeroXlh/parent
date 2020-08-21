package org.zero.user.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.zero.component.web.ResponseCode;
import org.zero.component.web.ResponseData;
import org.zero.user.model.UMenuInfo;
import org.zero.user.service.UMenuInfoService;

import com.github.pagehelper.PageInfo;

@RequestMapping("/menu")
@RestController
public class MenuClientController {

	private static Logger logger = LoggerFactory.getLogger(MenuClientController.class);

	@Autowired
	private UMenuInfoService uMenuInfoService;

	@PostMapping(value = "/page")
	public PageInfo<UMenuInfo> page(@RequestBody UMenuInfo menuInfo, Integer pageNum, Integer pageSize) {
		logger.info("分页菜单，参数：[{}]，[{}]，[{}]", menuInfo, pageNum, pageSize);

		return uMenuInfoService.page(menuInfo, pageNum, pageSize);
	}

	@GetMapping(value = "/fetchByPrimaryKey")
	public UMenuInfo fetchByPrimaryKey(String permissionCode) {
		logger.info("根据primary获取菜单，参数：[{}]", permissionCode);

		return uMenuInfoService.findByPrimaryKey(permissionCode);
	}

	@PostMapping(value = "/add")
	public ResponseData<String> add(@RequestBody UMenuInfo menuInfo) {
		logger.info("新增菜单，参数：[{}]", menuInfo);
		ResponseData<String> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			uMenuInfoService.add(menuInfo);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
		} catch (Exception e) {
			logger.error("新增菜单失败，参数：[{}]", menuInfo, e);
			resp.setMsg("新增菜单失败：" + e.getMessage());
		}
		return resp;
	}

	@PostMapping(value = "/update")
	public ResponseData<String> update(@RequestBody UMenuInfo menuInfo) {
		logger.info("更新菜单，参数：[{}]", menuInfo);
		ResponseData<String> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			uMenuInfoService.updateByPrimaryKeySelective(menuInfo.getPermissionCode(), menuInfo);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
		} catch (Exception e) {
			logger.error("更新菜单失败，参数：[{}]", menuInfo, e);
			resp.setMsg("修改菜单失败：" + e.getMessage());
		}
		return resp;
	}

}
