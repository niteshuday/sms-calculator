var $messages = $('.messages-content'),
    d, h, m,username,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  document.getElementById('messagebody').focus();
  if(i>0){
        if(i==1){
           username= $('.message-input').val();
        }
    }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

var Fake = [
  'Hi there, I\'m Nitesh & this is my sms counter example. May i know your good name?',
  'Nice to meet you',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'That\'s awesome',
  'I think you\'re a nice person',
  'Why do you think that?',
  'Can you explain?',
  'Anyway I\'ve gotta go now',
  'It was a pleasure chat with you',
  'Bye',
  ':)'
]

function fakeMessage() {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="assets/image/icon_image.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    var msgstring=Fake[i] ;
    if(i>0){
     msgstring=  msgstring+' '+username;
    }
    $('<div class="message new"><figure class="avatar"><img src="assets/image/icon_image.jpg" /></figure>' + msgstring + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 20) * 100);

}
