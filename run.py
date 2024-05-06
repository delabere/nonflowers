from selenium import webdriver                                                          
from PIL import Image
import sys

driver_path = 'chromedriver_mac_arm64/chromedriver'

options = webdriver.ChromeOptions()
options.add_argument('--headless')
options.add_argument('--disable-gpu')  # This option is necessary for some versions of Chrome
# options.add_argument('window-size=600x448')  # Set the desired window size to 600x448 pixels
options.add_argument('window-size=480x640')  # Set the desired window size
# options.add_argument('window-size=384x512')  # Set the desired window size
# options.add_argument('window-size=424x662')  # Set the desired window size

driver = webdriver.Chrome(options=options)                                                                                                                                          

driver.get('http://[::]:8000/?plantCount=1')
driver.save_screenshot(sys.argv[1])

driver.quit()

with Image.open(sys.argv[1]) as img:
    rotated_img = img.rotate(90, expand=True)  # Rotate 90 degrees anticlockwise
    rotated_img.save(sys.argv[1])
