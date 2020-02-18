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

  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }
  
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
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

 //メンバー追加ボタンにクリック時発火（メンバー追加機能）
 $(document).on("click", ".chat-group-user__btn--add", function() {
  const userName = $(this).attr("data-user-name");
  const userId = $(this).attr("data-user-id");
  $(this)
    .parent()
    .remove();
  addDeleteUser(userName, userId);
  addMember(userId);
});
$(document).on("click", ".chat-group-user__btn--remove", function() {
  $(this)
    .parent()
    .remove();
});
})