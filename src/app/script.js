/* 
   Use JS to position the body content below the header.
 
   This approach was used in the event the user changed their browser's font size
   to allow for the header to expand or contract based on their font setting

*/

	var positionContent = function()
	{
		$('.body').css({paddingTop: $('.header').outerHeight()+'px'});
	};

	$(document).on('ready', function()
	{
		positionContent();
		$('.header-wrapper').removeClass('header-wrapper-relative');
		$(window).on('resize', function()
		{
			positionContent();
		});
	});



/* begin: tooltip */
/* 
   Since a full tooltip plugin was not required for this build, 
   custom functionality was created using jQuery to create a 
   dropdown menu

*/

	$(document).on('ready', function()
	{


		 $.fn.dropdown = function() {


			this.each(function()
			{

				var menu_state = 0;

				var checkHideMenu = function()
				{
					return menu_state === 0;
				};

				/* user button clicked */
				var _button = $(this).find('button');
				var _dropdown = $(this).find('.dropdown');

				_button.on('click', function()
				{
					_dropdown.toggle();
				});

				/* user button hover and menu hover events follow */
				_button.hover(function()
				{
					_dropdown.show();
					menu_state++;
				},
				function()
				{
					menu_state--;
					if(checkHideMenu())
					{
						_dropdown.hide();
					}
				});

				$(this).hover(function()
				{
					menu_state++;
				},
				function()
				{
					menu_state--;
					if(checkHideMenu())
					{
						_dropdown.hide();
					}
				});

				_dropdown.hover(function()
				{
					menu_state++;
				},
				function()
				{
					menu_state--;
					if(checkHideMenu())
					{
						$(this).hide();
					}
				});


				/* close dropdown on click */
				_dropdown.on('click', function()
				{
					$(this).hide();
				});


			});

			return this;

		};

		$('.user').dropdown();


	});

/* end: tooltip */



/* begin: message modal functionality */

	$(document).on('ready', function()
	{
		var _page = $('.page');
		$(document).on('click', '.message-new', function()
		{
			/* add blur to page background */
			_page.blur({from: 0, to: 10});
			var _mmmw = $('.message-new-modal.modalwrapper');
			_mmmw.fadeIn(350);

			/* focus text area */
			_mmmw.find('.textarea').focus();
			_mmmw.find('.modal').scrollTop(0);
		});

		$(document).on('click', '.modal-close', function()
		{
			/* unblur page */
			_page.blur({from: 10, to: 0});
			$(this).closest('.modalwrapper').fadeOut(350);
		});


		/* prevent scrollwheel in modal*/
		/* also prevent scrollwheel from causing page body to scroll past top and bottom of window */
		$(document).on( 'mousewheel', 'body, .modal', function ( e ) 
		{
			var d = e.originalEvent.wheelDelta;
			if((d >= 0 && this.scrollTop <= 0) || 
			   (d < 0 && (window.innerHeight + this.scrollTop) >= this.scrollHeight))
			{
			    e.preventDefault();
			}
		});  

		$(document).on('mousewheel', '.modal-blackout', function(e){e.preventDefault();});
	});



/* end: message modal functionality */


/* begin: blur plugin */
/* 
	blur plugin for browsers that support css blur 
	(created for this project)
	
	created this plugin to provide smoother blur transitions
	as using CSS transitions for the blur caused some browsers
	to show slow animations
*/

(function( $ ) {
 
    $.fn.blur = function(options) {

    	 var settings = $.extend({
            speed: 350,
            from: 0,
            to: 10
        }, options );

        var animateBlur = function(element, from, to, speed)
        {

			$({amount: from}).animate({amount: to}, {
		        duration: settings.speed,
		        easing: 'linear',
		        step: function() {
		            element.css({
		                "-webkit-filter": "blur("+this.amount+"px)",
		                "filter": "blur("+this.amount+"px)"
		            });
		        },
		    	complete: function()
			    {
			    	if (to === 0)
			    	{
			    		element.css({
			                "-webkit-filter": "",
			                "filter": ""
		            	});
			    	}
			    	else
			    	{
			    		element.css({
			                "-webkit-filter": "blur("+to+"px)",
			                "filter": "blur("+to+"px)"
		            	});
			    	}
			    	
			    }
			});
        };

    	animateBlur($(this), settings.from, settings.to, settings.speed);

        return this;
 
    };
 
}( jQuery ));


