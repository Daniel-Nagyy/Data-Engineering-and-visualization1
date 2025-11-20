import re

def parse_search_query(text):
    """
    Converts text like:
    'Brooklyn 2021 pedestrian crashes'
    into filters for the API.

    Returns a dict of possible filter keys that can be merged with dropdown filters.
    """
    if not text or not isinstance(text, str):
        return {}

    text = text.lower()
    filters = {}

    # Boroughs detection
    boroughs = ["brooklyn", "queens", "manhattan", "bronx", "staten island"]
    for b in boroughs:
        if b in text:
            filters["borough"] = b.title()
            break

    # Year detection (4-digit years starting with 20)
    match = re.search(r"(20\d{2})", text)
    if match:
        filters["year"] = int(match.group(1))

    # Injury type detection
    if "injured" in text or "injury" in text:
        filters["injury_type"] = "Injured"
    elif "killed" in text or "fatal" in text or "death" in text:
        filters["injury_type"] = "Killed"
    elif "no injury" in text or "no injuries" in text:
        filters["injury_type"] = "None"

    # Vehicle types - match common vehicle type names (order matters - longer matches first)
    vehicle_map = [
        ("station wagon", "Station Wagon/Sport Utility Vehicle"),
        ("pickup truck", "Pick-up Truck"),
        ("sport utility", "Station Wagon/Sport Utility Vehicle"),
        ("pickup", "Pick-up Truck"),
        ("sedan", "Sedan"),
        ("suv", "Station Wagon/Sport Utility Vehicle"),
        ("van", "Van"),
        ("taxi", "Taxi"),
        ("motorcycle", "Motorcycle"),
        ("ambulance", "Ambulance"),
        ("bus", "Bus"),
        ("truck", "Truck"),
        ("car", "Sedan"),  # Generic fallback
        ("vehicle", "Sedan"),  # Very generic fallback
    ]
    
    for keyword, vehicle_type in vehicle_map:
        if keyword in text:
            filters["vehicle_type"] = vehicle_type
            break

    # Contributing factors
    factor_keywords = {
        "unsafe speed": "Unsafe Speed",
        "failure to yield": "Failure To Yield Right-Of-Way",
        "driver inattention": "Driver Inattention/Distraction",
        "following too closely": "Following Too Closely",
        "backing unsafely": "Backing Unsafely"
    }
    
    for keyword, factor in factor_keywords.items():
        if keyword in text:
            filters["contributing_factor"] = factor
            break

    return filters
