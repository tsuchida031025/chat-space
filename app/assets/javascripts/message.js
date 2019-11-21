$(document).on('turbolinks:load',function(){
  function buildHTML(message){
    var Messageimage = (message.image)? (message.image) : ""
    var html =
      `<div class="message" data-id=${message.id}>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
        <img src=${Messageimage} >
      </div>`
    return (message.content || Messageimage) ? html : '';
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this)
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message)
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('error')
    })
  })
  var roloadMessages = function(){
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.message:last').data("message-id");
        $.ajax({
          url: 'api/messages',
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = ''; 
          messages.forEach(function (message) { 
          insertHTML = buildHTML(message); 
          $('.messages').append(insertHTML); 
  
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          })
        })
        .fail(function() {
          alert('自動更新に失敗しました');
        });
      }
    };
    setInterval(roloadMessages, 7000);
});