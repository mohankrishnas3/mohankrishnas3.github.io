$(document).ready(function(){

  $(".des-text").click(function(){
  	$(this).closest('.description').find('.thread-buttons').css('display', 'flex')
    $(this).closest('.input').focus();


  });


  $(".replies-des-text").click(function(){
    $(this).closest('.replies-description').find('.replies-thread-buttons').css('display', 'flex')
    $(this).closest('.replies-description').find('.replies-thread-btn.show-similar').addClass('first-child')
  });


  $(".show-replies").click(function(){
      $(this).closest('.description').find('.replies-container').css('display', 'block')
  });


  $(".thread-btn.hide-similar").click(function(){
    $('.thread').css('display', 'flex')
    let contentType = $(this).closest('.thread').attr('content-type')
    $('.thread[content-type="'+contentType+'"]').hide()
  });



  $(".replies-thread-btn.hide-similar").click(function(){
    $('.replies-thread').css('display', 'flex')
    let contentType = $(this).closest('.replies-thread').attr('content-type')
    // alert(contentType)
    $('.replies-thread[content-type="'+contentType+'"]').hide()

    $('.thread').css('display','flex')
    $('.thread[content-type="'+contentType+'"]').hide();
    $(this).closest('.thread').css('display', 'flex')


  });




  // $(".show-similar").click(function(){
  //   $('.thread').hide()
  //   $('.thread.class-sim').css('display', 'flex')
  // });

  
   $(".thread-btn.show-positive").click(function(){
    $('.thread').hide()
    $('.thread.class-positive').css('display', 'flex')

    // $('.replies-thread').hide()
    // $('.replies-thread.class-positive').css('display','flex')
  });



  $(".replies-thread-btn.thread-btn.show-positive").click(function(){
   $('.thread').hide()
    $('.thread.class-positive').css('display', 'flex')

    $('.replies-thread').hide()
    $('.replies-thread.class-positive').css('display','flex')
    $(this).closest('.thread').css('display', 'flex')
  });



  $(".thread-btn.show-toxicity").click(function(){
    $('.thread').css('display', 'flex')
    $('.thread.class-toxicity').hide()

    //  $('.replies-thread').css('display','flex')
    // $('.replies-thread.class-toxicity').hide()


  });


  $(".replies-thread-btn.show-toxicity").click(function(){
    $('.thread').css('display', 'flex')
    $('.thread.class-toxicity').hide()

    $('.replies-thread').css('display','flex')
    $('.replies-thread.class-toxicity').hide()
     $(this).closest('.thread').css('display', 'flex')

  });



  $(".thread-btn.show-negative").click(function(){
    $('.thread').hide()
    $('.thread.class-negative').css('display', 'flex')

    // $('.replies-thread').hide()
    // $('.replies-thread.class-negative').css('display','flex')


  });


  $(".replies-thread-btn.show-negative").click(function(){
    $('.thread').hide()
    $('.thread.class-negative').css('display', 'flex')

    $('.replies-thread').hide()
    $('.replies-thread.class-negative').css('display','flex')
     $(this).closest('.thread').css('display', 'flex')

  });




   $(".show-summarize").click(function(){

   let text = $(this).closest('.thread').find('.des-text-replace').html();


   let text2 = $(this).closest('.thread').find('.des-text').html()



    $(this).closest('.thread').find('.des-text').html(text)

    $(this).closest('.thread').find('.des-text-replace').html(text2);

    let newContentType = $(this).closest('.thread').attr('content-type-after-sum')
    let currentContentType = $(this).closest('.thread').attr('content-type')

    $(this).closest('.thread').attr('content-type', newContentType);
    $(this).closest('.thread').attr('content-type-after-sum', currentContentType);

    
    $(this).closest('.thread').find('.show-replies').hide()
    $(this).closest('.thread').find('.replies-container').hide()
    $(this).closest('.thread').find('.show-original-message').show()


    $(this).closest('.description').find('.thread-buttons').hide();
    // $(this).closest('.input').focus();


  });

  $(".show-original-message").click(function(){
   let text = $(this).closest('.thread').find('.des-text-replace').html();
   let text2 = $(this).closest('.thread').find('.des-text').html()

    let newContentType = $(this).closest('.thread').attr('content-type-after-sum')
    let currentContentType = $(this).closest('.thread').attr('content-type')

    $(this).closest('.thread').attr('content-type', newContentType);
    $(this).closest('.thread').attr('content-type-after-sum', currentContentType);


    $(this).closest('.thread').find('.des-text').html(text)
    $(this).closest('.thread').find('.des-text-replace').html(text2);
    $(this).closest('.thread').find('.show-replies').show()
    $(this).closest('.thread').find('.replies-container').show()
    $(this).closest('.thread').find('.show-original-message').hide()

  });


    $(".show-reset").click(function(){
     location.reload()
    });




});