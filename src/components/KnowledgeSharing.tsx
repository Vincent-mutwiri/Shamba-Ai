import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Download, Eye, ThumbsUp, Share2, Search, Filter } from "lucide-react";

interface KnowledgeItem {
  id: string;
  title: string;
  type: "Guide" | "Video" | "Article" | "Research";
  category: string;
  author: string;
  description: string;
  downloads: number;
  views: number;
  likes: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration?: string;
  fileSize?: string;
}

export const KnowledgeSharing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const knowledgeItems: KnowledgeItem[] = [
    {
      id: "1",
      title: "Complete Guide to Maize Farming in Nakuru",
      type: "Guide",
      category: "Crop Production",
      author: "Dr. James Mwangi",
      description: "Comprehensive guide covering soil preparation, planting, fertilization, and harvesting of maize in Nakuru's climate conditions.",
      downloads: 1250,
      views: 3400,
      likes: 89,
      difficulty: "Beginner",
      fileSize: "2.5 MB"
    },
    {
      id: "2",
      title: "Organic Pest Control Methods",
      type: "Video",
      category: "Pest Management",
      author: "Mary Njoroge",
      description: "Learn natural and organic methods to control common pests without harmful chemicals. Includes recipes for homemade sprays.",
      downloads: 890,
      views: 2100,
      likes: 67,
      difficulty: "Intermediate",
      duration: "15 min"
    },
    {
      id: "3",
      title: "Soil Testing and Nutrient Management",
      type: "Article",
      category: "Soil Health",
      author: "Peter Kiprop",
      description: "Understanding soil pH, nutrient deficiencies, and how to improve soil health for better crop yields.",
      downloads: 670,
      views: 1800,
      likes: 45,
      difficulty: "Intermediate"
    },
    {
      id: "4",
      title: "Climate-Smart Agriculture Practices",
      type: "Research",
      category: "Climate",
      author: "Grace Wanjiku",
      description: "Research findings on adapting farming practices to climate change, including drought-resistant varieties and water conservation.",
      downloads: 340,
      views: 950,
      likes: 28,
      difficulty: "Advanced",
      fileSize: "5.2 MB"
    },
    {
      id: "5",
      title: "Post-Harvest Storage Techniques",
      type: "Guide",
      category: "Post-Harvest",
      author: "Samuel Kiprop",
      description: "Proper storage methods to reduce post-harvest losses and maintain crop quality for better market prices.",
      downloads: 780,
      views: 2200,
      likes: 56,
      difficulty: "Beginner",
      fileSize: "1.8 MB"
    }
  ];

  const categories = ["All", "Crop Production", "Pest Management", "Soil Health", "Climate", "Post-Harvest"];
  const types = ["All", "Guide", "Video", "Article", "Research"];

  const filteredItems = knowledgeItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesType = selectedType === "All" || item.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search knowledge base..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Items */}
      <div className="grid gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                      <p className="text-sm text-gray-500">By {item.author}</p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Badge variant="outline">{item.type}</Badge>
                      <Badge className={getDifficultyColor(item.difficulty)}>
                        {item.difficulty}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {item.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {item.downloads}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {item.likes}
                    </div>
                    {item.duration && (
                      <span>Duration: {item.duration}</span>
                    )}
                    {item.fileSize && (
                      <span>Size: {item.fileSize}</span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4" />
                      Like
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No knowledge items found matching your criteria.</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters.</p>
          </CardContent>
        </Card>
      )}
      
      {/* Contribute Section */}
      <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Share Your Knowledge</h3>
          <p className="mb-4">Help other farmers by sharing your guides, experiences, and research</p>
          <Button className="bg-white text-green-600 hover:bg-gray-100">
            Contribute Content
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};