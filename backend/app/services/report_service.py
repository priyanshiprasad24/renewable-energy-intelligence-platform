class ReportService:

    @staticmethod
    def generate(latitude: float, longitude: float):

        # Identify location from coordinates
        if abs(latitude - 28.6139) < 0.001 and abs(longitude - 77.2090) < 0.001:
            location = "New Delhi"

        elif abs(latitude - 19.0760) < 0.001 and abs(longitude - 72.8777) < 0.001:
            location = "Mumbai"

        elif abs(latitude - 12.9716) < 0.001 and abs(longitude - 77.5946) < 0.001:
            location = "Bengaluru"

        elif abs(latitude - 13.0827) < 0.001 and abs(longitude - 80.2707) < 0.001:
            location = "Chennai"

        elif abs(latitude - 17.3850) < 0.001 and abs(longitude - 78.4867) < 0.001:
            location = "Hyderabad"
        elif abs(latitude - 26.9124) < 0.001 and abs(longitude - 75.7873) < 0.001:
           location = "Jaipur"

        elif abs(latitude - 23.0225) < 0.001 and abs(longitude - 72.5714) < 0.001:
           location = "Ahmedabad"

        elif abs(latitude - 22.5726) < 0.001 and abs(longitude - 88.3639) < 0.001:
             location = "Kolkata"
 
        elif abs(latitude - 18.5204) < 0.001 and abs(longitude - 73.8567) < 0.001:
            location = "Pune"

        elif abs(latitude - 15.2993) < 0.001 and abs(longitude - 74.1240) < 0.001:
             location = "Goa"

        else:
            location = f"{latitude}, {longitude}"

        # Existing report logic
        return {
            "location": location,
            "solar_score": 90,
            "solar_suitability": "Excellent",
            "wind_score": 80,
            "wind_suitability": "Good",
            "overall_recommendation": "Highly Recommended"
        }