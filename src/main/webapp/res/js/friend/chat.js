/**
 * 
 */

function chat(myid, base) {
	this.ws;
	this.base = base;
	this.myid = myid;
	this.chatiing = null;
	this.lastRemoveId = null;
	this.showCount = 0;
	this.chatFriends = {};
	this.chatMessages = {}

	this.verify = new verifyUtils();

	this.init = function(ws, chat) {
		this.ws = ws;
		ws.onmessage = function(event) {
			chat.readMessage(event.data);
		}
		this.initChatFriend(this.myid);
	}

	this.initChatFriend = function(uid) {
		var chat = this;
		if (!this.chatFriends[uid]) {
			var url = this.base + "/user/chatInfo.do";
			$.ajax({
				url : url,
				data : "uid=" + uid,
				async : false,
				success : function(data) {
					if (data.status == 0) {
						chat.chatFriends[uid] = data.content;
					}
				}
			});
		}
	}

	this.changeCount = function(c) {
		this.showCount += c;
		var txt = this.showCount > 0 ? "消息" + this.showCount : "消息"
		$("#a_msg_show").text(txt);
	}

	/**
	 * 收到消息
	 */
	this.readMessage = function(wsMessage) {
		var wsJson = JSON.parse(wsMessage);
		var chatMessage = wsJson.messageContext;
		// 存历史记录
		var saveId;
		if (chatMessage.formuserid == this.myid) {
			saveId = chatMessage.touserid;
		} else {
			saveId = chatMessage.formuserid;
		}

		if (this.chatMessages[saveId]) {
			this.chatMessages[saveId].push(chatMessage);
		} else {
			this.chatMessages[saveId] = [ chatMessage ];
			this.addFriendUI(saveId);
		}
		if (chatMessage.formuserid != this.myid && chatMessage.isreceive==0) {
			this.changeCount(+1);
		}

		// 正在聊 -显示 否则 提醒
		if (saveId == this.chatiing) {
			this.addChatUI(chatMessage);
		} else if(chatMessage.isreceive==0 && chatMessage.formuserid!=this.myid){
			$("#" + saveId).show();
		}
	}

	/**
	 * 切换消息
	 */
	this.switchMessage = function(uid) {
		if (this.chatiing == uid) {
			return;
		}
		if (this.lastRemoveId == uid) {
			return;
		}

		$("#" + uid).hide();
		$("#chat_content_history").empty();

		var chatMessages = this.chatMessages[uid];
		if (chatMessages) {
			for (var i = 0; i < chatMessages.length; i++) {
				this.addChatUI(chatMessages[i]);
			}
		}
		this.chatiing = uid
	}

	/**
	 * 回复服务器已接收消息
	 */
	this.receiveMessage = function(id) {
		this.changeCount(-1);
		var sMsg = {
			messageContext : {
				id : id,
			},
			messageType : "friendChatReceive"
		}
		ws.send(JSON.stringify(sMsg));
	}

	/**
	 * 发送聊天消息
	 */
	this.sendMessage = function() {
		if (!this.chatiing) {
			alert("未选择发送好友");
			return;
		}
		var msg = $("#txt_send").val()
		var error = this.verify.verify("notNull", msg, "请输入消息内容！");
		if (error) {
			alert(error);
			return;
		}
		chatMessage = {
			messagetxt : msg,
			touserid : this.chatiing
		}
		if (this.chatMessages[this.chatiing]) {
			this.chatMessages[this.chatiing].push(chatMessage);
		} else {
			this.chatMessages[this.chatiing] = [ chatMessage ];
		}

		var sMsg = {
			messageContext : chatMessage,
			messageType : "friendChat"
		}
		ws.send(JSON.stringify(sMsg));
		$("#txt_send").val("");
		chatMessage.formuserid = this.myid;
		this.addChatUI(chatMessage);
	}

	/**
	 * 添加聊天消息
	 */
	this.addChatUI = function(chatMessage) {
		var model = null;
		var args = [ this.chatFriends[chatMessage.formuserid].header,
				chatMessage.messagetxt ];
		if (chatMessage.formuserid == this.myid) {
			model = '<li class="mychat"><div><img src="{0}" class="chatimgr"><p class="chatpr">{1}</p></div></li>';
		} else {
			model = '<li class="otherchat"><div><img src="{0}" class="chatimgl"><p class="chatpl">{1}</p></div></li>';
		}
		var x = format(model, args);
		$("#chat_content_history").append(x);
		document.getElementById('div_chat_content_history').scrollTop = document
				.getElementById('div_chat_content_history').scrollHeight;
		if ( this.myid==chatMessage.touserid) {
			this.receiveMessage(chatMessage.id);
		}
	}

	/**
	 * 添加好友界面
	 */
	this.addFriendUI = function(friendId) {
		// $("#alert_chat").show();
		if (!friendId || this.myid==friendId) {
			return;
		}
		this.initChatFriend(friendId);

		if (!$("#li" + friendId).length) {
			var model = '<li id="li{0}" onclick="chat_handler(this,{1})">'
					+ '<img src="{2}" />'
					+ '<div class="nummention" id="{3}"></div>'
					+ '<span class="chatname">{4}</span>'
					+ '<div class="deletebtn" onclick="chat.deleteFriendUI({5})"></div>'
					+ '</li>';
			var x = format(model, [ friendId, friendId,
					this.chatFriends[friendId].header, friendId,
					this.chatFriends[friendId].lastname, friendId ]);
			
			$("#chat_friends").append(x);
		}
		
	}
	
	this.showAndAddFriendUi=function (friendId){
		this.addFriendUI(friendId);
		$("#alert_chat").show();
	}

	/**
	 * 删除聊天
	 */
	this.deleteFriendUI = function(friendId) {
		$("#li" + friendId).remove();
		this.lastRemoveId = friendId;
		if (friendId == this.chatiing) {
			this.chatiing = null;
			$("#chat_content_history").empty();
		}
		return;
	}

}