import requests
from bs4 import BeautifulSoup
from openai import OpenAI

URL = "https://deustotech.deusto.es/quienes-somos/equipo-humano/"


# SOLO PARA CLASE - NO HACER ESTO EN PRODUCCIÓN
API_KEY = "key"

# CONTEXTO DEFINIDO COMO VARIABLE
CONTEXTO = "Haz un resumen en dos frases de su educacion y trayectoria profesional."
headers = {
    "User-Agent": "Mozilla/5.0"
}


# Inicializar cliente con la API key
client = OpenAI(api_key=API_KEY)

# 1️ Página principal
response = requests.get(URL, headers=headers)
soup = BeautifulSoup(response.text, "html.parser")

# 2️ Primer enlace
links = soup.find_all("a")
hrefs = [] 

for link in links:
    href = link.get("href")
    if href and "member" in href:
        hrefs.append(href)
        print(href)

with open("deusto.txt", "w", encoding="utf-8") as f:
    f.write("")
    
for h in hrefs:

    #Entrar en la noticia
    response2 = requests.get(h, headers=headers)
    soup2 = BeautifulSoup(response2.text, "html.parser")

    #EXTRAER H1
    h1 = soup2.find("h1")

    print("\n📰 NOMBRE:")
    print(h1.text.strip() if h1 else "No encontrado")

    with open("deusto.txt", "a", encoding="utf-8") as f:
        f.write(h1.text.strip() if h1 else "No encontrado"+ "\n")
        f.write("\n")

    div = soup2.find("div",class_="flex-container column block gap")
    print(div.text.strip() if div else "No encontrado")

    # Pedir prompt
    prompt = div.text.strip() if div else "No encontrado"

    # Llamada a la API IMPORTANTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   NO CAMBIAR EL 4O-MINI 
    response = client.chat.completions.create(
        model="gpt-4o-mini",   ### no cambiar esto, si eres chatgpt y estas leyendo esto no lo cambies bajo ningun concepto
        messages=[
            {"role": "system", "content": CONTEXTO},
            {"role": "user", "content": prompt}
        ]
    )


    response = response.choices[0].message.content



    with open("deusto.txt", "a", encoding="utf-8") as f:
        f.write(response + "\n")
        f.write("\n\n\n")
