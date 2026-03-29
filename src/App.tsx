import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { BookmarkProvider } from "@/contexts/BookmarkContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ArticlePage from "./pages/ArticlePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";
import WritePage from "./pages/WritePage.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import BookmarksPage from "./pages/BookmarksPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import TagPage from "./pages/TagPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import ForumsPage from "./pages/ForumsPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BookmarkProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/article/:slug" element={<ArticlePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/write" element={<WritePage />} />
              <Route path="/user/:username" element={<UserProfilePage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/tag/:slug" element={<TagPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/forums" element={<ForumsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </BookmarkProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
