export interface County {
  name: string;
  code: string;
  region: string;
  latitude: number;
  longitude: number;
  capital: string;
}

export const KENYAN_COUNTIES: County[] = [
  // Central Region
  { name: "Kiambu", code: "KMB", region: "Central", latitude: -1.1719, longitude: 36.8356, capital: "Kiambu" },
  { name: "Kirinyaga", code: "KRG", region: "Central", latitude: -0.6569, longitude: 37.3028, capital: "Kerugoya" },
  { name: "Murang'a", code: "MRG", region: "Central", latitude: -0.7167, longitude: 37.1500, capital: "Murang'a" },
  { name: "Nyandarua", code: "NND", region: "Central", latitude: -0.3833, longitude: 36.3667, capital: "Ol Kalou" },
  { name: "Nyeri", code: "NYR", region: "Central", latitude: -0.4167, longitude: 36.9500, capital: "Nyeri" },

  // Coast Region
  { name: "Kilifi", code: "KLF", region: "Coast", latitude: -3.5053, longitude: 39.8494, capital: "Kilifi" },
  { name: "Kwale", code: "KWL", region: "Coast", latitude: -4.1747, longitude: 39.4567, capital: "Kwale" },
  { name: "Lamu", code: "LAM", region: "Coast", latitude: -2.2717, longitude: 40.9020, capital: "Lamu" },
  { name: "Mombasa", code: "MSA", region: "Coast", latitude: -4.0435, longitude: 39.6682, capital: "Mombasa" },
  { name: "Taita-Taveta", code: "TTT", region: "Coast", latitude: -3.3167, longitude: 38.3500, capital: "Voi" },
  { name: "Tana River", code: "TNR", region: "Coast", latitude: -1.8167, longitude: 40.1167, capital: "Hola" },

  // Eastern Region
  { name: "Embu", code: "EMB", region: "Eastern", latitude: -0.5167, longitude: 37.4500, capital: "Embu" },
  { name: "Isiolo", code: "ISL", region: "Eastern", latitude: 0.3542, longitude: 37.5833, capital: "Isiolo" },
  { name: "Kitui", code: "KTI", region: "Eastern", latitude: -1.3667, longitude: 38.0167, capital: "Kitui" },
  { name: "Machakos", code: "MCK", region: "Eastern", latitude: -1.5167, longitude: 37.2667, capital: "Machakos" },
  { name: "Makueni", code: "MKN", region: "Eastern", latitude: -1.8167, longitude: 37.6167, capital: "Wote" },
  { name: "Marsabit", code: "MSB", region: "Eastern", latitude: 2.3333, longitude: 37.9833, capital: "Marsabit" },
  { name: "Meru", code: "MRU", region: "Eastern", latitude: 0.0500, longitude: 37.6500, capital: "Meru" },
  { name: "Tharaka-Nithi", code: "THN", region: "Eastern", latitude: -0.1667, longitude: 37.9167, capital: "Kathwana" },

  // Nairobi Region
  { name: "Nairobi", code: "NRB", region: "Nairobi", latitude: -1.2921, longitude: 36.8219, capital: "Nairobi" },

  // North Eastern Region
  { name: "Garissa", code: "GRS", region: "North Eastern", latitude: -0.4569, longitude: 39.6403, capital: "Garissa" },
  { name: "Mandera", code: "MND", region: "North Eastern", latitude: 3.9167, longitude: 41.8500, capital: "Mandera" },
  { name: "Wajir", code: "WJR", region: "North Eastern", latitude: 1.7500, longitude: 40.0667, capital: "Wajir" },

  // Nyanza Region
  { name: "Homa Bay", code: "HMB", region: "Nyanza", latitude: -0.5167, longitude: 34.4500, capital: "Homa Bay" },
  { name: "Kisii", code: "KSI", region: "Nyanza", latitude: -0.6833, longitude: 34.7667, capital: "Kisii" },
  { name: "Kisumu", code: "KSM", region: "Nyanza", latitude: -0.1000, longitude: 34.7500, capital: "Kisumu" },
  { name: "Migori", code: "MGR", region: "Nyanza", latitude: -1.0667, longitude: 34.4667, capital: "Migori" },
  { name: "Nyamira", code: "NYM", region: "Nyanza", latitude: -0.5667, longitude: 34.9333, capital: "Nyamira" },
  { name: "Siaya", code: "SYA", region: "Nyanza", latitude: 0.0667, longitude: 34.2833, capital: "Siaya" },

  // Rift Valley Region
  { name: "Baringo", code: "BRG", region: "Rift Valley", latitude: 0.4667, longitude: 35.9667, capital: "Kabarnet" },
  { name: "Bomet", code: "BMT", region: "Rift Valley", latitude: -0.7833, longitude: 35.3333, capital: "Bomet" },
  { name: "Elgeyo-Marakwet", code: "EMW", region: "Rift Valley", latitude: 0.8167, longitude: 35.4833, capital: "Iten" },
  { name: "Kajiado", code: "KJD", region: "Rift Valley", latitude: -1.8500, longitude: 36.7833, capital: "Kajiado" },
  { name: "Kericho", code: "KRC", region: "Rift Valley", latitude: -0.3667, longitude: 35.2833, capital: "Kericho" },
  { name: "Laikipia", code: "LKP", region: "Rift Valley", latitude: 0.2167, longitude: 36.7833, capital: "Nanyuki" },
  { name: "Nakuru", code: "NKR", region: "Rift Valley", latitude: -0.3031, longitude: 36.0800, capital: "Nakuru" },
  { name: "Nandi", code: "NND", region: "Rift Valley", latitude: 0.1833, longitude: 35.1000, capital: "Kapsabet" },
  { name: "Narok", code: "NRK", region: "Rift Valley", latitude: -1.0833, longitude: 35.8667, capital: "Narok" },
  { name: "Samburu", code: "SMB", region: "Rift Valley", latitude: 1.1667, longitude: 37.1167, capital: "Maralal" },
  { name: "Trans Nzoia", code: "TNZ", region: "Rift Valley", latitude: 1.0167, longitude: 35.0000, capital: "Kitale" },
  { name: "Turkana", code: "TRK", region: "Rift Valley", latitude: 3.1167, longitude: 35.5833, capital: "Lodwar" },
  { name: "Uasin Gishu", code: "UGS", region: "Rift Valley", latitude: 0.5167, longitude: 35.2833, capital: "Eldoret" },
  { name: "West Pokot", code: "WPK", region: "Rift Valley", latitude: 1.4167, longitude: 35.2333, capital: "Kapenguria" },

  // Western Region
  { name: "Bungoma", code: "BGM", region: "Western", latitude: 0.5667, longitude: 34.5667, capital: "Bungoma" },
  { name: "Busia", code: "BSA", region: "Western", latitude: 0.4667, longitude: 34.1167, capital: "Busia" },
  { name: "Kakamega", code: "KKG", region: "Western", latitude: 0.2833, longitude: 34.7500, capital: "Kakamega" },
  { name: "Vihiga", code: "VHG", region: "Western", latitude: 0.0833, longitude: 34.7167, capital: "Vihiga" }
];

export const getCountyByName = (name: string): County | undefined => {
  return KENYAN_COUNTIES.find(county => 
    county.name.toLowerCase() === name.toLowerCase()
  );
};

export const getCountiesByRegion = (region: string): County[] => {
  return KENYAN_COUNTIES.filter(county => 
    county.region.toLowerCase() === region.toLowerCase()
  );
};

export const REGIONS = [
  "Central",
  "Coast", 
  "Eastern",
  "Nairobi",
  "North Eastern",
  "Nyanza",
  "Rift Valley",
  "Western"
];