import { DashboardLayout } from "@/components/DashboardLayout";
import { FarmerForum } from "@/components/FarmerForum";
import { SuccessStories } from "@/components/SuccessStories";
import { ExpertNetwork } from "@/components/ExpertNetwork";
import { KnowledgeSharing } from "@/components/KnowledgeSharing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Award, UserCheck, BookOpen } from "lucide-react";

export default function CommunityPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Community Hub
          </h1>
          <p className="text-gray-600">
            Connect, learn, and grow with fellow farmers in your region
          </p>
        </div>
        
        <Tabs defaultValue="forum" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="forum" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Forum
            </TabsTrigger>
            <TabsTrigger value="stories" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Success Stories
            </TabsTrigger>
            <TabsTrigger value="experts" className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              Expert Network
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Knowledge Base
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="forum">
            <FarmerForum />
          </TabsContent>
          
          <TabsContent value="stories">
            <SuccessStories />
          </TabsContent>
          
          <TabsContent value="experts">
            <ExpertNetwork />
          </TabsContent>
          
          <TabsContent value="knowledge">
            <KnowledgeSharing />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}