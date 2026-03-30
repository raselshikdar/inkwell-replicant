import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

const WritePrompt = () => {
  const { profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const initials = profile?.name
    ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const handleClick = () => {
    if (isAuthenticated) navigate("/write");
    else navigate("/login");
  };

  return (
    <div className="flex items-center gap-3 py-4 border-b border-border">
      <Avatar className="h-9 w-9 flex-shrink-0">
        {profile?.avatar_url && <AvatarImage src={profile.avatar_url} />}
        <AvatarFallback className="bg-gradient-to-br from-amber-400 to-orange-500 text-white text-xs font-semibold">
          {isAuthenticated ? initials : "U"}
        </AvatarFallback>
      </Avatar>
      <button onClick={handleClick} className="flex-1 text-left text-muted-foreground text-sm bg-transparent hover:text-foreground transition-colors">
        What are you working on?
      </button>
    </div>
  );
};

export default WritePrompt;
