
$(document).ready(function () {
	// 轮播div
	var $slider = $('.slider');
	// 轮播标题
	var $slider_title = $()
	// 导航按钮
	var $nav = $('.nav');
	// 窗口宽度
	var winW = $(window).width();
	// 动画执行速度
	var animSpd = 750; // Change also in CSS
	// 拉伸多少距离后 切换下一张
	var distOfLetGo = winW * 0.2;
	// 默认起始页
	var curSlide = 1;
	// 开启动画
	var animation = false;
	// 移动的距离
	var diff = 0;
	// 页数
	var numOfCities = 5;
	

	// 默认第一页
	$('.slider_title-1').addClass('slider_title-active');

	// 发生切换时去掉第一页的active,为被切换到的页面加上active
	function bullets(dir) {
		$('.nav_active').css({
			'transform': 'translate3d(' + (dir-1 ) * 22 + 'px, 0, 0)'
		});
		console.log(dir);
		// $('.nav_slide-' + curSlide).removeClass('nav-active');
		// $('.nav_slide-' + dir).addClass('nav-active');
		$('.slider_title-' + curSlide).removeClass('slider_title-active');
		$('.slider_title-' + dir).addClass('slider_title-active');
	}

	// 切换完成时 关闭动画
	function timeout() {
		animation = false;
	}
	
	// 移动时的动作
	function pagination(direction) {
		// 开启动画
		animation = true;

		// 把移动距离归0
		diff = 0;

		// 为轮播主div加切换时的动效
		$slider.addClass('animation');

		// 为div添加切换效果
		$slider.css({
			'transform': 'translate3d(-' + (curSlide - direction) * 100 + '%, 0, 0)'
		});

		// 为图片添加切换效果
		$slider.find('.slide_darkbg').css({
			'transform': 'translate3d(' + (curSlide - direction) * 50 + '%, 0, 0)'
		});

		$slider.find('.slide_text').css({
			'transform': 'translate3d(0, 0, 0)'
		});
	}

	// 往右切换
	function navigateRight() {
		// 如果当前页面>=总页面数 就不切换
		if (curSlide >= numOfCities) return;
		pagination(0);
		// 切换效果完成时关闭动画
		setTimeout(timeout, animSpd);
		// 为被切换的页面加上active
		bullets(curSlide + 1);
		curSlide++;
	}

	// 往左切换
	function navigateLeft() {
		if (curSlide <= 1) return;
		pagination(2);
		setTimeout(timeout, animSpd);
		bullets(curSlide - 1);
		curSlide--;
	}

	// 返回默认
	function toDefault() {
		pagination(1);
		setTimeout(timeout, animSpd);
	}

	// 鼠标按下和开始触摸事件
	$(document).on('mousedown touchstart', '.slide', function (e) {
		
		if (animation) return;
		// 当前页面
		var target = +$(this).attr('data-target');
		console.log(target);
		// 获取点击的坐标
		var startX = e.pageX || e.originalEvent.touches[0].pageX;

		// 移除主div的动画为下次拖拽动画做准备
		$slider.removeClass('animation');

		// 鼠标按下后移动事件或者触摸后移动事件
		$(document).on('mousemove touchmove', function (e) {
			// 获取移动后的位置
			var x = e.pageX || e.originalEvent.touches[0].pageX;

			// 获取移动了多少距离
			diff = startX - x;
			// 当在第一页 并且移动距离小于0，或者在最后一页时候，移动距离大于0的时候就退出
			if (target === 1 && diff < 0 || target === numOfCities && diff > 0) return;
			
			// 主DIV移动
			$slider.css({
				'transform': 'translate3d(-' + ((curSlide - 1) * 100 + diff / 30) + '%, 0, 0)'
			});
			// 主图移动
			$slider.find('.slide_darkbg').css({
				'transform': 'translate3d(' + ((curSlide - 1) * 50 + diff / 60) + '%, 0, 0)'
			});
			
			$slider.find('.slide_text').css({
				'transform': 'translate3d(' + diff / 30 + 'px, 0, 0)'
			});
		});
	});

	// 鼠标松开或者触摸结束触发的事件
	$(document).on('mouseup touchend', function (e) {
		// 移除鼠标按下或者开始触摸时的事件
		$(document).off('mousemove touchmove');

		// 如果动画在开启就退出
		if (animation) return;

		// 如果移动的距离>=设置的切换距离就往右切换，如果小于<=负值就向左切换
		if (diff >= distOfLetGo) {
			navigateRight();
		} else if (diff <= -distOfLetGo) {
			navigateLeft();
		} else {
			toDefault();
		}
	});

	// 小圆点导航被点击事件
	$(document).on('click', '.nav_slide:not(.nav-active)', function () {
		// 获取当前在第几页
		var target = +$(this).attr('data-target');
		// 切换active到当前页
		bullets(target);

		// 当前轮播等于当前页面
		curSlide = target;
		pagination(1);
	});

	// 点击左右切换的元素事件
	$(document).on('click', '.side-nav', function () {
		// 获取当前点击的元素是什么
		var target = $(this).attr('data-target');

		if (target === 'right') navigateRight();
		if (target === 'left') navigateLeft();
	});

	// 键盘左右按键事件
	$(document).on('keydown', function (e) {
		if (e.which === 39) navigateRight();
		if (e.which === 37) navigateLeft();
	});

	// 鼠标滚轴事件
	$(document).on('mousewheel DOMMouseScroll', function (e) {
		if (animation) return;
		var delta = e.originalEvent.wheelDelta;

		if (delta > 0 || e.originalEvent.detail < 0) navigateLeft();
		if (delta < 0 || e.originalEvent.detail > 0) navigateRight();
	});
});