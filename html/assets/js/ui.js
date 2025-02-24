const checkMP = () => {
  if(mediapipe === '1') {
    $('#mplogo').removeClass('dnoneimp');
  } else {
    $('#mplogo').addClass('dnoneimp');
  }
}

const loginDisableVideo = () => {
  $('#login-resolution').slideUp()
}

const loginEnableVideo = () => {
  $('#login-resolution').slideDown()
}


const fullscreen = () => {
  isfullscreen = document.fullscreenElement && document.fullscreenElement !== null

  var docElm = document.documentElement;
  if (!isfullscreen) {
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
        document.exitFullscreen()
    }
  }
  isfullscreen = !isfullscreen
  console.log('Fullscren :' + isfullscreen)
}

const updateDocSize = () => {
  $('#docsize').html($(document).width() + 'x' + $(document).height())
}

const remotefullscreen = (e) => {
  fullscreen()    
  $('#video-panel .vslot').removeClass('streamfull')
  $(e).parent().parent().addClass('streamfull')
  $('#video-panel .vslot').removeClass('zerosize')
  $(e).parent().parent().addClass('zerosize')
  $('body').addClass('fullscreen')
}

const switchfullscreen = (e) => {
  $('#video-panel .vslot').removeClass('streamfull')
  $(e).parent().addClass('streamfull')
  $('#video-panel .vslot').removeClass('zerosize')
  $(e).parent().addClass('zerosize')
}

const toggleNS = () => {
  if(!isPauseAudio) {
    $('#tns').prop('disabled', true);
    $('#tns').addClass('disabled');

    if (isns) {
      originalAudio()
      isns = !isns
      $('#ns-panel').hide()
    }
  } else {
    $('#tns').prop('disabled', false);
    $('#tns').removeClass('disabled');
  }
}

$(document).ready(function () {

  $('.buttonset>a').click(function () {
    $(this).siblings('a').removeClass('selected')
    $(this).addClass('selected')
  })

  updateDocSize()
  toggleNS()

  if (resolution.width == 1280) {
    $('#hd').css('display', 'inline-block');
  } else {
    $('#hd').css('display', 'none');
  }

  $(document).on('click', '.btnfullscreen', function() {
    fullscreen()    
    $('#video-panel .vslot').removeClass('streamfull')
    $(this).parent().parent().addClass('streamfull')
    $('#video-panel .vslot').removeClass('zerosize')
    $(this).parent().parent().addClass('zerosize')
    $('body').addClass('fullscreen')
  })

  $(document).on('click', '#btnexitfullscreen', function(){
    fullscreen()
    $('#video-panel .vslot').removeClass('streamfull')
    $('#video-panel .vslot').removeClass('zerosize')
    $('body').removeClass('fullscreen')
  })

  $(document).on('click', '#pauseVideo', function () {
    toggleVideo()
  })

  $(document).on('click', '#pauseAudio', function () {
    toggleAudio()
  })

  $('#text-send').keypress(function (event) {
    if ($(this)[0].scrollHeight > $(this)[0].clientHeight) {
      $(this).height($(this)[0].scrollHeight)
      $('#text-content').css('bottom', $(this)[0].scrollHeight + 'px')
    }
    if (event.keyCode === 13) {
      event.preventDefault()
      // send msg when press enter
      sendIm()
    }
  })

  $(window).resize(function () {
    updateDocSize()
  })

  setInterval(() => {
    const d = new Date()
    $('#clock').html(getTime() + ':')
    $('#mill').html(d.getMilliseconds())
  }, 1)

  $('#mega-menu').html(megamenu())
  $('#cp-bkn-logo').html(backendlogo())
  $('footer').html(control())

})

$(window).on('unload', function () {
  userExit()
})
 
const getTime = () => {
  const time = new Date()
  let hour = time.getHours()
  hour = hour > 9 ? hour.toString() : '0' + hour.toString()
  let mini = time.getMinutes()
  mini = mini > 9 ? mini.toString() : '0' + mini.toString()
  let sec = time.getSeconds()
  sec = sec > 9 ? sec.toString() : '0' + sec.toString()
  return hour + ':' + mini + ':' + sec
}

const toggleVideoUI = () => {
  $('#tvn').toggleClass('block')
  $('#tvb').toggleClass('block')
  toggleVideo()
  console.log('======== isPause ======')
  console.log(isPauseVideo)
  if (location.pathname.toLowerCase().indexOf('tflite-mp-ss') < 0) {
    if (!isPauseVideo) {
      $('#outputcanvas').addClass('dnoneimp');
      $('#outputimg').removeClass('dnoneimp');
    } else {
      $('#outputcanvas').removeClass('dnoneimp');
      $('#outputimg').addClass('dnoneimp');
    }
  }
}

const toggleAudioUI = () => {
  $('#tan').toggleClass('block')
  $('#tab').toggleClass('block')
  toggleNS()
  toggleAudio()
  if (!isPauseAudio) {
    $('#mstracklabel').removeClass('hd')
    $('#mstracklabel').addClass('hdnone')
   } else {
    $('#mstracklabel').removeClass('hdnone')
    $('#mstracklabel').addClass('hd')
    $('#tns').removeClass('act')
    originalAudio()
   }
}

$('#rbclose').on('click', function () {
  $('#bgscontainer').hide()
  $('#right-bar').hide()
  $('#ic').addClass('norightbar')
})

const showModelInfo = () => {
  
  let modelindex = ssmodelinfo[parseInt(model)]
  let modelinfo = `
    ${modelindex.inputsize}<br/>
    ${modelindex.format} / ${modelindex.size}<br/>
    ${modelindex.name}
  `
  $('#model').html(modelinfo)
}

$('#ebeauty').click(() => {
  isbeauty = !isbeauty
})

$('#ocbar').click(() => {
  if ($('#opcanvasdiv').hasClass('x4')) {
    $('#opcanvasdiv').removeClass('x4')
    $('#ocbar').html('4x')
  } else {
    $('#opcanvasdiv').addClass('x4')
    $('#ocbar').html('1x')
  }
})

const checkLeftBar = () => {
  if (
    $('#participants').css('display') == 'block' ||
    $('#conversation').css('display') == 'block'
  ) {
    $('#left-bar').fadeIn()
    $('footer').addClass('moveleft')
  }

  if (
    $('#participants').css('display') !== 'block' &&
    $('#conversation').css('display') !== 'block'
  ) {
    $('#left-bar').fadeOut()
    $('footer').removeClass('moveleft')
  }

  if (
    $('#participants').css('display') == 'block' &&
    $('#conversation').css('display') !== 'block'
  ) {
    $('#user-list').addClass('full')
    $('#text-content').removeClass('full')
  } else if (
    $('#participants').css('display') !== 'block' &&
    $('#conversation').css('display') == 'block'
  ) {
    $('#user-list').removeClass('full')
    $('#text-content').addClass('full')
  } else {
    $('#user-list').removeClass('full')
    $('#text-content').removeClass('full')
  }
}

const toggleUserList = () => {
  $('#participants').toggle()
  checkLeftBar()
  $('#tuloff').toggleClass('block')
  $('#tulon').toggleClass('block')
}

const toggleMessage = () => {
  $('#conversation').toggle()
  checkLeftBar()
  $('#tmoff').toggleClass('block')
  $('#tmon').toggleClass('block')
}
