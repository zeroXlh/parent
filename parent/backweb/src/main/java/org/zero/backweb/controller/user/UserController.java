package org.zero.backweb.controller.user;

import java.util.Objects;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zero.backweb.client.user.UserClient;
import org.zero.component.web.LoginConstant;
import org.zero.component.web.ResponseCode;
import org.zero.component.web.ResponseData;
import org.zero.user.model.UUser;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/hoper/backweb/user")
public class UserController {

	private static Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserClient userClient;

	@GetMapping("/page")
	public ResponseData<PageInfo<UUser>> pageUser(UUser user, Integer pageNum, Integer pageSize) {
		logger.info("分页用户，参数：[{}]，[{}]，[{}]", user, pageNum, pageSize);
		ResponseData<PageInfo<UUser>> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			PageInfo<UUser> info = userClient.page(user, pageNum, pageSize);
			resp.setCode(ResponseCode.SUCC);
			resp.setMsg("SUCC");
			resp.setData(info);

		} catch (Exception e) {
			logger.error("分页用户失败，参数：[{}]，[{}]，[{}]", user, pageNum, pageSize, e);
			resp.setMsg("分页失败：" + e.getMessage());
		}
		return resp;
	}

	@GetMapping("/findByPrimary")
	public ResponseData<UUser> findByPrimary(Integer userId) {
		logger.info("根据primary查找用户，参数：[{}]", userId);
		ResponseData<UUser> resp = new ResponseData<>(ResponseCode.FAIL);
		try {
			UUser user = userClient.findByPrimary(userId);

			if (Objects.nonNull(user)) {

				resp.setCode(ResponseCode.SUCC);
				resp.setMsg("SUCC");
				resp.setData(user);
				return resp;
			}

			resp.setMsg("用户不存在：" + userId);
		} catch (Exception e) {
			logger.error("根据primary查找用户失败，参数：[{}]", userId, e);
			resp.setMsg(e.getMessage());
		}
		return resp;
	}

	@PostMapping("/add")
	public ResponseData<String> add(UUser user, HttpSession session) {
		logger.info("新增用户，参数：[{}]", user);
		ResponseData<String> resp = null;
		try {
			user.setCreator(((UUser) session.getAttribute(LoginConstant.LOGIN_USER_INFO)).getUserName());

			return userClient.add(user);
		} catch (Exception e) {
			logger.error("新增用户失败，参数：[{}]", user, e);
			resp = new ResponseData<>(ResponseCode.FAIL);
			resp.setMsg("新增用户失败：" + e.getMessage());
		}
		return resp;
	}

	@PostMapping("/update")
	public ResponseData<String> update(UUser user) {
		logger.info("修改用户，参数：[{}]", user);
		ResponseData<String> resp = null;
		try {
			return userClient.update(user);
		} catch (Exception e) {
			logger.error("修改用户失败，参数：[{}]", user, e);
			resp = new ResponseData<>(ResponseCode.FAIL);
			resp.setMsg(e.getMessage());
		}
		return resp;
	}

}
