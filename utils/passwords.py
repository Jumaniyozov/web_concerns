import requests
from bs4 import BeautifulSoup as bs


def check_passwords(site_name: str) -> dict:
	dict_autocomplete = {"autocomplete": False}
	r = requests.get(site_name)
	soup = bs(r.content, "html.parser")
	inputs = soup.findAll('input', type=True)

	for inp in inputs:
		if inp['type'] == 'password' and inp['autocomplete'] == 'on':
			dict_autocomplete["autocomplete"] = True
			return dict_autocomplete

	return dict_autocomplete
