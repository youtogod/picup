package com.young.picup.dao;

import org.apache.ibatis.annotations.Select;

public interface ImageDAO {
	@Select("select path from pic_up_image where id=#{id}")
	String getImagePathById(Integer id);
}
