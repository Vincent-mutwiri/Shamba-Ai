export interface CountyLocation {
  county: string;
  locations: string[];
}

export const COUNTY_LOCATIONS: CountyLocation[] = [
  { county: "Baringo", locations: ["Kabarnet", "Eldama Ravine", "Mogotio", "Marigat", "Chemolingot"] },
  { county: "Bomet", locations: ["Bomet", "Sotik", "Longisa", "Mulot", "Sigor"] },
  { county: "Bungoma", locations: ["Bungoma", "Webuye", "Kimilili", "Sirisia", "Tongaren"] },
  { county: "Busia", locations: ["Busia", "Malaba", "Funyula", "Nambale", "Matayos"] },
  { county: "Elgeyo-Marakwet", locations: ["Iten", "Kapsowar", "Keiyo", "Marakwet East", "Marakwet West"] },
  { county: "Embu", locations: ["Embu", "Runyenjes", "Siakago", "Kyeni", "Mbeere North"] },
  { county: "Garissa", locations: ["Garissa", "Dadaab", "Fafi", "Ijara", "Lagdera"] },
  { county: "Homa Bay", locations: ["Homa Bay", "Oyugis", "Ndhiwa", "Mbita", "Sindo"] },
  { county: "Isiolo", locations: ["Isiolo", "Merti", "Garbatulla", "Kinna", "Oldonyiro"] },
  { county: "Kajiado", locations: ["Kajiado", "Ngong", "Kitengela", "Namanga", "Loitokitok"] },
  { county: "Kakamega", locations: ["Kakamega", "Mumias", "Butere", "Khwisero", "Matungu"] },
  { county: "Kericho", locations: ["Kericho", "Litein", "Londiani", "Kipkelion", "Bureti"] },
  { county: "Kiambu", locations: ["Kiambu", "Thika", "Ruiru", "Kikuyu", "Limuru"] },
  { county: "Kilifi", locations: ["Kilifi", "Malindi", "Watamu", "Gede", "Mariakani"] },
  { county: "Kirinyaga", locations: ["Kerugoya", "Kutus", "Sagana", "Baricho", "Ndia"] },
  { county: "Kisii", locations: ["Kisii", "Keroka", "Ogembo", "Suneka", "Nyamache"] },
  { county: "Kisumu", locations: ["Kisumu", "Ahero", "Maseno", "Kondele", "Nyando"] },
  { county: "Kitui", locations: ["Kitui", "Mwingi", "Mutomo", "Ikutha", "Kyuso"] },
  { county: "Kwale", locations: ["Kwale", "Ukunda", "Msambweni", "Lunga Lunga", "Matuga"] },
  { county: "Laikipia", locations: ["Nanyuki", "Nyahururu", "Rumuruti", "Doldol", "Kinangop"] },
  { county: "Lamu", locations: ["Lamu", "Mokowe", "Witu", "Faza", "Kiunga"] },
  { county: "Machakos", locations: ["Machakos", "Athi River", "Kangundo", "Matungulu", "Yatta"] },
  { county: "Makueni", locations: ["Wote", "Makindu", "Mtito Andei", "Sultan Hamud", "Emali"] },
  { county: "Mandera", locations: ["Mandera", "Rhamu", "Banissa", "Lafey", "El Wak"] },
  { county: "Marsabit", locations: ["Marsabit", "Moyale", "North Horr", "Loiyangalani", "Sololo"] },
  { county: "Meru", locations: ["Meru", "Maua", "Mikinduri", "Nkubu", "Timau"] },
  { county: "Migori", locations: ["Migori", "Rongo", "Awendo", "Suna", "Nyatike"] },
  { county: "Mombasa", locations: ["Mombasa", "Likoni", "Changamwe", "Jomba", "Kisauni"] },
  { county: "Murang'a", locations: ["Murang'a", "Thika", "Kenol", "Makuyu", "Maragua"] },
  { county: "Nairobi", locations: ["Nairobi CBD", "Westlands", "Karen", "Kasarani", "Embakasi"] },
  { county: "Nakuru", locations: ["Nakuru", "Naivasha", "Gilgil", "Molo", "Njoro"] },
  { county: "Nandi", locations: ["Kapsabet", "Nandi Hills", "Aldai", "Chesumei", "Emgwen"] },
  { county: "Narok", locations: ["Narok", "Kilgoris", "Ololulunga", "Suswa", "Lemek"] },
  { county: "Nyamira", locations: ["Nyamira", "Keroka", "Nyansiongo", "Borabu", "Manga"] },
  { county: "Nyandarua", locations: ["Ol Kalou", "Nyahururu", "Engineer", "Shamata", "Dundori"] },
  { county: "Nyeri", locations: ["Nyeri", "Karatina", "Othaya", "Mukurwe-ini", "Tetu"] },
  { county: "Samburu", locations: ["Maralal", "Baragoi", "Wamba", "Archer's Post", "South Horr"] },
  { county: "Siaya", locations: ["Siaya", "Bondo", "Usenge", "Yala", "Ukwala"] },
  { county: "Taita-Taveta", locations: ["Voi", "Wundanyi", "Taveta", "Mwatate", "Sagalla"] },
  { county: "Tana River", locations: ["Hola", "Garsen", "Witu", "Kipini", "Madogo"] },
  { county: "Tharaka-Nithi", locations: ["Kathwana", "Chuka", "Marimanti", "Mukothima", "Igambang'ombe"] },
  { county: "Trans Nzoia", locations: ["Kitale", "Endebess", "Kwanza", "Saboti", "Kiminini"] },
  { county: "Turkana", locations: ["Lodwar", "Kakuma", "Lokichoggio", "Kalokol", "Lokori"] },
  { county: "Uasin Gishu", locations: ["Eldoret", "Turbo", "Burnt Forest", "Ziwa", "Soy"] },
  { county: "Vihiga", locations: ["Vihiga", "Mbale", "Luanda", "Emuhaya", "Hamisi"] },
  { county: "Wajir", locations: ["Wajir", "Habaswein", "Tarbaj", "Eldas", "Buna"] },
  { county: "West Pokot", locations: ["Kapenguria", "Makutano", "Sigor", "Alale", "Batei"] }
];

export const getLocationsByCounty = (county: string): string[] => {
  const found = COUNTY_LOCATIONS.find(c => 
    c.county.toLowerCase() === county.toLowerCase()
  );
  return found ? found.locations : [];
};

export const getAllLocations = (): string[] => {
  return COUNTY_LOCATIONS.flatMap(c => c.locations);
};