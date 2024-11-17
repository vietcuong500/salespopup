"use client";
import { Button } from "@/components/ui/button";
import { LayoutPanelTop, Component, Layers3 } from "lucide-react";
import { SidebarSetting } from "@/modules/workspaces/components/SidebarSetting/SidebarSetting";
import { Elements } from "@/modules/workspaces/components/Elements/Elements";
import { DesignArea } from "@/modules/workspaces/DesignArea/DesignArea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayersManagement } from "@/modules/workspaces/components/LayersManagement/LayersManagement";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <div className="h-10 shadow-md w-full">
        <div className="flex h-full flex-row items-center justify-between w-full">
          <p>Popup</p>
          <Button size="sm">Public</Button>
        </div>
      </div>
      <div className="flex flex-row h-full">
        <Tabs defaultValue="element" className="w-[200px]">
          <TabsList>
            <TabsTrigger value="element">element</TabsTrigger>
            <TabsTrigger value="layers">layers</TabsTrigger>
          </TabsList>
          <TabsContent value="element">
            <Elements />
          </TabsContent>
          <TabsContent value="layers">
            <LayersManagement />
          </TabsContent>
        </Tabs>
        <DesignArea />
        <SidebarSetting />
      </div>
    </div>
  );
}
