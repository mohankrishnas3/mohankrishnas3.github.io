

// var url = "http://127.0.0.1:8091/alltext/"
var url = "http://5.161.99.241:8090/alltext/"

function offLoader(){
   $('.overlay').hide()
    $('body').css('overflow', 'scroll');
        // $('threads-sections').css('display', 'block');

}





function onLoader(){
   let tox = parseInt(document.documentElement.scrollTop || document.body.scrollTop )
    tox = tox+'px'
   document.querySelector('.overlay').style.top = ''+tox+' ';

    $('.overlay').show()
   $('body').css('overflow', 'hidden');
}



function initailRun(){

    onLoader()

    let lock1 = false;
    let lock2 = false;


    let allitext = [];
    $('.thread').each(function(x,v){

      let cind = (x+1);
      let top =  [$(v).find('.des-text').text().trim()];
     
      
      let obj = {};
      obj['top'+cind]= top;
      let thiskey = 'replies'+cind
      obj[thiskey] = [];
     

      $(v).find('.replies-des-text').each(function(p,r){
         let r1 =  $(this).text().trim()
          obj[thiskey].push(r1)
      });

   
      allitext.push(obj);
    })


    let pd = JSON.stringify({ 
            // "clickedtext":clickedText, 
            "alltext":allitext,
            "dosummary":false,
            "dosimilarity":false,
            "dotoxicity":true,
            "dosentiment":false,
            "summarytext":""})

      var settings = {
      "url": url,
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": pd,
    };


    $.ajax(settings).done(function (response) {

        let alltext = response.alltext;

         $('.thread, .replies-thread').removeClass('class-toxicity');
        alltext.forEach(function(g,x){

          let cur = (x+1);
     
         if(Object.values(g['top'+cur][0])[0] == 'toxic'){
             $('.thread ').eq(x).addClass('class-toxicity');
         }
         g['replies'+cur].forEach(function (rp, rp1) {
            
            if (Object.values(rp)[0] == 'toxic') {
                $('.thread').eq(x).find('.replies-thread').eq(rp1).addClass('class-toxicity')
            }

         })

        });

        lock1 = true;

        if (lock1 && lock2) {
          offLoader()
        }
    });



    // --------------positive and negative---------------------------------


    allitext = [];
    $('.thread').each(function(x,v){

      let cind = (x+1);
      let top =  [$(v).find('.des-text').text().trim()];
     
      
      let obj = {};
      obj['top'+cind]= top;
      let thiskey = 'replies'+cind
      obj[thiskey] = [];
     

      $(v).find('.replies-des-text').each(function(p,r){
         let r1 =  $(this).text().trim()
          obj[thiskey].push(r1)
      });

   
      allitext.push(obj);
    })


    let pd2 = JSON.stringify({ 
            // "clickedtext":clickedText, 
            "alltext":allitext,
            "dosummary":false,
            "dosimilarity":false,
            "dotoxicity":false,
            "dosentiment":true,
            "summarytext":""})

      var settings = {
      "url": url,
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": pd2,
    };
  //  console.log(pd2)
 //  onLoader()
    $.ajax(settings).done(function (response) {
    
  //  offLoader()
        let alltext = response.alltext;

         $('.thread, .replies-thread').removeClass('class-positive').removeClass('class-negative');
        alltext.forEach(function(g,x){
          // console.log(x);
          // console.log(g);

          let cur = (x+1);
          // console.log(Object.values(g['top'+cur][0])[0])
         if(Object.values(g['top'+cur][0])[0] == 'POSITIVE'){
             $('.thread ').eq(x).addClass('class-positive');
         } else  if(Object.values(g['top'+cur][0])[0] == 'NEGATIVE'){
             $('.thread ').eq(x).addClass('class-negative');
         }


         g['replies'+cur].forEach(function (rp, rp1) {
            
            if (Object.values(rp)[0] == 'POSITIVE') {
                $('.thread').eq(x).find('.replies-thread').eq(rp1).addClass('class-positive')
            }else if (Object.values(rp)[0] == 'NEGATIVE') {
                $('.thread').eq(x).find('.replies-thread').eq(rp1).addClass('class-negative')
            }

         })

        });

         lock2 = true;

        if (lock1 && lock2) {
          offLoader()
        }


    });



}

