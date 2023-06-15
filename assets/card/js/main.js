var mouse = {x: 0, y: 0};
var showcasePos = 0;
var showcaseCount = 20;

var cardGap = 100;
var cardWidth = 500;
var padding = 20;
var touch = false;
var mobile = false;

var pageReady = true;

var current = '';

var root = '';
// var root = '/beta/world2/';


$(document).ready(function(){
	if ("ontouchstart" in document.documentElement){
		touch = true;
		$("body").addClass('touch');
	}
	if(window.innerWidth < 900){
		mobile = true;
	}
	if(window.innerHeight < 900){
		cardWidth = 400;
	}
	if(window.innerHeight < 750){
		cardWidth = 300;
	}
	if(showcaseCount > $(".showcase--cards .card").length){
		showcaseCount = $(".showcase--cards .card").length;
	}


	listeners();
	showcaseOffset();
	requestAnimationFrame(anim);
	$(window).resize(resizeHandler);
});


function listeners(){
	var loadCount = 0;
	$(".showcase--cards .card img").one('load', function(){
		loadCount++;
		console.log(loadCount);
		if(loadCount == $(".showcase--cards .card").length){
			pageHandler('showcase');
		}
	}).each(function() {
	  if(this.complete) {
	      $(this).trigger('load');
	  }
	});

	$(".button--submit").click(function(){
		pageReady = false;
		var img = $(".card--wrapper img").attr('src');
		var text = $(".card--wrapper .card--text span").text();

		$.ajax({
			type: 'post',
			url: root + 'function/addCard.php',
			data: "card_text=" + text + "&card_img=" + img,
			success: function (response) {
				var id = response;
				cardToCanvas('save', id);
				$(".button--submit").removeClass('active');
				setTimeout(function(){
					$(".button--submitted").addClass('active');
				}, 500);
				setTimeout(function(){
					$(".button--submitted").removeClass('active');
				}, 2500);
				setTimeout(function(){
					$(".button--gallery.button--main").addClass('active');
					pageReady = true;
				}, 3000);
			}
		});
	});

	$(".card--new").click(function(){
		if(pageReady){
			pageReady = false;
			if($(".card--wrapper .card").length > 0){
				$(".card--options").removeClass('active');
				$(".button--main").removeClass('active');
				clearCard();
				setTimeout(function(){
					loadCard();
				}, 500);
			} else {
				loadCard();
			}
		}
		
	});	

	$(".card--download").click(function(){
		cardToCanvas('download');
	});


	$(".button--submit--contribute").click(function(){
		pageReady = false;
		var t = $(".contribute textarea").val();
		if(t != ''){
			$.ajax({
				type: 'post',
				url: root + 'function/addText.php',
				data: 'card_text=' + t,
				success: function (response) {
					console.log(response);
					$(".button--submit--contribute").removeClass('active');
					setTimeout(function(){
						$(".button--submitted").addClass('active');
					}, 500);
					setTimeout(function(){
						$(".button--submitted").removeClass('active');
						clearContribute();
					}, 2500);
					setTimeout(function(){
						loadContribute();
					}, 3000);
					setTimeout(function(){
						$(".contribute--box").removeClass('load');
						$(".button--submit--contribute").addClass('active');
						pageReady = true;
					}, 3500);
				}
			});
		}
	});


	$(".button--info").click(function(){
		infoHandler();
	});
	$(".info--close").click(function(){
		infoHandler();
	});

	$(".button--recieve").click(function(){
		recieveHandler();
	});
	$(".recieve--close").click(function(){
		recieveHandler();
	});

	$(".blur--panel").click(function(){
		$("body").removeClass('info--open recieve--open');
	});

	$(".home--title").click(function(e){
		e.preventDefault();
		if(pageReady){
			pageHandler('showcase');
		}
	});
	$(".button--generate, .button--generate--small").click(function(){
		if(pageReady){
			pageHandler('generate');
		}
	});
	$(".button--contribute").click(function(){
		if(pageReady){
			pageHandler('contribute');
		}
	});
	$(".button--gallery").click(function(){
		if(pageReady){
			pageHandler('gallery');
		}
	});

	$(".viewer").mousedown(function(e){
		if($(e.target).parents('.card--options').length == 0){
			closeViewer();
		}
	});

	$(".button--menu").click(function(){
		menuHandler();
	});

	$(".recieve--submit").click(function(){
		var error = false;
		$(".recieve--form input").each(function(){
			if($(this).val() == ''){
				$(this).addClass('error');
				error = true;
			} else {
				$(this).removeClass('error');
			}
		});
		if(!error){
			$.ajax({
				type: 'post',
				url: root + 'function/addDetails.php',
				data: $(".recieve--form").serialize(),
				success: function (response) {
					// var id = response;
					$(".recieve--submit").removeClass('active');
					setTimeout(function(){
						$(".recieve--submitted").addClass('active');
					}, 500);
					setTimeout(function(){
						$(".recieve--submitted").removeClass('active');
					}, 2500);
					setTimeout(function(){
						$(".recieve--form")[0].reset();
						$(".recieve--submit").addClass('active');
					}, 3000);
				}
			});
		}
	});

	$("body").mousemove(function(e){
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});
}


