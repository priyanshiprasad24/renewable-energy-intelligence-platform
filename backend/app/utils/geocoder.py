import requests
import urllib3

urllib3.disable_warnings(
    urllib3.exceptions.InsecureRequestWarning
)


def get_location_name(latitude, longitude):
    """
    Reverse geocoding:
    Latitude + Longitude -> Location name
    """

    try:
        url = "https://nominatim.openstreetmap.org/reverse"

        params = {
            "lat": latitude,
            "lon": longitude,
            "format": "jsonv2",
            "addressdetails": 1
        }

        headers = {
            "User-Agent": "SolarWindDeploymentPlatform/1.0"
        }

        response = requests.get(
            url,
            params=params,
            headers=headers,
            timeout=15,
            verify=False
        )

        response.raise_for_status()

        data = response.json()

        return data.get(
            "display_name",
            "Unknown Location"
        )

    except Exception as e:
        print("Reverse Geocoder Error:", e)
        return "Unknown Location"


def get_coordinates(location):
    """
    Forward geocoding:
    Location / Address -> Latitude + Longitude
    """

    try:
        url = "https://nominatim.openstreetmap.org/search"

        params = {
            "q": location,
            "format": "jsonv2",
            "limit": 1,
            "addressdetails": 1,
            "countrycodes": "in"
        }

        headers = {
            "User-Agent": "SolarWindDeploymentPlatform/1.0"
        }

        response = requests.get(
            url,
            params=params,
            headers=headers,
            timeout=15,
            verify=False
        )

        print("Geocoder Status:", response.status_code)
        print("Geocoder URL:", response.url)
        print(
            "Geocoder Response:",
            response.text[:1000]
        )

        response.raise_for_status()

        data = response.json()

        if not data:
            raise ValueError(
                f"Location not found: {location}"
            )

        latitude = float(data[0]["lat"])
        longitude = float(data[0]["lon"])

        print("Latitude:", latitude)
        print("Longitude:", longitude)

        return latitude, longitude

    except requests.RequestException as e:
        print(
            "Nominatim Request Error:",
            repr(e)
        )

        raise ValueError(
            f"Geocoding service error: {str(e)}"
        )

    except (KeyError, ValueError, TypeError) as e:
        print(
            "Geocoder Data Error:",
            repr(e)
        )

        raise ValueError(
            f"Unable to find coordinates for: {location}"
        )

    except Exception as e:
        print(
            "Geocoder Error:",
            repr(e)
        )

        raise ValueError(
            f"Unable to find coordinates for: {location}"
        )