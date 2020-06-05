package com.zcz.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class TestController {

    
    // 用来测试访问
    @RequestMapping("/hello")
    public String home() {
        return "hello 朋友";
    }
}
