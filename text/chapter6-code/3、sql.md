数据库分为：
关联式（Mysql，用一个个表格存放起来，然后关联表格）和非关联式（Redis）

MySQL：结构性询问语言

方式：把数据储存成一个个表格（table），然后表格里面设定key，就可以把表格和表格关联了

一行（row）代表一笔资料
一列（column）代表每个属性

primary key：主键。设定为主键的属性，可以唯一的表示每一笔资料（唯一标识性？）
把具有唯一标识性的属性设定为primary key

储存资料的第一步：创建表格，然后设定所需的属性

foreign key：外键，本表格中，对应到外部表格的内容/属性。这个外键，可以对应到另外一张表格的primary key
如果想要表格和表格之间产生关联，就可以新增一个属性，然后把属性设定为（foreign key），然后再进行对应
**foreign key只能对应另外表格的primary key。或者也可以对应到自己的表格** 

如果每一个primary key无法唯一的表示当前表格的资料，就可以设定两个以上的primary key。也就是这两笔放在一起，就可以唯一表示一笔资料

我们也可以同时把一个表格属性，设定为primary key和foreign key



sql语法

储存资料之前，要先有一个资料库：create database 名称
数据库的关键字一般使用大写
数据库的名字一般使用反引号``包起来，避免名称和关键字冲突
删除资料库：DROP DATABASE 名称

资料库表格：
创建表格的话，首先要选择使用哪个资料库：USE `名称`
因为创建表格的时候，需要设定属性，所以：
INT：存放整数
DECIMAL(m,n)：存放有小数点的数；总共有m位数，小数点的数占了n位
VARCHAR(n)：存放字符串，n表示最多存放几个字符
BLOB：存放二进制的资料，比如图片、影片、档案
DATE：日期，YYYY-MM-DD
TIMESTAMP：记录时间，比如资料是什么时候加入进来的

开始创建表格：
自己命名的都用反引号抱起来
创建表，要有表的名称：CREATE TABLE `student`
创建之后，想要查看表格的属性和内容：DESCRIBE `student`;
删除表格：DROP TABLE `student`
如果想要在表格后，新增表格的属性：ALTER TABLE `student` ADD gpa DECIMAL(3,2);
如果想要在表格后，删除表格的属性：ALTER TABLE `student` DROP COLUMN gpa;

新增资料：
创建完表格之后，就可以根据相应的属性存入资料：
INSERT INTO `student` VALUES(1, '小白', '历史');
小括号里填入资料的顺序，要根据表格创建的顺序来填入；而且括号前面是values
要表示字符串的时候，要用引号包起来
填写资料的时候，也可以自定义填入的顺序：INSERT INTO `student`(`name`,`major`,`student_id`) VALUES(1, '小白', '历史');
如果写null，或者不写，那么就都是空的

如果要看表格里面的全部资料：
SELECT * FROM `名称`;
也就是搜索表格里面全部的资料

constraints：限制、约束。可以去表格里的属性那里添加以下的限制
NOT NULL，不能空
UNIQUE，每个值都不能一样
DEFAULT，预设
AUTO_INCREMENT，自动加一？不用主动写序号了。要写在

修改资料：
这一步之前，需要先让预设的更新模式关闭：SET SQL_SAFE_UPDATES = 0;
如果想更改一类内容：
UPDATE `student` ：1、更新student里面的资料
SET `major` = `英语文学` ：3、要把这些资料中，英语改为英语文学
WHERE `major` = `英语` ： 2、要更新的对象是，major里面，等于英语的资料
也可以：WHERE `student_id` = `3` ：是说，匹配到student_id等于3的，就把set后面的内容更换
同时，也可以设置多个判断条件：major = 生物 or major = 化学
要改变的东西，也可以不止一个属性：name = xx, major = xx

本质上我感觉记忆关键的语法即可，比如set和where

删除资料：
DELETE FROM `student`
WHERE `studetn_id` = 4; ：这是条件
条件可以写多个判断，用and链接
<>：表示不等于符号

