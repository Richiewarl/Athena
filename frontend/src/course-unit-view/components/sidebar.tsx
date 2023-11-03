import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  
}

export function Sidebar({className}: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
        <div className="space-y-4 py-4">
            <div className="px-3 py-3">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight"> 
                    Intro to Discrete Mathematics
                </h2>
                <ScrollArea className="h-[300px] px-1">
                  <div className="space-y-1">
                    <Button variant="secondary" className="w-full justify-start">
                      Week 1
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Week 2
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Week 3
                    </Button>
                  </div>
                </ScrollArea>
            </div>
        </div>
    </div>
  )
}