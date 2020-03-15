var Songe = Songe || {};

Songe.View = $.extend(
	{
		hasElement: function(el) {
			return $(el).length > 0;
		},
		getReady: function() {
			var dfReady = $.Deferred();

			$(document).ready(dfReady.resolve);

			return dfReady.promise();
		},
		wait: function(timeout) {
			var deferred = $.Deferred();
			setTimeout(deferred.resolve, timeout);
			return deferred.promise();
		}
	},
	Songe.util || {}
);

Songe.View.common = Songe.View.common || {};

Songe.View.common.ctrlItemList = {
	init: function() {
		this._assignElements();
		this._attachEventHandlers();
	},
	_assignElements: function() {
		this._elSortBox = $(".songe_sort_bx");
		this._elSortInner = this._elSortBox.find(".songe_sort_type");
		this._elSortBtn = this._elSortInner.find(".songe_sort_btn");
		this._elUnitBox = $(".songe_cunit_bx");
		this._elUnitList = this._elUnitBox.find(".songe_cunit_lst");
		this._elUnitItem = this._elUnitList.find(".songe_cunit_item");
		this._elUnitIdol = this._elUnitItem.find(".songe_cunit_idol em");
		this._elKeepBtn = this._elUnitItem.find("._js_btn_keep");
	},
	_attachEventHandlers: function() {
		this._elSortBtn.on("click", $.proxy(this._onClickSortBtn, this));
		this._elKeepBtn.on("click", $.proxy(this._onClickKeepBtn, this));
	},
	_onClickSortBtn: function(e) {
		var welTarget = $(e.currentTarget);

		this._ctrlSortBtn(welTarget);
		this._ctrlSortlList(welTarget);
	},
	_onClickKeepBtn: function(e) {
		var welTarget = $(e.currentTarget),
			welTargetText = welTarget.find("span");

		welTarget.toggleClass("on");

		if (welTarget.hasClass("on")) {
			welTargetText.text("상품 찜 해제");
		} else {
			welTargetText.text("상품 찜하기");
		}
	},
	_ctrlSortBtn: function(welTarget) {
		var welTargetParent = welTarget.parent(".songe_sort_type");

		if (welTargetParent.hasClass("ty_img")) {
			this._elSortInner.removeClass("ty_img").addClass("ty_list");
		} else {
			this._elSortInner.removeClass("ty_list").addClass("ty_img");
		}
	},
	_ctrlSortlList: function(welTarget) {
		var welTargetParent = welTarget.parent(".songe_sort_type");

		if (welTargetParent.hasClass("ty_img")) {
			this._elUnitList.removeClass("ty_list");
		} else {
			this._elUnitList.addClass("ty_list");
		}
	}
};

$(function() {
	Songe.View.common.ctrlItemList.init();

	$(".btn_gnb_menu").click(function() {
		$(".songe_gnb, .btn_gnb_menu").toggleClass("is-active");
	});
});