$(document).ready(function(){

    initailRun();

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
    // let contentType = $(this).closest('.thread').attr('content-type')
    // $('.thread[content-type="'+contentType+'"]').hide()




     $('.thread').removeClass('top-active');
      $(this).closest('.thread').addClass('top-active');
     let clickedText = $(this).closest('.thread').find('.des-text').text().trim();

    let allitext4 = [];
    $('.thread').each(function(x,v){

      let cind = (x+1);
      let top =  $(v).find('.des-text').text().trim();
      
      let obj = {};
      obj['top'+cind]= [top];
      let thiskey = 'replies'+cind
      obj[thiskey] = [];
     

      $(v).find('.replies-des-text').each(function(p,r){
         let r1 = $(this).text().trim()
          obj[thiskey].push(r1)
      });

 
      allitext4.push(obj);
    })


    let pd4 = JSON.stringify({ 
            "clickedtext":clickedText, 
            "alltext":allitext4,
            "dosummary":false,
            "dosimilarity":true,
            "dotoxicity":false,
            "dosentiment":false,
            "summarytext":""})

      var settings2 = {
      "url": url,
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": pd4,
    };

console.log(pd4);
   onLoader()
    $.ajax(settings2).done(function (response) {
      console.log(response)
    offLoader()
            let alltext = response.alltext;

            alltext.forEach(function(g,x){
              // console.log(x);
              // console.log(g);

              let cur = (x+1);
              // console.log(Object.values(g['top'+cur][0])[0])
                   if(!Object.values(g['top'+cur][0])[0] == 'similar'){
                       $('.thread ').eq(x).css('display', 'flex')
                   } else  if(Object.values(g['top'+cur][0])[0] == 'not similar'){
                         $('.thread ').eq(x).hide();
                   }


                   g['replies'+cur].forEach(function (rp, rp1) {
                      
                      if (!Object.values(rp)[0] == 'similar') {
                          $('.thread').eq(x).find('.replies-thread').eq(rp1).css('display', 'flex')
                      }else if (Object.values(rp)[0] == 'not similar') {
                          $('.thread').eq(x).find('.replies-thread').eq(rp1).hide()
                      }

                   })

            });


    });







  });



  $(".replies-thread-btn.hide-similar").click(function(){
    // $('.replies-thread').css('display', 'flex')
    // let contentType = $(this).closest('.replies-thread').attr('content-type')
    // // alert(contentType)
    // $('.replies-thread[content-type="'+contentType+'"]').hide()

    // $('.thread').css('display','flex')
    // $('.thread[content-type="'+contentType+'"]').hide();
    // $(this).closest('.thread').css('display', 'flex')


    $('.replies-thread').css('display', 'flex')


         $('.thread').removeClass('top-active');
      $(this).closest('.thread').addClass('top-active');
     let clickedText = $(this).closest('.replies-description').find('.replies-des-text').text().trim();

    let allitext4 = [];
    $('.thread').each(function(x,v){

      let cind = (x+1);
      let top =  $(v).find('.des-text').text().trim();
      
      let obj = {};
      obj['top'+cind]= [top];
      let thiskey = 'replies'+cind
      obj[thiskey] = [];
     

      $(v).find('.replies-des-text').each(function(p,r){
         let r1 = $(this).text().trim()
          obj[thiskey].push(r1)
      });

 
      allitext4.push(obj);
    })


    let pd4 = JSON.stringify({ 
            "clickedtext":clickedText, 
            "alltext":allitext4,
            "dosummary":false,
            "dosimilarity":true,
            "dotoxicity":false,
            "dosentiment":false,
            "summarytext":""})

      var settings3 = {
      "url": url,
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": pd4,
    };

console.log(pd4);
   onLoader()
    $.ajax(settings3).done(function (response) {
      console.log(response)
    

    offLoader()
            let alltext = response.alltext;

            alltext.forEach(function(g,x){
              // console.log(x);
              // console.log(g);

              let cur = (x+1);
              // console.log(Object.values(g['top'+cur][0])[0])
                   if(!Object.values(g['top'+cur][0])[0] == 'similar'){
                       $('.thread ').eq(x).css('display', 'flex')
                   } else  if(Object.values(g['top'+cur][0])[0] == 'not similar'){
                         $('.thread ').eq(x).hide();
                   }


                   g['replies'+cur].forEach(function (rp, rp1) {
                      
                      if (!Object.values(rp)[0] == 'similar') {
                          $('.thread').eq(x).find('.replies-thread').eq(rp1).css('display', 'flex')
                      }else if (Object.values(rp)[0] == 'not similar') {
                          $('.thread').eq(x).find('.replies-thread').eq(rp1).hide()
                      }

                   })

            });

            $('.top-active').css('display', 'flex')


    });





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

      $('.thread').removeClass('top-active');
      $(this).closest('.thread').addClass('top-active');
     let clickedText = $(this).closest('.thread').find('.des-text').text().trim();

    let allitext = [];
    $('.thread.top-active').each(function(x,v){

      let cind = (x+1);
      let top =  $(v).find('.des-text').text().trim();
      
      let obj = {};
      obj['top'+cind]= top;
      let thiskey = 'replies'+cind
      obj[thiskey] = [];
     

      $(v).find('.replies-des-text').each(function(p,r){
         let r1 = $(this).text().trim()
          obj[thiskey].push(r1)
      });

 
      allitext.push(obj);
    })



    let pd = JSON.stringify({ "clickedtext":clickedText, 
            "alltext":allitext,
            "dosummary":true,
            "dosimilarity":false,
            "dotoxicity":false,
            "dosentiment":false,
            "summarytext":""})

      var settings = {
      "url": url,
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": pd,
    };

    onLoader()
    $.ajax(settings).done(function (response) {
   offLoader()
      if(response.summarytext !== undefined){
            $('.top-active').find('.des-text-replace').html(clickedText)
            $('.top-active').find('.des-text').text(response.summarytext)
            $('.top-active').find('.show-replies').hide()
            $('.top-active').find('.replies-container').hide()
            $('.top-active').find('.show-original-message').show()
            $('.top-active').find('.thread-buttons').hide();

      }
    });




   // let text = $(this).closest('.thread').find('.des-text-replace').html();


   // let text2 = $(this).closest('.thread').find('.des-text').html()



   //  $(this).closest('.thread').find('.des-text').html(text)

   //  $(this).closest('.thread').find('.des-text-replace').html(text2);

   //  let newContentType = $(this).closest('.thread').attr('content-type-after-sum')
   //  let currentContentType = $(this).closest('.thread').attr('content-type')

   //  $(this).closest('.thread').attr('content-type', newContentType);
   //  $(this).closest('.thread').attr('content-type-after-sum', currentContentType);

    
   //  $(this).closest('.thread').find('.show-replies').hide()
   //  $(this).closest('.thread').find('.replies-container').hide()
   //  $(this).closest('.thread').find('.show-original-message').show()


   //  $(this).closest('.description').find('.thread-buttons').hide();
   //  // $(this).closest('.input').focus();


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