

// var url = "http://127.0.0.1:8091/alltext/"
var url = "http://5.161.99.241:8090/alltext/"
// var url = "https://urchin-app-lckag.ondigitalocean.app/alltext/"

//var url = "http://www.mohankrishnasunkara.art/alltext/"

var similarlityDataSet = []; 
var summaryDataSet = []; 

function offLoader(){
   $('.overlay').hide()
    $('body').css('overflow', 'scroll');
        // $('threads-sections').css('display', 'block');

}

var tabbingOff =  false; 



function onLoader(){
   let tox = parseInt(document.documentElement.scrollTop || document.body.scrollTop )
    tox = tox+'px'
   document.querySelector('.overlay').style.top = ''+tox+' ';

    $('.overlay').show()
   $('body').css('overflow', 'hidden');
}



function initailRun(){
  tabbingOff =  true; 
   onLoader()
// return false;
    let lock1 = false;
    let lock2 = false;
    let lock3 = false;
    let lock4 = false;


    let allitext = [];


        // --------------summary---------------------------------
   allitext = [];
    $('.thread').each(function(x,v){
        // if(x<2){
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
  // }
    })


    let pd245 = JSON.stringify({ 
            // "clickedtext":clickedText, 
            "alltext":allitext,
            "dosummary": false,
    "dosimilarity": false,
    "dotoxicity": false,
    "dosentiment": false,
    "dosimilarityforall": false,
    "dosummaryforall":true,
    "summarytext": ""})

      var settings = {
      "url": url,
      "method": "POST",
      "timeout": 1000000000,
      "headers": {
        "Access-Control-Allow-Origin": "https://cs.odu.edu/",
        "Content-Type": "application/json"
      },
      "data": pd245,
    };

// console.log(pd245); 
    $.ajax({
      method: "POST",
      url: url,
      headers: {"Access-Control-Allow-Origin":"https://cs.odu.edu/","Content-Type": "application/json" },
      data: pd245,
      success: function(serverResponse, txtStatus, request) {
        response =serverResponse
        // summaryDataSet  response
        let xp = 0
         for (let [key, value] of Object.entries(response)) {
            summaryDataSet.push(value);
            $('.thread').eq(xp).find('.des-text-replace').html(value)
            xp++
         }
         lock4 = true;

        if (lock1 && lock2 && lock3 && lock4) {
          offLoader()
          tabbingOff = false
        }
      },
      statusCode: {
      500: function(serverResponse) {
        initailRun()
        },
      401:function(){
        initailRun()
      }, 
      422:function(e){
        initailRun()
      }
    }
      });

// return false;
//     $.ajax(settings).done(function (response) {
//         console.log(response)
//         // summaryDataSet  response
//         let xp = 0
//          for (let [key, value] of Object.entries(response)) {
//             summaryDataSet.push(value);
//             $('.thread').eq(xp).find('.des-text-replace').html(value)
//             xp++
//          }
//          lock4 = true;

//         if (lock1 && lock2 && lock3 && lock4) {
//           offLoader()
//           tabbingOff = false
//         }


//     });



// return false; 

        // --------------Similarity---------------------------------


    allitext = [];
    $('.thread').each(function(x,v){
        // if(x<2){
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
  // }
    })


    let pd24 = JSON.stringify({ 
            // "clickedtext":clickedText, 
            "alltext":allitext,
            "dosummary": false,
    "dosimilarity": false,
    "dotoxicity": false,
    "dosentiment": false,
    "dosimilarityforall": true,
    "dosummaryforall":false,
    "summarytext": ""})

      var settings = {
      "url": url,
      "method": "POST",
      "timeout": 1000000000,
      "headers": {
        "Access-Control-Allow-Origin": "https://cs.odu.edu/",
        "Content-Type": "application/json"
      },
      "data": pd24,
    };

    $.ajax(settings).done(function (response) {
        console.log(response)
        similarlityDataSet = response.output;
         lock3 = true;

        if (lock1 && lock2 && lock3 && lock4) {
          offLoader()
          tabbingOff = false
        }


    });






/////////////////////////dotoxicity///////////////////////////
    allitext =[]
    $('.thread').each(function(x,v){

      // if(x<1){
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
    // }
    })


    let pd = JSON.stringify({ 
            // "clickedtext":clickedText, 
            "alltext":allitext,
            "dotoxicity":true,
                "dosummary": false,
    "dosimilarity": false,
   
    "dosentiment": false,
    "dosimilarityforall": false,
    "dosummaryforall":false,
    "summarytext": ""

           })

    $.ajax({
      method: "POST",
      url: url,
      headers: {"Access-Control-Allow-Origin":"https://cs.odu.edu/","Content-Type": "application/json" },
      data: pd,
      success: function(response, txtStatus, request) {
      console.log(response)
        // summaryDataSet  response
        let alltext = response.output.alltext;
        console.log(alltext)
        $('.thread, .replies-thread').removeClass('class-toxicity');
      //  alltext.forEach(function(g,x){
        for (let [x, g] of Object.entries(alltext)) {
         let cur = (parseInt(x)+1);
          console.log(g)
          console.log(x)
          console.log(cur)
          // console.log(Object.values(g['top'+cur]))
        if(Object.values(g['top'+cur][0])[0] == 'toxic'){
            $('.thread ').eq(x).addClass('class-toxicity');
        }
        g['replies'+cur].forEach(function (rp, rp1) {
           
           if (Object.values(rp)[0] == 'toxic') {
               $('.thread').eq(x).find('.replies-thread').eq(rp1).addClass('class-toxicity')
           }

        })

       }

       lock1 = true;

        if (lock1 && lock2 && lock3 && lock4) {
         offLoader()
         tabbingOff = false
       }
      },
      statusCode: {
      500: function(serverResponse) {
        initailRun()
        },
      401:function(){
        initailRun()
      }, 
      422:function(e){
        initailRun()
      }
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
            "summarytext":"",

    "dosimilarityforall": false,
    "dosummaryforall":false,


})

      var settings = {
      "url": url,
      "method": "POST",
      "timeout": 1000000000,
      "headers": {
        "Access-Control-Allow-Origin": "https://cs.odu.edu/",
        "Content-Type": "application/json"
      },
      "data": pd2,
    };

    $.ajax(settings).done(function (response) {
        let alltext = response.alltext;
         $('.thread, .replies-thread').removeClass('class-positive').removeClass('class-negative');
        alltext.forEach(function(g,x){
          let cur = (x+1);
        
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

          if (lock1 && lock2 && lock3 && lock4) {
          offLoader()
          tabbingOff = false
        }


    });








}

$(document).ready(function(){

    initailRun();

  $(".des-text").click(function(){
    $(this).closest('.description').find('.thread-buttons').css('display', 'flex')
    $(this).closest('.thread').find('.show-replies').focus();

console.log('herer')
  });


  $(".replies-des-text").click(function(){
    $(this).closest('.replies-description').find('.replies-thread-buttons').css('display', 'flex')
    $(this).closest('.replies-description').find('.replies-thread-btn.show-similar').addClass('first-child')
    $(this).closest('.replies-description').find('.hide-similar').focus();
  });


  $(".show-replies").click(function(){
      $(this).closest('.description').find('.replies-container').css('display', 'block')
  });




  
   $(".thread-btn.show-positive").click(function(){
     $(this).closest('.thread').addClass('top-active');
    $('.thread:not(.top-active)').hide()
    $('.thread.class-positive').css('display', 'flex')

    $(this).closest('.thread').addClass('top-active');
    $('.thread:not(.top-active)').find('.thread-buttons, .replies-thread-buttons').hide();
    $('.replies-thread').hide()
    $('.replies-thread.class-positive').css('display', 'flex')

  });



  $(".replies-thread-btn.thread-btn.show-positive").click(function(){
     $(this).closest('.thread').addClass('top-active').addClass('move-focus');
    $('.thread:not(.top-active)').hide()

    $('.thread.class-positive').css('display', 'flex')

    $('.thread:not(.top-active) .replies-thread').hide()
    $('.replies-thread.class-positive').css('display','flex')
    $(this).closest('.thread').css('display', 'flex')

    $(this).closest('.thread').addClass('top-active');
    $('.thread:not(.top-active)').find('.thread-buttons, .replies-thread-buttons').hide();
        $(this).focus()

        setTimeout(()=>{
              $(this).focus()
        },200)


  });



  $(".thread-btn.show-toxicity").click(function(){
       $(this).closest('.thread').addClass('top-active');
 //   $('.thread:not(.top-active)').hide()

    $('.thread').css('display', 'flex')
    $('.thread.class-toxicity:not(.top-active)').hide()

    $(this).closest('.thread').addClass('top-active');
    $('.thread:not(.top-active)').find('.thread-buttons, .replies-thread-buttons').hide();
   
    $('.replies-thread').css('display', 'flex')
    $('.replies-thread.class-toxicity').hide()

  });


  $(".replies-thread-btn.show-toxicity").click(function(){
    $('.thread').css('display', 'flex')
    $('.thread.class-toxicity').hide()

    $('.replies-thread').css('display','flex')
    $('.replies-thread.class-toxicity').hide()
     $(this).closest('.thread').css('display', 'flex')

     $(this).closest('.thread').addClass('top-active');
     $('.thread:not(.top-active)').find('.thread-buttons, .replies-thread-buttons').hide();
         $(this).focus()

        setTimeout(()=>{
              $(this).focus()
        },200)

  });



  $(".thread-btn.show-negative").click(function(){
       $(this).closest('.thread').addClass('top-active');
    $('.thread:not(.top-active)').hide()
    $('.thread.class-negative').css('display', 'flex')

    $(this).closest('.thread').addClass('top-active');
    $('.thread:not(.top-active)').find('.thread-buttons, .replies-thread-buttons').hide();

    $('.replies-thread').hide()
    $('.replies-thread.class-negative').css('display', 'flex')

  });


  $(".replies-thread-btn.show-negative").click(function(){
      $(this).closest('.thread').addClass('top-active');
    $('.thread:not(.top-active)').hide()
    $('.thread.class-negative').css('display', 'flex')

    $('.thread:not(.top-active) .replies-thread').hide()
    $('.replies-thread.class-negative').css('display','flex')
     $(this).closest('.thread').css('display', 'flex')

     $(this).closest('.thread').addClass('top-active');
     $('.thread:not(.top-active)').find('.thread-buttons, .replies-thread-buttons').hide();
     $(this).focus()
     
        setTimeout(()=>{
              $(this).focus()
        },200)

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
    $(this).closest('.thread').find('.show-summarize').show()
    

  });


    $(".show-reset").click(function(){
     // location.reload()

     $('.show-original-message').click()

     setTimeout(()=>{
      $('.thread').css('display', 'flex');
      $('.replies-container').hide()
    $('.thread-buttons').hide();
    $('.thread-buttons').hide();
    $('.replies-thread-buttons').hide();
     },300)
   
      // $(this).closest('.replies-description').find('.replies-thread-buttons').css('display', 'flex')


    });


    $('body').on( 'keydown', function( e ) {
      if( e.which == 9 ) {
        if(tabbingOff){
          setTimeout(()=>{
            $('.wait-message').focus()
            $('.wait-message').click()
               $('.wait-message').focus()
            console.log('set focus')
          },200)

           $('.wait-message').focus()
            $('.wait-message').click()
               $('.wait-message').focus()
            console.log('set focus')

          e.preventDefault();
          return false;
        }
      }
    } );






    $(".thread-btn.hide-similar").click(function(){
        console.log(similarlityDataSet)
        let clickedText = $(this).closest('.thread').find('.des-text').text().trim();
        var index = similarlityDataSet.map(function(e) { return e.clickedtext_2022; }).indexOf(clickedText);

        console.log(index)

        $('.thread').css('display', 'flex')
        $(this).closest('.thread').addClass('top-active');
        console.log(similarlityDataSet[index])
        let p = similarlityDataSet[index].alltextsimiliarity
        for (let [key, value] of Object.entries(p)) {
          if (key.indexOf('top')>-1) {
                let x = key.replace('top','').split('_')[0]
               if(value.trim() == 'similar'){
                     $('.thread ').eq(x).hide();
                 } else  if(value.trim() == 'not similar'){
                         $('.thread ').eq(x).css('display', 'flex')
                 }
          }

          if (key.indexOf('replies')>-1) {
                let tx = key.replace('replies','').split('_')[0]
                let trp = key.replace('replies','').split('_')[1]
                if (value.trim() == 'similar') {
                     $('.thread').eq(tx).find('.replies-thread').eq(trp).hide()
                }else if (value.trim() == 'not similar') {
                     $('.thread').eq(tx).find('.replies-thread').eq(trp).css('display', 'flex')
                }
          }
        }

        $('.thread.top-active').css('display', 'flex')
        $('.thread:not(.top-active)').find('.thread-buttons, .replies-thread-buttons').hide();

    })


    $(".thread-btn.hide-similar").click(function(){
      return false;
      $('.thread').css('display', 'flex')
   
  
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
  
      $('.current-active-btn').removeClass('current-active-btn')
      $(this).addClass('current-active-btn')
      tabbingOff = true; 
     onLoader()
      $.ajax(settings2).done(function (response) {
      offLoader()
              let alltext = response.alltext;
  
              alltext.forEach(function(g,x){
                let cur = (x+1);                
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
              $('.thread.top-active').css('display', 'flex')
              $('.thread:not(.top-active)').find('.thread-buttons, .replies-thread-buttons').hide();
              tabbingOff = false;  
      });
    });
  
  $(".replies-thread-btn.hide-similar").click(function(){
        $('.replies-thread').css('display', 'flex')
        $('.thread').removeClass('top-active');
        $(this).closest('.thread').addClass('top-active');
        let clickedText = $(this).closest('.replies-description').find('.replies-des-text').text().trim();

        var index = similarlityDataSet.map(function(e) { return e.clickedtext_2022; }).indexOf(clickedText);

        console.log(index)
        
        let p = similarlityDataSet[index].alltextsimiliarity
        for (let [key, value] of Object.entries(p)) {
          if (key.indexOf('top')>-1) {
                let x = key.replace('top','').split('_')[0]
               if(value.trim() == 'similar'){
                     $('.thread ').eq(x).hide();
                 } else  if(value.trim() == 'not similar'){
                         $('.thread ').eq(x).css('display', 'flex')
                 }
          }

          if (key.indexOf('replies')>-1) {
                let tx = key.replace('replies','').split('_')[0]
                let trp = key.replace('replies','').split('_')[1]
                if (value.trim() == 'similar') {
                     $('.thread').eq(tx).find('.replies-thread').eq(trp).hide()
                }else if (value.trim() == 'not similar') {
                     $('.thread').eq(tx).find('.replies-thread').eq(trp).css('display', 'flex')
                }
          }
        }


        $('.thread.top-active').css('display', 'flex')
        $('.thread:not(.top-active)').find('.thread-buttons, .replies-thread-buttons').hide();


  })
  
    $(".replies-thread-btn.hide-similar").click(function(){
    return false; 
  
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
  
  $('.current-active-btn').removeClass('current-active-btn')
  $(this).addClass('current-active-btn')
  tabbingOff = true; 
  
  
     onLoader()
      $.ajax(settings3).done(function (response) {
    
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
  
              $('.thread.top-active').css('display', 'flex')
              $('.thread:not(.top-active)').find('.thread-buttons, .replies-thread-buttons').hide();
              tabbingOff = false; 
      });
  
  
  
  
  
    });





    $(".show-summarize").click(function(){

        $('.thread').removeClass('top-active').removeClass('curent-sum');
        $(this).closest('.thread').addClass('top-active').addClass('curent-sum');
        let clickedText = $(this).closest('.thread').find('.des-text').text().trim();

    

        $('.current-active-btn').removeClass('current-active-btn')
        $(this).addClass('current-active-btn')
  
        tabbingOff = true; 

        let replaceingtext = $('.top-active').find('.des-text-replace').html()
        $('.top-active').find('.des-text-replace').html(clickedText)
        $('.top-active').find('.des-text').text(replaceingtext)
        $('.top-active').find('.show-replies').hide()
        $('.top-active').find('.replies-container').hide()
        $('.top-active').find('.show-original-message').show()
        $('.top-active').find('.show-summarize').hide()
        $('.top-active').find('.thread-buttons').hide();
        tabbingOff = false; 
        setTimeout(()=>{ $('.curent-sum .name').eq(0).focus()},100)
    // $(this).closest('.thread').addClass('top-active');
    //$('.thread:not(.top-active)').find('.thread-buttons, .replies-thread-buttons').hide();


  });






});