let j5 = require('johnny-five');

let board = new j5.Board();

let Laser;
let Light;

board.on('ready', function(){
    let light = new j5.Led(13);
    let laser = new j5.Led(5);
    let detection = new j5.Sensor('A0');
    let lcd = new j5.LCD({controller: "PCF8574", pins: [7,8,9,10,11,12], backlight:15});
    let isSecure = false;
    lcd.print("HELLO");
    Laser = laser;
    Light = light;
    laser.on();
    turnOnLaser(laser);
    light.on();
    detection.scale(0,1).on("change", function(){
        let reading = !(this.value | 0)

        if (isSecure !== reading){
            isSecure = reading;

            if(!isSecure){
                console.log('INTRUDER!!.....MAYBE¯\\_(ツ)_/¯ ');
            }
        }
    });
});

const turnOffLaser = (laser) => {
  Laser.off();
}

const turnOnLaser = (laser) => {
  Light.on();
}

