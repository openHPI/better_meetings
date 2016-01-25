$(window).on('load' ,function(){
        $('#docs-menu').affix({
            offset:{
                top: $('#docs-header').outerHeight() + 15
            }
        });


        $('#docs-menu').on('click', 'a[href^="#"]', function(e) {
            e.preventDefault();
            if ($(this).parent().hasClass('hassub')) {
                $(this).parent().toggleClass('in');
                return;
            }

            var target = $( $(this).attr('href') );
            if( target.length ) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 500);
            }
        });
        prettyPrint();

        $('body').scrollspy({ target: '#docs-menu' });

        var scSpy = $('#docs-menu .hassub');
        $('#docs-menu li').on('activate.bs.scrollspy', function () {
            scSpy.removeClass('in')
        })



        $('.demo-overlay-btn, #demo-overlay-btn-2, #demo-overlay-btn-3, #demo-overlay-btn-4, #demo-overlay-btn-5,  #demo-overlay-btn-6,  #demo-overlay-btn-7').on('click', function(){
            var el = $(this);
            el.niftyOverlay('show');
            var timer = setInterval(function(){
                el.niftyOverlay('hide');
                clearInterval(timer);
            },4000);
        });

        $('.demo-overlay-btn').niftyOverlay();

        $('#demo-overlay-btn-2').niftyOverlay({
            title: 'Loading...'
        });

        $('#demo-overlay-btn-3').niftyOverlay({
            title: 'Loading...',
            desc: 'Please wait while the content is load.'
        });


        $('#demo-overlay-btn-4').niftyOverlay({
            iconColor: 'text-danger'
        });

        $('#demo-overlay-btn-5').niftyOverlay({
            iconColor: 'text-purple'
        });


        $('#demo-overlay-btn-6').niftyOverlay({
            iconClass: 'fa fa-paint-brush fa-3x animated infinite wobble'
        });

        $('#demo-overlay-btn-7').niftyOverlay({
            iconClass: 'fa fa-heart fa-3x animated infinite rubberBand'
        });


        $('#demo-noty-floating').on('click', function(){
            $.niftyNoty({
                type: 'success',
                container : 'floating',
                title : 'You have\'ve got 30 Messages',
                message : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
                closeBtn : false,
                timer : 5000
            });
        });


        $('#demo-noty-page').on('click', function(){
            $.niftyNoty({
                type: 'danger',
                icon : 'fa fa-bolt fa-2x',
                container : 'page',
                title : 'Server Load Limited',
                message : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.'
            });
        });


        $('#demo-noty-panel').on('click', function(){
            $.niftyNoty({
                type: 'danger',
                container : '#demo-panel-alert',
                html : '<h4 class="alert-title">Oh snap! You got an error!</h4><p class="alert-message">Change this and that and try again. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.</p><div class="mar-top"><button type="button" class="btn btn-danger" data-dismiss="noty">Close this notification</button></div>',
                closeBtn : false
            });
        });


        $('#demo-noty-onshow').on('click', function(){
            $.niftyNoty({
                type: 'purple',
                container : 'floating',
                title : 'onShow Callback',
                message : 'This event fires immediately when the show instance method is called.',
                closeBtn : false,
                timer : 2000,
                onShow:function(){
                    alert("onShow Callback")
                }
            });
        });

        $('#demo-noty-onshown').on('click', function(){
            $.niftyNoty({
                type: 'danger',
                container : 'floating',
                title : 'onShown Callback',
                message : 'This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete).',
                closeBtn : false,
                timer : 2000,
                onShown:function(){
                    alert("onShown Callback")
                }
            });
        });

        $('#demo-noty-onhide').on('click', function(){
            $.niftyNoty({
                type: 'warning',
                container : 'floating',
                title : 'onHide Callback',
                message : 'This event is fired immediately when the hide instance method has been called.',
                closeBtn : false,
                timer : 2000,
                onHide:function(){
                    alert("onHide Callback")
                }
            });
        });

        $('#demo-noty-onhidden').on('click', function(){
            $.niftyNoty({
                type: 'info',
                container : 'floating',
                title : 'onHidden Callback',
                message : 'This event is fired when the notification has finished being hidden from the user (will wait for CSS transitions to complete).',
                closeBtn : false,
                timer : 2000,
                onHidden:function(){
                    alert("onHidden Callback")
                }
            });
        });

        $('#docs-check-cb-getstate-btn').on('click', function(){
                $('#docs-check-cb-getstate-txt').text( $('#docs-check-cb-getstate').niftyCheck('isChecked') );
        });


        $('#docs-check-rd-getstate-btn').on('click', function(){
                $('#docs-check-rd-getstate-txt').text( $('#docs-check-rd-getstate').niftyCheck('isChecked') );
                $('#docs-check-rd-getstate2-txt').text( $('#docs-check-rd-getstate2').niftyCheck('isChecked') );
        });






        $('#docs-check-toggle-btn').on('click', function(){
            $('#docs-check-toggle').niftyCheck('toggle');
        });

        $('#docs-check-rd-toggle-btn').on('click', function(){
            $('#docs-check-rd-toggle').niftyCheck('toggle');
        });

        $('#docs-check-toggle-on-btn').on('click', function(){
            $('#docs-check-toggle-on').niftyCheck('toggleOn');
        });

        $('#docs-check-toggle-off-btn').on('click', function(){
            $('#docs-check-toggle-off').niftyCheck('toggleOff');
        });



        $('#docs-check-cb-oncheck').on('nifty.ch.checked', function(){
            $('#docs-check-cb-oncheck-txt').text('Checked').fadeIn('fast');

            if(tm) clearInterval(tm);
            var tm = setInterval(function(){
                $('#docs-check-cb-oncheck-txt').fadeOut('fast');
                clearInterval(tm);
            },500);
        });

        $('#docs-check-rd-oncheck').on('nifty.ch.checked', function(){
            $('#docs-check-rd-oncheck-txt').text('Checked').fadeIn('fast');

            if(tm) clearInterval(tm);
            var tm = setInterval(function(){
                $('#docs-check-rd-oncheck-txt').fadeOut('fast');
                clearInterval(tm);
            },500);
        });

        $('#docs-check-rd2-oncheck').on('nifty.ch.checked', function(){
            $('#docs-check-rd2-oncheck-txt').text('Checked').fadeIn('fast');

            if(tm) clearInterval(tm);
            var tm = setInterval(function(){
                $('#docs-check-rd2-oncheck-txt').fadeOut('fast');
                clearInterval(tm);
            },500);
        });






        $('#docs-check-cb-onuncheck').on('nifty.ch.unchecked', function(){
            $('#docs-check-cb-onuncheck-txt').text('Unhecked').fadeIn('fast');

            if(tm) clearInterval(tm);
            var tm = setInterval(function(){
                $('#docs-check-cb-onuncheck-txt').fadeOut('fast');
                clearInterval(tm);
            },500);
        });

        $('#docs-check-rd-onuncheck').on('nifty.ch.unchecked', function(){
            $('#docs-check-rd-onuncheck-txt').text('Unhecked').fadeIn('fast');

            if(tm) clearInterval(tm);
            var tm = setInterval(function(){
                $('#docs-check-rd-onuncheck-txt').fadeOut('fast');
                clearInterval(tm);
            },500);
        });

        $('#docs-check-rd2-onuncheck').on('nifty.ch.unchecked', function(){
            $('#docs-check-rd2-onuncheck-txt').text('Unhecked').fadeIn('fast');

            if(tm) clearInterval(tm);
            var tm = setInterval(function(){
                $('#docs-check-rd2-onuncheck-txt').fadeOut('fast');
                clearInterval(tm);
            },500);
        });




        $('#docs-check-cb-change').on('change', function(){
            $('#docs-check-cb-change-txt').text('Changed').fadeIn('fast');

            if(tm) clearInterval(tm);
            var tm = setInterval(function(){
                $('#docs-check-cb-change-txt').fadeOut('fast');
                clearInterval(tm);
            },500);
        });

        $('#docs-check-rd-change').on('change', function(){
            $('#docs-check-rd-change-txt').text('Changed').fadeIn('fast');

            if(tm) clearInterval(tm);
            var tm = setInterval(function(){
                $('#docs-check-rd-change-txt').fadeOut('fast');
                clearInterval(tm);
            },500);
        });

        $('#docs-check-rd2-change').on('change', function(){
            $('#docs-check-rd2-change-txt').text('Changed').fadeIn('fast');

            if(tm) clearInterval(tm);
            var tm = setInterval(function(){
                $('#docs-check-rd2-change-txt').fadeOut('fast');
                clearInterval(tm);
            },500);
        });

        $('.prevdef').on('click', 'a', function(e){
            //e.preventDefault();
            //return;
        });
        $('#demo-lang-switch').niftyLanguage();
        $('#docs-lang-dynamic').niftyLanguage({
            dynamicMode : false
        });


        $('#docs-lang-autosel').niftyLanguage({
            selectedOn : '#lang-fr'
        });

        $('#docs-lang-onchange').niftyLanguage({
            onChange:function(e){
                alert('ID : ' + e.id + ' - Language : ' + e.name )
            }
        });

        $('#docs-lang-getsel').niftyLanguage({
            onChange : function(){
                $('#doc-lang-getid-txt, #doc-lang-getname-txt, #doc-lang-getsel-txt').text('');
            }
        });

        $('#doc-lang-getid-btn').on('click', function(){
            $('#doc-lang-getid-txt').text($('#docs-lang-getsel').niftyLanguage('getSelectedID'));
        });
        $('#doc-lang-getname-btn').on('click', function(){
            $('#doc-lang-getname-txt').text($('#docs-lang-getsel').niftyLanguage('getSelectedName'));
        });
        $('#doc-lang-getsel-btn').on('click', function(){
            $('#doc-lang-getsel-txt').text( JSON.stringify($('#docs-lang-getsel').niftyLanguage('getSelected')));
        });

        $('#docs-lang-disabled').niftyLanguage();

        $('#doc-lang-enable-btn').on('click', function(){
            $('#docs-lang-disabled').niftyLanguage('setEnable');
        });

        $('#doc-lang-disable-btn').on('click', function(){
            $('#docs-lang-disabled').niftyLanguage('setDisable');
        });
});
