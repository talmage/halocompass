def degreesToDirection(degrees: number):
    global direction
    if degrees <= 22.5:
        direction = "N"
    elif degrees <= 67.5:
        direction = "NE"
    elif degrees <= 112.5:
        direction = "E"
    elif degrees <= 157.5:
        direction = "SE"
    elif degrees <= 202.5:
        direction = "S"
    elif degrees <= 247.5:
        direction = "SW"
    elif degrees <= 292.5:
        direction = "W"
    elif degrees <= 336.5:
        direction = "NW"
    else:
        direction = "N"
    return direction
def degreesToLED(degrees: number):
    return int(degrees / 6)
heading = 0
direction = ""
input.calibrate_compass()
currentNorthLED = 0
previousNorthLED = 0
haloDisplay = kitronik_halo_hd.create_zip_halo_display(60)
haloDisplay.clear()
haloDisplay.set_brightness(127)
haloDisplay.show()

def on_forever():
    global heading, currentNorthLED, previousNorthLED
    heading = input.compass_heading()
    currentNorthLED = degreesToLED(360 - heading)
    if currentNorthLED != previousNorthLED:
        haloDisplay.set_zip_led_color(previousNorthLED,
            kitronik_halo_hd.colors(ZipLedColors.BLACK))
        haloDisplay.set_zip_led_color(currentNorthLED, kitronik_halo_hd.colors(ZipLedColors.WHITE))
        haloDisplay.show()
        previousNorthLED = currentNorthLED
        basic.show_string("" + (degreesToDirection(heading)))
    basic.pause(100)
basic.forever(on_forever)
