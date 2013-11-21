/** 
 * author: Juexin Wang
 * date: 2013-11-20
 * detail: 程序入口文件
 */
(function(global, undefined) {
    seajs.use(['functions', 'processor'], function(functions, processor) {
        // var ORIGIN = document.createElement('canvas');
        // var ORIGIN_CONTEXT = ORIGIN.getContext('2d');

        // var MIRROR = document.createElement('canvas');
        // var MIRROR_CONTEXT = MIRROR.getContext('2d');

        // var ADJUST = document.createElement('canvas');
        // var ADJUST_CONTEXT = ADJUST.getContext('2d');

        // var BLUR = document.createElement('canvas');
        // var BLUR_CONTEXT = BLUR.getContext('2d');

        // var INVERT = document.createElement('canvas');
        // var INVERT_CONTEXT = INVERT.getContext('2d');

        var CANVAS_ARR = ['ORIGIN', 'MIRROR', 'ADJUST', 'BLUR', 'INVERT'];
        var CANVAS_CONTAINER = {};
        function initCanvas(name) {
            CANVAS_CONTAINER[name] = document.createElement('canvas');
            CANVAS_CONTAINER[name + '_CONTEXT'] = CANVAS_CONTAINER[name].getContext('2d');
        }
        for (var i = 0, len = CANVAS_ARR.length; i < len; i++) {
            initCanvas(CANVAS_ARR[i]);
        }

        var MAP = {};   //用于避免重复计算

        var file = functions.getElement('#file');
        file.addEventListener('dragenter', function(event) {
            event.stopPropagation();
            event.preventDefault();
            console.log('dragenter');
        }, false);
        file.addEventListener('dragover', function(event) {
            event.stopPropagation();
            event.preventDefault();
            console.log('dragover');
        }, false);
        file.addEventListener('drop', function(event) {
            event.stopPropagation();
            event.preventDefault();
 
            showMask();

            var fileReader = new FileReader();
            fileReader.addEventListener('load', function(event) {
                console.log(event.target.result);
                //DOM操作
                hideUploadPage();
                hideMask();
                showFilterPage();
                //导入CANVAS
                var tempImg = new Image();
                tempImg.src = event.target.result;
                console.log(tempImg.width, tempImg.height);
                var canvas = functions.getElement('#canvas');

                var width =  canvas.width = tempImg.width;
                var height =  canvas.height = tempImg.height;

                var context = canvas.getContext('2d');
                context.drawImage(tempImg, 0, 0, width, height);

                for (var i = 0, len = CANVAS_ARR.length; i < len; i++) {
                    console.log(CANVAS_ARR[i]);
                    var item = CANVAS_CONTAINER[CANVAS_ARR[i]];
                    item.width = canvas.width;
                    item.height = canvas.height;

                    CANVAS_CONTAINER[CANVAS_ARR[i] + '_CONTEXT'].putImageData(context.getImageData(0, 0, width, height), 0, 0);
                }

                fixImageSize();
            }, false);
            fileReader.readAsDataURL(event.dataTransfer.files[0]);
        }, false);

        document.addEventListener('dragover', function(event) {
            event.stopPropagation();
            event.preventDefault();
        }, false);
        document.addEventListener('drop', function(event) {
            event.stopPropagation();
            event.preventDefault();
        }, false);

        functions.getElement('#chooseNew').addEventListener('click', function() {
            hideFilterPage();
            showUploadPage();
        }, false);
        functions.getElement('#download').addEventListener('click', function(event) {
            var canvas = functions.getElement('#canvas');
            var dldData = canvas.toDataURL('image/jpeg');
            dldData = dldData.replace('image/jpeg', 'image/octet-stream');
            var tempAnchor = document.createElement('a');
            tempAnchor.href = dldData;
            tempAnchor.download = 'processed.jpg';
            tempAnchor.click();
        }, false);

        function eventProcess(name, doNotProcess) {
            var canvas = functions.getElement('#canvas');
            var width = canvas.width;
            var height = canvas.height;
            var canvasData = CANVAS_CONTAINER[name + '_CONTEXT'].getImageData(0, 0, width, height);
            if (!doNotProcess) {
                processor[name.toLowerCase() + 'Process'](canvasData.data, width * height * 4, canvasData, CANVAS_CONTAINER[name + '_CONTEXT']);
            }
            var context = canvas.getContext('2d');
            context.putImageData(canvasData, 0, 0);
        }
        functions.getElement('#invert').addEventListener('click', function(event) {
            eventProcess('INVERT');
        }, false);
        functions.getElement('#mirror').addEventListener('click', function(event) {
            eventProcess('MIRROR');
        }, false);
        functions.getElement('#blur').addEventListener('click', function(event) {
            eventProcess('BLUR');
        }, false);
        functions.getElement('#adjust').addEventListener('click', function(event) {
            eventProcess('ADJUST');
        }, false);
        functions.getElement('#origin').addEventListener('click', function(event) {
            eventProcess('ORIGIN', true);
        }, false);

        function hideUploadPage () {
            var title = functions.getElement('.title-show');
            var file = functions.getElement('#file');
            functions.addClass(title, 'title-hide');
            functions.addClass(file, 'file-hide');
        }
        function showUploadPage () {
            var title = functions.getElement('.title-show');
            var file = functions.getElement('#file');
            functions.removeClass(title, 'title-hide');
            functions.removeClass(file, 'file-hide');            
        }

        function showMask() {
            var mask = functions.getElement('.mask');
            functions.removeClass(mask, 'mask-hide');
            functions.addClass(mask, 'mask-show');
        }
        function hideMask() {
            var mask = functions.getElement('.mask');
            functions.removeClass(mask, 'mask-show');
            functions.addClass(mask, 'mask-hide');
        }

        function showFilterPage() {
            var filterPage = functions.getElement('.filterPage');
            functions.removeClass(filterPage, 'filterPage-hide');
            functions.addClass(filterPage, 'filterPage-show');

            var canvas = functions.getElement('#canvas');
            functions.removeAllClass(canvas);
        }
        function hideFilterPage() {
            var filterPage = functions.getElement('.filterPage');
            functions.removeClass(filterPage, 'filterPage-show');
            functions.addClass(filterPage, 'filterPage-hide');
        }

        function fixImageSize() {
            var canvas = functions.getElement('#canvas');
            var width = canvas.width;
            var height = canvas.height;
            var ratio = 880 / 500;
            if (width / height > ratio) {
                if (width > 880) {
                    functions.addClass(canvas, 'w880');
                }
            } else {
                if (height > 500) {
                    functions.addClass(canvas, 'h500');
                }
            }
        }
    });
})(this);