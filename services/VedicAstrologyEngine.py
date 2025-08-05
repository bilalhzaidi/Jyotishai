
from flatlib.chart import Chart
from flatlib.datetime import Datetime
from flatlib.geopos import GeoPos
from flatlib.const import SUN, MOON, MERCURY, VENUS, MARS, JUPITER, SATURN, ASC
from datetime import datetime
from models.request_models import ChartRequest  # ensure this import exists and is correct

# Define Rahu and Ketu manually
RAHU = 'RAHU'
KETU = 'KETU'


class VedicAstrologyEngine:

    def __init__(self, birth_date, birth_time, location, utc_offset):
        self.birth_date = birth_date
        self.birth_time = birth_time
        self.location = location
        self.utc_offset = utc_offset
        self.chart = None
        self.asc_sign = None
        self.placements = {}

        self.compute_chart()

    @classmethod
    def from_request(cls, request: ChartRequest):
        birth_date = request.date
        birth_time = request.time
        location = f"{request.city}, {request.country}"
        utc_offset = request.timezone
        return cls(birth_date, birth_time, location, utc_offset)

    def compute_chart(self):
        # Convert to flatlib Datetime
        dt = Datetime(self.birth_date, self.birth_time, self.utc_offset)

        # Hardcoded GeoPos for Karachi (replace with real lookup later)
        pos = GeoPos('24.8607', '67.0011')

        # Create the chart
        self.chart = Chart(dt, pos)

        # Extract placements
        planets = [SUN, MOON, MERCURY, VENUS, MARS, JUPITER, SATURN, ASC]
        self.placements = {obj: self.chart.get(obj).sign for obj in planets if self.chart.get(obj)}

        # Ascendant sign
        self.asc_sign = self.placements.get(ASC, None)
