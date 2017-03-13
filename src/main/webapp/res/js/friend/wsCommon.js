/**
 * 
 */

function wsCommon() {

	/**
	 * 创建连接
	 */
	this.createWs = function(webSocketUrlPath, socketJsUrlPath) {
		var ws;
		if ('WebSocket' in window) {
			ws = new WebSocket(this.getUrl(webSocketUrlPath));
		} else {
			ws = new SockJS(this.getUrl(socketJsUrlPath), undefined, {
				protocols_whitelist : []
			})
		}
		return ws;
	}
	

	this.getUrl = function(urlPath,host,protocol) {
		var url = null;
		host=host|| window.location.host;
		protocol=protocol||window.location.protocol;
		if (protocol == 'http:') {
			url = 'ws://' +host + urlPath;
		} else {
			url = 'wss://' + host + urlPath;
		}
		return url;

	}

	/**
	 * 关闭连接
	 */
	this.disconnect = function(ws) {
		if (ws != null) {
			ws.close();
			ws = null;
		}
	}
}
