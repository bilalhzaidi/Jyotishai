from flatlib.chart import Chart
from flatlib.datetime import Datetime
from flatlib.geopos import GeoPos
from flatlib.const import SUN, MOON, MERCURY, VENUS, MARS, JUPITER, SATURN, ASC
from models.schemas import ChartRequest

RAHU = 'RAHU'
KETU = 'KETU'

class VedicAstrologyEngine:

    def __init__(self, name, birth_date, birth_time, location, utc_offset):
        self.name = name
        self.birth_date = birth_date
        self.birth_time = birth_time
        self.location = location
        self.utc_offset = utc_offset
        self.asc_sign = None
        self.placements = {}
        self.chart = None

    @classmethod
    def from_request(cls, request: ChartRequest) -> "VedicAstrologyEngine":
        engine = cls(
            name=request.name,
            birth_date=request.birth_date,
            birth_time=request.birth_time,
            location=request.location,
            utc_offset=request.utc_offset,
        )
        engine.compute_chart()  # 🧠 auto compute chart here
        return engine

    def compute_chart(self):
        dt = Datetime(self.birth_date, self.birth_time, self.utc_offset)
        pos = GeoPos('24.8607', '67.0011')  # Karachi (make dynamic later)
        self.chart = Chart(dt, pos)

        planets = [SUN, MOON, MERCURY, VENUS, MARS, JUPITER, SATURN, ASC]
        self.placements = {obj: self.chart.get(obj).sign for obj in planets if self.chart.get(obj)}
        self.asc_sign = self.placements.get(ASC)
