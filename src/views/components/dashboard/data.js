export const statisticsCardOptions = {
  chart: {
    id: "subscribers",
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  grid: {
    show: false,
  },
  colors: ["#7367F0"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2.5,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 0.9,
      opacityFrom: 0.7,
      opacityTo: 0.5,
      stops: [0, 80, 100],
    },
  },

  xaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
  tooltip: {
    x: { show: false },
    y: { show: false },
  },
};
export const mapData = {
  title: "Saudi Arabia",
  version: "1.1.4",
  type: "FeatureCollection",
  copyright: "Copyright (c) 2021 Highsoft AS, Based on data from Natural Earth",
  copyrightShort: "Natural Earth",
  copyrightUrl: "http://www.naturalearthdata.com",
  crs: { type: "name", properties: { name: "urn:ogc:def:crs:EPSG:32638" } },
  "hc-transform": {
    default: {
      crs: "+proj=utm +zone=38 +datum=WGS84 +units=m +no_defs",
      scale: 0.00032887600928,
      jsonres: 15.5,
      jsonmarginX: -999,
      jsonmarginY: 9851.0,
      xoffset: -525691.526649,
      yoffset: 3568869.22221,
    },
  },
  features: [
    {
      type: "Feature",
      id: "SA.4293",
      properties: {
        "hc-group": "admin1",
        "hc-middle-x": 0.5,
        "hc-middle-y": 0.53,
        "hc-key": "sa-4293",
        "hc-a2": "NU",
        labelrank: "20",
        hasc: "-99",
        "alt-name": null,
        "woe-id": "-99",
        subregion: null,
        fips: null,
        "postal-code": null,
        name: null,
        country: "Saudi Arabia",
        "type-en": null,
        region: null,
        longitude: "41.6833",
        "woe-name": null,
        latitude: "16.9326",
        "woe-label": null,
        type: null,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [2430, 1199],
            [2410, 1212],
            [2427, 1235],
            [2448, 1220],
            [2430, 1199],
          ],
        ],
      },
    },
    {
      type: "Feature",
      id: "SA.TB",
      properties: {
        "hc-group": "admin1",
        "hc-middle-x": 0.45,
        "hc-middle-y": 0.25,
        "hc-key": "sa-tb",
        "hc-a2": "TB",
        labelrank: "6",
        hasc: "SA.TB",
        "alt-name": "Tabouk",
        "woe-id": "2346962",
        subregion: null,
        fips: "SA19",
        "postal-code": "TB",
        name: "Tabuk",
        country: "Saudi Arabia",
        "type-en": "Region",
        region: null,
        longitude: "36.8014",
        "woe-name": "Tabuk",
        latitude: "27.9146",
        "woe-label": "Tabuk, SA, Saudi Arabia",
        type: "Emirate|Mintaqah",
      },
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [-42, 6201],
              [-132, 6246],
              [-117, 6267],
              [-61, 6213],
              [-16, 6205],
              [72, 6123],
              [66, 6083],
              [15, 6165],
              [-42, 6201],
            ],
          ],
          [
            [
              [1224, 7616],
              [1252, 7593],
              [1412, 7547],
              [1457, 7523],
              [1610, 7387],
              [1667, 7138],
              [1787, 7035],
              [1781, 7000],
              [1699, 6927],
              [1598, 6742],
              [1550, 6785],
              [1338, 6761],
              [1242, 6775],
              [1183, 6825],
              [1091, 6873],
              [1052, 6914],
              [1050, 6872],
              [930, 6896],
              [852, 6851],
              [789, 6985],
              [657, 7036],
              [602, 7178],
              [561, 7211],
              [463, 7166],
              [393, 7175],
              [289, 7217],
              [155, 7164],
              [95, 7154],
              [72, 7122],
              [140, 7116],
              [172, 7080],
              [160, 6922],
              [191, 6824],
              [291, 6772],
              [287, 6724],
              [237, 6628],
              [282, 6479],
              [332, 6496],
              [421, 6438],
              [457, 6359],
              [543, 6260],
              [575, 6134],
              [631, 6122],
              [648, 6089],
              [623, 5961],
              [619, 5774],
              [588, 5733],
              [479, 5727],
              [426, 5680],
              [318, 5668],
              [289, 5602],
              [178, 5786],
              [234, 5794],
              [249, 5846],
              [231, 5978],
              [171, 6055],
              [95, 6244],
              [38, 6311],
              [-10, 6312],
              [-38, 6372],
              [-15, 6466],
              [-95, 6505],
              [-164, 6654],
              [-231, 6824],
              [-294, 6902],
              [-321, 6991],
              [-415, 7105],
              [-421, 7161],
              [-538, 7321],
              [-565, 7425],
              [-670, 7617],
              [-714, 7652],
              [-685, 7676],
              [-765, 7720],
              [-830, 7702],
              [-859, 7724],
              [-970, 7725],
              [-991, 7688],
              [-999, 7747],
              [-965, 7764],
              [-948, 7826],
              [-870, 7963],
              [-876, 8042],
              [-833, 8164],
              [-756, 8161],
              [-645, 8135],
              [-565, 8167],
              [-461, 8179],
              [-322, 8179],
              [-226, 8148],
              [-178, 8108],
              [-61, 7931],
              [-14, 7915],
              [164, 7950],
              [232, 7941],
              [348, 7899],
              [460, 7896],
              [514, 7989],
              [603, 8048],
              [629, 8012],
              [619, 7838],
              [650, 7758],
              [704, 7714],
              [789, 7684],
              [906, 7667],
              [954, 7681],
              [1023, 7660],
              [1053, 7609],
              [1177, 7641],
              [1224, 7616],
            ],
          ],
        ],
      },
    },
    {
      type: "Feature",
      id: "SA.JZ",
      properties: {
        "hc-group": "admin1",
        "hc-middle-x": 0.66,
        "hc-middle-y": 0.44,
        "hc-key": "sa-jz",
        "hc-a2": "JZ",
        labelrank: "7",
        hasc: "SA.JZ",
        "alt-name": "Jazan|Qizan",
        "woe-id": "2346956",
        subregion: null,
        fips: "SA17",
        "postal-code": "JZ",
        name: "Jizan",
        country: "Saudi Arabia",
        "type-en": "Region",
        region: null,
        longitude: "42.726",
        "woe-name": "Jizan",
        latitude: "17.3028",
        "woe-label": "Jizan, SA, Saudi Arabia",
        type: "Emirate|Mintaqah",
      },
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [2544, 1113],
              [2605, 1105],
              [2626, 1146],
              [2700, 1084],
              [2682, 1017],
              [2638, 1046],
              [2645, 1078],
              [2585, 1062],
              [2479, 1148],
              [2468, 1196],
              [2506, 1174],
              [2544, 1113],
            ],
          ],
          [
            [
              [2571, 1220],
              [2566, 1152],
              [2547, 1142],
              [2510, 1192],
              [2571, 1220],
            ],
          ],
          [
            [
              [2489, 1996],
              [2571, 1994],
              [2571, 1854],
              [2651, 1842],
              [2699, 1772],
              [2808, 1760],
              [2947, 1620],
              [2981, 1643],
              [3007, 1736],
              [3036, 1779],
              [3110, 1806],
              [3129, 1735],
              [3226, 1620],
              [3268, 1605],
              [3332, 1516],
              [3235, 1428],
              [3280, 1386],
              [3230, 1363],
              [3203, 1203],
              [3256, 1116],
              [3231, 1053],
              [3188, 1060],
              [3161, 983],
              [3090, 952],
              [3071, 908],
              [3026, 891],
              [3026, 948],
              [2992, 1002],
              [2999, 1061],
              [2945, 1143],
              [2894, 1179],
              [2897, 1250],
              [2851, 1270],
              [2821, 1341],
              [2787, 1347],
              [2768, 1506],
              [2538, 1716],
              [2457, 1768],
              [2394, 1889],
              [2418, 1931],
              [2489, 1996],
            ],
          ],
        ],
      },
    },
    {
      type: "Feature",
      id: "SA.NJ",
      properties: {
        "hc-group": "admin1",
        "hc-middle-x": 0.54,
        "hc-middle-y": 0.5,
        "hc-key": "sa-nj",
        "hc-a2": "NJ",
        labelrank: "6",
        hasc: "SA.NJ",
        "alt-name": null,
        "woe-id": "2346960",
        subregion: null,
        fips: "SA16",
        "postal-code": "NJ",
        name: "Najran",
        country: "Saudi Arabia",
        "type-en": "Region",
        region: null,
        longitude: "45.6917",
        "woe-name": "Najran",
        latitude: "18.2931",
        "woe-label": "Najran, SA, Saudi Arabia",
        type: "Emirate|Mintaqah",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [5547, 1300],
            [5419, 1223],
            [5299, 1221],
            [5176, 1388],
            [5156, 1399],
            [4946, 1368],
            [4463, 1416],
            [4319, 1481],
            [4038, 1483],
            [3992, 1468],
            [3907, 1476],
            [3745, 1439],
            [3553, 1437],
            [3492, 1490],
            [3508, 1564],
            [3496, 1628],
            [3515, 1805],
            [3495, 1902],
            [3526, 1970],
            [3674, 2112],
            [3725, 2195],
            [3871, 2265],
            [3905, 2326],
            [3886, 2463],
            [3916, 2523],
            [3965, 2555],
            [3971, 2657],
            [4120, 2564],
            [4237, 2522],
            [4376, 2513],
            [5629, 2658],
            [5698, 2679],
            [5547, 1301],
            [5547, 1300],
          ],
        ],
      },
    },
    {
      type: "Feature",
      id: "SA.RI",
      properties: {
        "hc-group": "admin1",
        "hc-middle-x": 0.54,
        "hc-middle-y": 0.53,
        "hc-key": "sa-ri",
        "hc-a2": "RI",
        labelrank: "6",
        hasc: "SA.RI",
        "alt-name": "Riyad|Riad|Riyadh",
        "woe-id": "2346951",
        subregion: null,
        fips: "SA10",
        "postal-code": "RI",
        name: "Ar Riyad",
        country: "Saudi Arabia",
        "type-en": "Region",
        region: null,
        longitude: "45.1404",
        "woe-name": "Ar Riyad",
        latitude: "23.3432",
        "woe-label": "Ar Riyad, SA, Saudi Arabia",
        type: "Emirate|Mintaqah",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [5698, 2679],
            [5629, 2658],
            [4376, 2513],
            [4237, 2522],
            [4120, 2564],
            [3971, 2657],
            [3753, 2858],
            [3663, 2994],
            [3681, 3122],
            [3731, 3237],
            [3600, 3415],
            [3523, 3485],
            [3387, 3692],
            [3378, 3739],
            [3404, 3845],
            [3399, 3939],
            [3444, 4050],
            [3420, 4239],
            [3436, 4345],
            [3344, 4378],
            [3259, 4361],
            [3189, 4387],
            [3175, 4436],
            [3189, 4528],
            [3140, 4576],
            [2921, 4592],
            [2846, 4637],
            [2782, 4799],
            [2725, 5013],
            [2660, 5088],
            [2666, 5177],
            [2679, 5434],
            [2731, 5550],
            [2776, 5622],
            [2833, 5644],
            [2946, 5596],
            [3039, 5585],
            [3139, 5595],
            [3203, 5581],
            [3268, 5634],
            [3245, 5709],
            [3306, 5804],
            [3380, 5866],
            [3552, 5905],
            [3650, 5973],
            [3712, 6064],
            [3784, 6086],
            [3893, 6071],
            [4082, 6080],
            [4090, 6180],
            [4060, 6256],
            [4064, 6318],
            [3912, 6547],
            [3921, 6684],
            [3988, 6722],
            [4067, 6818],
            [4139, 6856],
            [4136, 6938],
            [4042, 7008],
            [4040, 7087],
            [4099, 7165],
            [4128, 7176],
            [4180, 7141],
            [4225, 7183],
            [4309, 7103],
            [4353, 7013],
            [4497, 6931],
            [4569, 6919],
            [4670, 6820],
            [4724, 6796],
            [4808, 6794],
            [4885, 6765],
            [5011, 6676],
            [5169, 6669],
            [5289, 6551],
            [5453, 6488],
            [5485, 6428],
            [5511, 5671],
            [5536, 5615],
            [5722, 5488],
            [5855, 5359],
            [5936, 5208],
            [5945, 5014],
            [5822, 3793],
            [5698, 2679],
          ],
        ],
      },
    },
    {
      type: "Feature",
      id: "SA.MD",
      properties: {
        "hc-group": "admin1",
        "hc-middle-x": 0.57,
        "hc-middle-y": 0.59,
        "hc-key": "sa-md",
        "hc-a2": "MD",
        labelrank: "6",
        hasc: "SA.MD",
        "alt-name": "Madinah|Al Madinah al Munawwarah|Monwarah|Medina|Médine",
        "woe-id": "2346958",
        subregion: null,
        fips: "SA05",
        "postal-code": "MD",
        name: "Al Madinah",
        country: "Saudi Arabia",
        "type-en": "Region",
        region: null,
        longitude: "39.4378",
        "woe-name": "Al Madinah",
        latitude: "24.9279",
        "woe-label": "Al Madinah, SA, Saudi Arabia",
        type: "Emirate|Mintaqah",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [2731, 5550],
            [2679, 5434],
            [2666, 5177],
            [2565, 5187],
            [2536, 5165],
            [2548, 5056],
            [2496, 4984],
            [2334, 4910],
            [2291, 4851],
            [2368, 4800],
            [2351, 4745],
            [2289, 4724],
            [2184, 4632],
            [2031, 4518],
            [1956, 4424],
            [1823, 4445],
            [1718, 4378],
            [1658, 4385],
            [1637, 4518],
            [1558, 4560],
            [1585, 4659],
            [1572, 4753],
            [1501, 4754],
            [1348, 4717],
            [1322, 4776],
            [1203, 4779],
            [1049, 4945],
            [915, 4934],
            [896, 5020],
            [864, 5007],
            [824, 5145],
            [781, 5196],
            [690, 5261],
            [637, 5317],
            [528, 5368],
            [434, 5453],
            [408, 5430],
            [353, 5444],
            [308, 5503],
            [324, 5544],
            [289, 5602],
            [318, 5668],
            [426, 5680],
            [479, 5727],
            [588, 5733],
            [619, 5774],
            [623, 5961],
            [648, 6089],
            [631, 6122],
            [575, 6134],
            [543, 6260],
            [457, 6359],
            [421, 6438],
            [332, 6496],
            [282, 6479],
            [237, 6628],
            [287, 6724],
            [291, 6772],
            [191, 6824],
            [160, 6922],
            [172, 7080],
            [140, 7116],
            [72, 7122],
            [95, 7154],
            [155, 7164],
            [289, 7217],
            [393, 7175],
            [463, 7166],
            [561, 7211],
            [602, 7178],
            [657, 7036],
            [789, 6985],
            [852, 6851],
            [930, 6896],
            [1050, 6872],
            [1052, 6914],
            [1091, 6873],
            [1183, 6825],
            [1242, 6775],
            [1338, 6761],
            [1550, 6785],
            [1598, 6742],
            [1608, 6679],
            [1578, 6576],
            [1646, 6564],
            [1663, 6530],
            [1627, 6342],
            [1648, 6191],
            [1637, 6040],
            [1659, 5992],
            [1721, 5977],
            [1850, 6018],
            [1987, 6026],
            [2057, 6093],
            [2115, 6120],
            [2204, 6121],
            [2390, 6081],
            [2492, 6049],
            [2515, 6004],
            [2501, 5858],
            [2539, 5800],
            [2621, 5771],
            [2662, 5626],
            [2731, 5550],
          ],
        ],
      },
    },
    {
      type: "Feature",
      id: "SA.HA",
      properties: {
        "hc-group": "admin1",
        "hc-middle-x": 0.41,
        "hc-middle-y": 0.48,
        "hc-key": "sa-ha",
        "hc-a2": "HA",
        labelrank: "6",
        hasc: "SA.HA",
        "alt-name": "Hail",
        "woe-id": "2346957",
        subregion: null,
        fips: "SA13",
        "postal-code": "HA",
        name: "Ha'il",
        country: "Saudi Arabia",
        "type-en": "Region",
        region: null,
        longitude: "41.7076",
        "woe-name": "Ha'il",
        latitude: "27.2652",
        "woe-label": "Hail, SA, Saudi Arabia",
        type: "Emirate|Mintaqah",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [4128, 7176],
            [4099, 7165],
            [4040, 7087],
            [4042, 7008],
            [3981, 6935],
            [3944, 6922],
            [3824, 6950],
            [3724, 7041],
            [3671, 7070],
            [3623, 7057],
            [3430, 6961],
            [3349, 6891],
            [3291, 6809],
            [3174, 6761],
            [2977, 6618],
            [2871, 6479],
            [2811, 6474],
            [2773, 6414],
            [2777, 6310],
            [2677, 6320],
            [2646, 6251],
            [2669, 6181],
            [2563, 6154],
            [2390, 6081],
            [2204, 6121],
            [2115, 6120],
            [2057, 6093],
            [1987, 6026],
            [1850, 6018],
            [1721, 5977],
            [1659, 5992],
            [1637, 6040],
            [1648, 6191],
            [1627, 6342],
            [1663, 6530],
            [1646, 6564],
            [1578, 6576],
            [1608, 6679],
            [1598, 6742],
            [1699, 6927],
            [1781, 7000],
            [1787, 7035],
            [1667, 7138],
            [1610, 7387],
            [1457, 7523],
            [1412, 7547],
            [1252, 7593],
            [1224, 7616],
            [1306, 7688],
            [1500, 7769],
            [1588, 7790],
            [1778, 7887],
            [1970, 7957],
            [2012, 7949],
            [2108, 7914],
            [2375, 7966],
            [2448, 7965],
            [2567, 7922],
            [2738, 7935],
            [2907, 7891],
            [2952, 7864],
            [3042, 7767],
            [3101, 7755],
            [3217, 7793],
            [3246, 7699],
            [3274, 7674],
            [3382, 7667],
            [3478, 7631],
            [3588, 7685],
            [3621, 7659],
            [3704, 7506],
            [3746, 7394],
            [3819, 7335],
            [3974, 7310],
            [4025, 7283],
            [4128, 7176],
          ],
        ],
      },
    },
    {
      type: "Feature",
      id: "SA.QS",
      properties: {
        "hc-group": "admin1",
        "hc-middle-x": 0.5,
        "hc-middle-y": 0.5,
        "hc-key": "sa-qs",
        "hc-a2": "QS",
        labelrank: "4",
        hasc: "SA.QS",
        "alt-name": "Al Gassim|Gasim|Qaseem|Al Qasseem",
        "woe-id": "2346952",
        subregion: null,
        fips: "SA08",
        "postal-code": "QS",
        name: "Al Quassim",
        country: "Saudi Arabia",
        "type-en": "Region",
        region: null,
        longitude: "43.2716",
        "woe-name": "Al Quassim",
        latitude: "25.9478",
        "woe-label": "Al Qasim, SA, Saudi Arabia",
        type: "Emirate|Mintaqah",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [2390, 6081],
            [2563, 6154],
            [2669, 6181],
            [2646, 6251],
            [2677, 6320],
            [2777, 6310],
            [2773, 6414],
            [2811, 6474],
            [2871, 6479],
            [2977, 6618],
            [3174, 6761],
            [3291, 6809],
            [3349, 6891],
            [3430, 6961],
            [3623, 7057],
            [3671, 7070],
            [3724, 7041],
            [3824, 6950],
            [3944, 6922],
            [3981, 6935],
            [4042, 7008],
            [4136, 6938],
            [4139, 6856],
            [4067, 6818],
            [3988, 6722],
            [3921, 6684],
            [3912, 6547],
            [4064, 6318],
            [4060, 6256],
            [4090, 6180],
            [4082, 6080],
            [3893, 6071],
            [3784, 6086],
            [3712, 6064],
            [3650, 5973],
            [3552, 5905],
            [3380, 5866],
            [3306, 5804],
            [3245, 5709],
            [3268, 5634],
            [3203, 5581],
            [3139, 5595],
            [3039, 5585],
            [2946, 5596],
            [2833, 5644],
            [2776, 5622],
            [2731, 5550],
            [2662, 5626],
            [2621, 5771],
            [2539, 5800],
            [2501, 5858],
            [2515, 6004],
            [2492, 6049],
            [2390, 6081],
          ],
        ],
      },
    },
    {
      type: "Feature",
      id: "SA.HS",
      properties: {
        "hc-group": "admin1",
        "hc-middle-x": 0.62,
        "hc-middle-y": 0.65,
        "hc-key": "sa-hs",
        "hc-a2": "HS",
        labelrank: "4",
        hasc: "SA.HS",
        "alt-name": "Northern Frontier",
        "woe-id": "2346961",
        subregion: null,
        fips: "SA15",
        "postal-code": "HS",
        name: "Al Hudud ash Shamaliyah",
        country: "Saudi Arabia",
        "type-en": "Region",
        region: null,
        longitude: "43.3124",
        "woe-name": "Al Hudud ash Shamaliyah",
        latitude: "29.227",
        "woe-label": "Al Hudud ash Shamaliyah, SA, Saudi Arabia",
        type: "Emirate|Mintaqah",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [4225, 7183],
            [4180, 7141],
            [4128, 7176],
            [4025, 7283],
            [3974, 7310],
            [3819, 7335],
            [3746, 7394],
            [3704, 7506],
            [3621, 7659],
            [3588, 7685],
            [3478, 7631],
            [3382, 7667],
            [3274, 7674],
            [3246, 7699],
            [3217, 7793],
            [3101, 7755],
            [3042, 7767],
            [2952, 7864],
            [2907, 7891],
            [2738, 7935],
            [2567, 7922],
            [2448, 7965],
            [2375, 7966],
            [2108, 7914],
            [2012, 7949],
            [2102, 8050],
            [2121, 8238],
            [2158, 8296],
            [2213, 8335],
            [2633, 8579],
            [2698, 8632],
            [2697, 8676],
            [2602, 8759],
            [2559, 8849],
            [2500, 8903],
            [2376, 8918],
            [2252, 9014],
            [1874, 9043],
            [1800, 9069],
            [1727, 9124],
            [1400, 9191],
            [1335, 9196],
            [1183, 9182],
            [964, 9173],
            [880, 9216],
            [846, 9291],
            [767, 9384],
            [767, 9464],
            [840, 9676],
            [1320, 9784],
            [1418, 9851],
            [1835, 9758],
            [1998, 9719],
            [2050, 9691],
            [2807, 9205],
            [3182, 8866],
            [4077, 8126],
            [4090, 8121],
            [4903, 8051],
            [4938, 8059],
            [4697, 7960],
            [4628, 7921],
            [4511, 7787],
            [4336, 7456],
            [4227, 7318],
            [4199, 7232],
            [4225, 7183],
          ],
        ],
      },
    },
    {
      type: "Feature",
      id: "SA.JF",
      properties: {
        "hc-group": "admin1",
        "hc-middle-x": 0.58,
        "hc-middle-y": 0.62,
        "hc-key": "sa-jf",
        "hc-a2": "JF",
        labelrank: "4",
        hasc: "SA.JF",
        "alt-name": "JawfAl Joaf|Al-Jouf|Jowf",
        "woe-id": "2346950",
        subregion: null,
        fips: "SA03",
        "postal-code": "JF",
        name: "Al Jawf",
        country: "Saudi Arabia",
        "type-en": "Region",
        region: null,
        longitude: "38.3651",
        "woe-name": "Al Jawf",
        latitude: "29.5589",
        "woe-label": "Al Jawf, SA, Saudi Arabia",
        type: "Emirate|Mintaqah",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [2012, 7949],
            [1970, 7957],
            [1778, 7887],
            [1588, 7790],
            [1500, 7769],
            [1306, 7688],
            [1224, 7616],
            [1177, 7641],
            [1053, 7609],
            [1023, 7660],
            [954, 7681],
            [906, 7667],
            [789, 7684],
            [704, 7714],
            [650, 7758],
            [619, 7838],
            [629, 8012],
            [603, 8048],
            [514, 7989],
            [460, 7896],
            [348, 7899],
            [232, 7941],
            [164, 7950],
            [-14, 7915],
            [-61, 7931],
            [-178, 8108],
            [-226, 8148],
            [-322, 8179],
            [-461, 8179],
            [-565, 8167],
            [-645, 8135],
            [-756, 8161],
            [-833, 8164],
            [-821, 8255],
            [-757, 8426],
            [-232, 8290],
            [-205, 8294],
            [10, 8446],
            [137, 8629],
            [164, 8647],
            [522, 8695],
            [615, 8871],
            [634, 8889],
            [792, 8966],
            [565, 9269],
            [331, 9562],
            [840, 9676],
            [767, 9464],
            [767, 9384],
            [846, 9291],
            [880, 9216],
            [964, 9173],
            [1183, 9182],
            [1335, 9196],
            [1400, 9191],
            [1727, 9124],
            [1800, 9069],
            [1874, 9043],
            [2252, 9014],
            [2376, 8918],
            [2500, 8903],
            [2559, 8849],
            [2602, 8759],
            [2697, 8676],
            [2698, 8632],
            [2633, 8579],
            [2213, 8335],
            [2158, 8296],
            [2121, 8238],
            [2102, 8050],
            [2012, 7949],
          ],
        ],
      },
    },
    {
      type: "Feature",
      id: "SA.SH",
      properties: {
        "hc-group": "admin1",
        "hc-middle-x": 0.51,
        "hc-middle-y": 0.57,
        "hc-key": "sa-sh",
        "hc-a2": "SH",
        labelrank: "4",
        hasc: "SA.SH",
        "alt-name": "Eastern Province",
        "woe-id": "2346954",
        subregion: null,
        fips: "SA06",
        "postal-code": "SH",
        name: "Ash Sharqiyah",
        country: "Saudi Arabia",
        "type-en": "Region",
        region: null,
        longitude: "50.1714",
        "woe-name": "Ash Sharqiyah",
        latitude: "22.9875",
        "woe-label": "Ash Sharqiyah, SA, Saudi Arabia",
        type: "Emirate|Mintaqah",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [5547, 1300],
            [5547, 1301],
            [5698, 2679],
            [5822, 3793],
            [5945, 5014],
            [5936, 5208],
            [5855, 5359],
            [5722, 5488],
            [5536, 5615],
            [5511, 5671],
            [5485, 6428],
            [5453, 6488],
            [5289, 6551],
            [5169, 6669],
            [5011, 6676],
            [4885, 6765],
            [4808, 6794],
            [4724, 6796],
            [4670, 6820],
            [4569, 6919],
            [4497, 6931],
            [4353, 7013],
            [4309, 7103],
            [4225, 7183],
            [4199, 7232],
            [4227, 7318],
            [4336, 7456],
            [4511, 7787],
            [4628, 7921],
            [4697, 7960],
            [4938, 8059],
            [4990, 8070],
            [5438, 8021],
            [5469, 7970],
            [5524, 7805],
            [5560, 7763],
            [5942, 7776],
            [5995, 7703],
            [5997, 7641],
            [6040, 7596],
            [6036, 7545],
            [6177, 7385],
            [6140, 7372],
            [6130, 7314],
            [6179, 7258],
            [6226, 7264],
            [6283, 7224],
            [6365, 7226],
            [6413, 7036],
            [6440, 7005],
            [6517, 6998],
            [6609, 6903],
            [6734, 6851],
            [6840, 6755],
            [6758, 6767],
            [6787, 6647],
            [6871, 6599],
            [6882, 6467],
            [6858, 6464],
            [6854, 6390],
            [6812, 6466],
            [6767, 6445],
            [6834, 6362],
            [6846, 6294],
            [6916, 6190],
            [6862, 6218],
            [6972, 6080],
            [7032, 6063],
            [7068, 5977],
            [7082, 5879],
            [7181, 5748],
            [7189, 5692],
            [7319, 5576],
            [7380, 5575],
            [7468, 5615],
            [7488, 5555],
            [7534, 5609],
            [7561, 5580],
            [7493, 5492],
            [7483, 5433],
            [7551, 5448],
            [7634, 5414],
            [7651, 5313],
            [8177, 4700],
            [8201, 4688],
            [9543, 4592],
            [9583, 4642],
            [9843, 4270],
            [9851, 4245],
            [9571, 3089],
            [7981, 2440],
            [6451, 2174],
            [6402, 2155],
            [5935, 1902],
            [5631, 1510],
            [5547, 1300],
          ],
        ],
      },
    },
    {
      type: "Feature",
      id: "SA.BA",
      properties: {
        "hc-group": "admin1",
        "hc-middle-x": 0.47,
        "hc-middle-y": 0.45,
        "hc-key": "sa-ba",
        "hc-a2": "BA",
        labelrank: "4",
        hasc: "SA.BA",
        "alt-name": "Baha",
        "woe-id": "2346949",
        subregion: null,
        fips: "SA02",
        "postal-code": "BA",
        name: "Al Bahah",
        country: "Saudi Arabia",
        "type-en": "Region",
        region: null,
        longitude: "41.4165",
        "woe-name": "Al Bahah",
        latitude: "20.1605",
        "woe-label": "Al Baha, SA, Saudi Arabia",
        type: "Emirate|Mintaqah",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [2653, 3299],
            [2626, 3212],
            [2649, 3156],
            [2623, 3102],
            [2548, 3048],
            [2522, 2950],
            [2466, 2834],
            [2362, 2820],
            [2336, 2784],
            [2274, 2613],
            [2242, 2596],
            [2179, 2614],
            [2073, 2720],
            [2064, 2850],
            [2072, 2908],
            [2051, 2958],
            [1992, 2986],
            [2052, 3068],
            [2160, 3094],
            [2235, 3219],
            [2226, 3314],
            [2238, 3361],
            [2282, 3384],
            [2330, 3352],
            [2384, 3274],
            [2515, 3293],
            [2588, 3328],
            [2653, 3299],
          ],
        ],
      },
    },
    {
      type: "Feature",
      id: "SA.AS",
      properties: {
        "hc-group": "admin1",
        "hc-middle-x": 0.49,
        "hc-middle-y": 0.5,
        "hc-key": "sa-as",
        "hc-a2": "AS",
        labelrank: "4",
        hasc: "SA.AS",
        "alt-name": "Asir|Aseer|Assyear",
        "woe-id": "2346955",
        subregion: null,
        fips: "SA11",
        "postal-code": "AS",
        name: "`Asir",
        country: "Saudi Arabia",
        "type-en": "Region",
        region: null,
        longitude: "42.9503",
        "woe-name": "`Asir",
        latitude: "19.3484",
        "woe-label": "Asir, SA, Saudi Arabia",
        type: "Emirate|Mintaqah",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [2466, 2834],
            [2522, 2950],
            [2548, 3048],
            [2623, 3102],
            [2649, 3156],
            [2626, 3212],
            [2653, 3299],
            [2715, 3170],
            [2756, 3139],
            [2836, 3173],
            [2973, 3293],
            [3143, 3396],
            [3286, 3425],
            [3383, 3416],
            [3523, 3485],
            [3600, 3415],
            [3731, 3237],
            [3681, 3122],
            [3663, 2994],
            [3753, 2858],
            [3971, 2657],
            [3965, 2555],
            [3916, 2523],
            [3886, 2463],
            [3905, 2326],
            [3871, 2265],
            [3725, 2195],
            [3674, 2112],
            [3526, 1970],
            [3495, 1902],
            [3515, 1805],
            [3496, 1628],
            [3508, 1564],
            [3492, 1490],
            [3383, 1538],
            [3332, 1516],
            [3268, 1605],
            [3226, 1620],
            [3129, 1735],
            [3110, 1806],
            [3036, 1779],
            [3007, 1736],
            [2981, 1643],
            [2947, 1620],
            [2808, 1760],
            [2699, 1772],
            [2651, 1842],
            [2571, 1854],
            [2571, 1994],
            [2489, 1996],
            [2509, 2115],
            [2474, 2227],
            [2438, 2258],
            [2333, 2265],
            [2287, 2343],
            [2294, 2474],
            [2401, 2510],
            [2532, 2521],
            [2564, 2599],
            [2536, 2705],
            [2551, 2813],
            [2523, 2842],
            [2466, 2834],
          ],
        ],
      },
    },
    {
      type: "Feature",
      id: "SA.MK",
      properties: {
        "hc-group": "admin1",
        "hc-middle-x": 0.48,
        "hc-middle-y": 0.41,
        "hc-key": "sa-mk",
        "hc-a2": "MK",
        labelrank: "6",
        hasc: "SA.MK",
        "alt-name":
          "La Meca|La Mecca|La Mecque|Makka|Makkah al-Mukarramah|Mecca|Meca|Mecka|Mekka",
        "woe-id": "2346959",
        subregion: null,
        fips: "SA14",
        "postal-code": "MK",
        name: "Makkah",
        country: "Saudi Arabia",
        "type-en": "Region",
        region: null,
        longitude: "40.2542",
        "woe-name": "Makkah",
        latitude: "21.4348",
        "woe-label": "Makka, SA, Saudi Arabia",
        type: "Emirate|Mintaqah",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [3523, 3485],
            [3383, 3416],
            [3286, 3425],
            [3143, 3396],
            [2973, 3293],
            [2836, 3173],
            [2756, 3139],
            [2715, 3170],
            [2653, 3299],
            [2588, 3328],
            [2515, 3293],
            [2384, 3274],
            [2330, 3352],
            [2282, 3384],
            [2238, 3361],
            [2226, 3314],
            [2235, 3219],
            [2160, 3094],
            [2052, 3068],
            [1992, 2986],
            [2051, 2958],
            [2072, 2908],
            [2064, 2850],
            [2073, 2720],
            [2179, 2614],
            [2242, 2596],
            [2274, 2613],
            [2336, 2784],
            [2362, 2820],
            [2466, 2834],
            [2523, 2842],
            [2551, 2813],
            [2536, 2705],
            [2564, 2599],
            [2532, 2521],
            [2401, 2510],
            [2294, 2474],
            [2287, 2343],
            [2333, 2265],
            [2438, 2258],
            [2474, 2227],
            [2509, 2115],
            [2489, 1996],
            [2418, 1931],
            [2394, 1889],
            [2328, 1979],
            [2312, 2084],
            [2191, 2219],
            [2214, 2295],
            [2173, 2317],
            [2155, 2366],
            [2178, 2428],
            [2121, 2462],
            [2105, 2541],
            [2063, 2587],
            [2059, 2678],
            [1975, 2732],
            [1979, 2798],
            [1946, 2842],
            [1894, 2845],
            [1845, 2909],
            [1840, 2948],
            [1706, 3038],
            [1602, 3133],
            [1524, 3122],
            [1439, 3174],
            [1380, 3239],
            [1303, 3380],
            [1311, 3402],
            [1203, 3507],
            [1141, 3661],
            [1096, 3732],
            [1146, 3781],
            [1142, 3840],
            [1108, 3880],
            [1104, 3954],
            [1040, 4079],
            [1033, 4138],
            [1071, 4123],
            [1095, 4255],
            [1152, 4340],
            [1114, 4328],
            [1124, 4430],
            [1042, 4612],
            [1070, 4616],
            [1035, 4671],
            [993, 4683],
            [992, 4746],
            [946, 4829],
            [915, 4934],
            [1049, 4945],
            [1203, 4779],
            [1322, 4776],
            [1348, 4717],
            [1501, 4754],
            [1572, 4753],
            [1585, 4659],
            [1558, 4560],
            [1637, 4518],
            [1658, 4385],
            [1718, 4378],
            [1823, 4445],
            [1956, 4424],
            [2031, 4518],
            [2184, 4632],
            [2289, 4724],
            [2351, 4745],
            [2368, 4800],
            [2291, 4851],
            [2334, 4910],
            [2496, 4984],
            [2548, 5056],
            [2536, 5165],
            [2565, 5187],
            [2666, 5177],
            [2660, 5088],
            [2725, 5013],
            [2782, 4799],
            [2846, 4637],
            [2921, 4592],
            [3140, 4576],
            [3189, 4528],
            [3175, 4436],
            [3189, 4387],
            [3259, 4361],
            [3344, 4378],
            [3436, 4345],
            [3420, 4239],
            [3444, 4050],
            [3399, 3939],
            [3404, 3845],
            [3378, 3739],
            [3387, 3692],
            [3523, 3485],
          ],
        ],
      },
    },
  ],
};
