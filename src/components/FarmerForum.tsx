import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Reply, Plus, Search } from "lucide-react";

interface ForumPost {
  id: string;
  author: string;
  title: string;
  content: string;
  category: string;
  replies: number;
  likes: number;
  timestamp: string;
}

export const FarmerForum = () => {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: "1",
      author: "John Kamau",
      title: "Best maize varieties for Nakuru climate?",
      content: "Looking for drought-resistant maize varieties that perform well in our region. Any recommendations?",
      category: "Crops",
      replies: 12,
      likes: 8,
      timestamp: "2 hours ago"
    },
    {
      id: "2",
      author: "Mary Wanjiku",
      title: "Organic pest control methods",
      content: "Sharing my experience with neem oil for controlling aphids. Works great and safe for the environment!",
      category: "Pest Control",
      replies: 6,
      likes: 15,
      timestamp: "5 hours ago"
    },
    {
      id: "3",
      author: "Peter Mwangi",
      title: "Market prices this week",
      content: "Beans are going for KES 120/kg at Nakuru market. Good time to sell if you have stock.",
      category: "Market",
      replies: 3,
      likes: 5,
      timestamp: "1 day ago"
    }
  ]);

  const [newPost, setNewPost] = useState({ title: "", content: "", category: "General" });
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["General", "Crops", "Pest Control", "Market", "Weather", "Equipment"];

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addPost = () => {
    if (!newPost.title || !newPost.content) return;
    
    const post: ForumPost = {
      id: Date.now().toString(),
      author: "You",
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      replies: 0,
      likes: 0,
      timestamp: "Just now"
    };
    
    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "", category: "General" });
  };

  return (
    <div className="space-y-4">
      {/* Search and New Post */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Post
            </Button>
          </div>
          
          {/* New Post Form */}
          <div className="space-y-3 border-t pt-4">
            <Input
              placeholder="Post title..."
              value={newPost.title}
              onChange={(e) => setNewPost({...newPost, title: e.target.value})}
            />
            <Textarea
              placeholder="Share your question or knowledge..."
              value={newPost.content}
              onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              rows={3}
            />
            <div className="flex justify-between">
              <select 
                value={newPost.category}
                onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                className="px-3 py-2 border rounded-md"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Button onClick={addPost}>Post</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forum Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{post.title}</h3>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{post.content}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>{post.author}</span>
                      <span>{post.timestamp}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 hover:text-blue-600">
                        <ThumbsUp className="w-4 h-4" />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-green-600">
                        <MessageSquare className="w-4 h-4" />
                        {post.replies}
                      </button>
                      <button className="flex items-center gap-1 hover:text-gray-700">
                        <Reply className="w-4 h-4" />
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};