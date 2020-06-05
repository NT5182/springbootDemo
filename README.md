# springbootDemo
* SpringBootDemo是一个springboot的小例子，来自于学习尚硅谷时自己敲的代码。实现了最基本的CRUD，可以参考学习。

# 技术栈
* 框架：SpringBoot
* 页面：JSP，Bootstarp，JQuery
* 数据库：MySQL
* 日志：logback
* 持久层框架：MyBatis，MyBatis-Generator

# 功能列表
* 查询所有员工
* 查询输入某个条件后的员工
* 新增员工---用户名是否已经存在校验
* 新增员工
* 修改员工信息
* 删除员工
* 批量删除员工
* 出现异常会统一拦截，并在页面显示具体错误

# 项目截图
* 查询所有员工
* ![img](https://github.com/NT5182/springbootDemo/blob/master/pic/1query.jpg)
* 查询输入某个条件后的员工
* ![img](https://github.com/NT5182/springbootDemo/blob/master/pic/2query.jpg)
* 新增员工---用户名是否已经存在校验
* ![img](https://github.com/NT5182/springbootDemo/blob/master/pic/3insert.jpg)
* 新增员工
* ![img](https://github.com/NT5182/springbootDemo/blob/master/pic/4insert.jpg)
* 修改员工信息
* ![img](https://github.com/NT5182/springbootDemo/blob/master/pic/6update.jpg)
* 删除员工
* ![img](https://github.com/NT5182/springbootDemo/blob/master/pic/8delete.jpg)
* 批量删除员工
* ![img](https://github.com/NT5182/springbootDemo/blob/master/pic/9batchdelete.jpg)
* 异常统一拦截页面
* ![img](https://github.com/NT5182/springbootDemo/blob/master/pic/5exception.jpg)

# 如何使用本项目
* IED导入Maven项目
* 将项目中的sql/springbootDemo-sql的数据导入MySQL数据库，如果是其他数据，打开这个文件，在你的数据库里面执行文件中的SQL即可导入数据库
* DataSource配置---需要修改成你自己数据库的连接地址和用户名密码
* ![img](https://github.com/NT5182/springbootDemo/blob/master/pic/7datasource.jpg)
* Run As --> Spring Boot APP
