var SONGE = SONGE || {};

SONGE.View = SONGE.View || {};
SONGE.View.common = SONGE.View.common || {};

$(function() {
	$(".btn_gnb_menu").click(function() {
		$(".songe_gnb, .btn_gnb_menu").toggleClass("is-active");
	});
});
