package com.zcz.bean;

import java.io.Console;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(value = Exception.class)
	@ResponseBody
	public ModelAndView globalErrorHandler(HttpServletRequest request,Exception e){
		
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("code",100);
		map.put("err", "请求失败");
		
		SimpleDateFormat time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = new Date();
				
		map.put("timestamp",time.format(date));
		map.put("url", request.getRequestURL());
		map.put("cause", e.getClass());
		map.put("message", e.getMessage());
		map.put("info",e.getStackTrace());
		
//		System.out.println(stack[0].getMethodName());
		e.printStackTrace();
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("exception",map);
		mav.setViewName("info");
		return mav;
	}
}
