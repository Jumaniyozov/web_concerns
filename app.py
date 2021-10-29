from fastapi import FastAPI, Query, Response, status
from fastapi.middleware.cors import CORSMiddleware


from utils.Concerns import Concerns

app = FastAPI()

app.add_middleware(
	CORSMiddleware,
	allow_origins="*",
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)


@app.get("/searchsite")
async def get_website(response: Response, q: str = Query(...), ):
	response_value = {}
	try:
		query_string = q
		if not query_string.startswith("http"):
			query_string = f"http://{query_string}"
		concerns = Concerns(query_string)

		cookie_dict = concerns.check_cookies()
		external_js_dict = concerns.check_external_js()
		headers_dict = concerns.check_headers()
		passwords_dict = concerns.check_passwords()
		xss_dict = concerns.check_xss()

		response_value["cookie_dict"] = cookie_dict
		response_value["external_js"] = external_js_dict
		response_value["headers"] = headers_dict
		response_value["password_autocomplete"] = passwords_dict
		response_value["xss_vulnerabilities"] = xss_dict
	except:
		message = "Wrong website name please enter correctly, e.g. https://www.google.com"
		response_value = {"message": message}
		response.status_code = status.HTTP_400_BAD_REQUEST
		return response_value

	response.status_code = status.HTTP_200_OK
	return response_value
