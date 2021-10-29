from .cookies import check_cookies
from .external_js import check_external_js
from .headers import check_headers
from .passwords import check_passwords
from .xss import check_xss


class Concerns:

	def __init__(self, site_name):
		self.site_name = site_name

	def check_cookies(self):
		cookie_dict = check_cookies(self.site_name)
		return cookie_dict

	def check_external_js(self):
		external_js_dict = check_external_js(self.site_name)
		return external_js_dict

	def check_headers(self):
		headers_dict = check_headers(self.site_name)
		return headers_dict

	def check_passwords(self):
		autocomplete_dict = check_passwords(self.site_name)
		return autocomplete_dict

	def check_xss(self):
		check_for_xss = check_xss(self.site_name)
		xss_dict = {"vulnerable_to_xss": check_for_xss}
		return xss_dict
