import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ChevronDown, Headphones, Paperclip, Search, Send, Settings, Smile } from 'lucide-react'

export default function Home() {

  const conversations = [
    { id: 1, name: 'My Honey 🍯', message: 'Beso beli es coklat yuu', time: '15:23', unread: 1 },
    { id: 2, name: 'Si Botak', message: 'San, aku udah di lokasi nih', time: '17:12' },
    { id: 3, name: 'James Kribo', message: 'Halo broo, weekend mae...', time: '17:00', unread: 3 },
    { id: 4, name: 'Dribbble & Behance...', message: 'Pagil guys, izin share shot ter...', time: '13:05' },
    { id: 5, name: 'Mike Michiel', message: 'Hi, can you give me extr...', time: '12:33', unread: 3 },
    { id: 6, name: 'Microstock Contributor', message: "I've upload my new design on...", time: '12:23' },
    { id: 7, name: 'Upwork Freelance...', message: 'No, i think machine learning...', time: '10:32' },
    { id: 8, name: 'Rafiee Rohmat', message: 'San, titip ayam geprek dong', time: '08:23' },
    { id: 9, name: 'Ahmad Arianto', message: 'Hahaha, kaya nya oke sih', time: '08:00' },
  ]

  const groupMembers = [
    { id: 1, name: 'Ahsan Pratama', role: 'You' },
    { id: 2, name: 'James Kribo', role: 'Owner' },
    { id: 3, name: 'Botak Bersinar', role: 'Admin' },
    { id: 4, name: 'Mike Wazowski', role: 'Admin' },
    { id: 5, name: 'Ryan Garcia', role: '' },
  ]

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Ahsan Pratama" />
              <AvatarFallback>AP</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">Ahsan Pratama</h2>
              <p className="text-sm text-gray-500">@ahsanpratamaa</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4">
          <Input placeholder="Search message" className="w-full" icon={<Search className="h-4 w-4" />} />
        </div>
        <ScrollArea className="flex-1">
          {conversations.map((conv) => (
            <div key={conv.id} className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`/placeholder.svg?height=48&width=48&text=${conv.name.charAt(0)}`} alt={conv.name} />
                <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold">{conv.name}</h3>
                  <span className="text-xs text-gray-500">{conv.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{conv.message}</p>
              </div>
              {conv.unread && (
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {conv.unread}
                </span>
              )}
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40&text=D" alt="Dribbble & Behance" />
              <AvatarFallback>DB</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">Dribbble & Behance Familia 🏀</h2>
              <p className="text-sm text-gray-500">1232 Members • 200 Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Headphones className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">Today</span>
            </div>
            <div className="flex items-start space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=A" alt="Andik" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
                <p className="text-sm">Oiyaa, salam kenal Ahsan, aku Andik aku dari Ngawi hehe 😊</p>
                <span className="text-xs text-gray-500 mt-1 block">12:54</span>
              </div>
            </div>
            <div className="flex items-start justify-end space-x-2">
              <div className="bg-purple-500 text-white rounded-lg p-3 max-w-[70%]">
                <p className="text-sm">Hi @everyone Salam kenal yaa, aku Ahsan pratama dari Solo 👋 btw ini group buat apaan yak?</p>
                <span className="text-xs opacity-70 mt-1 block">12:55</span>
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=Y" alt="You" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-start space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=R" alt="Rafiee" />
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
                <p className="text-sm">Hi @ahsanpratamaa salam kenal juga, aku Rafie. Oiyaa, aku dari Ngawi hehe 😊</p>
                <span className="text-xs text-gray-500 mt-1 block">12:57</span>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=B" alt="Botak" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
                <div className="bg-white rounded p-2 mb-2">
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
                <span className="text-xs text-gray-500 mt-1 block">12:57</span>
              </div>
            </div>
            <div className="flex items-start justify-end space-x-2">
              <div className="bg-purple-500 text-white rounded-lg p-3 max-w-[70%]">
                <p className="text-sm">@rafiee Wah deket tuh mas meetup yuk 🤙</p>
                <span className="text-xs opacity-70 mt-1 block">13:01</span>
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=Y" alt="You" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button variant="ghost" size="icon">
              <Smile className="h-5 w-5" />
            </Button>
            <Button size="icon">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-lg">Details Community</h2>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Dribbble & Behance...</h3>
                <p className="text-sm text-gray-500">1232 Members • 200 Online</p>
              </div>
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg?height=48&width=48&text=D" alt="Dribbble & Behance" />
                <AvatarFallback>DB</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" className="w-[calc(33%-4px)]">
                Unmute
              </Button>
              <Button variant="outline" className="w-[calc(33%-4px)]">
                Scan
              </Button>
              <Button variant="outline" className="w-[calc(33%-4px)]">
                Leave
              </Button>
            </div>
            <Tabs defaultValue="docs">
              <TabsList className="w-full">
                <TabsTrigger value="docs" className="w-1/3">Docs</TabsTrigger>
                <TabsTrigger value="media" className="w-1/3">Media</TabsTrigger>
                <TabsTrigger value="links" className="w-1/3">Links</TabsTrigger>
              </TabsList>
              <TabsContent value="docs">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium">Docs, Link, Media</span>
                  <span className="text-sm text-gray-500">230</span>
                </div>
              </TabsContent>
            </Tabs>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">Star Message</span>
                <span className="text-sm text-gray-500">Empty</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">Storage Settings</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">Chat Wallpaper</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">1232 Members</h3>
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              <Button variant="outline" className="w-full justify-start">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src="/placeholder.svg?height=24&width=24&text=+" alt="Add" />
                  <AvatarFallback>+</AvatarFallback>
                </Avatar>
                Add Members
              </Button>
              {groupMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${member.name.charAt(0)}`} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-gray-500">@{member.name.toLowerCase().replace(' ', '')}</p>
                    </div>
                  </div>
                  {member.role && (
                    <span className="text-xs text-gray-500">{member.role}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}