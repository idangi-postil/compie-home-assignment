import { Bot, MessageCircle, Images } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const Header = () => {
  const location = useLocation();

  return (
    <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-sm border-b border-white/20 p-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-blue-500 text-white">
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-lg">Smart chat</h1>
          </div>
        </div>

        <nav className="flex gap-2">
          <Button
            variant={location.pathname === "/" ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link to="/">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Link>
          </Button>
          <Button
            variant={location.pathname === "/gallery" ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link to="/gallery">
              <Images className="w-4 h-4 mr-2" />
              Gallery
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Header;
