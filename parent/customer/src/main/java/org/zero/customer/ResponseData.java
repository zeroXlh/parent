package org.zero.customer;

import java.util.Objects;

public class ResponseData<T> {
	private Integer code;

	private String msg;

	private T data;

	public ResponseData() {
		super();
	}

	public ResponseData(ResponseCode code) {
		this();
		this.code = code.ordinal();
	}

	public ResponseData(ResponseCode code, String msg) {
		this(code);
		this.msg = Objects.nonNull(msg) ? msg : ResponseCode.SUCC == code ? "SUCC" : "FAIL";
	}

	public ResponseData(ResponseCode code, String msg, T data) {
		this(code, msg);
		this.data = data;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(ResponseCode code) {
		this.code = code.ordinal();
	}

}
