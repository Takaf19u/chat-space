$(function(){

  function buildHTML(message){
    var html = 
    `<div class="message">
      <div class="message__info">
        <div class="message__info--user">
          ${message.user_name}
        </div>
        <div class="message__info--date">
          ${message.created_at}
        </div>
      </div>
      <div class="lower-message">
        <p class="lower-message__content">
          ${message.body}
        </p>
      </div>
    `
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      html = 
        html +
         `  <img src=${message.image} >
          </div>`
    } else {
      html = html + `</div>`
    }
    return html
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $(".form__send--btn").prop( 'disabled', false );
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  })
})