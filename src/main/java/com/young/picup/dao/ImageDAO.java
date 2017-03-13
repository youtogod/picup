package com.young.picup.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

public interface ImageDAO {
	@Select("select path from pic_up_image where id=#{id}")
	String getImagePathById(Integer id);
	
	@Insert("insert into pic_up_image(path) values(#{path})")
	int saveImage(String path);
	
	@Select("select id from pic_up_image")
	List<Integer> getImageIds();
}
