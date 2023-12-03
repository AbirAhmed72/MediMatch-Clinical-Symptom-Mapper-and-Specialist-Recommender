import pandas as pd
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

options = Options()
options.add_experimental_option("detach", True)

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

driver.get('https://populardiagnostic.com/our-doctors?search=true')

## Create Df for saving the info
df = pd.DataFrame(columns=['DID', 'Name', 'Specialities', 'Branch'])
info_tuple = []

# Find the button by its class name
search_button = driver.find_element(By.CLASS_NAME, 'btn-primary')
search_button.click()

# Find the image element by XPath
image_element = driver.find_elements(By.CLASS_NAME, 'get-images')

i = 1
for elem in range(len(image_element)):
    
    # if i < 20:
    item = image_element[elem]
    image_source_url = item.get_attribute('data-image-source')


    # Use requests library to download the image
    response = requests.get(image_source_url)
    if response.status_code == 200:
        # Save the image to a local file
        with open(str(i)+'.png', 'wb') as f:
            f.write(response.content)
            
        print("Image downloaded successfully." + str(i))
    else:
        print(f"Failed to download image. Status code: {response.status_code}")
        
    i+=1