/* end: blur plugin */


/* begin: prevent comment links from opening in demo */

	$(document).on('click', '.comment a', function(e)
	{
		e.preventDefault();
		alert('Link disabled for demo.');
	});

/* end: prevent comment links from opening in demo */

/* begin: expand button in post */

/* functionality slides down and up the replies box  */

	$(document).on('ready', function()
	{
		$(document).on('click', '.expand', function()
		{
			$(this).hide();
			$(this).siblings('.collapse').show();

			var _post = $(this).closest('.post');
			_post.find('.replies').slideDown();

		});

		$(document).on('click', '.collapse', function()
		{
			$(this).hide();
			$(this).siblings('.expand').show();

			var _post = $(this).closest('.post');
			_post.find('.replies').slideUp();
		});
	});

/* end: expand button in post */



/* begin: filter posts */

/* 
   functionality to filter the posts based on criteria buttons:
   All posts, images, videos
*/

	$(document).on('ready', function()
	{
		$(document).on('click', '.posts-show-all', function(e)
		{
			e.preventDefault();
			$('.post').show();
			$(this).siblings('.hero-link').removeClass('active');
			$(this).addClass('active');
		});

		$(document).on('click', '.posts-show-photos', function(e)
		{
			e.preventDefault();
			$('.post').not($('.post.type-photo').show()).hide();
			$(this).siblings('.hero-link').removeClass('active');
			$(this).addClass('active');
		});

		$(document).on('click', '.posts-show-videos', function(e)
		{
			e.preventDefault();
			$('.post').not($('.post.type-video').show()).hide();
			$(this).siblings('.hero-link').removeClass('active');
			$(this).addClass('active');
		});

	});

/*

/* end: filter posts */



/* begin: settings slide toggles and quasi radio buttons */

	

	$(document).on('ready', function()
	{
		/* 
		   for this demo, prevent the form from actually submitting 
		   so the page does not transition 
		*/
		$(document).on('submit', 'form', function(e){e.preventDefault();});


		/* 
		   Enable slide buttons and quasi radio buttons to be clicked with 
		   space key
		*/

		$(document).on('keypress', '.option', function(e)
		{
			if(!e.keyCode || e.keyCode === 32)
			{
				e.preventDefault();
				$(this).find('input').click();
			}
			
		});

		/* 
		   Enable slide buttons and quasi radio buttons to be clicked with
		   entire text string
		*/

	});

/* end: settings slide toggles and quasi radio buttons */


/* begin: password functionality*/

	/* 
	   functionality to show and hide password retype box
	   and some extra visual flair upon submitting a new password
	   (no validation implemented)
	*/


	$(document).on('ready', function()
	{
		var pw_to;

		$(document).on('click', '.password-change.change-btn', function()
		{
			var sa = $(this).closest('.settings-account-info');
			sa.find('.password-retype input').val('');
			sa.closest('.settings-account-info').find('.password-retype').slideDown();
			$(this).fadeOut(350, function(){$(this).siblings('.cancel-btn').fadeIn(350);});

			var _pwChangeInput = sa.find('.password.icon-input');
			_pwChangeInput.removeClass('transition-1000-cascade');
		});

		$(document).on('click', '.password-change.cancel-btn', function()
		{
			var sa = $(this).closest('.settings-account-info');
			sa.closest('.settings-account-info').find('.password-retype').slideUp();
			$(this).fadeOut(350, function(){$(this).siblings('.change-btn').fadeIn(350);});
		});

		$(document).on('click', '.password-change.submit-btn', function()
		{
			var sa = $(this).closest('.settings-account-info');
			sa.find('.password-retype').slideUp(350);
			sa.find('.cancel-btn').fadeOut(350, function(){$(this).siblings('.change-btn').fadeIn(350);});

			var _pwChangeInput = sa.find('.password.icon-input');
			_pwChangeInput.removeClass('transition-1000-cascade').addClass('updated');

			clearTimeout(pw_to);
			pw_to = setTimeout(function()
			{
				_pwChangeInput.addClass('transition-1000-cascade').removeClass('updated');
			}, 2000);
		});

	});

/* end: password functionality*/
