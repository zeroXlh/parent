package org.zero.backweb.controller.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zero.backweb.client.user.MenuClient;
import org.zero.component.web.ResponseCode;
import org.zero.component.web.ResponseData;
import org.zero.user.model.UMenuInfo;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/hoper/backweb/menu")
public class MenuController {

	private static Logger logger = LoggerFactory.getLogger(MenuController.class);

	@Autowired
	private MenuClient menuClient;

	@GetMapping(value = "/page")
	public ResponseData<PageInfo<UMenuInfo>> page(UMenuInfo uenuInfo, Integer pageNum, Integer pageSize) {
		logger.info("分页菜单，参数：[{}]，[{}]，[{}]", uenuInfo, pageNum, pageSize);
		ResponseData<PageInfo<UMenuInfo>> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			PageInfo<UMenuInfo> info = menuClient.page(uenuInfo, pageNum, pageSize);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
			resp.setData(info);

		} catch (Exception e) {
			logger.error("分页菜单失败，参数：[{}]，[{}]，[{}]", uenuInfo, pageNum, pageSize, e);
			resp.setMsg("分页菜单失败：" + e.getMessage());
		}
		return resp;
	}

	@GetMapping(value = "/fetchAuth")
	public ResponseData<UMenuInfo> fetchAuth(String permissionCode) {
		logger.info("获取菜单，参数：[{}]", permissionCode);
		ResponseData<UMenuInfo> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			UMenuInfo uenuInfo = menuClient.fetchByPrimaryKey(permissionCode);

			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
			resp.setData(uenuInfo);

		} catch (Exception e) {
			logger.error("获取菜单失败，参数：[{}]", permissionCode, e);
			resp.setMsg("获取菜单失败：" + e.getMessage());
		}
		return resp;
	}

	@PostMapping(value = "/add")
	public ResponseData<String> add(UMenuInfo uenuInfo) {
		logger.info("新增菜单，参数：[{}]", uenuInfo);
		ResponseData<String> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			return menuClient.add(uenuInfo);
			// if (1 == rs) {
			// resp.setCode(ResponseCode.SUCC);
			// resp.setMsg("SUCC");
			// }
		} catch (Exception e) {
			logger.error("新增菜单失败，参数：[{}]", uenuInfo, e);
			resp.setMsg("新增菜单失败：" + e.getMessage());
		}
		return resp;
	}

	@PostMapping(value = "/update")
	public ResponseData<String> update(UMenuInfo uenuInfo) {
		logger.info("更新菜单，参数：[{}]", uenuInfo);
		ResponseData<String> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			return menuClient.update(uenuInfo);

			// resp.setCode(ResponseCode.SUCC);
			// resp.setMsg("SUCC");
		} catch (Exception e) {
			logger.error("更新菜单失败，参数：[{}]", uenuInfo, e);
			resp.setMsg("更新菜单失败：" + e.getMessage());
		}
		return resp;
	}

}
