## day01
### 到位家政上门服务
#### 完成功能：搭建首页头部，banner轮播的静态页面，菜单列表
                
#### 完成进度：菜单列表静态布局
#### 问题及解决方案：
      1.使用swiper轮播，背景图不显示
      为引入背景图的包裹器添加一个宽度与高度
      
## day02
#### 完成功能 ：首页，服务商页面搭建完成

#### 完成进度: 静态页完成两个，服务器搭建完成 ，数据库连接成功，数据库中插入数据      

#### 问题及解决方案：

###### 连接数据库
        //引入Mongoose
        const mongoose = require('mongoose');
        //创建daoway数据库并连接
        mongoose.connect('mongodb://localhost:27017/daoway')
        //监听连接的状态
        mongoose.connection.on('open',function () {
          console.log('数据库已连接')
        })
######  插入数据
        //引入mongoose
        const mongoose = require('mongoose');
        //为数据进行Schema约束
        const commetShcema = new mongoose.Schema({
          iconUrl:{type:String},
          area:{type:String},
          city:{type:String},
          comment:{type:String},
          createtime:{type:Number},
          nick:{type:String},
          star:{type:Number}
        })
        //文档构造函数名 ， 文档约束， database中的集合名
        mongoose.model("commet",commetShcema,"commet")
        //在集合中插入数据
        mongoose.model('commet').create()
        //向外暴露数据模型一个模块
        module.exports = mongoose.model('commet',commetShcema)        
###### 搭建服务器，配置路由
        //引入数据库进行连接数据库
        require("./db/db")
        //引入插入到数据库中的数据
        const shoplist=require('./modules/shop')
        const servicelist = require('./modules/server')
        const commetlist = require('./modules/commet')
        //引入服务器
        const express = require('express')
        //为app配置路由器
        const app = express()
        //使用静态资源
        app.use(express.static('public'))
        //监听端口号
        app.listen(3000)
        
        //配置路由
        app.get('/shoplist',function (req,res) {
          shoplist.find({},function (err,list) {
            res.send({list:list})
        
          })
        });
        servicelist.find({},function (err,list) {
          console.log({list:list})//返回一个封装的list对象
        
        })
        app.get('/serverlist',function (req,res) {
          servicelist.find({},function (err,list) {
            res.send({list:list})
          })
        });
        
        app.get('/commetlist',function (req,res) {
        
          const page = req.query.page
          //limit:每次返回10条数据，skip:每次跳过的数据*每次返回的数据
          commetlist.find({}).limit(10).skip((page-1)*10).exec(function (err,list) {
              res.send({list:list})
          })
        })
## day03

#### 完成功能：首页，服务商页面数据获取完成，二级菜单的悬浮效果实现，头部的动画效果实现

#### 完成进度：在编写云家政的静态页

#### 问题及解决方案：
            
###### template语法
      <script id="temp3" type="text/html">
        {{each data}}
        <li>
                  <span class="house_comment_tou">
                    <img src="{{$value.iconUrl}}" alt="">
                  </span>
                  <span class="house_comment_xiang">
                    <p>{{$value.nick}}</p>
                    <p>{{each $value.stars}}
                      <img src="{{$value}}" alt="">
                      {{/each}}
                      {{$value.createtime |dateFormat 'YYYY-MM-DD' }}
                    </p>
                    <p>{{$value.comment}}</p>
                    <p><img src="./images/service/position.jpg" alt=""> {{$value.city}} {{$value.area}}</p>
                  </span>
        </li>
        {{/each}}
      </script>

       $.get('/shoplist',function (data) {
         //找到模板渲染
         $('.mainUl').append(template('temp3',{data:data}))
       })
## day04

#### 完成功能：服务项目页的数据获取，评论列表的小星星，底部的点击翻页

#### 完成进度：实现点击翻页      
      
###### 头部滑动
        //头部动画
        //先获取header的高度
        var $Top = $('.header').height();
        //监视视口滚动的高度
        $(window).scroll(function () {
          $scrollTop = $(window).scrollTop()
          if($scrollTop>$Top){
            $('.header').addClass('showheader')
          }else{
            $('.header').removeClass('showheader')
          }
        })
###### 获取小星星
             //发送异步请求时才会获取到数据渲染页面
             $.get('/commetlist',function (data) {
               function  getStar(data){
                 //根据返回的对象去去遍历得到所有的数据
                 return  data.list.map(function (value,index) {
                   console.log(data)
                   //得到每一项的count值
                   let count =value.star
                   //为stars创建一个空数组
                   let stars = []
                   //遍历5次为start添加路径
                   for (var i = 0; i < 5; i++) {
                     if(count>0){
                       count--;
                       stars.push("./images/service/red_star.png")
                     }else {
                       stars.push("./images/service/gray_star.png")
                     }
                   }
                   //为data添加一个stars数组
                   value.stars = stars
                   return value
                 })
               }
               let newData =getStar(data)
               //找到模板将返回新的值渲染
               $('.house_commentUl').append(template('temp3',{data:newData}));
###### 翻页
        const $aList = $('.house_comment_bottom_fan>a');
        console.log($aList)
        $aList.click(function () {
          //获取当前点击的index值
          let index = $(this).index();
          $aList.removeClass('on');
          $(this).addClass('on');
          page = index+1;//当前页数与index值得关系
          $.get('/commetlist?page='+page,function (data) {
            let newData =getStar(data)
            $('.house_commentUl').html(template('temp3',{data:newData}))
          });
        });
        //上一页
        $('.up').click(function () {
          page--;
          acss(page);
          var index = page -1;
          $aList.removeClass('on');
          $aList.each(function () {
            $aList[index].className='on'
          })
          $.get('/commetlist?page='+page,function (data) {
            let newData =getStar(data)
            $('.house_commentUl').html(template('temp3',{data:newData}))
          });
        });
        //下一页
        $('.down').click(function () {
          page++;
          acss(page);
          var index = page -1;
          $aList.removeClass('on');
          $aList.each(function () {
            $aList[index].className = 'on'
          });
          $.get('/commetlist?page='+page,function (data) {
            let newData =getStar(data)
            $('.house_commentUl').html(template('temp3',{data:newData}))
          });
        });

        //边界
        function acss() {
          if(page<=1){
            $('.up').addClass('nopage');
            page = 1
          }
          if(page>=9){
            $('.down').addClass('nopage');
            page=9
          }
          else {$('.down').removeClass('nopage')}
        }
      });   
      
###### 注册过滤器 时间戳转换为时间
            {{$value.createtime |dateFormat 'YYYY-MM-DD' }}
            template.defaults.imports.dateFormat = function(date, format){
              return moment(date).format(format);
            }                 