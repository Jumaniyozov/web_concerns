import requests
from bs4 import BeautifulSoup as bs


def check_external_js(site_name: str) -> dict:
	external_js = []

	r = requests.get(site_name)
	soup = bs(r.content, "html.parser")
	scripts = soup.findAll('script', src=True)

	for script in scripts:
		if script['src'].startswith('http'):
			external_js.append(script['src'])

	return {"external_js": external_js}
