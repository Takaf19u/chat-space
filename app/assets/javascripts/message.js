$(function(){

  var buildHTML = function(message) {
    var addImage = ``
    var addBody = ``
    // 「もしメッセージに画像が含まれていたら」
    if (message.image) {
      addImage = 
      `<img src= ${message.image} class="lower-message__image" >`
    }
    // 「もしメッセージにコメントが含まれていたら」
    if(message.body) {
      addBody = 
      `<p class="lower-message__content">
        ${message.body} 
      </p>`
    }

    //data-idが反映されるようにしている
    var html = 
     `<div class="message" data-message-id= ${message.id}>
        <div class="message__info">
          <div class="message__info--user">
            ${message.user_name}
          </div>
          <div class="message__info--date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          ${addBody}
          ${addImage}
        </div>
      </div>`

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
      console.log(data)
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

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      // 相対パスで書くことで、自動的に現在ブラウザに表示されているURLの後に繋がる形になります。
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  // groups/数字/messagesというURLである場合
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    // ７秒ごとにreloadMessagesを呼び出す
    setInterval(reloadMessages, 7000);
  }
})