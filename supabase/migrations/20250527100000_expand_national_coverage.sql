-- Expand database schema for national coverage across Kenya

-- Add county field to farms table
ALTER TABLE farms ADD COLUMN IF NOT EXISTS county VARCHAR(100);

-- Add county field to market_prices table  
ALTER TABLE market_prices ADD COLUMN IF NOT EXISTS county VARCHAR(100);

-- Add county field to buyers table
ALTER TABLE buyers ADD COLUMN IF NOT EXISTS county VARCHAR(100);

-- Add county field to weather_data table
ALTER TABLE weather_data ADD COLUMN IF NOT EXISTS county VARCHAR(100);

-- Create counties reference table
CREATE TABLE IF NOT EXISTS counties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(10) NOT NULL UNIQUE,
    region VARCHAR(50),
    population INTEGER,
    area_km2 DECIMAL(10,2),
    agricultural_zones TEXT[],
    major_crops TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert all 47 Kenyan counties
INSERT INTO counties (name, code, region, major_crops) VALUES
('Baringo', 'BRG', 'Rift Valley', ARRAY['Maize', 'Beans', 'Sorghum', 'Millet']),
('Bomet', 'BMT', 'Rift Valley', ARRAY['Tea', 'Maize', 'Beans', 'Potatoes']),
('Bungoma', 'BGM', 'Western', ARRAY['Maize', 'Beans', 'Sugarcane', 'Coffee']),
('Busia', 'BSA', 'Western', ARRAY['Maize', 'Beans', 'Cassava', 'Sweet Potatoes']),
('Elgeyo-Marakwet', 'EMW', 'Rift Valley', ARRAY['Maize', 'Beans', 'Wheat', 'Barley']),
('Embu', 'EMB', 'Eastern', ARRAY['Coffee', 'Tea', 'Maize', 'Beans']),
('Garissa', 'GRS', 'North Eastern', ARRAY['Sorghum', 'Maize', 'Cowpeas']),
('Homa Bay', 'HMB', 'Nyanza', ARRAY['Maize', 'Beans', 'Sorghum', 'Cassava']),
('Isiolo', 'ISL', 'Eastern', ARRAY['Maize', 'Beans', 'Sorghum']),
('Kajiado', 'KJD', 'Rift Valley', ARRAY['Maize', 'Beans', 'Wheat']),
('Kakamega', 'KKG', 'Western', ARRAY['Maize', 'Beans', 'Sugarcane', 'Tea']),
('Kericho', 'KRC', 'Rift Valley', ARRAY['Tea', 'Maize', 'Beans', 'Wheat']),
('Kiambu', 'KMB', 'Central', ARRAY['Coffee', 'Tea', 'Maize', 'Beans']),
('Kilifi', 'KLF', 'Coast', ARRAY['Maize', 'Cassava', 'Coconuts', 'Cashew Nuts']),
('Kirinyaga', 'KRG', 'Central', ARRAY['Rice', 'Coffee', 'Tea', 'Maize']),
('Kisii', 'KSI', 'Nyanza', ARRAY['Tea', 'Coffee', 'Maize', 'Beans']),
('Kisumu', 'KSM', 'Nyanza', ARRAY['Maize', 'Beans', 'Sorghum', 'Sugarcane']),
('Kitui', 'KTI', 'Eastern', ARRAY['Maize', 'Beans', 'Pigeon Peas', 'Sorghum']),
('Kwale', 'KWL', 'Coast', ARRAY['Maize', 'Cassava', 'Coconuts', 'Cashew Nuts']),
('Laikipia', 'LKP', 'Central', ARRAY['Wheat', 'Barley', 'Maize', 'Beans']),
('Lamu', 'LAM', 'Coast', ARRAY['Maize', 'Cassava', 'Coconuts', 'Mangoes']),
('Machakos', 'MCK', 'Eastern', ARRAY['Maize', 'Beans', 'Pigeon Peas', 'Cowpeas']),
('Makueni', 'MKN', 'Eastern', ARRAY['Maize', 'Beans', 'Pigeon Peas', 'Sorghum']),
('Mandera', 'MND', 'North Eastern', ARRAY['Sorghum', 'Maize', 'Cowpeas']),
('Marsabit', 'MSB', 'Northern', ARRAY['Maize', 'Beans', 'Sorghum']),
('Meru', 'MRU', 'Eastern', ARRAY['Coffee', 'Tea', 'Maize', 'Beans']),
('Migori', 'MGR', 'Nyanza', ARRAY['Maize', 'Beans', 'Sorghum', 'Sugarcane']),
('Mombasa', 'MSA', 'Coast', ARRAY['Coconuts', 'Cassava', 'Fruits']),
('Murang''a', 'MRG', 'Central', ARRAY['Coffee', 'Tea', 'Maize', 'Beans']),
('Nairobi', 'NRB', 'Central', ARRAY['Vegetables', 'Fruits', 'Flowers']),
('Nakuru', 'NKR', 'Rift Valley', ARRAY['Wheat', 'Maize', 'Beans', 'Potatoes']),
('Nandi', 'NND', 'Rift Valley', ARRAY['Tea', 'Maize', 'Beans', 'Wheat']),
('Narok', 'NRK', 'Rift Valley', ARRAY['Wheat', 'Maize', 'Beans', 'Barley']),
('Nyamira', 'NYM', 'Nyanza', ARRAY['Tea', 'Coffee', 'Maize', 'Beans']),
('Nyandarua', 'NND', 'Central', ARRAY['Potatoes', 'Wheat', 'Maize', 'Beans']),
('Nyeri', 'NYR', 'Central', ARRAY['Coffee', 'Tea', 'Maize', 'Beans']),
('Samburu', 'SMB', 'Rift Valley', ARRAY['Maize', 'Beans', 'Sorghum']),
('Siaya', 'SYA', 'Nyanza', ARRAY['Maize', 'Beans', 'Sorghum', 'Cassava']),
('Taita-Taveta', 'TTT', 'Coast', ARRAY['Maize', 'Beans', 'Coffee', 'Fruits']),
('Tana River', 'TNR', 'Coast', ARRAY['Maize', 'Beans', 'Rice', 'Mangoes']),
('Tharaka-Nithi', 'THN', 'Eastern', ARRAY['Coffee', 'Tea', 'Maize', 'Beans']),
('Trans Nzoia', 'TNZ', 'Rift Valley', ARRAY['Maize', 'Beans', 'Wheat', 'Sunflower']),
('Turkana', 'TRK', 'Rift Valley', ARRAY['Sorghum', 'Maize', 'Beans']),
('Uasin Gishu', 'UGS', 'Rift Valley', ARRAY['Maize', 'Wheat', 'Beans', 'Barley']),
('Vihiga', 'VHG', 'Western', ARRAY['Tea', 'Maize', 'Beans', 'Bananas']),
('Wajir', 'WJR', 'North Eastern', ARRAY['Sorghum', 'Maize', 'Cowpeas']),
('West Pokot', 'WPK', 'Rift Valley', ARRAY['Maize', 'Beans', 'Sorghum', 'Millet'])
ON CONFLICT (name) DO NOTHING;

