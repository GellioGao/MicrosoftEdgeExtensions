// HashTable from http://www.cnblogs.com/hyl8218/archive/2010/01/18/1650589.html
function HashTable() {
    var size = 0;
    var entry = new Object();

    this.add = function (key, value) {
        if (!this.containsKey(key)) {
            size++;
        }
        entry[key] = value;
    }

    this.getValue = function (key) {
        return this.containsKey(key) ? entry[key] : null;
    }

    this.remove = function (key) {
        if (this.containsKey(key) && (delete entry[key])) {
            size--;
        }
    }

    this.containsKey = function (key) {
        return (key in entry);
    }

    this.containsValue = function (value) {
        for (var prop in entry) {
            if (entry[prop] == value) {
                return true;
            }
        }
        return false;
    }

    this.getValues = function () {
        var values = new Array();
        for (var prop in entry) {
            values.push(entry[prop]);
        }
        return values;
    }

    this.getKeys = function () {
        var keys = new Array();
        for (var prop in entry) {
            keys.push(prop);
        }
        return keys;
    }

    this.getSize = function () {
        return size;
    }

    this.clear = function () {
        size = 0;
        entry = new Object();
    }
}

// Code taken from http://stackoverflow.com/a/5420409
function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to guess the
    // original format, but be aware the using "image/jpg" will re-encode the image.
    var imgtype = img.src.toLowerCase().endsWith(".jpg") ? "image/jpg" : "image/png";
    var dataURL = canvas.toDataURL(imgtype);

    return dataURL;
}

var imgsDic = new HashTable();

function mapSrc2Img() {
    var imgs = document.getElementsByTagName("img");
    for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i]   
        img.crossOrigin = "Anonymous";
        imgsDic.add(img.src, img);
    }
}

function handleMessage(message, sender, sendResponse) {
    if(message.type=="url"){
        var img = imgsDic.getValue(message.url);
        if (img == null) {
            mapSrc2Img();
            img = imgsDic.getValue(message.url);
        }
        sendResponse({
            img: getBase64Image(img)
        });
    }else if(message.type=="text"){
        ReactDOM.render(React.createElement(
            Lightbox,
            null,
            React.createElement(
                LightboxModal,
                null,
                React.createElement(
                    'div',
                    null,
                    message.text
                )
            )
        ), document.getElementById('popup4QrCoderReader'))
        .openLightbox();
    }
}


window.document.body.innerHTML+='<div id=\'popup4QrCoderReader\'></div>';

browser.runtime.onMessage.addListener(handleMessage);