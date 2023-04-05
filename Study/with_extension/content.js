// chrome.runtime.sendMessage({ todo: "showPageAction" }); //Send message to eventPage to highlight Icon

// //On startup check if the extension is enabled
// chrome.storage.local.get(["state"], (result) => {
//   // console.log("STARTUP CHECK")
//   state = result.state ? result.state : "OFF";
//   if (state == "ON") {
//     applyButtons();
//   }
// });

// //Enable the extension when triggered
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log("GOT THE MESSAGE", request);
//   //When a new page is loaded
//   if (request.todo == "NewPageLoaded") {
//     //Check the document and if new nodes are added then apply the evet listener on them
//     MutationObserver = window.MutationObserver;
//     var observer = new MutationObserver((mutation, observer) => {
//       console.log("MUTATION");
//       //console.log("MUTATION",mutation,observer);
//       chrome.storage.local.get(["state"], (result) => {
//         var state = result.state ? result.state : "OFF";
//         if (state == "ON") {
//           applyButtons();
//         }
//       });
//     });
//     //Observe the entire product list node for any changes
//     observer.observe(
//       document.querySelector(
//         ".s-main-slot.s-result-list.s-search-results.sg-row"
//       ),
//       {
//         subtree: true,
//         childList: true,
//       }
//     );
//     // console.log("READY STATE",document.readyState)
//   } else if (request.todo == "changeTrigger") {
//     if (request.state == "ON") {
//       //Apply the EventListener(Click event) on all the <a> tags
//       applyButtons();
//     } else {
//       //Remove the EventListener(Click Event) on all the <a> tags
//       remove();
//     }
//   }
// });
// // To get the <a> tag
// const getParentAnchor = function (element) {
//   while (element !== null) {
//     if (element.tagName.toUpperCase() === "A") {
//       return element;
//     }
//     element = element.parentNode;
//   }
//   return null;
// };

// // To handle the click event
// const handleEvent = (event) => {
//   var anchor = getParentAnchor(event.target);
//   // console.log("anchor", anchor);
//   event.preventDefault(); //Prevent the href from loading the new page
//   var url = `https://www.amazon.com/${anchor.getAttribute("href")}`; //Generate our product info link
//   getDetails(url); //Get the details of the product and display the alert
// };
window.onload = () => {
  console.log("windows onload");
  applyButtons();
}  




const applyButtons = () => {
  var divs = document.querySelectorAll(`h2 .a-link-normal.a-text-normal`);
  console.log('i came inside apply buttons');
  console.log(' divs ');
  console.log(divs);
  divs.forEach((div) => {
    console.log('i came inside inside apply buttons');
    var buttonElement =
      div.parentNode.parentNode.parentNode.querySelector(`.addedButton`) === null; //Check if button already exists
    if (buttonElement) {
      console.log('i came inside inside inside');
      //If it doesnt exist then add it
      var button = document.createElement("input");
      var newDiv = document.createElement("div");
      newDiv.setAttribute('style', 'white-space:pre-wrap');
      var body = document.createElement("div");
      body.setAttribute('style', 'white-space:pre-wrap');
      //newDiv.setAttribute('id', 'main')
      //var ul = document.createElement('ul');
      // ul.setAttribute('id', 'prolist');
      // var tbl = document.createElement("table");
      // var tblBody = document.createElement("tbody");

      
    
      var url = `https://www.amazon.com${div.getAttribute("href")}`;
      button.setAttribute("type", "button");
      button.setAttribute("value", "Get Details");
      button.setAttribute("class", "addedButton");
      // div.setAttribute("id", "NewInfoDiv");
      // button.setAttribute("name", "CLICK MEEEEEEEE");
      button.addEventListener("click", () => {
        getDetails(url,newDiv,body);
        console.log('checked');
        //app(url);
      });
      div.parentNode.parentNode.parentNode.append(button);
      div.parentNode.parentNode.parentNode.append(newDiv);
      
      
      //newDiv.appendChild(ul); 
      div.parentNode.parentNode.parentNode.append(body);
      // body.appendChild(tbl);
      console.log('checked1');
    }
  });
};

// Get the details of the product
const getDetails = (url, newDiv,body) => {
  // console.log("THE NEW DIV",newDiv)
  if (newDiv.classList.contains("visibleInfo")) {
    newDiv.classList.remove("visibleInfo");
    newDiv.classList.add("InvisibleInfo");
  } else {
    if (newDiv.innerHTML) {
      //If the data is already fetched just change the class so the newDiv info is visible
      newDiv.classList.add("visibleInfo");
      newDiv.classList.remove("InvisibleInfo");
    } else {
      //If no info has been fetched, fetch it and then populate newDiv
      newDiv.innerHTML = "FETCHING NEW DATA"; //Just change the text to show that data is being fetched
      fetch(url) //Get request of the generated url
        .then((res) => res.text()) // use the .text() of res (object) to convert the byte stream into plain text
        .then((text) => {
          var parser = new DOMParser(); //DomParser API
          var doc = parser.parseFromString(text, "text/html"); //parse into DOM query-able form
          var items = doc.querySelectorAll(
            ".a-unordered-list.a-vertical.a-spacing-mini span.a-list-item"
          ); //Query the details of the product
          var info = "";
          //Generate the new info to be displayed on the alert
          items.forEach((element) => {
            //info += element.innerHTML;
            var list = document.createElement('li');
            body.appendChild(list);
            list.innerHTML += element.innerHTML;

          });
          // document.querySelector(`NewInfoDiv`)
          // alert(info); // Make an alert to display the product info
          newDiv.innerHTML = info;
          //Set the className to visibleInfo
          newDiv.setAttribute("class", "visibleInfo");
        })
        // If there is an error catch it and display it as an alert
        .catch((err) => (newDiv.innerHTML = err));
    }
  }
};

// var el = document.getElementById("nav-subnav");
// if(el){
//   el.addEventListener("click", function(){ console.log("clicked"); console.log("i am moving"); applyButtons(); });
// }

document.querySelector("#search > div > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(4) > div > div > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.s-list-col-right > div > div > div.a-section.a-spacing-none.s-padding-right-small.s-title-instructions-style > input").addEventListener('click', function handleClick(event) {
 // console.log(event.target); // 👉️ p#child
var child_div = event.target; 
    //console.log(child_div.parentNode);
    

  // 👇️ "parent"
  console.log(event.target.previousElementSibling.children[0].getAttribute("href"));
});

