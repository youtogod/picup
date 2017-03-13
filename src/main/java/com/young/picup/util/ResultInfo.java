package com.young.picup.util;

public class ResultInfo {
	private int code;
	private String message;
	
	public ResultInfo() {
		
		this.code = 200;
		this.message = "操作成功";
	} 
	
	public ResultInfo(int code, String message) {
		super();
		this.code = code;
		this.message = message;
	}
	
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	
}