-- Create crop varieties table for different regions
CREATE TABLE IF NOT EXISTS crop_varieties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    crop_name VARCHAR(100) NOT NULL,
    variety_name VARCHAR(100) NOT NULL,
    suitable_counties TEXT[],
    planting_season VARCHAR(50),
    maturity_days INTEGER,
    yield_per_acre DECIMAL(10,2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert common crop varieties for different regions
INSERT INTO crop_varieties (crop_name, variety_name, suitable_counties, planting_season, maturity_days, yield_per_acre) VALUES
('Maize', 'H614', ARRAY['nakuru', 'uasin-gishu', 'trans-nzoia'], 'Long Rains', 120, 25.0),
('Maize', 'H629', ARRAY['kiambu', 'nyeri', 'murang-a'], 'Long Rains', 110, 22.0),
('Coffee', 'Ruiru 11', ARRAY['nyeri', 'kiambu', 'murang-a', 'embu'], 'Year Round', 365, 8.0),
('Tea', 'TRFK 6/8', ARRAY['kericho', 'nandi', 'bomet', 'nyamira'], 'Year Round', 1095, 3.5),
('Wheat', 'Kenya Fahari', ARRAY['nakuru', 'uasin-gishu', 'narok'], 'Short Rains', 120, 18.0),
('Beans', 'Mwitemania', ARRAY['eastern', 'central', 'rift-valley'], 'Both Seasons', 90, 12.0),
('Rice', 'Basmati 370', ARRAY['kirinyaga', 'mwea'], 'Year Round', 120, 15.0),
('Sugarcane', 'CO 421', ARRAY['kakamega', 'bungoma', 'kisumu'], 'Year Round', 365, 80.0)
ON CONFLICT DO NOTHING;

-- Update existing data to include county information where possible
UPDATE farms SET county = 'nakuru' WHERE location ILIKE '%nakuru%';
UPDATE market_prices SET county = 'nakuru' WHERE market_location ILIKE '%nakuru%';
UPDATE buyers SET county = 'nakuru' WHERE location ILIKE '%nakuru%';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_farms_county ON farms(county);
CREATE INDEX IF NOT EXISTS idx_market_prices_county ON market_prices(county);
CREATE INDEX IF NOT EXISTS idx_buyers_county ON buyers(county);
CREATE INDEX IF NOT EXISTS idx_weather_data_county ON weather_data(county);
CREATE INDEX IF NOT EXISTS idx_counties_name ON counties(name);
CREATE INDEX IF NOT EXISTS idx_crop_varieties_crop_name ON crop_varieties(crop_name);

-- Enable RLS on new tables
ALTER TABLE counties ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_varieties ENABLE ROW LEVEL SECURITY;

-- Create policies for new tables (public read access)
CREATE POLICY "Counties are publicly readable"
    ON counties FOR SELECT
    USING (true);

CREATE POLICY "Crop varieties are publicly readable"
    ON crop_varieties FOR SELECT
    USING (true);