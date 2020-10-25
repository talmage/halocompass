function degreesToDirection (degrees: number) {
    if (degrees <= 22.5) {
        direction = "N"
    } else if (degrees <= 67.5) {
        direction = "NE"
    } else if (degrees <= 112.5) {
        direction = "E"
    } else if (degrees <= 157.5) {
        direction = "SE"
    } else if (degrees <= 202.5) {
        direction = "S"
    } else if (degrees <= 247.5) {
        direction = "SW"
    } else if (degrees <= 292.5) {
        direction = "W"
    } else if (degrees <= 336.5) {
        direction = "NW"
    } else {
        direction = "N"
    }
    return direction
}
function degreesToLED (degrees: number) {
    return Math.trunc(degrees / 6)
}
let heading = 0
let direction = ""
input.calibrateCompass()
let currentHeadingLED = 0
let currentNorthLED = 0
let previousHeadingLED = 0
let previousNorthLED = 0
let haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
haloDisplay.clear()
haloDisplay.setBrightness(127)
haloDisplay.show()
basic.forever(function () {
    heading = input.compassHeading()
    currentHeadingLED = degreesToLED(heading)
    currentNorthLED = degreesToLED(360 - heading)
    if (currentHeadingLED != previousHeadingLED) {
        haloDisplay.setZipLedColor(previousHeadingLED, kitronik_halo_hd.colors(ZipLedColors.Black))
        haloDisplay.setZipLedColor(currentHeadingLED, kitronik_halo_hd.colors(ZipLedColors.Red))
        haloDisplay.setZipLedColor(previousNorthLED, kitronik_halo_hd.colors(ZipLedColors.Black))
        haloDisplay.setZipLedColor(currentNorthLED, kitronik_halo_hd.colors(ZipLedColors.White))
        haloDisplay.show()
        previousHeadingLED = currentHeadingLED
        previousNorthLED = currentNorthLED
        basic.showString("" + (degreesToDirection(heading)))
    }
    basic.pause(100)
})
