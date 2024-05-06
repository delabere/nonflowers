#!/usr/bin/env python3
from selenium.webdriver.chrome.service import Service
from selenium import webdriver                                                          
from PIL import Image
import sys
#!/usr/bin/env python3

import sys

from PIL import Image

import datetime

# Create a Service object with the path to the chromedriver
# driver_path = 'chromedriver_mac_arm64/chromedriver'
driver_path = '/usr/lib/chromium-browser/chromedriver'
service = Service(executable_path=driver_path)

# Get today's date
today = datetime.date.today()
# Format the date as YYYY-MM-DD
formatted_date = today.strftime('%Y-%m-%d')
# Create the filename by interpolating the formatted date
filename = f"images/image_{formatted_date}.png"

options = webdriver.ChromeOptions()
options.add_argument('--headless')
options.add_argument('--disable-gpu')  # This option is necessary for some versions of Chrome
# options.add_argument('window-size=600x448')  # Set the desired window size to 600x448 pixels
options.add_argument('window-size=480x640')  # Set the desired window size
# options.add_argument('window-size=384x512')  # Set the desired window size
# options.add_argument('window-size=424x662')  # Set the desired window size

driver = webdriver.Chrome(service=service, options=options)                                                                                                                                          

driver.get('http://[::]:8000/?plantCount=1')
driver.save_screenshot(filename)

driver.quit()

with Image.open(filename) as img:
    rotated_img = img.rotate(90, expand=True)  # Rotate 90 degrees anticlockwise
    rotated_img.save(filename)

