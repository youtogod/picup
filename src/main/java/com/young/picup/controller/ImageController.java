package com.young.picup.controller;

import java.awt.image.BufferedImage;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.young.picup.dao.ImageDAO;

@Controller
@RequestMapping("image")
public class ImageController {
	@Resource
	private ImageDAO imageDAO;

	@RequestMapping("upload")
	public String upload() {
		return "upload";
	}

	@RequestMapping("load/{id}")
	public void upload(@PathVariable Integer id, HttpServletRequest request,HttpServletResponse response) throws FileNotFoundException, IOException {
		String path = imageDAO.getImagePathById(id);
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

}
