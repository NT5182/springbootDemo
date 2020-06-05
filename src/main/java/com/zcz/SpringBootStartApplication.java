package com.zcz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;


@SpringBootApplication
public class SpringBootStartApplication extends SpringBootServletInitializer {

	public static void main(String[] args){
		// TODO Auto-generated method stub
		SpringApplication.run(SpringBootStartApplication.class);
	}
	
	
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        // 注意这里要指向原先用main方法执行的Application启动类
        return builder.sources(SpringBootStartApplication.class);
    }


}