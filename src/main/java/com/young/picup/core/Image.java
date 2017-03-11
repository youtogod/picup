package com.young.picup.core;

import java.io.Serializable;

public class Image implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Integer id;
	private String path;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	@Override
	public String toString() {
		return "Image [id=" + id + ", path=" + path + "]";
	}
	

}
