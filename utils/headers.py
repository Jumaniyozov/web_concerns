import requests


def check_headers(site_name: str) -> dict:
	headers_dict = {
		"X-Content-Type-Options": False,
		"X-Frame-Options": False
	}
	r = requests.get(site_name)
	for key, value in r.headers.items():
		if key == "X-Content-Type-Options":
			headers_dict["X-Content-Type-Options"] = True
		if key == "X-Frame-Options":
			headers_dict["X-Frame-Options"] = True
	return headers_dict
