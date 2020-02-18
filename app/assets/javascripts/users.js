$(function() {

  var search_member = $("#user-search-result");

  function appendUser(user) {
    var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    search_member.append(html);
  }

  function appendErrMsgToHTML(err) {
    var html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${err}</p>
    </div>
  `;
    search_member.append(html);
  }

  //チャットメンバー追加に入力時発火（メンバー検索機能）
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      search_member.empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        appendErrMsgToHTML("ユーザーが見つかりません");
      }
    })

    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    });
  })


})