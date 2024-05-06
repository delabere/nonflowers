#!/usr/bin/env python3
import sys

from PIL import Image
from inky.auto import auto


# Get today's date
today = datetime.date.today()
# Format the date as YYYY-MM-DD
formatted_date = today.strftime('%Y-%m-%d')
# Create the filename by interpolating the formatted date
filename = f"images/image_{formatted_date}.png"


inky = auto(ask_user=True, verbose=True)
saturation = 0.5

image = Image.open(filename)
resizedimage = image.resize(inky.resolution)

if len(sys.argv) == 2:
    saturation = float(sys.argv[2])

inky.set_image(resizedimage, saturation=saturation)
inky.show()