搜寻资料：
取得所有属性：SELECT * FROM `名称`;
取得一个属性：SELECT `name`,`major` FROM `名称`;
取得属性的时候还想进行排序：ORDER BY：
SELECT * 
FROM `student`
ORDER BY `score`; 根据score属性进行排序
如果想要由高到低：在ORDER BY `score`添加 DESC;
同时DRDER BY后面添加多个属性，如果第一个属性相同，就根据第二个属性进行排序
如果感觉资料有点多，做个限制：LIMIT 3; 限制数量
SELECT * 
FROM `student`
ORDER BY `score`
LIMIT `2`; 分数从低到高，限制两位。
也可以和where进行匹配：
SELECT * 
FROM `student`
WHERE `major` = `英语`;会回传主修适应于的学生
有个快捷的方式，在写where多个or判断的时候：
WHERE `major` IN(`历史`,`英语`);
WHERE `major` = `英语` OR `major` = `历史`;
-
如果在取得资料的时候不想重复，可以按照下面：
SELECT DISTINCT `sex` FROM `employee`;
主要是加了一个distinct

设定foreign key：
在已有表格的基础上：FOREIGN KEY (`manager_id`) REFERENCES `employee` (`emp_id`) ON DELETE SET NULL
外键是（），references其他表格的某个属性
如果之前没有对应的表格，现在有了，就可以用下面这个：
ALTER TABLE `employee` 在某个表格中（看要弄的外键在那个表格）
ADD FOREIGN KEY (`branch_id`) 新增外键，在括号内的属性上
REFERENCES `branch`(`branch_id`) 对应到哪个表格的哪个属性
ON DELETE SET NULL;

在新增资料的时候，如何一个外链所匹配的资料还没有添加，那么需要先添加外链所匹配的资料。
而如果两个资料是互为外链的，那就需要找一个少的，然后把外链的部分设定为NULL，先把基础的弄了

aggregate functions：聚合函数
比如count就是聚合函数，可以更简单的获取资料
SELECT COUNT(*) FROM `employee`; 表示查看这个表格中有多少资料
SELECT COUNT(`sup_id`) FROM `employee`; 表示，查看这个表格中，有 sup_id 这个属性的资料一共有多少
如果取得所有出生于70年后的女性员工：那就在上面count之后加上判断
AVG：平均的意思
SELECT AVG(`salary`) FROM `employee`; avg后面加上要计算平均值的属性
SUM：总和，括号后面写上计算总和的属性
MAX：最高，后面跟上要比较的属性，

wildcards：万用子元
%表示多个子元，_表示一个子元
可以用在判断上，比如判断一个电话号尾数是不是xxx：
WHERE * FROM `client` WHERE `phone` LIKE `%335`;
取得生日在12月的员工：
WHERE * FROM `client` WHERE `birth_date` LIKE `_____12%`; 前面有5个子元，说明前面五个子元是什么不管，12后面多个资源也不管

UNION：联集
把两个结果联结在一起。注意，两个要和两个联结，一个要和一个联结。并且做合并的资料属性，需要是一样的，不能一个是整数，一个是小数这种
把员工id和名字 union 客户id 和名字：
SELECT `emp_id` ,`name`
FROM `employee`
UNION
SELECT `client_id` ,`client_name`
FROM `client`;
如果不想呈现的内容是emp_id 的名字，那就可以加上AS
SELECT `emp_id` AS `xxx`,`name` AS `xx`

join：连接，把两个表格连接在一起
两个表格的连接，也需要有条件，使用ON
取得所有部门经理的名字：
SELECT *(这里可以改成三个，更简洁一些)
FROM `employee`
JOIN `branch`
ON `emp_id` = `manager_id`;
如果担心属性可能重复：ON `employee` . `emp_id` = ……
LEF JOIN：不管表格成不成立，左边的表格都会回传所有的资料，至于右边的表格，只有成立了才会回传（左边表格：LEFT左边的就是）右边表格，成立了才会传过来，不成立的就弄null

subquery：子查询
可以在一个查询语句使用另外一个查询语句
比如找出研发部门的经理名字：先找研发部分的id
SELECT `name`
from `employee`
where `emp_id` = (//注意empid和name是不同的；这里的=，如果搜寻结果不止一个，那就可以用IN
	SELECT `manager_id`
	from `branch`
	where `branch_name` = `研发`
)

ON DELETE：
on delete set null：如果对应的员工离职了，那就设置成null
on delete cascade：一起删除，对应不到就删除
primary key不能设置为null

最后一部分是连接Python，下载一个pip东西，然后connect，注意最后的关闭（cursor.close）