function showcaseOffset(){
	if(!touch){
		$(".showcase--cards .card").each(function(i){
			var index = (showcaseCount - 1) - i;
			var offset = (cardGap * index);
			$(this).css({'left': offset + 'px'});
		});
	} else {

	}
}


function infoHandler(){
	if($("body").hasClass('info--open')){
		$("body").removeClass('info--open');
	} else {
		$("body").addClass('info--open');
	}
}

function recieveHandler(){
	if($("body").hasClass('recieve--open')){
		$("body").removeClass('recieve--open');
	} else {
		$("body").addClass('recieve--open');
	}
}

function pageHandler(dest){

	if(dest != current){

		pageReady = false;

		current = dest;
		$("body").removeClass('menu--open');

		$(".page.active").addClass('hide').removeClass('active');
		setTimeout(function(){
			$(".page.hide").removeClass('hide');
		}, 500);
		
		if(dest == 'showcase'){
			$(".showcase").addClass('active');
			setTimeout(function(){
				pageReady = true;
			}, 500);
		}

		if(dest == 'generate'){
			$(".generate").addClass('active');
			$(".button--generate--small").removeClass('active');
			$(".button--main").removeClass('active');
			$(".card--options").removeClass('active');
			$(".button--generate").removeClass('active');
			loadCard();
			setTimeout(function(){
				$(".button--contribute").removeClass('hide');
			}, 500);
		}

		if(dest == 'gallery'){
			loadGallery();
			$(".gallery").addClass('active');
			setTimeout(function(){
				pageReady = true;
			}, 500);
		}

		if(dest == 'contribute'){
			loadContribute();
			$(".contribute").addClass('active');
			$(".button--contribute").addClass('hide');
			$(".button--generate, .button--submit, .button--gallery").removeClass('active');
			setTimeout(function(){
				$(".button--submit--contribute").addClass('active');
				$(".contribute--box").removeClass('load');
				$(".button--generate--small").addClass('active');
			}, 500);
			setTimeout(function(){
				pageReady = true;
			}, 500);
		}

		if(dest != 'contribute' && dest != 'generate'){
			if(!$(".button--generate").hasClass('active')){
				$(".button--generate--small").removeClass('active');
				$(".button--main").removeClass('active');
				setTimeout(function(){
					$(".button--generate").addClass('active');
					$(".button--contribute").removeClass('hide');
				}, 500);
			}
		}

	}
}

function menuHandler(){
	if($("body").hasClass('menu--open')){
		$("body").removeClass('menu--open');
	} else {
		$("body").addClass('menu--open');
	}
}



function loadGallery(){
	$(".gallery").load(root + 'function/getGallery.php', function(){
		$(".gallery .card").mousedown(function(){
			if(pageReady){
				openViewer($(this));
			}
		});
	});
}
function openViewer(card){
	pageReady = false;
	setTimeout(function(){
		pageReady = true;
	}, 500);
	$("body").addClass('viewer--open');
	var clone = card.clone();
	var clone2 = card.clone();
	clone.removeClass('card--small');
	$(".card--render").html(clone);
	clone2.removeClass('card--small').addClass('align--center');
	$(".viewer").append(clone2);
}
function closeViewer(){
	pageReady = false;
	$("body").removeClass('viewer--open');
	setTimeout(function(){
		$(".viewer .card").remove();
		pageReady = true;
	}, 500);
}



