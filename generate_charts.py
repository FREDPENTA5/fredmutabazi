import urllib.request
import json
import os

out_dir = "projects"
if not os.path.exists(out_dir):
    os.makedirs(out_dir)

# 1. Claims Dashboard Chart
chart_config = {
    "type": "bar",
    "data": {
        "labels": ["Auto", "Property", "Health", "Travel", "Liability"],
        "datasets": [
            {
                "type": "bar",
                "label": "Total Claim Volume (Count)",
                "backgroundColor": "#800000",
                "data": [12500, 8300, 21000, 4200, 1500],
                "yAxisID": "y"
            },
            {
                "type": "line",
                "label": "Avg Processing Time (Days)",
                "borderColor": "#424242",
                "borderWidth": 4,
                "fill": False,
                "data": [14, 22, 5, 8, 45],
                "yAxisID": "y1"
            }
        ]
    },
    "options": {
        "plugins": {
            "title": {
                "display": True,
                "text": "Insurance Claims Volume vs. Resolution Time by Category",
                "font": {"size": 20, "weight": "bold"}
            }
        },
        "scales": {
            "y": {
                "type": "linear",
                "display": True,
                "position": "left",
                "title": {"display": True, "text": "Total Claim Volume"}
            },
            "y1": {
                "type": "linear",
                "display": True,
                "position": "right",
                "title": {"display": True, "text": "Avg Processing Time (Days)"},
                "grid": {"drawOnChartArea": False}
            }
        }
    }
}

post_data = json.dumps({"chart": chart_config, "width": 800, "height": 500, "backgroundColor": "white"}).encode('utf-8')
req = urllib.request.Request("https://quickchart.io/chart", data=post_data, headers={'Content-Type': 'application/json'})

try:
    with urllib.request.urlopen(req) as response:
        with open(os.path.join(out_dir, "claims_dashboard.png"), 'wb') as out_file:
            out_file.write(response.read())
    print("Downloaded claims_dashboard.png successfully.")
except Exception as e:
    print(f"Error: {e}")
