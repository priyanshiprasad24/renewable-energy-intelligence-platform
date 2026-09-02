import requests
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

class EnvironmentalService:

    @staticmethod
    def analyze_location(latitude: float, longitude: float):

        try:
            url = (
                "https://api.open-meteo.com/v1/forecast"
                f"?latitude={latitude}"
                f"&longitude={longitude}"
                "&current=temperature_2m,relative_humidity_2m,"
                "wind_speed_10m,shortwave_radiation"
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
            wind_speed = current.get("wind_speed_10m", 0)

            # Convert daily solar radiation from MJ/m² to kWh/m²
            radiation_values = daily.get("shortwave_radiation_sum", [0])
            solar_radiation = (
                radiation_values[0] / 3.6
                if radiation_values and radiation_values[0] is not None
                else 0
            )

            elevation = data.get("elevation", 0)

            # Basic GIS logic
            if latitude > 25:
                terrain = "Flat"
                land_type = "Agricultural"
            else:
                terrain = "Hilly"
                land_type = "Forest"

            if longitude > 75:
                road_access = "Available"
                grid_connection = "Nearby"
            else:
                road_access = "Limited"
                grid_connection = "Far"

            # Environmental score
            score = 0

            if solar_radiation >= 6:
                score += 40
            elif solar_radiation >= 5:
                score += 30
            elif solar_radiation >= 4:
                score += 20
            else:
                score += 10

            if 20 <= temperature <= 35:
                score += 25
            else:
                score += 10

            if humidity < 70:
                score += 20
            else:
                score += 10

            if wind_speed >= 5:
                score += 15
            else:
                score += 5

            if score >= 80:
                suitability = "Excellent"
                recommendation = "Highly Recommended"
            elif score >= 60:
                suitability = "Good"
                recommendation = "Recommended"
            else:
                suitability = "Poor"
                recommendation = "Not Recommended"

            return {
                "latitude": latitude,
                "longitude": longitude,
                "temperature": round(temperature, 2),
                "humidity": round(humidity, 2),
                "solar_radiation": round(solar_radiation, 2),
                "wind_speed": round(wind_speed, 2),
                "elevation": round(elevation, 2),
                "air_quality": "Good",
                "terrain": terrain,
                "land_type": land_type,
                "road_access": road_access,
                "grid_connection": grid_connection,
                "score": score,
                "suitability": suitability,
                "recommendation": recommendation,
            }

        except Exception as e:
            print(f"Environmental analysis failed: {e}")

            return {
                "latitude": latitude,
                "longitude": longitude,
                "temperature": 0,
                "humidity": 0,
                "solar_radiation": 0,
                "wind_speed": 0,
                "elevation": 0,
                "air_quality": "Unavailable",
                "terrain": "Unknown",
                "land_type": "Unknown",
                "road_access": "Unknown",
                "grid_connection": "Unknown",
                "score": 0,
                "suitability": "Unavailable",
                "recommendation": "Unable to fetch environmental data.",
            }