var POWER_TIMEOUT = 750;
var POWER_SWITCH_ANIMATION_DURATION = 100;
var BOOT_ON_PAGELOAD = true;

var power = 0;
var powerSwitchTimeoutReached = false;

var pressDownEvent = "mousedown"
var pressReleaseEvent = "mouseup"

function loadSounds() {
	var clickOnSound = document.createElement('audio');
    clickOnSound.setAttribute('src', 'sounds/iPodClickOn.wav');
    var clickOffSound = document.createElement('audio');
    clickOffSound.setAttribute('src', 'sounds/iPodClickOff.wav');
}

function loadMusic() {
	song = document.createElement('audio');
    song.setAttribute('src', 'songs/masks.wav');
}

function resizeWheel() {
	wheelContainerWidth = $("#wheelContainer").width();
	wheelContainerHeight = $("#wheelContainer").height();

	wheelSize = Math.min(wheelContainerWidth, wheelContainerHeight);
	$("#wheel").css("width", wheelSize);
	$("#wheel").css("height", wheelSize);
}

function powerSwitch() {
	if (power == 0) {
		turnOniPod();
	} else {
		turnOffiPod();
	}
}

function turnOniPod() {
	$("#screenOverlay").fadeOut(POWER_SWITCH_ANIMATION_DURATION);
	power = 1;
}

function turnOffiPod() {
	pauseSong();
	$("#screenOverlay").fadeIn(POWER_SWITCH_ANIMATION_DURATION);
	power = 0;
}

function playPauseSong() {
	if (song.paused) {
       playSong();
    }   
    else {
       pauseSong()
    }
}

function pauseSong() {
	song.pause();
}

function playSong() {
	song.play();
}

$(document).ready(function(){
	resizeWheel();
	$("#overlay").fadeOut();
	loadSounds();
	loadMusic();
	if (BOOT_ON_PAGELOAD) turnOniPod();

	var clickOnSound = document.createElement('audio');
    clickOnSound.setAttribute('src', 'sounds/iPodClickOn.wav');
    var clickOffSound = document.createElement('audio');
    clickOffSound.setAttribute('src', 'sounds/iPodClickOff.wav');

    $("#play").bind(pressDownEvent, function() {
    	timeout = setTimeout(function () {
			powerSwitchTimeoutReached = true;
			powerSwitch();
		}, POWER_TIMEOUT);
    }).bind(pressReleaseEvent, function() {
    	if (powerSwitchTimeoutReached == false && power == 1) {
    		playPauseSong();
    	}
    	powerSwitchTimeoutReached = false;
		clearTimeout(timeout);
    });

    $("#next").bind(pressDownEvent, function() {
    	
    }).bind(pressReleaseEvent, function() {
    	
    });

    $("#previous").bind(pressDownEvent, function() {
    	
    }).bind(pressReleaseEvent, function() {

    });

    $("#menu").bind(pressDownEvent, function() {
    	
    }).bind(pressReleaseEvent, function() {

    });

    $("#select").bind(pressDownEvent, function() {
    	
    }).bind(pressReleaseEvent, function() {

    });

	$(".button").bind(pressDownEvent, function() {
		clickOnSound.play();
		$(this).css("background", "#a10000");
	}).bind(pressReleaseEvent, function() {
		clickOffSound.play();
		$(this).css("background", "white");
	});

	$(window).resize(function() {
		resizeWheel();
	});
});



