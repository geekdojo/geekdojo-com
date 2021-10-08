# Morel Tempo Ultra 4" Coaxial Egg Speakers

This project was completed pre-geekdojo but including it here as it completes the 2.1 desktop set. The pair are based on [dr_frost_dk's](https://www.thingiverse.com/dr_frost_dk/designs) for [Egg Speakers](https://www.thingiverse.com/thing:2896301) on [Thingiverse](https://www.thingiverse.com). I found the designs were a perfect match for a set of [Morel Tempo Ultra 402's](https://www.crutchfield.com/p_210TU402N2/Morel-Tempo-Ultra-Integra-402-MKII.html) that I had. Yes, these are car speakers. Yes, they will do just fine in a home stereo environment on a home amplifier (assuming the amplifier can handle the 4ohm speaker impedance).

**Note:** it looks like dr_frost_dk (thumbs up for the World of Warcraft Frost Deathknight) has created a [newer design](https://www.thingiverse.com/thing:4665770) for the 4" set.

**Total Assembly Time:** around 150 hours due to the long print time (up to 70 hours for each speaker).

![2.1 Speakers](media/JLAudioBassTube.jpg)

## Printing the Speakers

I printed these designs on my Ultimaker 2+ Extended using dr_frost_dk's recommended settings (repasted below for convenance). It took several tries to get the bed right and I ended up having to tweak the first pass to go slower and double thickness to keep it from warping on the bed. If you have a printer that can do dual filament I highly recommend using a support filament that is easily removed. The 2+ is single filament and the quality suffered while cleaning up all the supports. Fortunately, that's all on the bottom so it's not readily visible when they are sitting on the desktop.

### Print Settings

| Setting | Recommendation |
|---------|----------------|
| Rafts: | No |
| Supports: | Yes |
| Resolution: | 0.2 |
| Infill: | 10 |

### Cura Settings

| Setting | Recommendation |
|---------|----------------|
| Wall thickness: | 1.8mm (3 walls of 0.6mm nozzle) |
| Z seam behind speaker | (i use X 195 & Y 350 as my Build plate is X:390,Y:350) |
| Infill Pattern: | Grid |
| Support: | i use 0.4mm line width for support with 0.6mm nozzle) |
| Overhang Angle: | 66 |
| Pattern: | Grid |
| Line Distance: | 5 |
| X/Y Distance: | 1.2 |
| Gradual Support Infill Steps: | 4 |
| Gradual Support Infill Steps Height: | 3mm |
| Enable Support: | Roof & Floor |
| Support Interface Pattern: | Concentric |

## Assembly

Once the speakers were printed I used the same methods as the [Subwoofer](subwoofer.md) (grommets heated up on a soldering iron) to provide an anchor for the speaker screws. I also filled the void with the same batting from the Subwoofer. In my opinion the sound is a little more "full" with the batting in. That is, however, just my opinion - make your own choice. Based on a few comments on the prints I also added some quarter-inch think foam squares to the inside of the tubes. You can see them in the pictures as a darker area. This was due to a resonance coming from them at higher volumes. I note, in dr_frost_dk's recent updates that he added an extra support for the tube which may negate this need.

## Sound

Overall, I'm super happy with these. They produce a nice, clear, full sound without being to bright. They work equally well for music and video games. They pair very nicely with the JLAudio 6" Subwoofer when run on the [Fosi 2.1 Amplifier](https://fosiaudio.com/products/tb20a-tpa3116d2-stereo-amplifier-2-1-channel-class-d-audio-amp-with-subwoofer-volume-control-2x50w-1x100w-sub-output-super-bass-power-receiver-treble-bass-independent-adjustment-power-supply) at 50 watts per channel. One note there, I do run the crossover at the highest frequency to keep the lows out of the Morels. Since the Subwoofer is sealed it handles the higher frequencies just fine (at the expense of some low end of course).
