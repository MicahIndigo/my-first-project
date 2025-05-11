$(document).ready(function() {
  function inititateMutationsObserver() {
    const watchForLessonChange = function(e) {
      setUpTogglesAndListeners();
      moveFirstTimingParagraph();
      moveStoryset();
    };
  
    const config = {
      attributes: true,
      attributeFilter: ["aria-labelledby"] // this changes when new topic clicked
    };
    const modObserver = new MutationObserver(watchForLessonChange);
  
    const lessonContent = document.getElementById("seq_content");
    if (lessonContent) modObserver.observe(lessonContent, config);
  }

  // set up the toggle functions and event listeners
  function setUpTogglesAndListeners() {
    
    // Required for when esc key is pressed for exiting fullscreen
    document.addEventListener('webkitfullscreenchange', exitHandlerL3);
    document.addEventListener('mozfullscreenchange', exitHandlerL3);
    document.addEventListener('fullscreenchange', exitHandlerL3);
    document.addEventListener('MSFullscreenChange', exitHandlerL3);

    // Required for when esc key is pressed for exiting fullscreen
    function exitHandlerL3() {
        if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            let lessonWrapper = document.getElementsByClassName('lesson-wrapper');
            let runFrame = document.getElementsByClassName('run-frame');
            if(lessonWrapper.length && runFrame.length) {
                lessonWrapper[0].classList.remove("lesson-wrapper-extra");
                for(let x = 0; x < runFrame.length; x++) {
                    runFrame[x].classList.remove("large-frame");
                    runFrame[x].classList.add("small-frame");
                }
            }
        }
    }

    function fs() {
      let s = $('.flex-section')[0];
      if (!document.fullscreenElement) {
          $(".lesson-wrapper").addClass("lesson-wrapper-extra");
          $(".run-frame").removeClass("small-frame").addClass("large-frame");
          s.requestFullscreen();
      } else {
          if (document.exitFullscreen) {
             $(".lesson-wrapper").removeClass("lesson-wrapper-extra");
             $(".run-frame").removeClass("large-frame").addClass("small-frame");
              document.exitFullscreen();
          }
      }
    }
      
    $("#exp-btn").on("click keydown", (e) => {
        if(e.type === 'click'|| e.code === 'Enter') {
            fs();
        }
    })
  
    function showHide(panel) {
        if(panel.classList.contains('close-panel-2022')) {
                panel.classList.add('open-panel-2022')
                panel.classList.remove('close-panel-2022');
            } else {
                panel.classList.add('close-panel-2022')
                panel.classList.remove('open-panel-2022');
            }
    } 

    $('li.st-accordion-list > a').click(function () {
      let panel = this.nextElementSibling;
      showHide(panel);
    })
        
    $("li.st-accordion-list").keydown(function(e) {
      let panel = $(this).children()[1];
        if(e.code == 'Enter') { 
            showHide(panel);
        }
    })
        
    function hideDisplayFrame(e, f) {
        if(e.type === 'click') {
            if(!$(e.target).hasClass("disabled-2022")) {
                $("#frame-1").addClass("hide-btn");
                $("#frame-2").addClass("hide-btn");
                $("#frame-3").addClass("hide-btn");
                $(f).removeClass("hide-btn");
            }
        } else if (e.code === 'Enter') {
            if(!$(e.target).hasClass("disabled-2022")) {
                $("#frame-1").addClass("hide-btn");
                $("#frame-2").addClass("hide-btn");
                $("#frame-3").addClass("hide-btn");
                $(f).removeClass("hide-btn");
            }
        }
    }
    
    $('.rcc-1').on("click keydown", (e) => {hideDisplayFrame(e,'#frame-1')})
    $('.rcc-2').on("click keydown", (e) => {hideDisplayFrame(e,'#frame-2')})
    $('.rcc-3').on("click keydown", (e) => {hideDisplayFrame(e,'#frame-3')})
  }

  function moveFirstTimingParagraph() {
    let firstTiming = document.getElementsByClassName('timing-header-2022');
    let bookmark = document.getElementsByClassName('bookmark-button-wrapper');
    if(firstTiming.length && bookmark.length) {
      bookmark[0].appendChild(firstTiming[0]);
    }
  }
  
  function moveStoryset() {
    // Place required storyset link in footer
    let s = document.getElementById('story-set');
    let u = document.querySelector('footer nav ul');
    if(s && u) {
        let d = u.lastElementChild;
        u.insertBefore(s, d);
    }
  }
  
  moveStoryset();
  moveFirstTimingParagraph();
  setUpTogglesAndListeners();
  inititateMutationsObserver();
});