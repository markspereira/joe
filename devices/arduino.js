var j5 = require('johnny-five');

var board = new j5.Board();

board.on('ready', function(){
    var laser = new j5.Led(5);
    var detection = new j5.Sensor('A0');
    var lcd = new j5.LCD({controller: "PCF8574", pins: [7,8,9,10,11,12], backlight:15});
    var isSecure = false;
    lcd.print("HELLO");
    laser.off();
    detection.scale(0,1).on("change", function(){
        var reading = !(this.value | 0)

        if (isSecure !== reading){
            isSecure = reading;

            if(!isSecure){
                console.log('INTRUDER!!.....MAYBE¯\\_(ツ)_/¯ ');
            }
        }
    });
});
