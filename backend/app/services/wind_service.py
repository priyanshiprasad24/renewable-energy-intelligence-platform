class WindService:

    @staticmethod
    def predict(wind_speed: float, elevation: float):

        score = 0

        # Wind Speed
        if wind_speed >= 7:
            score += 60
        elif wind_speed >= 5:
            score += 40
        else:
            score += 20

        # Elevation
        if elevation >= 200:
            score += 40
        else:
            score += 20

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
            "wind_score": score,
            "suitability": suitability,
            "recommendation": recommendation
        }