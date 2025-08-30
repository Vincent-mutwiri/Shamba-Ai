import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { MessageCircle, Phone, Star, Search, MapPin, Clock } from "lucide-react";

interface Expert {
  id: string;
  name: string;
  title: string;
  specialization: string[];
  location: string;
  rating: number;
  reviews: number;
  availability: string;
  contact: string;
  experience: string;
  languages: string[];
}

export const ExpertNetwork = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");

  const experts: Expert[] = [
    {
      id: "1",
      name: "Dr. James Mwangi",
      title: "Agricultural Extension Officer",
      specialization: ["Crop Diseases", "Soil Management", "Organic Farming"],
      location: "Nakuru County",
      rating: 4.8,
      reviews: 45,
      availability: "Available",
      contact: "+254 712 345 678",
      experience: "15 years",
      languages: ["English", "Swahili", "Kikuyu"]
    },
    {
      id: "2",
      name: "Mary Njoroge",
      title: "Certified Agronomist",
      specialization: ["Maize Production", "Fertilizer Management", "Pest Control"],
      location: "Molo",
      rating: 4.9,
      reviews: 62,
      availability: "Busy until 3 PM",
      contact: "+254 723 456 789",
      experience: "12 years",
      languages: ["English", "Swahili"]
    },
    {
      id: "3",
      name: "Peter Kiprop",
      title: "Livestock Specialist",
      specialization: ["Dairy Farming", "Animal Health", "Feed Management"],
      location: "Njoro",
      rating: 4.7,
      reviews: 38,
      availability: "Available",
      contact: "+254 734 567 890",
      experience: "10 years",
      languages: ["English", "Swahili", "Kalenjin"]
    },
    {
      id: "4",
      name: "Grace Wanjiku",
      title: "Market Analyst",
      specialization: ["Market Trends", "Price Analysis", "Export Opportunities"],
      location: "Nakuru Town",
      rating: 4.6,
      reviews: 29,
      availability: "Available",
      contact: "+254 745 678 901",
      experience: "8 years",
      languages: ["English", "Swahili"]
    }
  ];

  const specializations = ["All", "Crop Diseases", "Soil Management", "Maize Production", "Livestock", "Market Analysis"];

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSpecialization = selectedSpecialization === "All" || 
                                 expert.specialization.some(spec => spec.includes(selectedSpecialization));
    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search experts by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Expert Cards */}
      <div className="grid gap-4">
        {filteredExperts.map((expert) => (
          <Card key={expert.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-blue-600 text-white text-lg">
                    {expert.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">{expert.name}</h3>
                      <p className="text-gray-600">{expert.title}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{expert.rating}</span>
                        <span className="text-gray-500">({expert.reviews})</span>
                      </div>
                      <Badge variant={expert.availability === "Available" ? "default" : "secondary"}>
                        {expert.availability}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {expert.specialization.map((spec, idx) => (
                        <Badge key={idx} variant="outline">{spec}</Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{expert.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{expert.experience}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Languages: </span>
                        <span>{expert.languages.join(", ")}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Contact: </span>
                        <span>{expert.contact}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Chat
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredExperts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No experts found matching your criteria.</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};