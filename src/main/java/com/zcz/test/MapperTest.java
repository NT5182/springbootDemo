package com.zcz.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.zcz.SpringBootStartApplication;
import com.zcz.bean.Employee;
import com.zcz.dao.DepartmentMapper;
import com.zcz.dao.EmployeeMapper;



/**
 * 测试dao层的工作
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = SpringBootStartApplication.class)
public class MapperTest {
	
	@Autowired
	DepartmentMapper departmentMapper;
	
	@Autowired
	EmployeeMapper employeeMapper;
	
	
	/**
	 * 测试DepartmentMapper
	 */
	@Test
	public void testCRUD(){
		
		//1、插入几个部门
//		departmentMapper.insertSelective(new Department(null, "开发部"));
//		departmentMapper.insertSelective(new Department(null, "测试部"));
		
		//2、生成员工数据，测试员工插入
//		employeeMapper.insertSelective(new Employee(null, "Jerry", "M", "Jerry@zcz.com", 1));
		
		//3、批量插入多个员工；批量，使用可以执行批量操作的sqlSession。
//		for(int i=0;i<1000;i++){
//			String uid = UUID.randomUUID().toString().substring(0,5)+i;
//			employeeMapper.insertSelective(new Employee(null,uid, "M", uid+"@163.com", 1));
//		}
		
//		//4.批量插入多个用户
//		for(int i=0;i<100;i++){
//			String uid = UUID.randomUUID().toString().substring(0,5)+i;
//			userMapper.insertUser(new User(null,"zhang"+uid, uid, "张"+uid));
//		}
//		System.out.println("批量插入完成");
//		EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);
//		for(int i = 0;i<1000;i++){
//			String uid = UUID.randomUUID().toString().substring(0,5)+i;
//			mapper.insertSelective(new Employee(null,uid, "M", uid+"@atguigu.com", 1));
//		}
//		System.out.println("批量完成");
		
		
//			System.out.println(emp.getClass().getSimpleName());
	}

}
