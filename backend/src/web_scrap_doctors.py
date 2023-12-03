import pandas as pd
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

# Click the button
search_button.click()

# Find all card-body elements
card_bodies = driver.find_elements(By.CLASS_NAME, 'card-body')

i = 1

# Iterate through each card-body and extract information
for card_body in card_bodies:
    
    # if i < 100:
        
    # Extract relevant information from each card-body
    doctor_name = card_body.find_element(By.CLASS_NAME, 'card-title').text
    expertise_info = card_body.find_element(By.XPATH, './/div[@style="font-size: 10px;"]').text
    branch = card_body.find_element(By.XPATH, './/span[@class="text-color-primary"]').text
    practice_days = card_body.find_element(By.XPATH, './/span[@class="text-success"]').text

    # Print or process the extracted information
    print(f"Doctor Name: {doctor_name}")
    print(f"Specialties: {expertise_info}")
    print(f"Branch: {branch}")
    print(f"Practice Days: {practice_days}")
    print("\n")

    # if len(doctor_name) > 0 and len(expertise_info) > 0 and len(branch) > 0:
    serial = 'PDC-'+str(i)
    info_tuple.append([serial, doctor_name, expertise_info, branch])
            
    i += 1
    
    
temp_df = pd.DataFrame(info_tuple, columns=['DID', 'Name', 'Specialities', 'Branch'])
df = df._append(temp_df)
df.to_csv('all_doctors.csv', index=False)


    

        