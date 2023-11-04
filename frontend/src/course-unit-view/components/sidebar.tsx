import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  
}

export function Sidebar({className}: SidebarProps) {
  return (
    <aside className={cn("pb-12", className)}>
        <div className="space-y-4 py-4">
            <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight"> 
                    Intro to Discrete Mathematics
                </h2>
                <ScrollArea className="h-full px-1">
                  <div className="space-y-1 p-2">
                    <Button variant="secondary" className="w-full justify-start">
                      Week 1
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Week 2
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Week 3
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Week 4
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Week 5
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Week 6
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Week 7
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Week 8
                    </Button>
                  </div>
                </ScrollArea>
            </div>
        </div>
    </aside>
  )
}