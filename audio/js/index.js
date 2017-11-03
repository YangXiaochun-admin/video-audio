const audio = document.querySelector("#music");
//获取audio
const playBtn = document.querySelector(".play");
//获取播放按钮
const times = document.querySelector(".times");
//获取歌曲时长
const processActive = document.querySelector(".process-active");
//获取进度条
const processBottom = document.querySelector(".process-bottom");

//获取音量
const voiceProgress = document.querySelector(".volume-process") ;
//获取音量进度
const voiceProgressActive = document.querySelector(".volume-process-active");
//获取音量按钮
const voiceBtn = document.querySelector(".volume-btn");



// 一、播放暂停
playBtn.onclick = function () {
	if(audio.paused){
		//paused属性 设置或返回音频是否暂停
		audio.play();
		//play() 开始播放音频
	}else{
		audio.pause();
		//pause()	暂停当前播放的音频
	}
}

// 播放按钮状态显示
audio.onplay = function () {
	playBtn.classList = "play paused";
}
audio.onpause = function () {
	playBtn.classList = "play";
}


//二、歌曲时长
function formatTime (time) {
	//格式化时间
	let m = Math.floor(time / 60);
	let s = Math.floor(time % 60);
	m = m>9?m:"0"+m;
	s = s>9?s:"0"+s;
	let t = m + ":" + s;
	return t;
}
 
audio.oncanplay = function () {
	//canplay() 当浏览器可以播放音频时
	times.innerText = "00:00 /" + formatTime(audio.duration);
	//duration属性 返回当前音频的长度（以秒计）
}

//三、歌曲进度条以及当前播放时间
audio.ontimeupdate = function () {
	//timeupdate() 当目前的播放位置已更改时
	times.innerText = formatTime(audio.currentTime) + "/" + formatTime(audio.duration);
	//currentTime属性 设置或返回音频中的当前播放位置（以秒计）
	let ratio = (audio.currentTime/audio.duration*100).toFixed(6) + "%";
	processActive.style.width = ratio;
}

//四、控制进度条
processBottom.onmousedown = function (e) {
	var event = window.event || e;
	//e 保存了当前事件的信息
	let Width = processBottom.offsetWidth;
	let propor = event.offsetX / Width;
	//event.offsetX 相对于原来的位置
	//1、进度条位置变化
	processActive.style.width = propor*100 + "%";
	//2、播放时间变化
	audio.currentTime = audio.duration * propor;
	document.onmousemove = function (e) {
		var event = window.event || e;
		let Width = processBottom.offsetWidth;
		let X = event.clientX-processBottom.offsetLeft;
		//event.clientX 相对于可视窗口
		//边界判断
		X = X<0?0:X;
		X = X>Width?Width:X;
		let  propor = X / Width;
		//1、进度条位置变化
		processActive.style.width = propor*100 + "%";
		//2、播放时间变化
		audio.currentTime = audio.duration * propor;

	}
	document.onmouseup = function () {
		document.onmousemove=null;
        document.onmouseup=null;
	}
	
}

//五、音量进度条
voiceProgress.onmousedown = function (e) {
	var event = window.event || e;
	//e 保存了当前事件的信息
	let Width = voiceProgress.offsetWidth;
	let propor = event.offsetX / Width;
	//event.offsetX 相对于原来的位置
	//1、进度条位置变化
	voiceProgressActive.style.width = propor*100 + "%";
	//2、音量变化
	audio.volume = propor;
	document.onmousemove = function (e) {
		var event = window.event || e;
		let Width = voiceProgress.offsetWidth;
		let X = event.clientX-voiceProgress.offsetLeft;
		//event.clientX 相对于可视窗口
		//边界判断
		X = X<0?0:X;
		X = X>Width?Width:X;
		let  propor = X / Width;
		//1、进度条位置变化
		voiceProgressActive.style.width = propor*100 + "%";
		//2、音量变化
		audio.volume = propor;

	}
	document.onmouseup = function () {
		document.onmousemove=null;
        document.onmouseup=null;
	}
	
}

//六、静音
var voiceNum = audio.volume;
audio.onvolumechange = function () {
	if(audio.volume == 0){
		voiceBtn.classList = "volume-btn silence";
	}else{
		voiceBtn.classList = "volume-btn";
		voiceNum = audio.volume;
	}
}
voiceBtn.onclick=function(){
    if(audio.volume==0){
        audio.volume=voiceNum
    }else{
        audio.volume=0;
    }
}