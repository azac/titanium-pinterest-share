function pinterestShare(shared) {

	var win = Ti.UI.createWindow({
		barColor: '#000'
	});

	var textToShare = encodeURIComponent(shared.description);
	var urlToShare = encodeURIComponent(shared.link);
	var imgToShare = encodeURIComponent(shared.image);

	var webView = Ti.UI.createWebView({
		url: 'http://pinterest.com/pin/create/button/?url=' + urlToShare + '&media=' + imgToShare + "&description=" + textToShare
	});

	win.add(webView);

	var close = Ti.UI.createButton({
		title: 'Close'
	});

	close.addEventListener('click', function() {
		win.close();
	});

	win.open({
		modal: true
	});

	// following evalJS changes pinterest website to make it readable on mobile
	// screen

	webView.addEventListener('load', function(e) {

		var content = webView.evalJS("document.head.innerHTML = document.head.innerHTML.replace('{width: 550px; margin: 40px auto;}','{width: 320px; margin: 40px auto;} .PinForm {padding-left:10px;margin-top:20px;width:300px;margin-left: 0px;float: left;} ImagePicker .Images {width:280px} .BoardList {width:300px}');");

		if (Ti.Platform.osname !== "android") {

			win.showNavBar();
			win.setLeftNavButton(close);

		}

		if (e.source.getHtml().indexOf("Your pin was pinned") !== -1) {

			win.close();

			alert("Shared to Pinterest!");

		}

	});

	webView.addEventListener('error', function(e) {
		win.close();
	});

}

module.exports = pinterestShare;