function loadContribute(){
	$(".contribute--box").load(root + 'function/getContribute.php', function(){
		textareaHeight($(".contribute textarea")[0]);
	});
}

function clearContribute(){
	$(".contribute--box").addClass('load');
}

function textareaHeight(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

function loadCard(){
	$(".card--wrapper").load(root + 'function/newCard.php', function(){
		var card = $(".card--wrapper .card").clone();
		$(".card--render").html(card);
		$(".card--render .card").removeClass('load flip');
		setTimeout(function(){
			$(".card--wrapper .card").removeClass('load');
		}, 500);

		setTimeout(function(){
			$(".card--wrapper .card").removeClass('flip');
		}, 1750);

		setTimeout(function(){
			$(".card--options").addClass('active');
			$(".button--submit").addClass('active');
			pageReady = true;
		}, 2250);
	});
}

function clearCard(){
	$(".button--submit").removeClass('active');
	var card = $(".card--wrapper .card");
	card.addClass('remove');
	setTimeout(function(){
		card.remove();
	}, 1000);
}

function cardToCanvas(dest, id){
	canvasSize();
	html2canvas($(".card--render .card")[0], {
	    backgroundColor: null,
	    canvas: $(".card--canvas")[0],
	    scale: 1
	}).then(function(){
		if(dest == 'download'){
			cardDownload();
		}
		if(dest == 'save'){
			saveCard(id);
		}
	});
}

function saveCard(id){
	var canvas = $(".card--canvas")[0];
	var dataUrl = canvas.toDataURL("image/png");
	$.ajax({ 
	    type: "POST", 
	    url: './function/saveCard.php',
	    dataType: 'text',
	    data: {
	        base64data : dataUrl,
	        id : id
	    },
	    success: function (response) {
			console.log(response);
		}
	});
}

function cardDownload(){
	var canvas = $(".card--canvas")[0];
    var link = document.createElement('a');
	link.download = 'world_2.png';
	link.href = canvas.toDataURL("image/png");
	link.click();
}

function canvasSize(){
	var canvas = $(".card--canvas")[0];
	canvas.width = $(".card--render .card").outerWidth();
	canvas.height = $(".card--render .card").outerHeight();
}




function anim(){
	requestAnimationFrame(anim);

	if(!touch){
		var pos = (mouse.x / window.innerWidth) * 1.4 - 0.2;
		if(pos > 1){
			pos = 1;
		}
		if(pos < 0){
			pos = 0;
		}
		var index = Math.round(pos * (showcaseCount - 1));
		$(".showcase--cards .card").each(function(i){
			if((showcaseCount - 1) - i < index){
				$(this).addClass('push');
			} else {
				$(this).removeClass('push');
			}
		});
		var edge = 100;
		if(mobile){
			edge = 30;
		}
		var g = (((cardGap * (showcaseCount - 1)) + cardWidth) - window.innerWidth + (padding * 2) + edge * 2) / (showcaseCount - 1);
		var offset = edge - (index * g);
		showcasePos += (offset - showcasePos) / 10;
		$(".showcase--cards").css({'transform': 'translate(' + showcasePos + 'px, 0px)'})
	} else {
		var pos = ($(".showcase").scrollLeft() / ($(".showcase--cards").outerWidth() - window.innerWidth)) * 1 - 0;
		if(pos > 1){
			pos = 1;
		}
		if(pos < 0){
			pos = 0;
		}
		var index = Math.round(pos * (showcaseCount - 1));
		$(".showcase--cards .card").each(function(i){
			if((showcaseCount - 1) - i < index){
				$(this).addClass('push');
			} else {
				$(this).removeClass('push');
			}
		});
	}

}


function resizeHandler(){
	if(window.innerWidth < 900){
		mobile = true;
	} else {
		mobile = false;
	}
	if(window.innerHeight >= 900){
		cardWidth = 500;
	}
	if(window.innerHeight < 900){
		cardWidth = 400;
	}
	if(window.innerHeight < 750){
		cardWidth = 300;
	}
}

function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: 'image/png'});
}
