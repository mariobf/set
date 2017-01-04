var minDoc, MinDoc ;

MinDoc = (function () {
	var tag ={}, obj ={} , opt = {};
	var mSelf;
	var doc = document ;
	function MinDoc(){
		mSelf = this;
		/* 태그 세팅 */
		(function tagSet() {
			tag.intro = {}; /* 인트로 관련 테그 */
			tag.intro.wrap = doc.querySelector('#intro') ;
			tag.intro.title = tag.intro.wrap.querySelector('h1');
			tag.intro.ltter = tag.intro.wrap.querySelectorAll('.letter');
			tag.intro.desc = tag.intro.wrap.querySelector('.desc');
			tag.intro.boxBtn = tag.intro.wrap.querySelector('.boxBtn');
			tag.intro.btns = tag.intro.boxBtn.querySelectorAll('button');
			tag.intro.btnInner = tag.intro.boxBtn.querySelector(':scope > .inner');
			tag.intro.svg = tag.intro.boxBtn.querySelector('#introBtn') ;
			tag.intro.svgBtn = tag.intro.boxBtn.querySelector('.path');

			tag.svg={};
			tag.svg.bg = doc.querySelector('#bg');

			tag.container = doc.querySelector('.container');
			tag.resume = {};
			tag.selfIntro = {} ;
			tag.career = {} ;
			tag.portfolio = {} ;
			tag.study = {} ;

			tag.resume.wrap = tag.container.querySelector('.resume');

			tag.selfIntro.wrap = tag.container.querySelector('.selfIntro');
			tag.selfIntro.bg = tag.selfIntro.wrap.querySelector('.bgMove .inner');
			tag.selfIntro.boxCol = tag.selfIntro.wrap.querySelector('.colBox');
			tag.selfIntro.btns = tag.selfIntro.boxCol.querySelectorAll(':scope > div') ;

			tag.career.wrap = tag.container.querySelector('.career');
			tag.portfolio.wrap = tag.container.querySelector('.portfolio');
			tag.study.wrap = tag.container.querySelector('.study');
		}());

		/* 태그 세팅 */
		(function optSet() {
			opt.bgRect = {};
			opt.bgRect.num = 20 ;
			opt.bgRect.maxSize = 200 ;

			opt.evt = {};
			opt.evt.transition = ['webkitTransitionEnd'];
			opt.evt.animationStart = ['animationstart'];
		}());

		(function initSet() {
			introArea(); // 인트로 관련 함수 호츨
			bgRectFunc(); // 배경 사격형 함수 호출
			selfIntroFunc() ;
		}());
	}

	/* 인트로 타이틀 함수 */
	function introArea(){
		var XYZ = [0,0,0];
		[].forEach.call(tag.intro.ltter , function( elm , idx ){
			XYZ.forEach(function( vElm , vIdx ){
				XYZ[vIdx] = randomVal(250) * sortNaPoNum() ;
			});
			elm.style.cssText = ' transform:translate3d('+ XYZ[0] + 'px,'+ XYZ[1] +'px,' + XYZ[0] + 'px);' ;
			if( tag.intro.ltter.length -1  ==  idx ){ /* 문자 마지막 일경우 움직임 함수 조건 */
				timingSet(aniMove , 1000);
				adEvtFun(elm,opt.evt.transition, titEnd);
			}
			function aniMove(){
				tag.intro.title.classList.add('txtAling') ;
			}
			function titEnd(e){
				if(e.propertyName == 'transform'){
					tag.intro.desc.classList.add('active');
				}
			}
		});
		mSelf.addActive(tag.intro.desc , tag.intro.svgBtn , opt.evt.transition);
		mSelf.addActive(tag.intro.svgBtn , tag.intro.btnInner , opt.evt.animationStart);
		[].forEach.call(tag.intro.btns , function ( elm , idx ) {
			// svg border 비활성화 조건
			if( idx == 0 ){
				mSelf.addActive(tag.intro.btns[idx] , tag.intro.svg , opt.evt.transition , 'disabled');
			}
			elm.addEventListener('click' , function(){
				if( idx == 0 ){
					tag.resume.wrap.classList.add('active')
				} else if( idx == 1){

				} else if( idx == 2){

				} else if( idx == 3){

				} else if( idx == 4){

				}
				btnClick() ;
			});
		});
		mSelf.addActive(tag.intro.svgBtn , tag.intro.btnInner , opt.evt.animationStart);

		function btnClick(){
			doc.body.classList.add('subPages');
		}

	}

	/* 자깃 소개서 배경 */
	function selfIntroFunc(){
		function bgMoveFunc() {
			var prevX = 0;
			var prevY = 0;
			var posX = "-50%";
			var posY = "-50%";
			var movedUp = false;
			var movedLeft = false;

			// 이벤트
			tag.selfIntro.wrap.addEventListener('mouseover',function( e ) {
				prevX = e.pageX;
				prevY = e.pageY;
			});

			tag.selfIntro.wrap.addEventListener('mousemove' , function( e ) {
				moveBg(e);
			});

			tag.selfIntro.wrap.addEventListener('click' , function( e ) {
				tag.selfIntro.boxCol.classList.add('active');
			});

			// 백그라운드 효과
			function moveBg( e ) {

				movedLeft = (prevX > e.pageX) ? true : false;
				movedUp = (prevY > e.pageY) ? true : false;

				posX = (movedLeft) ? "-47%" : "-53%";
				posY = (movedUp) ? "-47%" : "-53%";

				tag.selfIntro.bg.style.cssText = "-webkit-transform:translate("+ posX + ","+posY+")";

				prevX = e.pageX;
				prevY = e.pageY;
			}
		}
		bgMoveFunc();

		[].forEach.call(tag.selfIntro.btns , function( bElm, bIdx ){
			bElm.addEventListener('click' , function(e){
				if( tag.selfIntro.boxCol.classList.contains('viewTxt') ){
					tag.selfIntro.boxCol.classList.remove('viewTxt')
					bElm.classList.remove('active');
					return ;
				}
				var prevActive = tag.selfIntro.boxCol.querySelector(':scope > .active');
				bElm.querySelector('dl').style.width = tag.selfIntro.boxCol.offsetWidth + 'px';
				tag.selfIntro.boxCol.classList.add('se' + (bIdx + 1) );
				tag.selfIntro.boxCol.classList.add('viewTxt');
				if(prevActive != null){
					tag.selfIntro.boxCol.querySelector(':scope > .active').classList.remove('active');
				}



				bElm.classList.add('active');

				// }
			}, false);
		});
	}
	function starBtn() {
		console.log('yahoo')
	}

	/* 타이밍 관련 함수 */
	function timingSet ( _func , _during){
		setTimeout(function(){
			_func();
		},_during)
	}

	/* 음수 양수 설정 함수 */
	function sortNaPoNum() {
		var val ;
		switch( randomVal(2) ){
			case 1 :  val = -1 ;
			break ;
			case 2 :  val = 1 ;
			break ;
			default: ;
		}
		return val ;
	}

	/* 랜덤 값 호출 함수 */
	function randomVal ( _limited , _unit ){
		var val = Math.floor(Math.random() * _limited ) + 1;
		return val;
	}

	/* Dom 생성 함수 */
	function domCreate( _elm ){
		return doc.createElement(_elm);
	}

	/* Dom 생성 함수 */
	function domCreateNs( _elm ){
		return doc.createElementNS("http://www.w3.org/2000/svg" , _elm);
	}

	/* 배경 관련 SVG 사각형 함수 */
	function bgRectFunc() {
		var i = 0,
		rect ,
		size,
		leftPos ,
		delay = [0,2,4,6,8,10] ,
		num;
		// opt.bgRect.num
		for(;30 > i ; i+=1){
			size = randomVal(100);
			leftPos = randomVal(98);
			num  = randomVal(6) ;
			rect = domCreateNs('rect');
			rect.setAttribute('width' , size );
			rect.setAttribute('height' , size );
			rect.setAttribute('x' , leftPos + '%' );
			rect.style.cssText= 'fill:rgb(255,255,255); opacity:0.15; transform: translateY('+ (window.innerHeight ) +'px);animation-delay:'+ delay[num] +'s;' ;
			tag.svg.bg.appendChild(rect) ;
		}
	}
	function adEvtFun( _elm , _evt , _callBack) {
		[].forEach.call(_evt, function(  ){
			_elm.addEventListener(_evt , function(e){
				_callBack(e);
			})
		});
	}
	MinDoc.prototype.addActive = function( eElm , tarElm , evt , _class  ){
		var self = this,
			classNm = _class || 'active'
		self.callBackFunc = function(){
			tarElm.classList.add(classNm);
		};
		adEvtFun(eElm ,evt, self.callBackFunc);
	};

	return MinDoc ;
}());



window.addEventListener('load' , function(){
	minDoc = new MinDoc;

	document.addEventListener('scroll' , function(e){


	})
});
