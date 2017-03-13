package com.young.picup.service;

import java.io.File;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.young.picup.dao.ImageDAO;
import com.young.picup.util.ResultInfo;

@Service
public class ImageService {
	@Resource
	private ImageDAO imageDAO;
	
	public List<Integer> getImageIds(){
		List<Integer> ids = imageDAO.getImageIds();
		return ids;
	}
	
	public String getImagePathById(Integer id){
		String path = imageDAO.getImagePathById(id);
		return path;
	}
	
	public ResultInfo saveImage(MultipartFile file, String realPath){
		ResultInfo resultInfo = new ResultInfo();
		if (!file.isEmpty()) {
			try {
				String filePath = realPath + "/images/" + file.getOriginalFilename();
				String path = "/"+file.getOriginalFilename();
				file.transferTo(new File(filePath));
				imageDAO.saveImage(path);
			} catch (Exception e) {
				resultInfo.setCode(300);
				resultInfo.setMessage("操作失败");
				e.printStackTrace();
			}
		}
		return resultInfo;
	}
	
}
