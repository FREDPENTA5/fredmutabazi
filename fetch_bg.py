import urllib.request
import urllib.parse
import json

c1 = {
  "type": "line",
  "data": {
    "labels": ["1","2","3","4","5","6","7","8","9"],
    "datasets": [{
      "data": [10, 45, 30, 70, 55, 90, 80, 110, 95],
      "borderColor": "rgba(128, 0, 0, 0.4)",
      "borderWidth": 4,
      "fill": True,
      "backgroundColor": "rgba(128, 0, 0, 0.05)",
      "tension": 0.4
    }]
  },
  "options": {
    "legend": { "display": False },
    "scales": {
      "xAxes": [{ "display": False }],
      "yAxes": [{ "display": False }]
    },
    "elements": { "point": { "radius": 0 } },
    "layout": { "padding": 50 }
  }
}
url1 = "https://quickchart.io/chart?c=" + urllib.parse.quote(json.dumps(c1)) + "&w=1200&h=1000&bkg=transparent"

c2 = {
  "type": "bar",
  "data": {
    "labels": ["1","2","3","4","5","6","7","8","9","10","11","12"],
    "datasets": [{
      "data": [12, 19, 15, 25, 22, 30, 28, 35, 32, 45, 40, 50],
      "backgroundColor": "rgba(128, 0, 0, 0.15)"
    }]
  },
  "options": {
    "legend": { "display": False },
    "scales": {
      "xAxes": [{ "display": False }],
      "yAxes": [{ "display": False }]
    },
    "layout": { "padding": 50 }
  }
}
url2 = "https://quickchart.io/chart?c=" + urllib.parse.quote(json.dumps(c2)) + "&w=1200&h=1000&bkg=transparent"

print("Fetching beautiful Chart 1...")
urllib.request.urlretrieve(url1, "hero_bg1.png")
print("Fetching beautiful Chart 2...")
urllib.request.urlretrieve(url2, "hero_bg2.png")
print("Done")
