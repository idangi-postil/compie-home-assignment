import { Bot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-sm border-b border-white/20 p-4">
      <div className="flex items-center gap-3 max-w-4xl mx-auto">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg?height=40&width=40" />
          <AvatarFallback className="bg-blue-500 text-white">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-semibold text-lg">צ'אט חכם</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
