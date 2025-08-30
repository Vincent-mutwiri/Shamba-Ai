import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, TrendingUp, Award, MapPin } from "lucide-react";

interface Story {
  id: string;
  farmer: string;
  location: string;
  title: string;
  story: string;
  achievement: string;
  crop: string;
  yield: string;
  image?: string;
  rating: number;
}

export const SuccessStories = () => {
  const stories: Story[] = [
    {
      id: "1",
      farmer: "Grace Njeri",
      location: "Nakuru East",
      title: "Doubled Maize Yield with Smart Farming",
      story: "Using AgriSenti's disease detection and weather alerts, I was able to prevent major crop losses and optimize my planting schedule. The AI recommendations helped me choose the right fertilizer timing.",
      achievement: "Increased yield from 15 to 30 bags per acre",
      crop: "Maize",
      yield: "30 bags/acre",
      rating: 5
    },
    {
      id: "2",
      farmer: "Samuel Kiprop",
      location: "Molo",
      title: "Successful Organic Farming Transition",
      story: "The community forum connected me with other organic farmers who shared their experiences. I learned about natural pest control methods that saved me money on chemicals.",
      achievement: "100% organic certification achieved",
      crop: "Beans",
      yield: "12 bags/acre",
      rating: 5
    },
    {
      id: "3",
      farmer: "Rose Wanjiku",
      location: "Njoro",
      title: "Market Timing Led to 40% Higher Profits",
      story: "The market price alerts helped me time my potato sales perfectly. Instead of selling immediately after harvest, I waited for the price surge and made 40% more profit.",
      achievement: "KES 180,000 additional income",
      crop: "Potatoes",
      yield: "200 bags/acre",
      rating: 4
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Farmer Success Stories</h2>
        <p className="text-gray-600">Real stories from farmers in our community</p>
      </div>

      <div className="grid gap-6">
        {stories.map((story) => (
          <Card key={story.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-green-600 text-white">
                      {story.farmer.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{story.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium">{story.farmer}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {story.location}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < story.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{story.story}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">Achievement</span>
                    </div>
                    <p className="text-sm text-green-700">{story.achievement}</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Crop & Yield</span>
                    </div>
                    <p className="text-sm text-blue-700">{story.crop}: {story.yield}</p>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-orange-100 text-orange-800">Success Rate</Badge>
                    </div>
                    <p className="text-sm text-orange-700">
                      {story.rating === 5 ? 'Excellent' : story.rating === 4 ? 'Very Good' : 'Good'} Results
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Share Your Success Story</h3>
          <p className="mb-4">Inspire other farmers with your achievements and help build our community</p>
          <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Submit Your Story
          </button>
        </CardContent>
      </Card>
    </div>
  );
};