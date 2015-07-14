(function($) {
	var preX;
	var preY;
	var tool;
	var canvas;
	var context;
	var imageData;
	var paint;
	var t = 0;

	$.fn.makeDrawable = function() {
		canvas = this[0];
		context = canvas.getContext("2d");
	
		$(canvas).mousedown(function(e) {
			preX = e.pageX - canvas.offsetLeft;
			preY = e.pageY - canvas.offsetTop;
			paint = true;
			
			if(tool == "eraser")
			{
				var size = 20;
				context.clearRect(preX - 10, preY - 10, size, size);
				
				imageData = context.getImageData(0, 0, canvas.width, canvas.height);
			}
			
			if(tool == "line" || tool == "rect" || tool == "circle")
			{
				imageData = context.getImageData(0, 0, canvas.width, canvas.height);
			}
		});
	
		$(canvas).mousemove(function(e) {
			var x = e.pageX - canvas.offsetLeft;
			var y = e.pageY - canvas.offsetTop;
			
			if(paint)
			{
				if(tool == "pen")
				{
					context.moveTo(preX,preY);
					context.lineTo(x,y);
					context.stroke();
					
					preX = x;
					preY = y;
				}
				else if(tool == "line")
				{
					canvas.width = canvas.width;
					context.putImageData(imageData,0,0);
					
					context.moveTo(preX,preY);
					context.lineTo(x,y);
					context.stroke();
				}
				else if(tool == "rect")
				{
					canvas.width = canvas.width;
					context.putImageData(imageData,0,0);
					
					var left, top;
					var width = Math.abs(x - preX);
					var height = Math.abs(y - preY);
					
					if(preX < x)
					{
						left = preX;
					}
					else if(x < preX)
					{
						left = x;
					}
					
					if(preY < y)
					{
						top = preY;
					}
					else if(y < preY)
					{
						top = y;
					}
					
					context.strokeRect(left, top, width, height);
				}
				else if(tool == "circle")
				{
					canvas.width = canvas.width;
					context.putImageData(imageData, 0, 0);
					
					var r;
					var cx = (preX + x) / 2;
					var cy = (preY + y) / 2;
					var dx = Math.abs(preX - x) / 2;
					var dy = Math.abs(preY - y) / 2;
					
					if(dx < dy)
					{
						r = dx;
						cx = (preX + x) / 2;
						
						if(preY < y)
							cy = preY + r;
						else
							cy = preY - r;
					}
					else
					{
						r = dy;
						cy = (preY + y) / 2;
						
						if(preX < x)
							cx = preX + r;
						else
							cx = preX - r;
					}
					
					context.beginPath();
					context.arc(cx, cy, r, 0, 2 * Math.PI);
					context.stroke();
				}
				else if(tool == "eraser")
				{
					var size = 20;
					context.clearRect(x - 10, y - 10, size, size);
					
					imageData = context.getImageData(0, 0, canvas.width, canvas.height);
				}
			}
			else
			{
				if(tool == "eraser")
				{
					canvas.width = canvas.width;
					context.putImageData(imageData,0,0);
					
					if(x > 0 && y > 0 && x < canvas.width && y < canvas.height)
					{
						var size = 20;
						context.strokeRect(x - 9, y - 9, size - 2, size - 2);
					}
				}
			}
		});
	
		$(canvas).mouseup(function(e) {
			var x = e.pageX - canvas.offsetLeft;
			var y = e.pageY - canvas.offsetTop;
			
			if(tool == "line")
			{
				context.moveTo(preX, preY);
				context.lineTo(x, y);
				context.stroke();
			}					
			else if(tool == "rect")
			{
				var left, top;
				var width = Math.abs(x - preX);
				var height = Math.abs(y - preY);
				
				if(preX < x)
				{
					left = preX;
				}
				else if(x < preX)
				{
					left = x;
				}
				
				if(preY < y)
				{
					top = preY;
				}
				else if(y < preY)
				{
					top = y;
				}
				
				context.strokeRect(left,top,width,height);
			}
			else if(tool == "circle")
			{
				var r;
				var cx = (preX + x) / 2;
				var cy = (preY + y) / 2;
				var dx = Math.abs(preX - x) / 2;
				var dy = Math.abs(preY - y) / 2;
				
				if(dx < dy)
				{
					r = dx;
					cx = (preX + x) / 2;
					
					if(preY < y)
						cy = preY + r;
					else
						cy = preY - r;
				}
				else
				{
					r = dy;
					cy = (preY + y) / 2;
					
					if(preX < x)
						cx = preX + r;
					else
						cx = preX - r;
				}
				
				context.beginPath();
				context.arc(cx, cy, r, 0, 2*Math.PI);
				context.stroke();
			}
			
			paint = false;
		});
	
		$(canvas).mouseenter(function(e) {
			if(tool == "eraser")
			{
				if(t == 0)
				{
					imageData = context.getImageData(0, 0, canvas.width, canvas.height);
					t = 1;
				}
			}
			else
				t = 0;
		});
	
		$(canvas).mouseleave(function(e) {
			window.onmouseup = function()
				{
					paint = false;
				}
		});
	
		return $(canvas);
	};

	$.fn.setTool = function(newTool) {
		tool = newTool;
		return $(canvas);
	}
	
	$.fn.clear = function() {
		canvas.width = canvas.width;				
		return $(canvas);
	}
})( jQuery );

function _id(id)
{
	return document.getElementById(id);
}

function New()
{
	var w = $("#width").val();
	var h = $("#height").val();
	
	canvas.width = w;
	canvas.height = h;
	
	$("#canvas").makeDrawable();
	$("#canvas").setTool("pen");
}

$(function(){
	$("#canvas").makeDrawable();
	$("#canvas").setTool("pen");
	
	$("#clear").click(function(){
		$("#canvas").clear();
	});
	
	$("#pen").change(function(){
		if(this.value)
			$("#canvas").setTool("pen");
	});
	
	$("#line").change(function(){
		if(this.value)
			$("#canvas").setTool("line");
	});
	
	$("#rect").change(function(){
		if(this.value)
			$("#canvas").setTool("rect");
	});
	
	$("#circle").change(function(){
		if(this.value)
			$("#canvas").setTool("circle");
	});
	
	$("#eraser").change(function(){
		if(this.value)
			$("#canvas").setTool("eraser");
	});
});