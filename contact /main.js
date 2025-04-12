function ScrollingTracking() {
	if( $(window).scrollTop() > 80 ) {
		$("body").addClass('fixed-header');
	}else{
		$("body").removeClass('fixed-header');
	}
	var ThatItem = false;
	$('.section').each(function(index, section){
		if( $(window).scrollTop() >= ($(section).offset().top - 350) ) {
			ThatItem = $(section);
		}
	});
	$('header > .container > .main--menu > ul > li').removeClass('active');
	if( ThatItem == false ) {
		$('header > .container > .main--menu > ul > li > a[href="home"]').parent().addClass('active');
	}else {
		$('header > .container > .main--menu > ul > li > a[href="#'+ThatItem.attr('id')+'"]').parent().addClass('active');
	}
}
$(window).on("scroll load click", ScrollingTracking);
$("body").on("click", 'header > .container > .main--menu > ul > li > a', function(){
	var href = $(this).attr('href');
	if( href != '#home' ) {
		$('header > .container > .main--menu > ul > li').removeClass('active');
		$(this).parent().addClass('active');
		$('body, html').animate({"scrollTop": ($($(this).attr("href")).offset().top - 170)}, 500);
	}else {
		$('body, html').animate({"scrollTop": 0}, 500);
		$('header > .container > .main--menu > ul > li').removeClass('active');
		$('header > .container > .main--menu > ul > li > a[href="home"]').parent().addClass('active');
	}
	return false;
});
$("body").on('click', 'span[data-href]', function() {
	if ($(this).data('href').length) {
		window.open($(this).data('href'), '_blank');
	}
});
$("body").on('click', '.menu--togle', function() {
	$(".main--menu").fadeToggle();
	return false;
});