import requests


def check_cookies(site_name: str) -> dict:
	cookie_dict = {
		"totalCookies": 0,
		"httpOnly": [],
		"notHttpOnly": []
	}

	r = requests.get(f'{site_name}')
	cookie_dict["totalCookies"] = len(r.cookies)

	for values in r.cookies:
		if 'HttpOnly' in values.__dict__['_rest']:
			cookie_dict["httpOnly"].append({"name": values.__dict__["name"]})
		else:
			cookie_dict["notHttpOnly"].append({"name": values.__dict__["name"]})

	return cookie_dict
