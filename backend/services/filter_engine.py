import pandas as pd

def apply_filters(df, filters):
    """
    Applies dropdown filters sent from frontend.
    Also handles search mode with text queries.
    """
    df_filtered = df.copy()

    # Apply borough filter
    if filters.get("borough"):
        if "borough" in df_filtered.columns:
            df_filtered = df_filtered[df_filtered["borough"] == filters["borough"]]

    # Apply year filter
    if filters.get("year"):
        if "year" in df_filtered.columns:
            df_filtered = df_filtered[df_filtered["year"] == int(filters["year"])]

    # Apply vehicle type filter
    if filters.get("vehicle_type"):
        if "vehicle_type_code_1" in df_filtered.columns:
            # Check both vehicle_type_code_1 and vehicle_type_code_2
            mask1 = df_filtered["vehicle_type_code_1"] == filters["vehicle_type"]
            if "vehicle_type_code_2" in df_filtered.columns:
                mask2 = df_filtered["vehicle_type_code_2"] == filters["vehicle_type"]
                mask = mask1 | mask2
            else:
                mask = mask1
            df_filtered = df_filtered[mask]

    # Apply contributing factor filter
    if filters.get("contributing_factor"):
        if "contributing_factor_vehicle_1" in df_filtered.columns:
            # Check both contributing_factor_vehicle_1 and contributing_factor_vehicle_2
            mask1 = df_filtered["contributing_factor_vehicle_1"] == filters["contributing_factor"]
            if "contributing_factor_vehicle_2" in df_filtered.columns:
                mask2 = df_filtered["contributing_factor_vehicle_2"] == filters["contributing_factor"]
                mask = mask1 | mask2
            else:
                mask = mask1
            df_filtered = df_filtered[mask]

    # Apply injury type filter
    if filters.get("injury_type"):
        if filters["injury_type"] == "Injured":
            if "number_of_persons_injured" in df_filtered.columns:
                df_filtered = df_filtered[df_filtered["number_of_persons_injured"] > 0]
        elif filters["injury_type"] == "Killed":
            if "number_of_persons_killed" in df_filtered.columns:
                df_filtered = df_filtered[df_filtered["number_of_persons_killed"] > 0]
        elif filters["injury_type"] == "None":
            if "number_of_persons_injured" in df_filtered.columns and "number_of_persons_killed" in df_filtered.columns:
                df_filtered = df_filtered[
                    (df_filtered["number_of_persons_injured"] == 0) &
                    (df_filtered["number_of_persons_killed"] == 0)
                ]

    # Search mode: text search in multiple columns
    search = filters.get("search", "").strip()
    if search:
        search_lower = search.lower()
        search_cols = [
            "borough", "vehicle_type_code_1", "vehicle_type_code_2",
            "contributing_factor_vehicle_1", "contributing_factor_vehicle_2",
            "on_street_name", "cross_street_name", "off_street_name"
        ]
        
        search_mask = pd.Series([False] * len(df_filtered), index=df_filtered.index)
        for col in search_cols:
            if col in df_filtered.columns:
                # Convert to string, handle NaN, and search case-insensitively
                col_str = df_filtered[col].astype(str).str.lower().fillna('')
                search_mask = search_mask | col_str.str.contains(search_lower, na=False, regex=False)
        
        df_filtered = df_filtered[search_mask]

    return df_filtered
