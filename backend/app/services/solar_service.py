import requests
import urllib3

from app.utils.geocoder import get_location_name

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

class SolarService:

    @staticmethod
    def predict(latitude: float, longitude: float):

        try:
            location = get_location_name(latitude, longitude)

            url = (
                "https://api.open-meteo.com/v1/forecast"
                f"?latitude={latitude}"
                f"&longitude={longitude}"
                "&current=temperature_2m,relative_humidity_2m"
                "&daily=shortwave_radiation_sum"
                "&timezone=auto"
            )

            response = requests.get(url, timeout=10, verify=False)
            response.raise_for_status()

            data = response.json()

            current = data.get("current", {})
            daily = data.get("daily", {})

            temperature = current.get("temperature_2m", 0)
            humidity = current.get("relative_humidity_2m", 0)

            radiation_values = daily.get("shortwave_radiation_sum", [0])

            solar_radiation = (
                radiation_values[0] / 3.6
                if radiation_values and radiation_values[0] is not None
                else 0
            )

            score = 0

            if solar_radiation >= 6:
                score += 50
            elif solar_radiation >= 5:
                score += 40
            elif solar_radiation >= 4:
                score += 30
            else:
                score += 20

            if 20 <= temperature <= 35:
                score += 30
            else:
                score += 15

            if humidity < 70:
                score += 20
            else:
                score += 10

            if score >= 90:
                suitability = "Excellent"
                recommendation = "Highly Recommended"
            elif score >= 70:
                suitability = "Good"
                recommendation = "Recommended"
            else:
                suitability = "Poor"
                recommendation = "Not Recommended"

            return {
                "location": location,
                "latitude": latitude,
                "longitude": longitude,
                "solar_radiation": round(solar_radiation, 2),
                "temperature": round(temperature, 2),
                "humidity": round(humidity, 2),
                "solar_score": score,
                "suitability": suitability,
                "recommendation": recommendation,
            }

        except Exception as e:
            print(f"Solar prediction failed: {e}")

            return {
                "location": "Unavailable",
                "latitude": latitude,
                "longitude": longitude,
                "solar_radiation": 0,
                "temperature": 0,
                "humidity": 0,
                "solar_score": 0,
                "suitability": "Unavailable",
                "recommendation": "Unable to fetch solar data.",
            }