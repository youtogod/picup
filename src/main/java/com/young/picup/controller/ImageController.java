package com.young.picup.controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.young.picup.service.ImageService;
import com.young.picup.util.ResultInfo;

@Controller
@RequestMapping("image")
public class ImageController {
	@Resource
	private ImageService imageService;

	@RequestMapping("upload")
	public String upload() {
		return "upload";
	}
	
	@RequestMapping("display")
	public String display(Model model) {
		List<Integer> ids = imageService.getImageIds();
		//System.out.println(ids);
		model.addAttribute("ids", ids);
		return "display";
	}
	
	
	
	@RequestMapping(value="{id}",method=RequestMethod.GET)
	public void loadImage(@PathVariable Integer id, HttpServletRequest request,HttpServletResponse response) throws FileNotFoundException, IOException {
		String path = imageService.getImagePathById(id);
		String filePath = request.getSession().getServletContext().getRealPath("/") + "/images" + path;

		// Set standard HTTP/1.1 no-cache headers.
		response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
		// Set IE extended HTTP/1.1 no-cache headers (use addHeader).
		response.addHeader("Cache-Control", "post-check=0, pre-check=0");
		// Set standard HTTP/1.0 no-cache header.
		response.setHeader("Pragma", "no-cache");
		// return a jpeg
		response.setContentType("image/jpeg");
		// create the image with the text
		BufferedImage bi = ImageIO.read(new FileInputStream(filePath));
		ServletOutputStream out = response.getOutputStream();
		// write the data out
		ImageIO.write(bi, "jpg", out);
		try {
			out.flush();
		} finally {
			out.close();
		}
	}
	
	@RequestMapping(value="",method=RequestMethod.POST/*,produces="text/html;charset=utf-8"*/)
	@ResponseBody
	public ResultInfo uploadImage(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
		String realPath = request.getSession().getServletContext().getRealPath("/");
		ResultInfo resultInfo = imageService.saveImage(file, realPath);
		return resultInfo;
	}
	
	
	/*@RequestMapping(value="test/{n}",produces="text/html;charset=utf-8")
	@ResponseBody
	public String testParam(@PathVariable BigDecimal n){
		return ""+n;
	}*/

}
