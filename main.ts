// Return the heading as a string.  E.g. A heading between 22.5 and 67.5 degrees is "NE".
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
// Map compass degrees into the corresponding LED on the HaloHD.  The range of valid inputs is 0-359.
function degreesToLED (degrees: number) {
    return Math.trunc(degrees / 6)
}
let heading = 0
let direction = ""
input.calibrateCompass()
let currentNorthLED = 0
let previousNorthLED = 0
let haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
haloDisplay.clear()
haloDisplay.setBrightness(127)
haloDisplay.show()
// Every 100ms: update the heading in the 5x5 LED array and the North indicator in the HaloHD.
basic.forever(function () {
    heading = input.compassHeading()
    currentNorthLED = degreesToLED(360 - heading)
    if (currentNorthLED != previousNorthLED) {
        haloDisplay.setZipLedColor(previousNorthLED, kitronik_halo_hd.colors(ZipLedColors.Black))
        haloDisplay.setZipLedColor(currentNorthLED, kitronik_halo_hd.colors(ZipLedColors.White))
        haloDisplay.show()
        previousNorthLED = currentNorthLED
        basic.showString("" + (degreesToDirection(heading)))
    }
    basic.pause(100)
})
