import argparse
import google.generativeai as genai
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time
import subprocess
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')  # ✅ Force UTF-8 output


# ✅ Accept inputs dynamically
parser = argparse.ArgumentParser(description="Automated login test using Selenium.")
parser.add_argument("--url", required=True, help="Website URL to test login.")
parser.add_argument("--username", required=True, help="Login username.")
parser.add_argument("--password", required=True, help="Login password.")
args = parser.parse_args()

# 🔹 Dynamic User Credentials
url = args.url
username = args.username
password = args.password

# 🔹 Configure Gemini AI
genai.configure(api_key="AIzaSyBo7AFXOGqvKLQ5CZ0w9J67QK0T_8SR43A")  # 🔴 Update with a valid API key
model = genai.GenerativeModel("gemini-1.5-pro-latest")

# 🚀 Setup Selenium WebDriver
service = Service(ChromeDriverManager().install())
options = webdriver.ChromeOptions()
options.add_argument("--headless")  
options.add_argument("--disable-blink-features=AutomationControlled")

driver = webdriver.Chrome(service=service, options=options)
driver.get(url)

wait = WebDriverWait(driver, 10)

# 🔍 **Extract Input Fields**
print("\n🔹 Extracting Input Fields:")
input_fields_data = []
input_fields = driver.find_elements(By.TAG_NAME, "input")

for field in input_fields:
    name = field.get_attribute("name")
    id_ = field.get_attribute("id")
    type_ = field.get_attribute("type")
    placeholder = field.get_attribute("aria-label") or field.get_attribute("placeholder")  # Use aria-label for Instagram
    input_fields_data.append(f"Type: {type_}, Name: {name}, ID: {id_}, Placeholder: {placeholder}")
    
input_fields_str = "\n".join(input_fields_data)
print(input_fields_str)

# 🔍 **Extract Submit Button (Handles All Cases)**
print("\n🔹 Extracting Submit Button:")
submit_button_data = ""

# 🔍 **Try multiple ways to locate the button**
try:
    # **Method 1: Find button using common submit types**
    submit_button = driver.find_element(By.XPATH, "//button[@type='submit']")
    btn_text = submit_button.text.strip() or "(No text found)"
    btn_class = submit_button.get_attribute("class")
    submit_button_data = f"✅ Found using XPath → Button Text: {btn_text}, Class: {btn_class}"
    print(submit_button_data)

except:
    print("⚠️ Submit button not found using XPath! Trying alternative methods...")

    try:
        # **Method 2: Check for button by ID**
        submit_button = wait.until(EC.presence_of_element_located((By.ID, "submit")))
        btn_text = submit_button.text.strip() or submit_button.get_attribute("value") or "(No text found)"
        btn_class = submit_button.get_attribute("class")
        submit_button_data = f"✅ Found using ID → Button Text: {btn_text}, Class: {btn_class}"
        print(submit_button_data)

    except:
        try:
            # **Method 3: Check for button by NAME**
            submit_button = wait.until(EC.presence_of_element_located((By.NAME, "btnLogin")))
            btn_text = submit_button.text.strip() or submit_button.get_attribute("value") or "(No text found)"
            btn_class = submit_button.get_attribute("class")
            submit_button_data = f"✅ Found using Name → Button Text: {btn_text}, Class: {btn_class}"
            print(submit_button_data)

        except:
            try:
                # **Method 4: Locate using `<input type='submit'>`**
                submit_button = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='submit']")))
                btn_text = submit_button.get_attribute("value") or "(No text found)"
                btn_class = submit_button.get_attribute("class")
                submit_button_data = f"✅ Found using Input Type → Button Text: {btn_text}, Class: {btn_class}"
                print(submit_button_data)

            except:
                try:
                    # **Method 5: Locate using generic button tags**
                    submit_button = wait.until(EC.presence_of_element_located((By.TAG_NAME, "button")))
                    btn_text = submit_button.text.strip() or "(No text found)"
                    btn_class = submit_button.get_attribute("class")
                    submit_button_data = f"✅ Found using Generic Button Tag → Button Text: {btn_text}, Class: {btn_class}"
                    print(submit_button_data)

                except Exception as e:
                    submit_button_data = f"❌ Submit button not found! Error: {e}"
                    print(submit_button_data)

# 🛑 Close Browser
driver.quit()

# 🔹 Prepare Prompt for Gemini AI
prompt = f"""
🔹 Extracting Input Fields:
{input_fields_str}

🔹 Extracting Submit Button:
{submit_button_data}

Can you generate a Selenium test case for logging in using the extracted input fields and submit button?

- Open the website ({url}).

- Enter the provided username: {username}.
- Enter the provided password: {password}.
- Click the login button.
- Verify if the login is successful by checking the page URL or keywords for( log in is succsessfull) the page source.
- for sucsessfull indicators like generaate it as website type try multiple combinations
- Do NOT include explanations, comments, or additional text outside the Python code.
- conclude whether passed ✅test or not ❌

like The test case should:
- Open the website ({url}).
- Locate the username & password fields using ID or Name.
- Enter the provided username: {username}.
- Enter the provided password: {password}.
- Click the login button.
- Verify if the login is successful by checking the page URL or keywords in the page source.
- The script should handle missing elements gracefully.
- Import all necessary Selenium libraries.
- for sucsessfull indicators generaate it as website type try multiple combinations
- Do NOT include explanations, comments, or additional text outside the Python code.

"""

# Generate Test Case using Gemini AI
response = model.generate_content(prompt)
generated_code = response.text
generated_code = re.sub(r"```python|```", "", generated_code).strip()

# ✅ Save the Generated Test Case
selenium_script = "generated_test.py"
with open(selenium_script, "w", encoding="utf-8") as file:
    file.write(generated_code)

print(f"✅ Selenium test saved to {selenium_script}")

# 🏃 Run the Generated Selenium Script
try:
    subprocess.run(["python", selenium_script], check=True)
except subprocess.CalledProcessError as e:
    print(f"❌ Test Execution Failed: {e}")

# 🛑 Close Browser
driver.quit()
