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
		this._setDisabledBtn();
	},
	_assignElements: function() {
		this._elSortBox = $("._js_sort_bx");
		this._elSortInner = this._elSortBox.find(".songe_sort_type");
		this._elSortBtn = this._elSortBox.find(".songe_sort_btn");
		this._elUnitList = $("._js_unit_lst");
		this._elUnitItem = this._elUnitList.find("._js_unit_item");
		this._elUnitIdol = this._elUnitItem.find(".songe_cunit_idol em");
		this._elKeepBtn = this._elUnitItem.find("._js_btn_keep");
	},
	_attachEventHandlers: function() {
		this._elSortBtn.on("click", $.proxy(this._onClickSortBtn, this));
		this._elKeepBtn.on("click", $.proxy(this._onClickKeepBtn, this));
	},
	_setDisabledBtn: function() {
		this._elUnitItem.each(function(i, el) {
			var welItem = $(el),
				welItemBtn = welItem.find("._js_btn_keep");

			if (welItem.hasClass("cunit_soldout")) {
				welItemBtn.attr("disabled", "disabled");
			}
		});
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
	_onClickSortBtn: function(e) {
		var welTarget = $(e.currentTarget);

		this._ctrlSortBtn(welTarget);
		this._ctrlSortlList(welTarget);
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

Songe.View.common.ctrlAttachList = {
	init: function() {
		this._assignElements();
		this._assignComponents();
		this._setControlImage();
	},
	_assignElements: function() {
		this._welAttachListWrap = $(".songe_attach_bx");
		this._welAttachList = this._welAttachListWrap.find(".songe_attach_lst");
		this._welAttachItem = this._welAttachList.find("> li");
		this._welAttachBtn = this._welAttachList.find(".songe_atch");
	},
	_assignComponents: function() {
		var oSelf = this;
		this._welAttachItem.each(function(i, el) {
			var welTarget = $(el),
				welAttachBtn = welTarget.find(".songe_atch input");

			welAttachBtn.on("change", function(e) {
				e.preventDefault();
				var welTargetBtn = $(e.currentTarget);

				oSelf._changeImageUrl(welTargetBtn);
			});
		});

		this._ctrlBtnFocus();
	},
	_ctrlBtnFocus: function() {
		this._welAttachItem.each(function(i, el) {
			var welTarget = $(el),
				welAttachBtn = welTarget.find(".songe_atch input");

			welAttachBtn.on("focus", function(e) {
				var welTargetBtn = $(e.currentTarget),
					welTargetParent = welTargetBtn.closest(".songe_atch");

				welTargetParent.addClass("focus");
			});

			welAttachBtn.on("focusout", function(e) {
				var welTargetBtn = $(e.currentTarget),
					welTargetParent = welTargetBtn.closest(".songe_atch");

				welTargetParent.removeClass("focus");
			});
		});
	},
	_setControlImage: function() {
		this._welAttachItem.each(function(i, el) {
			var welItem = $(el),
				welItemIndex = welItem.index(),
				welItemBtn = welItem.find(".songe_atch input");

			welItemBtn.after('<img src="" alt="" id="attach_file' + welItemIndex + '">');
		});
	},
	_changeImageUrl: function(welBtn) {
		var welTarget = welBtn,
			welTargetInput = welTarget.find("input"),
			welTargetImg = welTarget.find("img");
		console.log("on");
		// welTargetImg.addClass("on");
	}
};

Songe.View.common.ctrlToggleList = {
	init: function() {
		this._assignElements();
		this._assignComponents();
		this._setControlIndex();
	},
	_assignElements: function() {
		this._welFaqListWrap = $(".songe_toggle_bx");
		this._welFaqListIndex = this._welFaqListWrap.index();
		this._welFaqList = this._welFaqListWrap.find(".songe_toggle_lst");
		this._welFaqItem = this._welFaqList.find("> li");
		this._welTotalItem = $(".songe_toggle_lst").index();
	},
	_assignComponents: function() {
		var oSelf = this;
		this._welFaqItem.each(function(i, el) {
			var welTarget = $(el),
				welFaqBtn = welTarget.find(".songe_toggle_btn");

			welFaqBtn.on("click", function(e) {
				e.preventDefault();
				var welTarget = $(e.currentTarget);

				oSelf._controlExpand(welTarget);
			});
		});
	},
	_setControlIndex: function() {
		this._welFaqItem.each(function(i, el) {
			var welItem = $(el),
				welTotalIndex = i,
				welItemBtn = welItem.find(".songe_toggle_btn"),
				welItemContent = welItem.find(".songe_toggle_cont");

			welItemBtn.attr({
				"aria-controls": "toggle_cont" + welTotalIndex,
				"aria-expanded": "false"
			});
			welItemContent.attr("id", "toggle_cont" + welTotalIndex);
		});
	},
	_controlExpand: function(welTarget) {
		var welTargetCont = welTarget.siblings(".songe_toggle_cont"),
			welTargetText = welTarget.find(".blind");

		welTargetCont.toggle();

		if (welTarget.attr("aria-expanded") == "false") {
			welTarget.attr("aria-expanded", "true");
			welTargetText.html("접기");
		} else {
			welTarget.attr("aria-expanded", "false");
			welTargetText.html("펼치기");
		}
	}
};

$(function() {
	Songe.View.common.ctrlItemList.init();
	Songe.View.common.ctrlAttachList.init();
	Songe.View.common.ctrlToggleList.init();

	$(".btn_gnb_menu").click(function() {
		$(".songe_gnb, .btn_gnb_menu").toggleClass("is-active");
	});

	$(".songe_btn_like").click(function() {
		var welTargetText = $(this).find(".blind");
		$(this).toggleClass("on");

		if ($(this).hasClass("on")) {
			welTargetText.text("게시글 좋아요 취소");
		} else {
			welTargetText.text("게시글 좋아요");
		}
	});

	$(".ranking_btn").click(function() {
		$(this).addClass("on");
	});
});
