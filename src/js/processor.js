/** 
 * author: Juexin Wang
 * date: 2013-11-20
 * detail: 提供转换CANVAS像素的功能函数
 */

define(function(require, exports, module) {
	exports.outputId = function(msg) {
		console.log(module.id);
	};
    exports.invertProcess = function(binaryData, len) {
        for (var i = 0; i < len; i++) {
            if ((i + 1) % 4 !== 0) {
                binaryData[i] = 255 - binaryData[i];                
            }
        }
    };
    exports.mirrorProcess = function(binaryData, len, canvasData, context) {
        var tempCanvasData = context.createImageData(canvasData.width, canvasData.height);
        tempCanvasData.data.set(canvasData.data);
        for ( var x = 0; x < tempCanvasData.width; x++) {    
            for ( var y = 0; y < tempCanvasData.height; y++) {    
      
                
                var idx = (x + y * tempCanvasData.width) * 4;         
                var midx = (((tempCanvasData.width -1) - x) + y * tempCanvasData.width) * 4;  
                  
                
                canvasData.data[midx + 0] = tempCanvasData.data[idx + 0]; 
                canvasData.data[midx + 1] = tempCanvasData.data[idx + 1]; ; 
                canvasData.data[midx + 2] = tempCanvasData.data[idx + 2]; ; 
                canvasData.data[midx + 3] = 255; 
            }  
        }
    };
    exports.blurProcess = function(binaryData, len, canvasData) {

    };
    exports.adjustProcess = function(binaryData, len) {
        for (var i = 0; i < len; i += 4) {  
            var r = binaryData[i];  
            var g = binaryData[i + 1];  
            var b = binaryData[i + 2];  
  
            binaryData[i] = (r * 0.272) + (g * 0.534) + (b * 0.131);  
            binaryData[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);  
            binaryData[i + 2] = (r * 0.393) + (g * 0.769) + (b * 0.189);  
        } 
    };
});