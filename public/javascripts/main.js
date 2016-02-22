// JavaScript Document
jQuery(document).ready(function (e) {
    'use strict';
    
    placeHolderFallback();
    
    var orig_width = $('#copyright-info-container').width();
    $('#copyright-info-container').width(0);
    
    $('#copyright-sign').click(function (e) {
        $(this).hide();
        $('#copyright-info-container').animate({ 'width' : orig_width }, 500);
    });
    
    var cube = $("#subscription-block");
    
    /*save email for "notice me"*/
    $('#subscription').submit(function (e) {
        var form_el = $(this);
        var emailbox = form_el.find('input[name=email]');
        var email = emailbox.val();
        var type = form_el.find('input[name=inviteeType]:checked').val();
        
        if ((email == '') || (typeof (email) == 'undefined')) {
            cube.find('.subscription-msg').attr('title', '').html(form_el.data('email-not-set-msg')).fadeIn();
            return false;
        }
        
        $.ajax({
            type: form_el.attr('method'),
            url: form_el.attr('action'),
            data: { email: email, inviteeType: type, ajax: true },
            cache: false,
            async: false,
            dataType: "text"
        })
		.fail(function () {
            cube.find('.subscription-msg').attr('title', '').html(form_el.data('success-msg')).fadeIn();
            $(emailbox).val('');
        })
		.done(function (message) {
            cube.find('.subscription-msg').attr('title', '').html(form_el.data('success-msg')).fadeIn();
            $(emailbox).val('');
        });
        return false;
    });
    
    $('.subscription-msg').click(function (e) {
        $(this).fadeOut('fast');
    });
    
    
    $('#email').focus(function (e) {
        $('.subscription-msg').html('');
    });
});


function placeHolderFallback() {
    //placeholder fallback for old browsers
    if (!("placeholder" in document.createElement("input"))) {
        $("input[placeholder], textarea[placeholder]").each(function () {
            var val = $(this).attr("placeholder");
            if (this.value == "") {
                this.value = val;
            }
            $(this).focus(function () {
                if (this.value == val) {
                    this.value = "";
                }
            }).blur(function () {
                if ($.trim(this.value) == "") {
                    this.value = val;
                }
            })
        });
        
        // Clear default placeholder values on form submit
        $('form').submit(function () {
            $(this).find("input[placeholder], textarea[placeholder]").each(function () {
                if (this.value == $(this).attr("placeholder")) {
                    this.value = "";
                }
            });
        });
    }


    /*
     =============================================== 05. JQUERY FILTER SCHEDULE  ===============================================
     */

    $("#schedule-content-progression").hide(0).delay(250).fadeIn(250)
    $('#schedule-content-progression').children('li:not(.day-1)').hide();

    $('#filterOptions-pro li a').click(function() {
        // fetch the class of the clicked item

        var ourClass = $(this).attr('class');

        // reset the active class on all the buttons
        $('#filterOptions-pro li').removeClass('current-cat');
        // update the active state on our clicked button
        $(this).parent().addClass('current-cat');


        // hide all elements that don't share ourClass
        $('#schedule-content-progression').children('li:not(.' + ourClass + ')').fadeOut(250);
        // show all elements that do share ourClass
        $('#schedule-content-progression').children('li.' + ourClass).delay(250).fadeIn(250);

        return false;
    });
}