function submitForm(e){
  var itemResponses = e.response.getItemResponses();
  var inquiry = '';
  
  //input roop
  var responseMailAddress = '';
  var userName = '';
  for (var i = 0; i < itemResponses.length; i++) {
    var itemResponse = itemResponses[i];
    //title
    var question = itemResponse.getItem().getTitle();
    //value
    var answer = itemResponse.getResponse();
    
    if (question === '名前' ) {
      userName = answer
    } else if (question === 'メールアドレス' ) {
      responseMailAddress = answer
    }

    answer = answer.replace(/\n/g, '\n>');//改行を引用に置換
    inquiry += '>' + (i + 1).toString() + '. ' + question + ': ' + answer + '\n'; 
  }
  var content = '[<service>からの問い合わせ]--------------------\n\n```\n' + inquiry + '\n```';
  // sendMail(content);
  sendToSlack(content);
  sendResponse(userName, responseMailAddress, inquiry);
}


/*function sendMail(body){
  var address = 'info@example.com';
  var title = '<service>pからの問い合わせ]';

  GmailApp.sendEmail(address, title, body);
}*/


function sendToSlack(body) {
  var url = "https://hooks.slack.com/services/*****************";
  var params = {
    method: 'post',
    contentType: 'application/json',
    payload: '{"text":"'+body+'"}'
  };
  UrlFetchApp.fetch(url, params);
}


function sendResponse(name, address, inquiry){
  var body = name + ' 様\n\n';
  body　+= 'このたびは、お問合せいただき、誠にありがとうございました。\n';
  body　+= 'お送りいただきました内容を確認の上、担当者より折り返しご連絡させていただきます。お急ぎの場合はお電話にてご連絡ください。\n\n';
  body　+= 'また、ご記入いただきましたメールアドレスへ、自動返信の確認メールを送付しています。自動返信メールが届かない場合、入力いただいたメールアドレスに誤りがあった可能性がございます。メールアドレスをご確認の上、もう一度フォームよりお問い合せ頂きますようお願い申し上げます。';
  body　+= '\n\n';
  body　+= '[お問い合わせ内容]\n';
  body　+= inquiry + '\n';
  body　+= '\n';
  body　+= '※本メールアドレスは送信専用のため、返信できません。\n';
  ;
  var title = '【<service>】お問い合わせ受付のご連絡';

  GmailApp.sendEmail(address, title, body,
    {
    from:'info@example.com',
    name:'<service>',
    });
}