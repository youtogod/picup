
function checkAndAddFriend(friendId){
	if(window.chat){
		chat.showAndAddFriendUi(friendId);
		chat.switchMessage(friendId);
	}else{
		alert("请先登陆");
	}
}