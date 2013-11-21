#开发记录

疑问1: index.js是否应该有个Init.js?

String.split(), 不修改原值..字符串工具函数一般都不修改原值

String.indexOf('xxx'); 注意逻辑判断-1时才是找不到, 0是第一位

!== 是 类型 && 值 还是 || ... 是&&..有一个不等就不等.返回TRUE..............[ 0 != false  => false ] [ 0 !== false => true ]

###<DIV>标签自适应浏览器高度

    html, body {
        height: 100%;
    }

### visbility: hidden transition无效

### overflow: hidden 后鼠标滚动失效

### dragover 和 drop 都禁止默认后才会阻止默认的拖放事件

### 确保一个大图放在一个固定框中, 同框的长宽比进行比较

    var ratio = 880 / 580;
    if (width / height > ratio) {
        if (width > 880) {
            functions.addClass(canvas, 'w880');
        }
    } else {
        if (height > 580) {
            functions.addClass(canvas, 'h580');
        }
    }

### JAVASCRIPT如何完全复制对象?

### canvas有默认大小如果不指定大小就放进0, 0, width, height的数据, (width, height超过默认范围就不可用)

### 不存在的属性有没有什么好的办法?
 !   if可以