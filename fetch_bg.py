import urllib.request
import urllib.parse
import json

# Chart 1: Simple Line Chart
c1 = {
  "type": "line",
  "data": {
    "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    "datasets": [{
      "label": "Retention",
      "data": [100, 85, 75, 70, 68, 65, 63],
      "borderColor": "#800000",
      "fill": True,
      "backgroundColor": "rgba(128,0,0,0.1)"
    }]
  }
}
url1 = "https://quickchart.io/chart?c=" + urllib.parse.quote(json.dumps(c1)) + "&w=1200&h=600&bkg=white"

# Chart 2: Simple Bar Chart
c2 = {
  "type": "bar",
  "data": {
    "labels": ["Q1", "Q2", "Q3", "Q4"],
    "datasets": [{
      "label": "Claims",
      "data": [1200, 1500, 1100, 1800],
      "backgroundColor": "#222222"
    }]
  }
}
url2 = "https://quickchart.io/chart?c=" + urllib.parse.quote(json.dumps(c2)) + "&w=1200&h=600&bkg=white"

print("Fetching Chart 1...")
urllib.request.urlretrieve(url1, "hero_bg1.jpg")
print("Fetching Chart 2...")
urllib.request.urlretrieve(url2, "hero_bg2.jpg")
print("Done")
