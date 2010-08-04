/**
 * Slider.js version 1.0
 * @class Class to create interactive, but very simple slider.
 * @version 1.0 beta
 * @author matsukaze.
 * @example var myslider = new Slider();
 * @requires jQuery version 1.4 or later.
 * @constructor
 * @property {number} type Slider's direction, vertical(0) or horizontal(1).
 * @property {number} time Millisecond number for duration.
 * @property {number} width The width of slider.
 * @property {number} height The height of slider.
 */
var Slider = function(){};
Slider.prototype = {
	
	appName:"slider",
	type:0,
	time:500,
	
	slider:null,
	width:null,
	height:null,

	moving:false,
	
	/**
	 * Create new slider.
	 * @param {string} expr Selector expression passed to jQuery.
	 * @param {number} time Millisecond number for duration.
	 * @param {number} type Slider's direction, vertical(0) or horizontal(1).
	 * @returns Slider object.
	 * @type Slider
	 * @example var myslider = new Slider().create("#myslider", 500, 1);
	 */
	create:function( expr, time, type ){
		var obj = $(expr);
		
		this.type = ( typeof(type)!=="undefined" ) ? type : this.type ;
		this.time = time || 500;
		
		this.slider = obj.children("ul");
		this.width = obj.width();
		this.height = obj.height();
		
		this.slider.css({
			"listStyleType":"none",
			"margin":0,
			"padding":0
		});
		if ( type === 1 ){
			this.slider.width( this.slider.children("li").length * this.width );
		} else if ( type === 0 ){
			this.slider.width( this.width );
			this.slider.height( this.slider.children("li").length * this.height );
		}
		this.slider.children("li").css({
			"display":"block",
			"float":"left",
			"width":this.width+"px",
			"height":this.height+"px"
		});
		return this;
	},
	/**
	 * Move slider to next item.
	 * @example $("#button").click( $.proxy( myslider.next, myslider ) );
	 */
	next:function(){
		var obj = this;
		
		if( !this.moving ){
			this.moving = true;
			this.slider.animate({
				"marginLeft" : (this.type) ? - this.width : 0,
				"marginTop" : (this.type) ? 0 : - this.height
			}, this.time, function(){
				$($(this).children("li")[0]).appendTo(this);
				$(this).css({
					"marginLeft" : 0,
					"marginTop" : 0
				});
				obj.moving = false;
			});
		}
	},
	/**
	 * Move slider to previous item.
	 * @example $("#button").click( $.proxy( myslider.prev, myslider ) );
	 */
	prev:function(){
		var list = this.slider.children(),
			obj = this;
		
		if( !this.moving ){
			this.moving = true;
			this.slider.css({
				"marginLeft" : (this.type) ? - this.width : 0,
				"marginTop" : (this.type) ? 0 : - this.height
			});
			$(list[list.length-1]).prependTo(this.slider);
			this.slider.animate({
				"marginLeft" : 0,
				"marginTop" : 0
			}, this.time, function(){
				obj.moving = false;
			});
		}
	}
};
