'use strict';
	
//FOR DEMO
jQuery(document).ready(function ()
{
	// delegate all clicks on "a" tag (links)
    $(document).on("click", "#back", function () 
    {
	    // get the href attribute
	    var newUrl = $(this).attr("href");

	    // verify if the new url exists or is a hash
	    if (!newUrl || newUrl[0] === "#") {
	        // set that hash
	        location.hash = newUrl;
	    }
        
        return false;
	});

	// Cookie functions
	function createCookie(name,value,days)
	{
	    if (days)
	    {
	        var date = new Date();
	        date.setTime(date.getTime()+(days*24*60*60*1000));
	        var expires = "; expires="+date.toGMTString();
	    }
	    else var expires = "";
	    document.cookie = name+"="+value+expires+"; path=/";
	}
	function readCookie(name)
	{
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++)
	    {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
	    return null;
	}
	function eraseCookie(name)
	{
	    createCookie(name,"",-1);
	}

});






/*---------------------------------------------------------*/
/*  NAVBAR LI AUTOHEIGHT                                   */
/*---------------------------------------------------------*/

// Auto counter for calculate the elements of the fullscreen menu
function contactNum() {

	var numberOfElementsList = $('nav .localScroll li').filter(function() {
        return $(this).css('display') !== 
    'none';
	}).length,
		calculation = (100/numberOfElementsList),
		calculationInPixels = ($(window).height()/numberOfElementsList);
	$('nav .localScroll li').css('height', calculation+'%');
	$('nav .localScroll li').css('line-height', calculationInPixels+'px');

};




/*---------------------------------------------------------*/
/*  DOCUMENT READY                                         */
/*---------------------------------------------------------*/

jQuery(document).ready(function () {




	/*---------------------------------------------------------*/
	/* SUBSCRIPTION                                 */
	/*---------------------------------------------------------*/

    $('#subscription').ajaxSubscribe({
		callback: callbackFunction,
        url: 'http://www.smallapi.com/subscriberlists/onetomany/emails',
        apikey: 'muIAnRAnLgnxu5t6mgU1wbcjAv8GCJPcVDzPQ1t5bIQ='
	});

	function callbackFunction (resp) {

		if(resp[0] !== 'undefined') {
			$('.subscription-success').html('Thanks for signing up!').fadeIn(500);
			$('.subscription-failed').fadeOut(500);
        } else {
			$('#subscription').addClass('animated-error pulse');
			setTimeout(function () {
				$('#subscription').removeClass('animated-error pulse');
			}, 1000);
			$('.spam').fadeOut('300', function () {
				$('.subscription-failed')
				.html('Please enter unsubscribed or valid e-mail address')
				.fadeIn(1000);
			});
			$('.subscription-success').fadeOut(500);
		}
	}
    
    $('#mc-email').on('input propertychange paste', function () {
        $('.subscription-success').fadeOut(500);
        $('.subscription-failed').fadeOut(500);
    });

	/*---------------------------------------------------------*/
	/*  DECLARE IF IT IS A DEVICE                              */
	/*---------------------------------------------------------*/

	var onMobile = false;
	if( navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|IEMobile/i) ) {
		var onMobile = true;
	}

	/*---------------------------------------------------------*/
	/*  FULLSCREEN MENU                                        */
	/*---------------------------------------------------------*/

	//open/close primary navigation
	$('.cd-primary-nav-trigger').on('click', function(){
		$('.cd-menu-icon').toggleClass('is-clicked'); 
		$('.cd-header').toggleClass('menu-is-open');
		
		//in firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
		if( $('.cd-primary-nav').hasClass('is-visible') ) {
			$('.cd-primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
				$('body').removeClass('overflow-hidden');
			});
		} else {
			$('.cd-primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
				$('body').addClass('overflow-hidden');
			});	
		}
	});

}); //END DOCUMENT READY


/*---------------------------------------------------------*/
/*  FULLSCREEN MENU                                        */
/*---------------------------------------------------------*/


// NAV FOR BLOG
function nav_blog() {
	if ($("header > div").hasClass("header-blog-version")) {
		$('.responsive-nav').css('top','0');
		$('.responsive-nav').css('opacity','1');
	}
};

nav_blog();


/*---------------------------------------------------------*/
/*  WINDOW SCROLL                                          */
/*---------------------------------------------------------*/

jQuery(window).scroll(function () {



	/*---------------------------------------------------------*/
	/*  NAVBAR                                                 */
	/*---------------------------------------------------------*/
	
	if ( $(window).scrollTop() >= $('header').outerHeight()-100) {
		$('.responsive-nav').css('top','0');
		$('.responsive-nav').css('opacity','1');
	}
	else{
		$('.responsive-nav').css('top',-$('.responsive-nav').outerHeight()+'px');
		$('.responsive-nav').css('opacity','0');
	}

	nav_blog();

	/*---------------------------------------------------------*/
	/*  OPACITY WHEN SCROLLING                                 */
	/*---------------------------------------------------------*/

	var fadeS = $('.fadeScroll');
	var st = $(this).scrollTop();
	fadeS.each(function () {
		var offset = $(this).offset().top;
		var height = $(this).outerHeight();
		offset = offset + height / 2;
		$(this).css({
			'opacity': (1 - ((st - offset + 300) / 200))
		});
	});


	/*---------------------------------------------------------*/
	/*  SIDEBAR BLOG                                           */
	/*---------------------------------------------------------*/

	if ( $("aside").hasClass('sidebar-blog') ) {
		var superarHeight = $(".sidebar-blog").height() + $(".sidebar-blog").offset().top;
		if ($(window).scrollTop() >= superarHeight){
			$("#blog-scroll").removeClass('col-md-8').addClass('col-md-12');
		} else {
			$("#blog-scroll").addClass('col-md-8').removeClass('col-md-12');
		}
	}


}); //END WINDOW SCROLL





/*---------------------------------------------------------*/
/*  NAVBAR LI AUTOHEIGHT                                   */
/*---------------------------------------------------------*/

contactNum();
$(window).on('resize', function(){
	contactNum();
});

// NAVBAR LI AUTOHEIGHT END